import React, {Component} from 'react'
import { compose, gql, graphql } from 'react-apollo'
import GraphQLProvider from './containers/GraphQLProvider'

import MonsterList from './components/MonsterList'
import BattleMat from './components/BattleMat'

import './styles.css'

const {max, floor, random} = Math


class App extends Component {
  
  monsters = [];
  battle = null;

  state = {
    monster1: null,
    monster2: null,
    monster1Health: 0,
    monster2Health: 0,
    battleStarted: false,
    attackingMonsterName: null,
    defendingMonsterName: null,
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    if (nextProps.monsters.loading || !nextProps.monsters.monsters) return;
    
    this.monsters = nextProps.monsters.monsters

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
  
  findMonster = (monsterName) => {
    return this.monsters.find(({name}) => name === monsterName)
  }

  rollDice = () => {
    return floor(random() * 7)
  }

  calcDamage = (attacker, defender) => {
    return this.rollDice() + attacker.attack - defender.defense
  }

  selectMonster1 = (monster1) => {
    const monster = this.findMonster(monster1)
    this.setState({ monster1: monster.name, monster2Health: monster.health })
  }

  selectMonster2 = (monster2) => {
    const monster = this.findMonster(monster2)
    this.setState({ monster2: monster.name, monster2Health: monster.health })
  }

  startBattle = () => {
    this.props.startBattle({
      variables: {
        monster1Name: this.state.monster1,
        monster2Name: this.state.monster2,
			},
    })
      .then(res => {
        this.battle = res.data.startBattle;
        console.log('this.battle', this.battle);
        this.setState({ 
          battleStarted: true,
          attackingMonsterName: this.state.monster1,
          defendingMonsterName: this.state.monster2,
        })

      })
      .catch(err => {
        console.log('err', err);
      })
  }

  doTurn = () => {
    if (!this.battle) return;

    this.props.doBattleTurn({
      variables: {
        battleId: this.battle.id,
        attackingMonsterName: this.state.attackingMonsterName,
        defendingMonsterName: this.state.defendingMonsterName,
			},
    })
      .then(res => {
        this.battle = res.data.doBattleTurn;
        console.log('this.battle', this.battle);
        // Swap attacker and defender ready for next turn.
        this.setState({
          attackingMonsterName: this.state.defendingMonsterName,
          defendingMonsterName: this.state.attackingMonsterName,
          monster1Health: this.battle.monster1Health,
          monster2Health: this.battle.monster2Health,
        })
      })
      .catch(err => {
        console.log('err', err);
      })
  }

  render() {
    const {
      monster1, 
      monster2, 
      monster1Health, 
      monster2Health, 
      battleStarted
    } = this.state
    
    return (
      <div className="App">
        <MonsterList
          monsters={this.monsters}
          battleStarted={battleStarted}
          selectedMonster={monster1} 
          onSelectMonster={this.selectMonster1} />
        <BattleMat
          monster1={this.findMonster(monster1)}
          monster2={this.findMonster(monster2)}
          monster1Health={monster1Health}
          monster2Health={monster2Health}
          battleStarted={battleStarted} 
          onActionClick={battleStarted ? this.doTurn : this.startBattle}/>
        <MonsterList
          monsters={this.monsters}
          battleStarted={battleStarted} 
          selectedMonster={monster2}
          onSelectMonster={this.selectMonster2}
          flip />
      </div>
    )
  }
}

export default compose(
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
)(App);
