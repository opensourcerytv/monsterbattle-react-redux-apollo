import React from 'react'

import './styles.css'

const MonsterStats = ({
  attack,
  defense,
  health
}) => 
  <table className={'MonsterStats'}>
    <tr className={'MonsterStats__attack'}>
      <td className={'MonsterStats__label'}>Attack:</td>
      <td className={'MonsterStats__value'}>{attack}</td>
    </tr>
    <tr className={'MonsterStats__defense'}>
      <td className={'MonsterStats__label'}>Defense:</td>
      <td className={'MonsterStats__value'}>{defense}</td>
    </tr>
    <tr className={'MonsterStats__health'}>
      <td className={'MonsterStats__label'}>Health:</td>
      <td className={'MonsterStats__value'}>{health}</td>
    </tr>
  </table>

export default MonsterStats
