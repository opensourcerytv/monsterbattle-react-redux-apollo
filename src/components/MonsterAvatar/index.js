import React from 'react'
import types from 'prop-types'
import cx from 'classnames'

import images from './images'
import './styles.css'

const {keys} = Object

const MonsterAvatar = ({
  name,
  flip
}) => 
  <div className={cx('MonsterAvatar', {'MonsterAvatar--flip': flip})}>
    <img src={images[name]} />
  </div>

MonsterAvatar.propTypes = {
  name: types.oneOf(keys(images))
}

export default MonsterAvatar
