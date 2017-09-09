import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import reducer from '../../store'

const store = createStore(reducer)

const ReduxProvider = ({
  children
}) => 
  <Provider store={store}>
    {children}
  </Provider>

export default ReduxProvider
