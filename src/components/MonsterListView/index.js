import React from 'react'
import cx from 'classnames'

import MonsterAvatar from '../MonsterAvatar'
import MonsterName from '../MonsterName'

import './styles.css'

const MonsterListView = ({
  name,
  locked,
  selected,
  flip
}) =>
  <div className={cx('MonsterListView', {
    'MonsterListView--locked': locked, 
    'MonsterListView--selected': selected, 
    'MonsterListView--flip': flip
  })}>
    <MonsterAvatar name={name} flip={flip} inList />
    <MonsterName name={name} />
  </div>

export default MonsterListView
