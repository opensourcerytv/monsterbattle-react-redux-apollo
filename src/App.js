import React from 'react'

import LocalState from './containers/LocalState'
// import Redux from './containers/Redux'
// import Apollo from './containers/Apollo'
import GameBoard from './components/GameBoard'

const GameLogic = LocalState
// const GameLogic = Redux
// const GameLogic = Apollo

const App = () =>
  <GameLogic Board={GameBoard} />

export default App
