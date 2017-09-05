import React from 'react'
import {render} from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

// Without GraphQL:
import App from './App'
const Component = <App />;

// With GraphQL:
// import App from './AppApollo'
// import GraphQLProvider from './components/GraphQLProvider'
// const Component = <GraphQLProvider><App /></GraphQLProvider>;

render(Component, document.getElementById('root'))
registerServiceWorker()
