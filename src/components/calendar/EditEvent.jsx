import React from 'react'
import moment from 'moment'
import plannerAPI from '../../services/api'

class EditEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: null,
            // text: null,
        };
    }

    componentDidMount() {
        const eventID = this.props.match.params.id;

        plannerAPI.getEvent(eventID).then((response) => {
            console.log(response.data);

            this.setState({
                event: response.data.event,
                // text: "edit event component mounted at 4.30pm"
            });
            // console.log(this.state.event);
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleInputChange(e) {
        const { event } = this.state; //destructure
        event[e.target.name] = e.target.value;
        this.setState({ event });
      }


    render() {
        return(
            <div className="form-new-event">
                <div className="container">
                    <h1>My Calendar - Edit Event</h1>
                    {/* <p>Text: {this.state.text}</p> */}
                    { this.state.event ? (
                        <div className="form">
                            {/* <form onSubmit={(e) => {this.handleFormSubmit(e);}}> */}
                            <form>
                                <p>Text: {this.state.event.title}</p>
                                {/* //=== Title ==== // */}
                                <div className="">
                                    <label htmlFor="title" className="">
                                        Title:
                                    </label>
                                    <input type="text" className="" id="title" name="title" value={this.state.event.title} onChange={(e) => {this.handleInputChange(e);}} placeholder="" required />
                                </div>
                                {/* //=== Category ==== // */}
                                <div className="">
                                    <label htmlFor="category" className="">
                                        Category:
                                    </label>
                                    <select className="" id="category" name="category" value={this.state.event.category} onChange={(e) => {this.handleInputChange(e);}} required>
                                        <option value="">-----</option>
                                        <option value="Family">Family</option>
                                        <option value="Work">Work</option>
                                        <option value="Study">Study</option>
                                        <option value="Leisure">Leisure</option>
                                    </select>
                                </div>
                                {/* //=== CalendarID ==== // */}
                                <div className="">
                                    <label htmlFor="calendarId" className="">
                                        CalendarID:
                                    </label>
                                    <input type="text" className="" id="calendarId" name="calendarId" value={this.state.event.calendarId} onChange={(e) => {this.handleInputChange(e);}} placeholder="" required />
                                </div>
                                {/* //=== Start Date ==== // */}
                                {/* Check how to display start date */}
                                <div className="">
                                    <label htmlFor="date-start" className="">
                                        Start Date:
                                    </label>
                                    <input type="date" className="" id="date-start" name="date-start" value={this.state.event.start} onChange={(e) => {this.handleInputChange(e);}} min={moment().format("YYYY-MM-DD")} />
                                </div>
                                {/* //=== Start Time ==== // */}
                                <div className="">
                                    <label htmlFor="time-start" className="">
                                        Start Time:
                                    </label>
                                    <input type="time" className="" id="time-start" name="time-start" min={moment().format("hh:mm")} />
                                </div>
                                {/* //=== End Date ==== // */}
                                {/* Check how to display end date */}
                                <div className="">
                                    <label htmlFor="date-end" className="">
                                        End Date:
                                    </label>
                                    <input type="date" className="" id="date-end" name="date-end"  value={this.state.event.end} onChange={(e) => {this.handleInputChange(e);}} min={moment().format("YYYY-MM-DD")} />
                                </div>
                                {/* //=== End Time ==== // */}
                                <div className="">
                                    <label htmlFor="time-end" className="">
                                        End Time:
                                    </label>
                                    <input type="time" className="" id="time-end" name="time-end" min={moment().format("hh:mm")} />
                                </div>
                                <br />
                                <button type="submit" className="">
                                    Submit
                                </button>
                            </form>
                        </div>
                        ) : ( <p>No such item found.</p>
                    )}
                </div>
            </div>
        )
    }
}

export default EditEvent;
