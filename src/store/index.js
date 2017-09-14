import monsters from '../lib/monsters'
import {calcDamage, shuffle} from '../lib/utils'

const {max} = Math

const find = (monsterName) => ({name}) => name === monsterName

const initialState = {
  turns: [],
  monster1: monsters[0],
  monster2: monsters[1],
  monster1Health: monsters[0].health,
  monster2Health: monsters[1].health,
  battleStarted: false,
  monsters: shuffle(monsters)
}

// constants
const SELECT_MONSTER_1 = 'SELECT_MONSTER_1'
const SELECT_MONSTER_2 = 'SELECT_MONSTER_2'
const MONSTER_1_ATTACK = 'MONSTER_1_ATTACK'
const MONSTER_2_ATTACK = 'MONSTER_2_ATTACK'
const START_BATTLE = 'START_BATTLE'

// action creators
export const selectMonster1 = (monster1) => ({
  type: SELECT_MONSTER_1,
  monster1
})

export const selectMonster2 = (monster2) => ({
  type: SELECT_MONSTER_2,
  monster2
})

export const monster1Attack = () => ({
  type: MONSTER_1_ATTACK
})

export const monster2Attack = () => ({
  type: MONSTER_2_ATTACK
})

export const startBattle = () => ({
  type: START_BATTLE
})

// reducers
const handleReset = (state) => ({
  ...state, 
  turns: [],
  monster1Health: state.monster1.health,
  monster2Health: state.monster2.health
})

const handleSelectMonster1 = (state, {monster1}) => ({
  ...state, 
  monster1: state.monsters.find(find(monster1))
})

const handleSelectMonster2 = (state, {monster2}) => ({
  ...state, 
  monster2: state.monsters.find(find(monster2))
})

const handleMonster1Attack = (state) => {
  const {turns, monster1, monster2, monster2Health} = state
  const damage = calcDamage(monster1, monster2)
  const newHealth = max(monster2Health - damage, 0)

  return {
    ...state, 
    turns: [...turns, {damage, attacker: monster1.name, defender: monster2.name}],
    monster2Health: newHealth,
    battleStarted: newHealth > 0
  }
}

const handleMonster2Attack = (state) => {
  const {turns, monster1, monster2, monster1Health} = state
  const damage = calcDamage(monster2, monster1)
  const newHealth = max(monster1Health - damage, 0)
  
  return {
    ...state, 
    turns: [...turns, {damage, attacker: monster2.name, defender: monster1.name}],
    monster1Health: newHealth,
    battleStarted: newHealth > 0
  }
}

const handleStartBattle = (state) => ({
  ...state, 
  battleStarted: true
})

// reducer
const chain = (...reducers) => (state, payload) => 
  reducers.reduce((acc, reducer) => reducer(acc, payload), state)

const handlers = {
  [SELECT_MONSTER_1]: chain(handleSelectMonster1, handleReset),
  [SELECT_MONSTER_2]: chain(handleSelectMonster2, handleReset),
  [MONSTER_1_ATTACK]: handleMonster1Attack,
  [MONSTER_2_ATTACK]: handleMonster2Attack,
  [START_BATTLE]: chain(handleReset, handleStartBattle)
}

export default (state = initialState, {type, ...payload}) => 
  handlers.hasOwnProperty(type) 
    ? handlers[type](state, payload) 
    : state
