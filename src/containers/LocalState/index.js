import React, {Component} from 'react'

const {max, floor, random} = Math

const shuffle = (array) => {
  let arr = [...array], m = array.length, t, i
  while (m) {
    i = floor(random() * m--)
    t = arr[m]
    arr[m] = arr[i]
    arr[i] = t
  }
  return arr
}

const monsters = shuffle([
  {name: 'George', attack: 6, defense: 4, health: 30},
  {name: 'Donk', attack: 6, defense: 4, health: 30},
  {name: 'Steve', attack: 6, defense: 4, health: 30},
  {name: 'Mort', attack: 6, defense: 4, health: 30},
  {name: 'Flip', attack: 6, defense: 4, health: 30},
  {name: 'Reginald', attack: 6, defense: 4, health: 30},
  {name: 'Simon', attack: 6, defense: 4, health: 30},
  {name: 'Snot', attack: 6, defense: 4, health: 30}
])

const findMonster = (monsterName) => 
  monsters.find(({name}) => name === monsterName)

const roll = () => floor(random() * 7)

const calcDamage = (attacker, defender) => 
  roll() + attacker.attack - defender.defense

class LocalState extends Component {
  state = {
    turns: [],
    monster1: monsters[0],
    monster2: monsters[1],
    monster1Health: monsters[0].health,
    monster2Health: monsters[1].health,
    battleStarted: false
  }

  reset = () => 
    this.setState({
      turns: [],
      monster1Health: this.state.monster1.health,
      monster2Health: this.state.monster2.health
    })

  selectMonster1 = (monster1) =>
    this.setState({monster1: findMonster(monster1)}, this.reset)

  selectMonster2 = (monster2) =>
    this.setState({monster2: findMonster(monster2)}, this.reset)

  startBattle = () =>
    this.setState({battleStarted: true}, this.reset)

  monster1Attack = () => {
    const {turns, monster1, monster2, monster2Health} = this.state
    const damage = calcDamage(monster1, monster2)
    const newHealth = max(monster2Health - damage, 0)
    this.setState({
      turns: [...turns, {damage, attacker: monster1.name, defender: monster2.name}],
      monster2Health: newHealth,
      battleStarted: newHealth > 0
    })
  }

  monster2Attack = () => {
    const {turns, monster1, monster2, monster1Health} = this.state
    const damage = calcDamage(monster2, monster1)
    const newHealth = max(monster1Health - damage, 0)
    this.setState({
      turns: [...turns, {damage, attacker: monster2.name, defender: monster1.name}],
      monster1Health: newHealth,
      battleStarted: newHealth > 0
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
      monster1Health, 
      monster2Health, 
      battleStarted
    } = this.state

    return (
      <this.props.Board
        defender={turns.length % 2 ? monster1.name : monster2.name}
        monsters={monsters}
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

export default LocalState
