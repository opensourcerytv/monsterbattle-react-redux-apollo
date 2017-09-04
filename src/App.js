import React, {Component} from 'react'

import MonsterList from './components/MonsterList'
import BattleMat from './components/BattleMat'

import './styles.css'

const monsters = [
  {name: 'George', attack: 6, defense: 4, health: 30},
  {name: 'Mort', attack: 6, defense: 4, health: 30},
  {name: 'Steve', attack: 6, defense: 4, health: 30},
  {name: 'Donk', attack: 6, defense: 4, health: 30},
  {name: 'Flip', attack: 6, defense: 4, health: 30},
  {name: 'Reginald', attack: 6, defense: 4, health: 30},
  {name: 'Simon', attack: 6, defense: 4, health: 30},
  {name: 'Snot', attack: 6, defense: 4, health: 30}
]

const findMonster = (monsterName) => 
  monsters.find(({name}) => name === monsterName)

class App extends Component {
  state = {
    monster1: monsters[0].name,
    monster2: monsters[1].name,
    battleStarted: false
  }

  render() {
    const {monster1, monster2, battleStarted} = this.state
    return (
      <div className="App">
        <MonsterList
          monsters={monsters}
          battleStarted={battleStarted} />
        <BattleMat
          monster1={findMonster(monster1)}
          monster2={findMonster(monster2)}
          battleStarted={battleStarted} />
        <MonsterList
          monsters={monsters}
          battleStarted={battleStarted} 
          flip />
      </div>
    )
  }
}

export default App
