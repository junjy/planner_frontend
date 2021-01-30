import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Calendar from './components/pages/Calendar'
import EventsList from './components/calendar/EventsList'
import Event from './components/calendar/Event'
import NewEvent from './components/calendar/NewEvent'

class App extends React.Component {
  render() {
    return (
      <div className="App">

        <Router>
          <Switch>
            {/* <Route path="/" component={Calendar} /> */}
            <Route path="/events/new" component={NewEvent} />
            <Route path="/events/:id" component={Event} />
            <Route path="/events" component={EventsList} />
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
