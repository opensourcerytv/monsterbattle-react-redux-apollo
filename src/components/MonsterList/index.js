import React from 'react'

import MonsterListView from '../MonsterListView'

import './styles.css'

const MonsterList = ({
  monsters,
  flip,
  battleStarted,
  selectedMonster,
  onSelectMonster
}) => 
  <div className={'MonsterList'}>
    {monsters.map(monster => 
      <div key={monster.name} className={'MonsterList__monster'} onClick={() => !battleStarted && onSelectMonster(monster.name)}>
        <MonsterListView 
          {...monster} 
          locked={battleStarted && (selectedMonster !== monster.name)} 
          flip={flip} />  
      </div>
    )}
  </div>

export default MonsterList
