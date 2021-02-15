import React, { formatDate } from 'react'
import plannerAPI from '../../services/api'

// to update
class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            msg: '',
        };
    }

    componentDidMount() {

        plannerAPI.listEvents().then((response) => {

            let topMsg = this.greeting();

            this.setState({
                list: response.data.events,
                msg: topMsg,
            });
            // console.log(this.state.list.length);
            
        }).catch(err => {
            console.log(err)
        })
    }

    greeting() {
        let dateTimeNow = new Date();
        let hourNow = dateTimeNow.getHours();
        // console.log(dateTimeNow);
        console.log(hourNow);
        // return dateTimeNow;
        switch(true) {
            case (hourNow < 5 || hourNow > 20):
                return "Good night!";
            case (hourNow < 12):
                return "Good morning!";
            case (hourNow < 18):
                return "Good afternoon!";
            case (hourNow < 21):
                return "Good evening!";
            default:
                return "Good day!";
        }
    }

    checkEventsToday() {


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
                    <h4>{this.state.msg}</h4>
                    <div>
                        <p>You have 5 appointments today</p>
                        <div>
                            Upcoming:-
                            <ul>
                                <li><b>1500</b>: <a href="#">Meeting with Supplier</a></li>
                                <li><b>1630</b>: <a href="#">Project Meeting</a></li>
                                <li><b>1800</b>: <a href="#">Dinner with Friend A</a></li>
                                <li>See <a href="#">more</a></li>
                            </ul>
                            <div>
                                Tomorrow: 
                                <p>7 appointments</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='demo-app-sidebar-section'>
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
                </div> */}
                <div className='demo-app-sidebar-section'>
                    <h2>All Events ({this.state.list.length})</h2>
                    <ul>
                        {this.state.currentEvents.map(this.renderSidebarEvent)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Welcome;
