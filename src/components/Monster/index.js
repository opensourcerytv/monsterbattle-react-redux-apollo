import React from 'react'
import cx from 'classnames'

import MonsterAvatar from '../MonsterAvatar'
import MonsterName from '../MonsterName'
import MonsterStats from '../MonsterStats'
import MonsterHealth from '../MonsterHealth'

import './styles.css'

const Monster = ({
  name,
  attack,
  defense,
  currentHealth,
  health,
  flip,
  inBattle,
  dead
}) =>
  <div className={cx('Monster', {'Monster--inBattle': inBattle, 'Monster--dead': dead})}>
    <MonsterAvatar name={name} flip={flip} />
    <MonsterName name={name} />
    <MonsterStats 
      attack={attack} 
      defense={defense} 
      health={health} />
    {inBattle && <MonsterHealth 
      currentHealth={currentHealth} 
      health={health}
      flip={flip} />}
  </div>

export default Monster
