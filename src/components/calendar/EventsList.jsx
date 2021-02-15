import React from 'react'
// import $ from 'jquery'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // offers Mth & DayGrid views
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import listPlugin from '@fullcalendar/list'; // offers Lists views
import timeGridPlugin from '@fullcalendar/timegrid';
import momentPlugin from '@fullcalendar/moment'; // req for Date formatting strings
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form} from "react-bootstrap";
import moment from 'moment'
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css";
// import '../../css/fullcalendar.css'
// import '../../css/modal.css'

// import the third-party stylesheets directly from your JS
// import 'bootstrap/dist/css/bootstrap.css';
// import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!
// import bootstrapPlugin from '@fullcalendar/bootstrap';

// import Sidebar from '../pages/Sidebar'
// import EditEvent from './../calendar/EditEvent'
import plannerAPI from '../../services/api'
import '../../css/main.css'
import { filterEventStoreDefs } from '@fullcalendar/core';

class EventsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weekendsVisible: true,
            currentEvents: [],
            // renderSidebar: <Sidebar />,
            list: [],
            // text: null,
            show: false,
            show2: false,
            displayEvent: {
                id: '',
                title: '',
                category: '',
                start: '',
                end: '',
            },
            addEvent: {
                title: '',
                category: '',
                start: '',
                end: '',
            }

        };

    }
    componentDidMount() {

        plannerAPI.listEvents().then((response) => {
            // console.log(response.data.events);

            this.setState({
                list: response.data.events,
                // text: "calendar component mounted at 3pm"
            });
        }).catch(err => {
            console.log(err)
        })

    }

    //=== GENERAL FUNCTIONS ====


    //=== GENERAL HANDLERS - BACKEND DB ====

    addCalEvent = (e) => {
        e.preventDefault();

        console.log(e);

        const formData = this.state.addEvent;
        console.log(formData);

        // validate form
        // const formValid = this.validateFormInputs()
        const formValid = true;

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
                        addEvent: {
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


    updateCalEvent = (e) => {
        e.preventDefault();

        let id = this.state.displayEvent.id;
        console.log(id);

        const formData = this.state.displayEvent;
        console.log('frontend formData:')
        console.log(formData);
    
        // const formValid = this.validateFormInputs();
        // add form validation later
        const formValid = true;
    
        if (formValid) {
          plannerAPI
            .updateEvent(id, formData)
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

    removeCalEvent = () => {

        let id = this.state.displayEvent.id;
        console.log(id);

        // to update
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

    convertDateTime(input) {
        let temp = moment(input).toISOString();
        // console.log(temp);
        return temp;
    }


    // to combine with end date later
    handleStartInputChange(e) {
        console.log(e);
        this.setState({
            event: {...this.state.displayEvent, start: this.convertDateTime(e)} //... copies current state of events
        })
    }

    handleEndInputChange(e) {
        console.log(e);
        this.setState({
            event: {...this.state.displayEvent, end: this.convertDateTime(e)} 
        })
    }


    handleInputChange(e) {
        const { event } = this.state; //destructure
        event[e.target.name] = e.target.value;
        this.setState({ event });
    }


    //=== CALENDAR FUNCTIONS - FRONTEND ONLY ===//


    renderEventContent = (eventInfo) => {
        return (
            <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
            </>
        )
    }
    
    //=== CALENDAR HANDLERS - FRONTEND ONLY === //

    // For modal
    handleShow = () => {
        this.setState({
            show: true,
        })
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
    }

    // For modal2
    handleShow2 = () => {
        console.log();
        this.setState({
            show2: true,
        })
    }

    handleClose2 = () => {
        this.setState({
            show2: false,
        })
    }

    handleChange = (e) => {

        const { addEvent } = this.state; //destructure
        addEvent[e.target.name] = e.target.value;
        this.setState({ addEvent });
    }
    
    handleChange2 = (e) => {
        // this.setState({
        //     title: e.target.value
        // })

        const { displayEvent } = this.state; //destructure
        displayEvent[e.target.name] = e.target.value;
        this.setState({ displayEvent });
    }
    
    // For dateClick:
    handleDateClick = (arg) => { // bind with an arrow function
        // alert(arg.dateStr);
        // console.log(arg.date);
        console.log(arg);
    }

    // For select:
    handleDateSelect = (selectInfo) => {
        console.log(selectInfo);

        this.handleShow();

        // let title = prompt('Please enter a new title for your event')
        // let calendarApi = selectInfo.view.calendar
    
        // calendarApi.unselect() // clear date selection
    
        // if (title) {
        //     calendarApi.addEvent({
        //         // id: createEventId(),
        //         title,
        //         start: selectInfo.startStr,
        //         end: selectInfo.endStr,
        //         allDay: selectInfo.allDay
        //     })
        // }
    }
    
    handleEventClick = (clickInfo) => {
        console.log(clickInfo); //event info

        const id = clickInfo.event.extendedProps._id;

        const filterEvent = this.state.list.find(event => event._id === id)
        console.log(filterEvent);

        this.setState ({
            displayEvent: {
                id: id,
                title: filterEvent.title,
                category: filterEvent.category,
                start: filterEvent.start,
                end: filterEvent.end,
            }
        })

        this.handleShow2();

        // clear form input


        // if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        //   clickInfo.event.remove()
        // }
    }
    

    // handleEventClick = (eventInfo) => {
    //     return (
    //         <>
    //         <b>{eventInfo.timeText}</b>
    //         <i>{eventInfo.event.title}</i>
    //         </>
    //     )
    // }
    
    handleEvents = (events) => {
        this.setState({
          currentEvents: events
        })
    }


    render() {

        return(
            <div className="demo-app calendar">
                {/* {this.state.renderSidebar} */}
                {/* <Sidebar /> */}
                {/* <EditEvent /> */}
                <div className='demo-app-main'>
                    <h1>My Calendar</h1>                    

                    <FullCalendar
                        plugins={[ dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin, momentPlugin ]}
                        /* store events here */
                        events={this.state.list}
                        /* customize calendar UI */
                        themeSystem='bootstrap'
                        initialView="dayGridMonth"
                        // height={650}
                        // aspectRatio={2}
                        displayEventTime={true}
                        headerToolbar={{
                            left: 'today prev,next',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        footerToolbar={{
                            left: 'prevYear',
                            center: '',
                            right: 'nextYear',
                        }}
                        navLinks={true} // day & week names are clickable
                        editable={true} // drag & resize events
                        selectable={true} // highlight multiple days/timeslots by clicking and dragging
                        selectMirror={false}
                        dayMaxEvents={true} // show popover if too many events in a day
                        weekNumbers={true} // display in Month/DayGrid & top-left corner of TimeGrid views
                        weekends={this.state.weekendsVisible}
                        businessHours={[ // specify array instead
                            {
                            daysOfWeek: [ 1, 2, 3, 4 ], // Mon - Thu
                            startTime: '09:00', 
                            endTime: '18:00' 
                            },
                            {
                            daysOfWeek: [ 4, 5 ], // Fri
                            startTime: '09:00', 
                            endTime: '17:00' 
                            }
                        ]}
                        views={{
                            dayGridMonth: { // name of view
                                weekday: 'long',
                                titleFormat: { 
                                    year: 'numeric', 
                                    month: 'long',
                                    // day: 'numeric' 
                                },
                            // other view-specific options here
                            },
                            timeGrid: {
                                // options apply to timeGridWeek and timeGridDay views
                                nowIndicator: true,
                            },
                            week: {
                                // options apply to dayGridWeek and timeGridWeek views
                            },
                            day: {
                                // options apply to dayGridDay and timeGridDay views
                            }

                        }}
                        // customButtons={{
                        //     addEvent: {
                        //       text: 'Add Event',
                        //       click() {
                        //         setIsModalOpen(true);
                        //       }
                        //     }
                        //   }}
                        /* event triggers */
                        dateClick={this.handleDateClick} // return clicked date to var "dateClickedInfo"
                        select={this.handleDateSelect} // return selected date range to "selectionInfo"
                        // select={this.handleShow} // new event
                        // eventClick={this.handleShow2} // existing event
                        eventClick={this.handleEventClick} // triggered when event is clicked. Returns to var "eventClickInfo" (Current remove event - to change to edit form with delete btn)
                        // // CHECK HOW TO USE?
                        eventContent={this.renderEventContent} // render custom HTML content in FullCal virtual DOM. CHECK HOW TO USE?
                        eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed, returns to var "events"
                        eventRender={this.handleEventRender}
                        /* you can update a remote database when these fire:
                        eventAdd={function(){}}
                        eventChange={function(){}}
                        eventRemove={function(){}} */
                        /***  Update in mongoDB ***/
                        eventAdd={this.addCalEvent}
                        eventChange={this.updateCalEvent}
                        eventRemove={this.removeCalEvent}

                    />
                    {/* Add Display Event Modal here */}
                    <>
                        {/* <Button variant="primary" onClick={this.handleShow}>
                        Launch demo modal
                        </Button> */}
                
                        <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create New Event</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group >
                                <Form.Label>Title: </Form.Label>
                                <Form.Control type="text" className="" id="title" name="title" onChange={this.handleChange} value={this.state.addEvent.title} placeholder="name input"/>

                                <Form.Label>Category: </Form.Label>
                                <Form.Control type="text" className="" id="category" name="category" onChange={this.handleChange} value={this.state.addEvent.category} placeholder="category input"/>   

                                <Form.Label>Start: </Form.Label>
                                <Form.Control type="text" className="" id="start" name="start" onChange={this.handleChange} value={this.state.addEvent.start} placeholder="start input"/>    

                                <Form.Label>End: </Form.Label>
                                <Form.Control type="text" className="" id="end" name="end" onChange={this.handleChange} value={this.state.addEvent.end} placeholder="end input"/>    
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                            Close
                            </Button>
                            <Button variant="primary" onClick={(e) => {this.addCalEvent(e);}}>
                            Submit
                            </Button>
                        </Modal.Footer>
                        </Modal>
                    </>

                    {/* Add Edit Event Modal here */}
                    <>
                        {/* <Button variant="primary" onClick={this.handleShow}>
                        Launch demo modal
                        </Button> */}
                
                        <Modal show={this.state.show2} onHide={this.handleClose2}>
                        <Modal.Header closeButton>
                            <Modal.Title>Display Event Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                        <Form.Group >
                            <Form.Label>Title: </Form.Label>
                            <Form.Control type="text" className="" id="title" name="title"  onChange={this.handleChange2} value={this.state.displayEvent.title} placeholder="name input"/>

                            <Form.Label>Category: </Form.Label>
                            <Form.Control type="text" className="" id="category" name="category" onChange={this.handleChange2} value={this.state.displayEvent.category} placeholder="category input"/>   

                            <Form.Label>Start: </Form.Label>
                            <Form.Control type="text" className="" id="start" name="start" onChange={this.handleChange2} value={this.state.displayEvent.start} placeholder="start input"/>    

                            <Form.Label>End: </Form.Label>
                            <Form.Control type="text" className="" id="end" name="end" onChange={this.handleChange2} value={this.state.displayEvent.end} placeholder="end input"/>    
                        </Form.Group>
                            {/* <p>Title: {this.state.displayEvent.title}</p>
                            <p>Category: {this.state.displayEvent.category}</p>
                            <p>Start: {this.state.displayEvent.start}</p> 
                            <p>End: {this.state.displayEvent.end}</p> */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose2}>
                            Close
                            </Button>
                            <Button variant="primary" onClick={(e) => {this.updateCalEvent(e);}}>
                            Edit Event
                            </Button>
                            <Button variant="danger" onClick={this.removeCalEvent}>
                            Delete Event
                            </Button>
                        </Modal.Footer>
                        </Modal>
                    </>

                </div>
    
            </div>
        )
    }
}

export default EventsList;
