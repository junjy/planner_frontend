import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Calendar from './components/pages/Calendar'

class App extends React.Component {
  render() {
    return (
      <div className="App">

        <Router>
          <Switch>
            <Route path="/"><Calendar /></Route>
          </Switch>
        </Router>

      </div>
    );

  }
}

export default App;
