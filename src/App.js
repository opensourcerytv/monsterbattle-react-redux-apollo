import React, {Component} from 'react'

import MonsterList from './components/MonsterList'
import BattleMat from './components/BattleMat'
import TurnLog from './components/TurnLog'

import './styles.css'

const {max, floor, random} = Math

const monsters = [
  {name: 'George', attack: 6, defense: 4, health: 30},
  {name: 'Donk', attack: 6, defense: 4, health: 30},
  {name: 'Steve', attack: 6, defense: 4, health: 30},
  {name: 'Mort', attack: 6, defense: 4, health: 30},
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
    turns: [],
    monster1: monsters[0],
    monster2: monsters[1],
    monster1DamageTaken: 0,
    monster2DamageTaken: 0,
    battleStarted: false
  }

  reset = () => 
    this.setState({
      turns: [],
      monster1DamageTaken: 0,
      monster2DamageTaken: 0
    })

  selectMonster1 = (monster1) =>
    this.setState({monster1: findMonster(monster1)}, this.reset)

  selectMonster2 = (monster2) =>
    this.setState({monster2: findMonster(monster2)}, this.reset)

  startBattle = () =>
    this.setState({battleStarted: true}, this.reset)

  monster1Attack = () => {
    const {turns, monster1, monster2, monster2DamageTaken} = this.state
    const damage = calcDamage(monster1, monster2)
    this.setState({
      turns: [...turns, {damage, attacker: monster1.name, defender: monster2.name}],
      monster2DamageTaken: monster2DamageTaken + damage,
      battleStarted: (monster2DamageTaken + damage) < monster2.health
    })
  }

  monster2Attack = () => {
    const {turns, monster1, monster2, monster1DamageTaken} = this.state
    const damage = calcDamage(monster2, monster1)
    this.setState({
      turns: [...turns, {damage, attacker: monster2.name, defender: monster1.name}],
      monster1DamageTaken: monster1DamageTaken + damage,
      battleStarted: (monster1DamageTaken + damage) < monster1.health
    })
  }

  actionMethod = () => {
    const {turns, battleStarted} = this.state
    return battleStarted 
      ? turns.length % 2 
        ? this.monster2Attack 
        : this.monster1Attack
      : this.startBattle
  }

  render() {
    const {
      turns,
      monster1, 
      monster2, 
      monster1DamageTaken, 
      monster2DamageTaken, 
      battleStarted
    } = this.state
    
    return (
      <div className="App">
        <TurnLog turns={turns.filter((_, i) => Boolean(i % 2))} show={battleStarted} />
        <MonsterList
          monsters={monsters}
          battleStarted={battleStarted}
          lockedMonster={monster2.name}
          selectedMonster={monster1.name} 
          onSelectMonster={this.selectMonster1} />
        <BattleMat
          defender={turns.length % 2 ? monster1.name : monster2.name}
          monster1={monster1}
          monster2={monster2}
          monster1DamageTaken={monster1DamageTaken}
          monster2DamageTaken={monster2DamageTaken}
          battleStarted={battleStarted} 
          onActionClick={this.actionMethod()}/>
        <MonsterList
          monsters={monsters}
          battleStarted={battleStarted} 
          lockedMonster={monster1.name}
          selectedMonster={monster2.name}
          onSelectMonster={this.selectMonster2}
          flip />
        <TurnLog turns={turns.filter((_, i) => !Boolean(i % 2))} show={battleStarted} flip />
      </div>
    )
  }
}

export default App
