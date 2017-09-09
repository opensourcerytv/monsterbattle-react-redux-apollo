import monsters from '../assets/images'

const {keys} = Object
const {random, ceil} = Math

const monsterList = keys(monsters).filter(name => name !== 'tombstone')

const roll = (n) => ceil(random() * n)
const baseAttack = () => roll(10)
const fudge = () => roll(3)

const rollStats = (base) => ({
  attack: 15 + base + fudge(),
  defense: 10 - (base - fudge()),
  health: 100 - ceil((base - fudge()) / 2) * 5
})

const createMonsters = (names) => 
  names.map(name => ({name, ...rollStats(baseAttack())}))

export default createMonsters(monsterList)
