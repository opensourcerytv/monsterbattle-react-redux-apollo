import GameBoard from './components/GameBoard'

import withLocalStateLogic from './containers/withLocalStateLogic'
// import withReduxLogic from './containers/withReduxLogic'
// import withApolloLogic from './containers/withApolloLogic'

const App = withLocalStateLogic(GameBoard)
// const App = withReduxLogic(GameBoard)
// const App = withApolloLogic(GameBoard)

export default App
