import React from 'react'
import cx from 'classnames'

import './styles.css'

const TurnLog = ({
  turns,
  show,
  flip
}) => 
  <div className={cx('TurnLog', {
    'TurnLog--show': show, 
    'TurnLog--flip': flip
  })}>
    {turns.map(({attacker, defender, damage}, i) => 
      <div key={i} className={'TurnLog__turn'}>
        {attacker} dealt <span className={'TurnLog__dmg'}>{damage} dmg</span> to {defender}    
      </div>
    )}
  </div>

export default TurnLog
