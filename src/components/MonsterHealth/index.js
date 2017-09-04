import React from 'react'
import cx from 'classnames'

import './styles.css'

const {min} = Math

const MonsterHealth = ({
  currentHealth, 
  health,
  flip,
  children
}) =>
  <div className={cx('MonsterHealth', {'MonsterHealth--flip': flip})}>
    <div 
      className={'MonsterHealth__bar'} 
      style={{width: min(currentHealth / health, 1) * 100 + '%'}} />
    {children && <div className={'MonsterHealth__info'}>{children}</div>}
  </div>

export default MonsterHealth
