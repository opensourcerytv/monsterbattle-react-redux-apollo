import React from 'react'
import cx from 'classnames'

import './styles.css'

const MonsterHealth = ({
  hitPoints, 
  maxHitPoints,
  flip
}) =>
  <div className={cx('MonsterHealth', {'MonsterHealth--flip': flip})}>
    <div className={'MonsterHealth__bar'} style={{width: hitPoints / maxHitPoints * 100 + '%'}} />
  </div>

export default MonsterHealth
