import React from 'react'
import api from '../../services/api'

class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }

    componentDidMount() {

        api.listEvents().then((response) => {

            console.log(response.data);
            this.setState({
                list: response.data,
            });
        });
    }


    render() {
        return(
            <div className="page-home">
                <div className="container">
                    <div className="calendar-overlay">
                        <p>My Calendar: Events</p>
                        {/* <div id="calendar" style={{height: '800px'}}></div> */}
                        {/* <div id="calendar">
                        </div> */}
                        <p>Title: {this.state.event.title}</p>
                        <p>Category: {this.state.event.category}</p>
                        <p>Due Date Class: {this.state.event.dueDateClass}</p>
                        <p>CalendarId: {this.state.event.calendarId}</p>
                        <p>Event ID: {this.state.event.id}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Events;