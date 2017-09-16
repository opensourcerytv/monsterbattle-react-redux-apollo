import React, {Component} from 'react'
import {compose, gql, graphql} from 'react-apollo'

import {shuffle} from '../../lib/utils'

const graphQLConnected = compose(
  graphql(gql`
    query {
      monsters {
        id
        name
        health
        attack
        defense
      }
    }
  `, {
    name: 'monsters',
  }),
  graphql(gql`
    mutation startBattle(
      $monster1Name: String!
      $monster2Name: String!
    ) {
      startBattle(
        monster1Name: $monster1Name,
        monster2Name: $monster2Name,
      ) {
        id
        monster1 {
          name
        }
        monster2 {
          name
        }
        monster1Health
        monster2Health
        started
        finished
        winner {
          name
        }
        loser {
          name
        }
        turns {
          id
          battleId
          damage
          attackingMonster {
            name
          }
          defendingMonster {
            name
          }
        }
      }
    }
  `, {
    name: 'startBattle',
  }),
  graphql(gql`
    mutation doBattleTurn(
      $battleId: String!
      $attackingMonsterName: String!
      $defendingMonsterName: String!
    ) {
      doBattleTurn(
        battleId: $battleId,
        attackingMonsterName: $attackingMonsterName,
        defendingMonsterName: $defendingMonsterName
      ) {
        id
        monster1 {
          name
        }
        monster2 {
          name
        }
        monster1Health
        monster2Health
        started
        finished
        winner {
          name
        }
        loser {
          name
        }
        turns {
          id
          battleId
          damage
          attackingMonster {
            name
          }
          defendingMonster {
            name
          }
        }
      }
    }
  `, {
    name: 'doBattleTurn',
  }),
)

const withApolloLogic = (Board) => {
  class Apollo extends Component {
    
    monsters = []
    battle = {}

    state = {
      monster1: null,
      monster2: null,
      monster1Health: 0,
      monster2Health: 0,
      battleStarted: false,
      attackingMonsterName: null,
      defendingMonsterName: null,
    }

    componentWillReceiveProps({monsters}) {
      if (monsters.loading || !monsters.monsters) return
      
      this.monsters = shuffle(monsters.monsters.slice(0))

      if (!this.state.monster1) {
        this.selectMonster1(this.monsters[0].name);
      }
      if (!this.state.monster2) {
        this.selectMonster2(this.monsters[1].name)
      }
    }

    reset = () => 
      this.setState({
        monster1Health: this.state.monster1.health,
        monster2Health: this.state.monster2.health
      })
    
    findMonster = (monsterName) => {
      return this.monsters.find(({name}) => name === monsterName)
    }

    selectMonster1 = (monsterName) => 
      this.setState({monster1: this.findMonster(monsterName)}, this.reset)

    selectMonster2 = (monsterName) => 
      this.setState({monster2: this.findMonster(monsterName)}, this.reset)

    startBattle = () => {
      this.props.startBattle({
        variables: {
          monster1Name: this.state.monster1.name,
          monster2Name: this.state.monster2.name,
        },
      })
        .then(res => {
          this.battle = res.data.startBattle
          this.setState({ 
            battleStarted: true,
            attackingMonsterName: this.state.monster1.name,
            defendingMonsterName: this.state.monster2.name,
          }, this.reset)
        })
        .catch(err => {
          console.log('err', err)
        })
    }

    doTurn = () => {
      if (!this.battle) return
      const {
        attackingMonsterName,
        defendingMonsterName
      } = this.state

      this.props.doBattleTurn({
        variables: {
          battleId: this.battle.id,
          attackingMonsterName,
          defendingMonsterName,
        },
      })
        .then(({data}) => {
          this.battle = data.doBattleTurn
          this.battle.turns = this.battle.turns.map(({
            attackingMonster, 
            defendingMonster, 
            damage
          }) => ({
            attacker: attackingMonster.name, 
            defender: defendingMonster.name, 
            damage
          }))
          console.log('this.battle', this.battle)
          this.setState({
            // Swap attacker and defender ready for next turn.
            attackingMonsterName: defendingMonsterName,
            defendingMonsterName: attackingMonsterName,
            // Update monster health.
            monster1Health: this.battle.monster1Health,
            monster2Health: this.battle.monster2Health,
            battleStarted: this.battle.monster2Health > 0 && this.battle.monster1Health > 0
          })
        })
        .catch(err => {
          console.log('err', err)
        })
    }

    actionMethod = () =>
      this.state.battleStarted 
        ? this.doTurn 
        : this.startBattle

    render() {
      const {turns = []} = this.battle
      const {
        defendingMonsterName,
        monster1, 
        monster2, 
        monster1Health, 
        monster2Health, 
        battleStarted
      } = this.state

      if (this.monsters.length === 0) return null;

      return (  
        <Board
          defender={defendingMonsterName}
          monsters={this.monsters}
          monster1={monster1} 
          monster2={monster2} 
          monster1Health={monster1Health} 
          monster2Health={monster2Health} 
          monster1Log={turns.filter((_, i) => Boolean(i % 2))}
          monster2Log={turns.filter((_, i) => !Boolean(i % 2))}
          battleStarted={battleStarted}

          selectMonster1={this.selectMonster1}
          selectMonster2={this.selectMonster2}
          nextTurnAction={this.actionMethod()}
        />
      )
    }
  }

  return graphQLConnected(Apollo)
}

export default withApolloLogic
