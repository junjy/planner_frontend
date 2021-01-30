import React from 'react'
import moment from 'moment'
// import plannerAPI from '../../services/api'

class NewEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // event: null,
            text: "create new event form loaded",
        };
    }

    // componentDidMount() {

    //     plannerAPI.getEvent().then((response) => {
    //         // console.log(response.data);

    //         this.setState({
    //             // event: response.data,
    //             text: "component mounted at 3.30pm"
    //         });
    //         // console.log(this.state.event);
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }


    render() {
        return(
            <div className="form-new-event">
                <div className="container">
                    <h1>My Calendar - Create New Event</h1>
                    <p>Text: {this.state.text}</p>

                    {/* <form onSubmit={(e) => {
              this.handleFormSubmit(e);
            }}
          > */}
                    <form>
                        {/* //=== Title ==== // */}
                        <div className="">
                            <label htmlFor="title" className="">
                                Title:
                            </label>
                            <input type="text" className="" id="title" name="title" value={this.state.title} placeholder="" required />
                        </div>
                        {/* //=== Category ==== // */}
                        <div className="">
                            <label htmlFor="category" className="">
                                Category:
                            </label>
                            <select className="" id="category" name="category" value={this.state.category} required>
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
                            <input type="text" className="" id="calendarId" name="calendarId"
                                value={this.state.calendarId} placeholder="" required />
                        </div>
                        {/* //=== Start Date ==== // */}
                        {/* Add start time later */}
                        <div className="">
                            <label htmlFor="date-start" className="">
                                Start Date:
                            </label>
                            <input type="date" id="date-start" name="date-start" className="" min={moment().format("YYYY-MM-DD")} />
                        </div>
                        {/* //=== Start Time ==== // */}
                        <div className="">
                            <label htmlFor="time-start" className="">
                                Start Time:
                            </label>
                            <input type="time" id="time-start" name="time-start" className="" min={moment().format("hh:mm")} />
                        </div>
                        {/* //=== End Date ==== // */}
                        {/* Add end time later */}
                        <div className="">
                            <label htmlFor="date-end" className="">
                                End Date:
                            </label>
                            <input type="date" id="date-end" name="date-end" className="" min={moment().format("YYYY-MM-DD")} />
                        </div>
                        {/* //=== End Time ==== // */}
                        <div className="">
                            <label htmlFor="time-end" className="">
                                End Time:
                            </label>
                            <input type="time" id="time-end" name="time-end" className="" min={moment().format("hh:mm")} />
                        </div>
                        <br />
                        <button type="submit" className="">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default NewEvent;
