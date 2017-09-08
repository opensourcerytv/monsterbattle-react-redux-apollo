import React from 'react'

import MonsterListView from '../MonsterListView'

import './styles.css'

const MonsterList = ({
  monsters,
  flip,
  battleStarted,
  lockedMonster,
  selectedMonster,
  onSelectMonster
}) => 
  <div className={'MonsterList'}>
    {monsters.map(({name, ...monster}) => 
      <div 
        key={name} 
        className={'MonsterList__monster'} 
        onClick={() => (!battleStarted && lockedMonster !== name) && onSelectMonster(name)}>
        <MonsterListView 
          {...monster} 
          name={name}
          locked={lockedMonster === name || (battleStarted && (selectedMonster !== name))}
          selected={selectedMonster === name}
          flip={flip} />  
      </div>
    )}
  </div>

export default MonsterList
