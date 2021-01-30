import React from 'react'
import api from '../../services/api'

// import Calendar from 'tui-calendar'; /* ES6 */
// import "tui-calendar/dist/tui-calendar.css";
// // If you use the default popups, use this.
// import 'tui-date-picker/dist/tui-date-picker.css';
// import 'tui-time-picker/dist/tui-time-picker.css';


class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: null,
            // text: null,
        };
    }

    componentDidMount() {
        const eventID = this.props.match.params.id;
        // console.log(eventID);

        api.getEvent(eventID).then((response) => {
            // console.log(response.data);

            this.setState({
                event: response.data,
                // text: "component mounted at 2pm"
            });
            // console.log(this.state.event);
        })
        .catch(err => {
            console.log(err)
        })
    }

    getEvent


    render() {
        return(
            <div className="page-home">
                <div className="container">
                        <h1>My Calendar - Event Info</h1>
                        {/* <p>Text: {this.state.text}</p> */}
                        {
                            this.state.event ? (
                                <div className="event-info">
                                    <p>Title: {this.state.event.title}</p>
                                    <p>Category: {this.state.event.category}</p>
                                    <p>Due Date Class: {this.state.event.dueDateClass}</p>
                                    <p>CalendarId: {this.state.event.calendarId}</p>
                                    <p>Event ID: {this.state.event.id}</p>
                                </div>

                            ) : ''
                        }
                </div>
            </div>
        )
    }
}

export default Event;