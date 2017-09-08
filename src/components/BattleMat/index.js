import React from 'react'

import MonsterBattleView from '../MonsterBattleView'
import VS from '../VS'

import './styles.css'

const {max} = Math

const BattleMat = ({
  defender,
  monster1,
  monster2,
  monster1DamageTaken,
  monster2DamageTaken,
  battleStarted,
  onActionClick
}) => {
  const monster1CurrentHealth = max(monster1.health - monster1DamageTaken, 0)
  const monster2CurrentHealth = max(monster2.health - monster2DamageTaken, 0)
  const monster1Winner = !battleStarted && monster2CurrentHealth === 0
  const monster2Winner = !battleStarted && monster1CurrentHealth === 0

  return (
    <div className={'BattleMat'}>
      <div className={'BattleMat__title'}>
        {battleStarted ? 'FIGHT!' : 'Choose your monsters...'}
      </div>
      <div className={'BattleMat__battleground'}>
        <MonsterBattleView 
          {...monster1} 
          currentHealth={monster1CurrentHealth} 
          winner={monster1Winner}/>
        {!battleStarted && <VS />}
        <MonsterBattleView 
          {...monster2} 
          currentHealth={monster2CurrentHealth} 
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
