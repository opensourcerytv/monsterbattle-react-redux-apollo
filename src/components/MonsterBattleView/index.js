import React from 'react'
import cx from 'classnames'

import MonsterAvatar from '../MonsterAvatar'
import MonsterHealth from '../MonsterHealth'
import MonsterName from '../MonsterName'
import MonsterStats from '../MonsterStats'

import './styles.css'

const MonsterBattleView = ({
  name,
  attack,
  defense,
  currentHealth,
  health,
  dead,
  flip
}) => 
  <div className={cx('MonsterBattleView', {
    'MonsterBattleView--dead': dead
  })}>
    <MonsterAvatar name={name} flip={flip} />
    <MonsterHealth 
      health={health} 
      currentHealth={currentHealth || health} 
      flip={flip}>
      <MonsterName name={name} />
    </MonsterHealth>
    <MonsterStats
      attack={attack}
      defense={defense}
      health={health} />
  </div>

export default MonsterBattleView
