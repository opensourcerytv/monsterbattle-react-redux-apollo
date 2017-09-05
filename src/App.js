import React, {Component} from 'react'

import MonsterList from './components/MonsterList'
import BattleMat from './components/BattleMat'

import './styles.css'

const {max, floor, random} = Math

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

const roll = () => floor(random() * 7)

const calcDamage = (attacker, defender) => 
  roll() + attacker.attack - defender.defense

class App extends Component {
  state = {
    monster1: monsters[0].name,
    monster2: monsters[1].name,
    monster1Health: monsters[0].health,
    monster2Health: monsters[1].health,
    battleStarted: false
  }

  selectMonster1 = (monster1) => {
    const monster = findMonster(monster1)
    this.setState({ monster1: monster.name, monster2Health: monster.health })
  }

  selectMonster2 = (monster2) => {
    const monster = findMonster(monster2)
    this.setState({ monster2: monster.name, monster2Health: monster.health })
  }

  startBattle = () =>
    this.setState({battleStarted: true})

  attack = () => {
    const {monster1, monster2, monster2Health} = this.state
    const damage = calcDamage(findMonster(monster1), findMonster(monster2))
    this.setState({monster2Health: monster2Health - damage})
    setTimeout(this.retaliate, 1000)
  }

  retaliate = () => {
    const {monster1, monster2, monster1Health} = this.state
    const damage = calcDamage(findMonster(monster2), findMonster(monster1))
    this.setState({monster1Health: monster1Health - damage})
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
          monsters={monsters}
          battleStarted={battleStarted}
          selectedMonster={monster1} 
          onSelectMonster={this.selectMonster1} />
        <BattleMat
          monster1={findMonster(monster1)}
          monster2={findMonster(monster2)}
          monster1Health={monster1Health}
          monster2Health={monster2Health}
          battleStarted={battleStarted} 
          onActionClick={battleStarted ? this.attack : this.startBattle}/>
        <MonsterList
          monsters={monsters}
          battleStarted={battleStarted} 
          selectedMonster={monster2}
          onSelectMonster={this.selectMonster2}
          flip />
      </div>
    )
  }
}

export default App
