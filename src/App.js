import React from 'react'
import './App.css'

import Monster from './components/Monster'

const monsters = [
  {name: 'George'},
  {name: 'Mort'},
  {name: 'Steve'},
  {name: 'Donk'},
  {name: 'Flip'},
  {name: 'Reginald'},
  {name: 'Simon'},
  {name: 'Snot'}
]

const App = () => 
  <div className="App">
    {monsters.map(({name}) => <Monster
      key={name}
      name={name}
      attack={8}
      defense={4}
      currentHealth={50}
      health={50}
      flip={false}
      inBattle={false} 
      dead={false} />
    )}
  </div>

export default App
