import React, {Component} from 'react'
import {compose, gql, graphql} from 'react-apollo'
import GraphQLProvider from '../GraphQLProvider'

import {shuffle} from '../lib/utils'

const {max} = Math

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
    battle = null

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
        this.setState({
          monster1: this.monsters[0].name,
          monster1Health: this.monsters[0].health,
        })
      }
      if (!this.state.monster2) {
        this.setState({ 
          monster2: this.monsters[1].name,
          monster2Health: this.monsters[1].health 
        })
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

    selectMonster1 = (monster1) => 
      this.setState({monster1: this.findMonster(monster1)}, this.reset)

    selectMonster2 = (monster2) => 
      this.setState({monster2: this.findMonster(monster2)}, this.reset)

    startBattle = () => {
      this.props.startBattle({
        variables: {
          monster1Name: this.state.monster1,
          monster2Name: this.state.monster2,
        },
      })
        .then(res => {
          this.battle = res.data.startBattle
          console.log('this.battle', this.battle)
          this.setState({ 
            battleStarted: true,
            attackingMonsterName: this.state.monster1.name,
            defendingMonsterName: this.state.monster2.name,
          })

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
        .then({data} => {
          this.battle = data.doBattleTurn
          console.log('this.battle', this.battle)
          this.setState({
            // Swap attacker and defender ready for next turn.
            attackingMonsterName: defendingMonsterName,
            defendingMonsterName: attackingMonsterName,
            // Update monster health.
            monster1Health: this.battle.monster1Health,
            monster2Health: this.battle.monster2Health,
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
      const {
        defendingMonsterName,
        monster1, 
        monster2, 
        monster1Health, 
        monster2Health, 
        battleStarted
      } = this.state

      return (
        <Board
          defender={defendingMonsterName}
          monsters={monsters}
          monster1={monster1} 
          monster2={monster2} 
          monster1Health={monster1Health} 
          monster2Health={monster2Health} 
          monster1Log={[]}
          monster2Log={[]}
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
