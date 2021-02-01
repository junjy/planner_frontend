import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import CalMonthly from './components/pages/CalMonthly'
import CalendarTest from './components/pages/CalendarTest'

import EventsList from './components/calendar/EventsList'
import Event from './components/calendar/Event'
import NewEvent from './components/calendar/NewEvent'
import EditEvent from './components/calendar/EditEvent'

class App extends React.Component {
  render() {
    return (
      <div className="App">

        <Router>
          <Switch>
            <Route path="/events/new" component={NewEvent} />
            <Route path="/events/:id/edit" component={EditEvent} />
            <Route path="/events/:id" component={Event} />
            <Route path="/events" component={EventsList} />
            {/* <Route path="/calendar/monthly" component={CalMonthly} />  */}
            <Route exact path="/calendar" component={CalendarTest} />
          </Switch>
        </Router>
      </div>

    );
  }
}

export default App;
