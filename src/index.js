import React from 'react'
import {render} from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import App from './App'

import './index.css'

// LocalState
// const Component = <App />

// Redux
import ReduxProvider from './containers/ReduxProvider'
const Component = <ReduxProvider><App /></ReduxProvider>

// GraphQL
// import GraphQLProvider from './containers/GraphQLProvider'
// const Component = <GraphQLProvider><App /></GraphQLProvider>

render(Component, document.getElementById('root'))
registerServiceWorker()
