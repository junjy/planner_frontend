import React, { useCallback, useRef } from "react";
import moment from 'moment'
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
console.log("CALENDAR TEST LOADING")



class CalendarTest extends React.Component {

    constructor(props) {
        super(props);
        this.calendarRef = React.createRef();
    }

// ---------- Instance method ---------- //

    handleClickNextButton = () => {
        const calendarInstance = this.calendarRef.current.getInstance();
  
        calendarInstance.next();
    };

    weekChangeButton = () => {
        const calendarInstance = this.calendarRef.current.getInstance();

        calendarInstance.changeView('week', true);
    }

    // ---------- Event ---------- //

    handleClickDayname = (ev) => {
        // view : week, day
        console.group('onClickDayname');
        console.log(ev.date);
        console.groupEnd();
    };

    beforeCreateSchedule = (ev) => {
        console.group('onbeforeCreateSchedule');
        console.log(ev.date);
        console.groupEnd();
        
    }

    
    

    render() {
        const selectedView = 'month'; // default view

        return(
            <div>
                <h1>My Calendar</h1>
                <>
                <button onClick={this.weekChangeButton}>Week</button>
                <Calendar
                    ref={this.calendarRef}
                    onClickDayname={this.handleClickDayname}
                    onbeforeCreateSchedule={this.beforeCreateSchedule}
                    height="900px"
                    calendars={[
                        {
                          id: '0',
                          name: 'Private',
                          bgColor: '#9e5fff',
                          borderColor: '#9e5fff'
                        },
                        {
                          id: '1',
                          name: 'Company',
                          bgColor: '#00a9ff',
                          borderColor: '#00a9ff'
                        }
                      ]}
                    disableDblClick={true}
                    disableClick={false}
                    isReadOnly={false}
                    month={{
                        startDayOfWeek: 0
                      }}
                    schedules={[
                        {
                          id: '1',
                          calendarId: '0',
                          title: 'TOAST UI Calendar Study',
                          category: 'time',
                          dueDateClass: '',
                          start: '2021-02-02T12:53:55.361+00:00',
                          end: '2021-02-02T13:53:55.361+00:00'
                        },
                        {
                          id: '2',
                          calendarId: '0',
                          title: 'Practice',
                          category: 'time',
                          dueDateClass: '',
                          start: '2021-02-03T15:03:01.542+00:00',
                          end: '2021-02-03T17:03:01.542+00:00',
                          isReadOnly: true
                        },
                        {
                          id: '3',
                          calendarId: '0',
                          title: 'FE Workshop',
                          category: 'allday',
                          dueDateClass: '',
                          start: '2021-02-03T09:03:01.542+00:00',
                          end: '2021-02-03T11:03:01.542+00:00',
                          isReadOnly: true
                        },
                        {
                          id: '4',
                          calendarId: '0',
                          title: 'Report',
                          category: 'time',
                          dueDateClass: '',
                          start: '2021-02-04T15:03:01.542+00:00',
                          end: '2021-02-04T15:03:01.542+00:00'
                        }
                      ]}
                    // defaultView='month'
                    scheduleView
                    taskView
                    template={{
                        milestone(schedule) {
                            return `<span style="color:#fff;background-color: ${schedule.bgColor};">${
                            schedule.title
                            }</span>`;
                        },
                        milestoneTitle() {
                            return 'Milestone';
                        },
                        allday(schedule) {
                            return `${schedule.title}<i class="fa fa-refresh"></i>`;
                        },
                        alldayTitle() {
                            return 'All Day';
                        }
                    }}
                    theme='' 
                    timezones={[
                        {
                          timezoneOffset: 540,
                          displayLabel: 'GMT+09:00',
                          tooltip: 'Seoul'
                        },
                        {
                          timezoneOffset: -420,
                          displayLabel: 'GMT-08:00',
                          tooltip: 'Los Angeles'
                        }
                    ]}
                    useDetailPopup
                    useCreationPopup
                    view={selectedView} // You can also set the `defaultView` option.
                    week={{
                        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                        showTimezoneCollapseButton: true,
                        timezonesCollapsed: true
                    }}
                    month={{
                        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                    //narrowWeekend: true
                    }}
                />
                <button onClick={this.handleClickNextButton}>Go next!</button>
            </>


            </div>

        )
    }
}

export default CalendarTest;