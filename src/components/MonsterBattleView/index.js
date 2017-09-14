import React from 'react'

import MonsterAvatar from '../MonsterAvatar'

import './styles.css'

const MonsterBattleView = ({name, currentHealth, flip, winner}) => (
  <div className={'MonsterBattleView'}>
    <MonsterAvatar name={name} flip={flip} dead={currentHealth <= 0} />

    {winner && <div className={'MonsterBattleView__fireworks'} />}
  </div>
)

export default MonsterBattleView
