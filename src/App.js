import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import TUICalendarTest from './components/pages/TUICalendarTest'
import FullCalendarTest from './components/pages/FullCalendarTest'
import FullCalTestEvents from './components/pages/FullCalTestEvents'

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
            {/* <Route exact path="/calendar" component={TUICalendarTest} /> */}
            <Route exact path="/calendar" component={FullCalendarTest} />
            <Route exact path="/calevents" component={FullCalTestEvents} />
          </Switch>
        </Router>
      </div>

    );
  }
}

export default App;
