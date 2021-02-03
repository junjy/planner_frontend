import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // offers Mth & DayGrid views
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import listPlugin from '@fullcalendar/list'; // offers Lists views
import timeGridPlugin from '@fullcalendar/timegrid';
import momentPlugin from '@fullcalendar/moment'; // req for Date formatting strings
import { INITIAL_EVENTS, createEventId } from './../pages/event-utils'
import '../../css/app.css'

import Sidebar from './../pages/Sidebar'
import plannerAPI from '../../services/api'

class EventsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weekendsVisible: true,
            currentEvents: [],
            renderSidebar: <Sidebar />,
            list: [],
            // text: null,
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

    //=== FUNCTIONS ===//
    renderEventContent = (eventInfo) => {
        return (
          <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
          </>
        )
    }
    
    //=== HANDLERS === //

    handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar
    
        calendarApi.unselect() // clear date selection
    
        if (title) {
          calendarApi.addEvent({
            id: createEventId(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          })
        }
    }
    
    //*** check confirm syntax error */
    handleEventClick = (clickInfo) => {
        // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
          clickInfo.event.remove()
        // }
    }
    
    handleEvents = (events) => {
        this.setState({
          currentEvents: events
        })
    }

    handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr);
    }


    render() {

        return(
            <div className="demo-app">
                {this.state.renderSidebar}
                <div className='demo-app-main'>
                    <h1>My Calendar</h1>
                    <p></p>
                    <FullCalendar
                        plugins={[ dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin, momentPlugin ]}
                        timeZone='UTC'
                        dateClick={this.handleDateClick}
                        initialView="dayGridMonth"
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
                        navLinks={true}
                        editable={true}
                        selectable={false}
                        selectMirror={false}
                        dayMaxEvents={true}
                        weekNumbers={true} // display in Month/DayGrid & top-left corner of TimeGrid views
                        weekends={this.state.weekendsVisible}
                        businessHours={[ // specify an array instead
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
                        // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                        // events={[
                        //     { title: 'event 1', date: '2021-02-02' },
                        //     { title: 'event 2', date: '2021-02-04' }
                        // ]}
                        events={this.state.list}
                        select={this.handleDateSelect}
                        eventContent={this.renderEventContent} // custom render function
                        eventClick={this.handleEventClick}
                        eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                        /* you can update a remote database when these fire:
                        eventAdd={function(){}}
                        eventChange={function(){}}
                        eventRemove={function(){}}
                        */
                    />

                
                </div>

            </div>
        )
    }

    
}

export default EventsList;
