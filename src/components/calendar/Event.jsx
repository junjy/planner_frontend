import React from 'react'
import { Link } from 'react-router-dom'
import plannerAPI from '../../services/api'

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {},
            // text: null,
        };
    }

    componentDidMount() {
        const eventID = this.props.match.params.id;
        // console.log(eventID);

        plannerAPI.getEvent(eventID).then((response) => {
            // console.log(response.data);

            this.setState({
                event: response.data.event,
                // text: "component mounted at 2pm"
            });
            // console.log(this.state.event);
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleDelete(e, id) {

        plannerAPI
        .deleteEvent(id)
        .then((response) => {
          if (!response.data) {
            console.log("error in delete submission");
            return;
          }
          console.log(response);
          console.log("existing event deleted");
        })
        .catch((err) => {
          console.log(err);
        });

    }

    render() {
        return(
            <div className="page-event">
                <div className="container">
                        <h1>My Calendar - Event Info</h1>
                        {/* <p>Text: {this.state.text}</p> */}
                        {
                            this.state.event ? (
                                <div className="event-info">
                                    <p>Title: {this.state.event.title}</p>
                                    <p>Start: {this.state.event.start}</p>
                                    <p>End: {this.state.event.end}</p>
                                    <p>Category: {this.state.event.category}</p>
                                    {/* <p>Due Date Class: {this.state.event.dueDateClass}</p>
                                    <p>CalendarId: {this.state.event.calendarId}</p> */}
                                    <p>Event ID: {this.state.event._id}</p>


                                    <Link to={{pathname: `/events/${this.state.event._id}/edit`,}} className="" >
                                        Edit
                                    </Link>{" "}
                                    <button type="submit" onClick={(e) => this.handleDelete(e, this.state.event._id)} className="">
                                        Delete
                                    </button>

                                </div>

                            ) : ''
                        }
                </div>
            </div>
        )
    }
}

export default Event;
