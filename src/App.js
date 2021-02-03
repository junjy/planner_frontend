import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Test only
// import TUICalendarTest from './components/pages/TUICalendarTest'
import FullCalendarTest from './components/test/FullCalendarTest'
import EventsList2 from './components/test/EventsList2'

// Actual 
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
            <Route path="/events2" component={EventsList2} />
            
            {/*===== Test Pages =====*/}
            {/* <Route exact path="/calendar" component={TUICalendarTest} /> */}
            <Route exact path="/calendartest" component={FullCalendarTest} />
          </Switch>
        </Router>
      </div>

    );
  }
}

export default App;
