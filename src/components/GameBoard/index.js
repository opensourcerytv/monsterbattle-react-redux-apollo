import React from 'react'

import MonsterList from '../MonsterList'
import BattleMat from '../BattleMat'
import TurnLog from '../TurnLog'

import './styles.css'

const GameBoard = ({
  defender,
  monsters,
  monster1, 
  monster2, 
  monster1Health, 
  monster2Health, 
  monster1Log,
  monster2Log,
  battleStarted,

  selectMonster1,
  selectMonster2,
  nextTurnAction
}) => 
  <div className="GameBoard">
    <TurnLog turns={monster1Log} show={battleStarted} />
    <MonsterList
      monsters={monsters}
      battleStarted={battleStarted}
      lockedMonster={monster2.name}
      selectedMonster={monster1.name} 
      onSelectMonster={selectMonster1} />
    <BattleMat
      defender={defender}
      monster1={monster1}
      monster2={monster2}
      monster1Health={monster1Health}
      monster2Health={monster2Health}
      battleStarted={battleStarted} 
      onActionClick={nextTurnAction}/>
    <MonsterList
      monsters={monsters}
      battleStarted={battleStarted} 
      lockedMonster={monster1.name}
      selectedMonster={monster2.name}
      onSelectMonster={selectMonster2}
      flip />
    <TurnLog turns={monster2Log} show={battleStarted} flip />
  </div>

export default GameBoard
