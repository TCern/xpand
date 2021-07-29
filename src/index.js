import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './style.module.css'
import { HomeWrapper } from './pages/home-wrapper'

const App = () => {
  return (
    <Router>
      <div>
        <Route exact component={HomeWrapper} path="/" />
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
