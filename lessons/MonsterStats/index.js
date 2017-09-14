import React from 'react'

import './styles.css'

const MonsterStats = ({
  attack,
  defense,
  health
}) => 
  <div className={'MonsterStats'}>
    <div className={'MonsterStats__attack'}>
      <span className={'MonsterStats__label'}>Attack:</span>
      <span className={'MonsterStats__value'}>{attack}</span>
    </div>
    <div className={'MonsterStats__defense'}>
      <span className={'MonsterStats__label'}>Defense:</span>
      <span className={'MonsterStats__value'}>{defense}</span>
    </div>
    <div className={'MonsterStats__health'}>
      <span className={'MonsterStats__label'}>Health:</span>
      <span className={'MonsterStats__value'}>{health}</span>
    </div>
  </div>

export default MonsterStats
