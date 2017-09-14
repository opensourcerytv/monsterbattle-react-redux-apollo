const {max, floor, random} = Math
const compose = (...fns) => (arg) => 
  fns.reduce((acc, fn) => fn(acc), arg)

export const shuffle = (array) => {
  let arr = [...array], m = array.length, t, i
  while (m) {
    i = floor(random() * m--)
    t = arr[m]
    arr[m] = arr[i]
    arr[i] = t
  }
  return arr
}

const roll = () => floor(random() * 7)
const baseDmg = ({attack}, {defense}) => roll() + attack - defense
const crit = (damage) => random() < 0.2 ? damage * 2 : damage
const dodge = (damage) => random() < 0.1 ? 0 : damage
const clamp = (damage) => max(damage, 0)

const embellish = compose(
  crit,
  dodge,
  clamp
)

export const calcDamage = (attacker, defender) => 
  embellish(baseDmg(attacker, defender))
  
