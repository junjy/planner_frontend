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

    addCalEvent = (addInfo) => {
        console.log(addInfo);

    }


    updateCalEvent = (changeInfo) => {
        console.log(changeInfo);

    }

    removeCalEvent = (removeInfo) => {
        console.log(removeInfo.event.extendedProps);
        let id = removeInfo.event.extendedProps._id;
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
    handleShow2 = (clickinfo) => {
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
        this.setState({title: e.target.value})
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


        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar
    
        calendarApi.unselect() // clear date selection
    
        if (title) {
            calendarApi.addEvent({
                // id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }
    
    handleEventClick = (clickInfo) => {
        console.log(clickInfo); //event info

        const id = clickInfo.event.extendedProps._id;

        const filterEvent = this.state.list.find(event => event._id == id)
        console.log(filterEvent);

        this.setState ({
            displayEvent: {
                title: filterEvent.title,
                category: filterEvent.category,
                start: filterEvent.start,
                end: filterEvent.end,
            }
        })

        this.handleShow2();


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
                                <Form.Control type="text" onChange={this.handleChange} value={this.state.name} placeholder="name input"/>

                                <Form.Label>Category: </Form.Label>
                                <Form.Control type="text" onChange={this.handleChange} value={this.state.category} placeholder="category input"/>      
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                            Close
                            </Button>
                            <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
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
                            <p>Title: {this.state.displayEvent.title}</p>
                            <p>Category: {this.state.displayEvent.category}</p>
                            <p>Start: {this.state.displayEvent.start}</p> 
                            <p>End: {this.state.displayEvent.end}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose2}>
                            Close
                            </Button>
                            <Button variant="primary" onClick={this.handleClose2}>
                            Save Changes
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
