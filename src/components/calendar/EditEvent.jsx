import React, { useState } from 'react'
import moment from 'moment'
import plannerAPI from '../../services/api'
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css";
// import DateTimePicker from 'react-datetime-picker'

class EditEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: null,
            // startDate: '',
            // startTime: '',
            // text: null,
        };
    }ç

    componentDidMount() {
        const eventID = this.props.match.params.id;

        plannerAPI.getEvent(eventID).then((response) => {
            // console.log(response.data);

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

    // to combine with end date later
    handleStartInputChange(e) {
        console.log(e);
        this.setState({
            event: {...this.state.event, start: e} //... copies current state of events
        })
    }


    handleEndInputChange(e) {
        console.log(e);
        this.setState({
            event: {...this.state.event, end: e} 
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

    handleFormSubmit(e) {
        e.preventDefault();
        // clear form messages
        this.setState({
          formMsg: [],
        });

        const eventID = this.props.match.params.id;
        // console.log(itemID);

        const formData = this.state.event;
        console.log(formData);
        // let startDateTime = moment(this.state.startDate + this.state.startTime, 'YYYY-MM-DDLT');
        // let start = startDateTime.format('YYYY-MM-DDTHH:mm:s');
        // console.log(startDateTime);
        // console.log(start);
    
        const formValid = this.validateFormInputs();
    
        if (formValid) {
          plannerAPI
            .updateEvent(eventID, formData)
            .then((response) => {
              if (!response.data) {
                console.log("error in form");
                return;
              }
              console.log(response);
              console.log("existing event edited");
            //   this.setState({
            //     showFormMsg: true,
            //   });
            //   this.scrollToTop();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    
      validateFormInputs() {
        const errMsg = [];
    
        if (this.state.event.title === "") {
          errMsg.push("Title is required");
        }
        if (this.state.event.category === "") {
          errMsg.push("Category is required");
        } 
        if (this.state.event.start === "") {
          errMsg.push("Start is required");
        }
        if (this.state.event.end === "") {
          errMsg.push("End is required");
        }

        if (errMsg.length === 0) {
          return true;
        }
    
        this.setState({
          formMsg: errMsg,
        });
        console.log(errMsg);
        return false;
    }


    render() {
        return(
            <div className="form-new-event">
                <div className="container">
                    <h1>My Calendar - Edit Event</h1>
                    {/* <p>Text: {this.state.text}</p> */}
                    { this.state.event ? (
                        <div className="form">
                            <form onSubmit={(e) => {this.handleFormSubmit(e);}}>
                            {/* <form> */}
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
                                {/* <div className="">
                                    <label htmlFor="calendarId" className="">
                                        CalendarID:
                                    </label>
                                    <input type="text" className="" id="calendarId" name="calendarId" value={this.state.event.calendarId} onChange={(e) => {this.handleInputChange(e);}} placeholder="" required />
                                </div> */}
                                {/* //=== Start Date/Time Picker ==== // */}
                                <div className="">
                                    <label htmlFor="start" className="">
                                        Start Date/Time:
                                    </label>
                                    <Datetime 
                                        onChange={(e) => {this.handleStartInputChange(e)}}
                                        value={this.state.event.start}
                                    />
                                </div>
                                {/* //=== End Date/Time Picker ==== // */}
                                <div className="">
                                    <label htmlFor="end" className="">
                                        End Date/Time:
                                    </label>
                                    <Datetime 
                                        onChange={(e) => {this.handleEndInputChange(e)}}
                                        value={this.state.event.end}
                                    />
                                </div>
                                {/* <div className="">
                                    <label htmlFor="start" className="">
                                        Start Date/Time:
                                    </label>
                                    <input type="date" className="" id="start" name="start-date" value={this.state.startDate} onChange={(e) => {this.handleInputChange(e);}} min={moment().format("YYYY-MM-DD")} /> 
                                </div> */}
                                {/* //=== Start Date ==== // */}
                                {/* <div className="">
                                    <label htmlFor="start-date" className="">
                                        Start Date:
                                    </label>
                                    <input type="date" className="" id="start-date" name="start-date" value={this.state.startDate} onChange={(e) => {this.handleInputChange(e);}} min={moment().format("YYYY-MM-DD")} />
                                </div> */}
                                {/* //=== Start Time ==== // */}
                                {/* <div className="">
                                    <label htmlFor="start-time" className="">
                                        Start Time:
                                    </label>
                                    <input type="time" className="" id="start-time" name="start-time" value={this.state.startTime} onChange={(e) => {this.handleInputChange(e);}}  min={moment().format("hh:mm")} />
                                </div> */}
                                {/* //=== End Date ==== // */}
                                {/* Check how to display end date */}
                                {/* <div className="">
                                    <label htmlFor="end" className="">
                                        End Date:
                                    </label>
                                    <input type="date" className="" id="end" name="end"  value={this.state.event.end} onChange={(e) => {this.handleInputChange(e);}} min={moment().format("YYYY-MM-DD")} />
                                </div> */}
                                {/* //=== End Time ==== // */}
                                {/* <div className="">
                                    <label htmlFor="time-end" className="">
                                        End Time:
                                    </label>
                                    <input type="time" className="" id="time-end" name="time-end" min={moment().format("hh:mm")} />
                                </div> */}
                                <br />
                                <button type="submit" className="">
                                    Submit
                                </button>
                            </form>
                            <button type="submit" onClick={(e) => this.handleDelete(e, this.state.event._id)} className="">
                                Delete
                            </button>
                        </div>
                        ) : ( <p>No such item found.</p>
                    )}
                </div>
            </div>
        )
    }
}

export default EditEvent;
