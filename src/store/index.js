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

const find = (monsterName) => ({name}) => name === monsterName

const roll = () => floor(random() * 7)

const calcDamage = (attacker, defender) => 
  roll() + attacker.attack - defender.defense

// Redux stuff starts here
const initialState = {
  turns: [],
  monster1: monsters[0],
  monster2: monsters[1],
  monster1Health: monsters[0].health,
  monster2Health: monsters[1].health,
  battleStarted: false,
  monsters: shuffle([
    {name: 'George', attack: 6, defense: 4, health: 30},
    {name: 'Donk', attack: 6, defense: 4, health: 30},
    {name: 'Steve', attack: 6, defense: 4, health: 30},
    {name: 'Mort', attack: 6, defense: 4, health: 30},
    {name: 'Flip', attack: 6, defense: 4, health: 30},
    {name: 'Reginald', attack: 6, defense: 4, health: 30},
    {name: 'Simon', attack: 6, defense: 4, health: 30},
    {name: 'Snot', attack: 6, defense: 4, health: 30}
  ])
}

// constants
const SELECT_MONSTER_1 = 'SELECT_MONSTER_1'
const SELECT_MONSTER_2 = 'SELECT_MONSTER_2'
const MONSTER_1_ATTACK = 'MONSTER_1_ATTACK'
const MONSTER_2_ATTACK = 'MONSTER_2_ATTACK'
const START_BATTLE = 'START_BATTLE'
const RESET = 'RESET'

// action creators
const selectMonster1 = (monster1) => ({
  type: SELECT_MONSTER_1,
  monster1
})

const selectMonster2 = (monster2) => ({
  type: SELECT_MONSTER_2,
  monster2
})

const monster1Attack = () => ({
  type: MONSTER_1_ATTACK
})

const monster2Attack = () => ({
  type: MONSTER_2_ATTACK
})

const startBattle = () => ({
  type: START_BATTLE
})

const reset = () => ({
  type: RESET
})

// reducers

// reducer
