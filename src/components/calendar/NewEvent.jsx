import React from 'react'
import moment from 'moment'
import plannerAPI from '../../services/api'
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css";

class NewEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {
                title: '',
                category: '',
                start: new Date().setMinutes(0),
                end: new Date().setMinutes(0),
            },
            // startTemp: '',
            // endTemp: '',
            formMsg: [],
            // text: "create new event form loaded",
        };
    }

    convertDateTime(input) {
        // console.log(input);
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
        // let temp = this.convertDateTime(e);
        this.setState({
            event: {...this.state.event, start: this.convertDateTime(e)} //... copies current state of events
        })
        // this.setState({
        //     event: {...this.state.event, start: e} //... copies current state of events
        // })
    }

    handleEndInputChange(e) {
        console.log(e);
        // let temp = this.convertDateTime(e);
        this.setState({
            event: {...this.state.event, end: this.convertDateTime(e)} 
        })
        // this.setState({
        //     event: {...this.state.event, end: e} 
        // })
    }

    // invalid date & can't select timepicker. To check
    handleFormSubmit(e) {
        e.preventDefault();

        // // convert
        // let startTemp = this.convertDateTime(this.state.event.start);
        // let endTemp = this.convertDateTime(this.state.event.end);       

        console.log(this.state.event.end);
        console.log(this.state.event.start);        
        if (this.state.event.end < this.state.event.start) {
            console.log("Error: end date is earlier than start");
        } else {
            console.log("no issue");
        }
        // clear form messages
        this.setState({
            formMsg: [],
            // event: {
            //     title: this.state.event.title,
            //     category: this.state.event.category,
            //     start: this.convertDateTime(this.state.event.start),
            //     end: this.convertDateTime(this.state.event.end),
            // }
        })

        console.log('frontend formData');
        const formData = this.state.event;
        console.log(formData);

        // validate form
        const formValid = this.validateFormInputs()

        if (formValid) {
            // send form submission to backend via API
            plannerAPI.createEvent(formData)
                .then(response => {
                    if (!response.data) {
                        console.log("error in form");
                    }
                    console.log(response.data);
                    console.log("new event created");
                    // clear form input
                    this.setState({
                        event: {
                            title: '',
                            category: '',
                            start: '',
                            end: '',
                        },
                    })
                    // console.log(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    validateFormInputs() {
        const err = []

        if (this.state.title === "") {
            err.push('Title must not be empty')
        }
        if (this.state.category === "") {
            err.push('Category must not be empty')
        }
        if (this.state.start === "") {
            err.push('Start must not be empty')
        }
        if (this.state.end === "") {
            err.push('End must not be empty')
        }
        if (this.state.event.end < this.state.event.start) {
            err.push("End date should be later than start date");
        }

        if (err.length === 0) {
            return true
        }
        this.setState({
            formMsg: err
        })

        return false;
    }

    render() {
        return(
            <div className="form-new-event">
                <div className="container">
                    <h1>My Calendar - Create New Event</h1>
                    {/* <p>Text: {this.state.text}</p> */}

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
                                <option value="Exercise">Exercise</option>
                            </select>
                        </div>
                        {/* //=== CalendarID ==== // */}
                        {/* <div className="">
                            <label htmlFor="calendarId" className="">
                                CalendarID:
                            </label>
                            <input type="text" className="" id="calendarId" name="calendarId" value={this.state.event.calendarId} placeholder="" required />
                        </div> */}
                        {/* //=== Start Date/Time Picker ==== // */}
                        <div className="">
                            <label htmlFor="start" className="">
                                Start Date/Time:
                            </label>
                            <Datetime 
                                // initialViewDate
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
                                // initialViewDate
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
                </div>
            </div>
        )
    }
}

export default NewEvent;
