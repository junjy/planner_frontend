import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Calendar from './components/pages/Calendar'
import Events from './components/calendar/Events'
import Event from './components/calendar/Event'

class App extends React.Component {
  render() {
    return (
      <div className="App">

        <Router>
          <Switch>
            {/* <Route path="/" component={Calendar} /> */}
            {/* <Route path="/events" component={Events} /> */}
            <Route path="/events/:id" component={Event} />
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
