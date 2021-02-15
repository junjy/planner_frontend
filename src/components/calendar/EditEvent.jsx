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
    }

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

    convertDateTime(input) {
        let temp = moment(input).toISOString();
        // console.log(temp);
        return temp;
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
            event: {...this.state.event, start: this.convertDateTime(e)} //... copies current state of events
        })
    }

    handleEndInputChange(e) {
        console.log(e);
        this.setState({
            event: {...this.state.event, end: this.convertDateTime(e)} 
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
        console.log('frontend formData:')
        console.log(formData);
    
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
        if (this.state.event.end < this.state.event.start) {
            errMsg.push("End date should be later than start date");
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
                                        // value={this.state.event.start}
                                        value={moment(this.state.event.start).format("DD-MMM-YYYY hh:mm A")}
                                        dateFormat="DD-MMM-YYYY"
                                        timeFormat="hh:mm A"
                                        timeConstraints={{ minutes: { step: 15 } }}
                                    />
                                </div>
                                {/* //=== End Date/Time Picker ==== // */}
                                <div className="">
                                    <label htmlFor="end" className="">
                                        End Date/Time:
                                    </label>
                                    <Datetime 
                                        onChange={(e) => {this.handleEndInputChange(e)}}
                                        // value={this.state.event.end}
                                        value={moment(this.state.event.end).format("DD-MMM-YYYY hh:mm A")}
                                        dateFormat="DD-MMM-YYYY"
                                        timeFormat="hh:mm A"
                                        timeConstraints={{ minutes: { step: 15 } }}
                                    />
                                </div>
  
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
