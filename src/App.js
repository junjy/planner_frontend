import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Test only
import TUICalendarTest from './components/test/TUICalendarTest'
import FullCalendarTest2 from './components/test/FullCalendarTest2'
import EventsList2 from './components/test/EventsList2'
import TestModal from './components/test/TestModal'
// import TestModal2 from './components/test/TestModal2'
// import EventsListjQ from './components/test/EventsListjQ'

// Actual 
import Navbar from './components/pages/Navbar'
// import Sidebar from './components/pages/Sidebar'
import EventsList from './components/calendar/EventsList'
import Event from './components/calendar/Event'
import NewEvent from './components/calendar/NewEvent'
import EditEvent from './components/calendar/EditEvent'

class App extends React.Component {
  render() {
    return (
      <div className="App">

        <Router>
          <Navbar />
          {/* <Sidebar /> */}
          <Switch>
            <Route path="/events/new" component={NewEvent} />
            <Route path="/events/:id/edit" component={EditEvent} />
            <Route path="/events/:id" component={Event} />
            <Route path="/events" component={EventsList} />
            <Route path="/events2" component={EventsList2} />

            {/*===== Test Pages =====*/}
            <Route exact path="/calendartui" component={TUICalendarTest} />

            <Route exact path="/calendartest" component={FullCalendarTest2} />
            <Route exact path="/modaltest" component={TestModal} />
            {/* <Route exact path="/modaltest2" component={TestModal2} />
            <Route exact path="/eventslistjq" component={EventsListjQ} /> */}
          </Switch>
        </Router>
      </div>

    );
  }
}

export default App;
