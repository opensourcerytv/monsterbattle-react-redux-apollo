import React from 'react'

// import withLocalStateLogic from './containers/withLocalStateLogic'
import withReduxLogic from './containers/withReduxLogic'
// import withApolloLogic from './containers/withApolloLogic'
import GameBoard from './components/GameBoard'

// const App = withLocalStateLogic(GameBoard)
const App = withReduxLogic(GameBoard)
// const App = withApolloLogic(GameBoard)

export default App
