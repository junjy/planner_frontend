import React from 'react'
import { formatDate } from '@fullcalendar/react'
import plannerAPI from '../../services/api'
import '../../css/main.css'

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weekendsVisible: true,
            currentEvents: [],
            list: [],
        };
    }

    componentDidMount() {

        plannerAPI.listEvents().then((response) => {
            // console.log(response.data.events);

            this.setState({
                list: response.data.events,
                // text: "calendar component mounted at 3pm"
            });

            
        }).catch(err => {
            console.log(err)
        })
    }

    handleWeekendsToggle = () => {
        this.setState({
          weekendsVisible: !this.state.weekendsVisible
        })
    }

    handleEvents = (events) => {
        events = this.state.list;

        this.setState({
          currentEvents: events
        })
    }

    renderSidebarEvent = (event) => {
        return (
          <li key={event.id}>
            <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
            <i>{event.title}</i>
          </li>
        )
    }

    render() {
        return(
            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    <h2>Instructions</h2>
                    <ul>
                        <li>Select dates and you will be prompted to create a new event</li>
                        <li>Drag, drop, and resize events</li>
                        <li>Click an event to delete it</li>
                    </ul>
                </div>
                <div className='demo-app-sidebar-section'>
                    <label>
                        <input
                        type='checkbox'
                        checked={this.state.weekendsVisible}
                        onChange={this.handleWeekendsToggle}
                        ></input>
                        toggle weekends
                    </label>
                </div>
                <div className='demo-app-sidebar-section'>
                    <h2>All Events ({this.state.currentEvents.length})</h2>
                    <ul>
                        {this.state.currentEvents.map(this.renderSidebarEvent)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar;
