import React from 'react'

import MonsterBattleView from '../MonsterBattleView'
import VS from '../VS'

import './styles.css'

const BattleMat = ({
  monster1,
  monster2,
  monster1Health,
  monster2Health,
  battleStarted,
  onActionClick
}) => 
  <div className={'BattleMat'}>
    <div className={'BattleMat__title'}>
      {battleStarted ? 'FIGHT!' : 'Choose your monsters...'}
    </div>
    <div className={'BattleMat__battleground'}>
      <MonsterBattleView 
        {...monster1} 
        currentHealth={monster1Health} />
      {!battleStarted && <VS />}
      <MonsterBattleView 
        {...monster2} 
        currentHealth={monster2Health} 
        flip />
    </div>
    <div className={'BattleMat__footer'}>
      <button className={'BattleMat__action'} onClick={onActionClick}>
        {battleStarted ? 'Attack!' : 'Start battle'}
      </button>
    </div>
  </div>

export default BattleMat
