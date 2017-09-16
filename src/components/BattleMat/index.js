import React from 'react'

import MonsterBattleView from '../MonsterBattleView'
import VS from '../VS'

import './styles.css'

const BattleMat = ({
  defender,
  monster1,
  monster2,
  monster1Health,
  monster2Health,
  battleStarted,
  
  onActionClick
}) => {
  const monster1Winner = !battleStarted && monster2Health === 0
  const monster2Winner = !battleStarted && monster1Health === 0

  return (
    <div className={'BattleMat'}>
      <div className={'BattleMat__title'}>
        {battleStarted ? 'FIGHT!' : 'Choose your monsters...'}
      </div>
      <div className={'BattleMat__battleground'}>
        <MonsterBattleView 
          {...monster1} 
          currentHealth={monster1Health} 
          winner={monster1Winner}/>
        {!battleStarted && <VS />}
        <MonsterBattleView 
          {...monster2} 
          currentHealth={monster2Health} 
          winner={monster2Winner}
          flip />
      </div>
      <div className={'BattleMat__footer'}>
        <button className={'BattleMat__action'} onClick={onActionClick}>
          {battleStarted ? `Attack ${defender}!` : 'Start battle'}
        </button>
      </div>
    </div>
  )
}

export default BattleMat
