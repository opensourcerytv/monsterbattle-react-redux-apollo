import React from 'react'
import types from 'prop-types'

import './styles.css'

const MonsterName = ({
  name
}) => 
  <div className={'MonsterName'}>{name}</div>

MonsterName.propTypes = {
  name: types.string
}

export default MonsterName
