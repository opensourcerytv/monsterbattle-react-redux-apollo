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
  flip,
  winner
}) => 
  <div className={'MonsterBattleView'}>
    <MonsterAvatar name={name} flip={flip} dead={currentHealth <= 0} />
    <MonsterHealth 
      health={health} 
      currentHealth={currentHealth} 
      flip={flip}>
      <MonsterName name={name} />
    </MonsterHealth>
    <MonsterStats
      attack={attack}
      defense={defense}
      health={health} />
    {winner && <div className={'MonsterBattleView__fireworks'} />}
  </div>

export default MonsterBattleView
