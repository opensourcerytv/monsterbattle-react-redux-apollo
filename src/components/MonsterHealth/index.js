import React from 'react'
import cx from 'classnames'

import './styles.css'

const MonsterHealth = ({
	health,
	currentHealth,
	flip,
	children
}) => 
	<div className={cx('MonsterHealth', {'MonsterHealth--flip': flip})}>
		<div 
      className={'MonsterHealth__bar'} 
      style={{width: Math.min(currentHealth / health, 1) * 100 + '%'}} />
      {children && <div className={'MonsterHealth__info'}>
      	{children}
      </div>}
	</div>

export default MonsterHealth
