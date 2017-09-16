import React from 'react'

import MonsterAvatar from '../MonsterAvatar'
import MonsterName from '../MonsterName'
import MonsterHealth from '../MonsterHealth'
import MonsterStats from '../MonsterStats'

import './styles.css'

const MonsterBattleView = ({
	name, 
	attack,
	defense,
	health, 
	currentHealth, 
	flip, 
	winner
}) => (
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
    	health={health}/>
    {winner && <div className={'MonsterBattleView__fireworks'} />}
  </div>
)

export default MonsterBattleView
