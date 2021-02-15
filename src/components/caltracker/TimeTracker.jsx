import React from 'react'
import { formatDate } from '@fullcalendar/react'
import plannerAPI from '../../services/api'
import moment from 'moment'
import '../../css/main.css'

class TimeTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'Sam',
            weekendsVisible: true,
            currentEvents: [],
            list: [],
            msg: '',
            dateToday: {},

        };
    }

    componentDidMount() {

        plannerAPI.listEvents().then((response) => {
            // console.log(response.data.events);

            // check current time
            let dateTimeNow = new Date();
            let hour = dateTimeNow.getHours();
            let topMsg = this.greeting(hour, this.state.user);

            this.setState({
                list: response.data.events,
                msg: topMsg,
                dateToday: {
                    dateStr: moment(dateTimeNow).format("ddd, DD MMM YYYY"),
                    hourOnly: hour,
                }
                // text: "calendar component mounted at 3pm"
            });
            // console.log(this.state.list.length);
            // console.log(this.state.dateToday);
            
        }).catch(err => {
            console.log(err)
        })
    }

    greeting = (hourNow, username) => {
        let suffix = ", " + username + "!";

        switch(true) {
            case (hourNow < 5 || hourNow > 20):
                return "Good night" + suffix;
            case (hourNow < 12):
                return "Good morning!" + suffix;
            case (hourNow < 18):
                return "Good afternoon!" + suffix;
            case (hourNow <= 20):
                return "Good evening" + suffix;
            default:
                return "Good day!" + suffix;
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
            <div>
                <div className='demo-app-sidebar-section'>
                    <h4>Hi {this.state.user},</h4>
                    <div>
                        <p> Here's how much time you spent this week</p>
                        <div>
                            <h6>This Week | Month | Today </h6>
                            <ul>
                                <li><b>Work</b>: 50 hrs</li>
                                <li><b>Study</b>: 3 hrs</li>
                                <li><b>Family</b>: 10 hrs</li>
                                <li><b>Leisure</b>: 12 hrs</li>
                                <li><b>Meals</b>: 15 hrs</li>
                                <li><b>Sleep</b>: 45 hrs</li>
                                <li><b>Travel</b>: 10 hrs</li>
                                <li><b>Others</b>: 5 hrs</li>
                            </ul>
                            <p>Note: 50 hrs were untracked</p>
                        </div>
                    </div>
                </div>
 
            </div>
        )
    }
}

export default TimeTracker;