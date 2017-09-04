import React from 'react'

import MonsterListView from '../MonsterListView'

import './styles.css'

const MonsterList = ({
  monsters,
  flip,
  battleStarted,
  selectedMonster
}) => 
  <div className={'MonsterList'}>
    {monsters.map(monster => 
      <div key={monster.name} className={'MonsterList__monster'}>
        <MonsterListView 
          {...monster} 
          locked={battleStarted && (selectedMonster !== monster.name)} 
          flip={flip} />  
      </div>
    )}
  </div>

export default MonsterList
