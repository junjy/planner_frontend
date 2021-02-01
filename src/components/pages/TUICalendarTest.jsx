import React, { useCallback, useRef } from "react";
import moment from 'moment'
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
console.log("CALENDAR TEST LOADING")



class TUICalendarTest extends React.Component {

    Ref = React.createRef();
    calendarInst = null;

    constructor(props) {
        super(props);
        // this.calendarRef = React.createRef();
        this.state = {
            dateRange: '',
            view: 'week',
            viewModeOptions: [
              {
                title: 'Monthly',
                value: 'month'
              },
              {
                title: 'Weekly',
                value: 'week'
              },
              {
                title: 'Daily',
                value: 'day'
              }
            ]    
        }
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

    // ---------- Event Handlers ---------- //

    handleClickDayname = (e) => {
        // view : week, day
        console.group('onClickDayname');
        console.log(e.date);
        console.groupEnd();
    };

    clickSchedule = (e) => {
        console.log('clickSchedule', e);
    };

    beforeCreateSchedule = (e) => {
        console.group('onbeforeCreateSchedule');
        console.log(e.date);
        console.groupEnd();
        
    }

    // setRenderRangeText() {
    //     const view = this.calendarInst.getViewName();
    //     const calDate = this.calendarInst.getDate();
    //     const rangeStart = this.calendarInst.getDateRangeStart();
    //     const rangeEnd = this.calendarInst.getDateRangeEnd();
    //     let year = calDate.getFullYear();
    //     let month = calDate.getMonth() + 1;
    //     let date = calDate.getDate();
    //     let dateRangeText = '';
    //     let endMonth, endDate, start, end;
  
    //     switch (view) {
    //       case 'month':
    //         dateRangeText = `${year}-${month}`;
    //         break;
    //       case 'week':
    //         year = rangeStart.getFullYear();
    //         month = rangeStart.getMonth() + 1;
    //         date = rangeStart.getDate();
    //         endMonth = rangeEnd.getMonth() + 1;
    //         endDate = rangeEnd.getDate();
  
    //         start = `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`;
    //         end = `${year}-${endMonth < 10 ? '0' : ''}${endMonth}-${
    //           endDate < 10 ? '0' : ''
    //         }${endDate}`;
    //         dateRangeText = `${start} ~ ${end}`;
    //         break;
    //       default:
    //         dateRangeText = `${year}-${month}-${date}`;
    //     }

    //   this.setState({dateRange: dateRangeText});
    // }

    render() {
        const selectedView = 'month'; // default view

        const calendarOptions = {
            // sort of option properties.
          };

        const COMMON_CUSTOM_THEME = {
            'common.border': '1px solid #ffbb3b',
            'common.backgroundColor': '#ffbb3b0f',
            'common.holiday.color': '#f54f3d',
            'common.saturday.color': '#3162ea',
            'common.dayname.color': '#333'
        };
          
        const MONTHLY_CUSTOM_THEME = {
            // month header 'dayname'
            'month.dayname.height': '42px',
            'month.dayname.borderLeft': 'none',
            'month.dayname.paddingLeft': '8px',
            'month.dayname.paddingRight': '0',
            'month.dayname.fontSize': '15px',
            'month.dayname.backgroundColor': 'inherit',
            'month.dayname.fontWeight': 'normal',
            'month.dayname.textAlign': 'left',
        
            // month day grid cell 'day'
            'month.holidayExceptThisMonth.color': '#f3acac',
            'month.dayExceptThisMonth.color': '#bbb',
            'month.weekend.backgroundColor': '#fafafa',
            'month.day.fontSize': '16px',
        
            // month schedule style
            'month.schedule.borderRadius': '5px',
            'month.schedule.height': '18px',
            'month.schedule.marginTop': '2px',
            'month.schedule.marginLeft': '10px',
            'month.schedule.marginRight': '10px',
        
            // month more view
            'month.moreView.boxShadow': 'none',
            'month.moreView.paddingBottom': '0',
            'month.moreView.border': '1px solid #9a935a',
            'month.moreView.backgroundColor': '#f9f3c6',
            'month.moreViewTitle.height': '28px',
            'month.moreViewTitle.marginBottom': '0',
            'month.moreViewTitle.backgroundColor': '#f4f4f4',
            'month.moreViewTitle.borderBottom': '1px solid #ddd',
            'month.moreViewTitle.padding': '0 10px',
            'month.moreViewList.padding': '10px'
        };

        const WEEKLY_CUSTOM_THEME = {
            // week header 'dayname'
            'week.dayname.height': '41px',
            'week.dayname.borderTop': '1px solid #ddd',
            'week.dayname.borderBottom': '1px solid #ddd',
            'week.dayname.borderLeft': '1px solid #ddd',
            'week.dayname.paddingLeft': '5px',
            'week.dayname.backgroundColor': 'inherit',
            'week.dayname.textAlign': 'left',
            'week.today.color': '#b857d8',
            'week.pastDay.color': '#999',

            // week vertical panel 'vpanel'
            'week.vpanelSplitter.border': '1px solid #ddd',
            'week.vpanelSplitter.height': '3px',

            // week daygrid 'daygrid'
            'week.daygrid.borderRight': '1px solid #ddd',
            'week.daygrid.backgroundColor': 'inherit',

            'week.daygridLeft.width': '77px',
            'week.daygridLeft.backgroundColor': '#a8def74d',
            'week.daygridLeft.paddingRight': '5px',
            'week.daygridLeft.borderRight': '1px solid #ddd',

            'week.today.backgroundColor': '#b857d81f',
            'week.weekend.backgroundColor': 'inherit',

            // week timegrid 'timegrid'
            'week.timegridLeft.width': '77px',
            'week.timegridLeft.backgroundColor': '#03a9f44d',
            'week.timegridLeft.borderRight': '1px solid #ddd',
            'week.timegridLeft.fontSize': '12px',
            'week.timegridLeftTimezoneLabel.height': '51px',
            'week.timegridLeftAdditionalTimezone.backgroundColor': '#fdfdfd',

            'week.timegridOneHour.height': '48px',
            'week.timegridHalfHour.height': '24px',
            'week.timegridHalfHour.borderBottom': '1px dotted #f9f9f9',
            'week.timegridHorizontalLine.borderBottom': '1px solid #eee',

            'week.timegrid.paddingRight': '10px',
            'week.timegrid.borderRight': '1px solid #ddd',
            'week.timegridSchedule.borderRadius': '0',
            'week.timegridSchedule.paddingLeft': '0',

            'week.currentTime.color': '#135de6',
            'week.currentTime.fontSize': '12px',
            'week.currentTime.fontWeight': 'bold',

            'week.pastTime.color': '#808080',
            'week.pastTime.fontWeight': 'normal',

            'week.futureTime.color': '#333',
            'week.futureTime.fontWeight': 'normal',

            'week.currentTimeLinePast.border': '1px solid rgba(19, 93, 230, 0.3)',
            'week.currentTimeLineBullet.backgroundColor': '#135de6',
            'week.currentTimeLineToday.border': '1px solid #135de6',
            'week.currentTimeLineFuture.border': '1px solid #135de6',

            // week creation guide style
            'week.creationGuide.color': '#135de6',
            'week.creationGuide.fontSize': '12px',
            'week.creationGuide.fontWeight': 'bold',

            // week daygrid schedule style
            'week.dayGridSchedule.borderRadius': '0',
            'week.dayGridSchedule.height': '18px',
            'week.dayGridSchedule.marginTop': '2px',
            'week.dayGridSchedule.marginLeft': '10px',
            'week.dayGridSchedule.marginRight': '10px'
        };

        const MyCalendar = () => (
            <Calendar
                ref={this.calendarRef}
                usageStatistics={false} // disable GA analytics
                height="900px"
                view={selectedView} // Or set `defaultView` option.
                // defaultView="month"
                scheduleView={true} // Can be also ['allday', 'time']
                taskView={true} // Can be also ['milestone', 'task']
                theme={MONTHLY_CUSTOM_THEME}
                // theme={COMMON_CUSTOM_THEME}
                // theme={WEEKLY_CUSTOM_THEME}
                onClickDayname={this.handleClickDayname}
                onbeforeCreateSchedule={this.beforeCreateSchedule}
                disableDblClick={true}
                disableClick={false}
                isReadOnly={false}
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
                        return `${schedule.title}<i className="fa fa-refresh"></i>`;
                    },
                    alldayTitle() {
                        return 'All Day';
                    },
                    task(schedule) {
                        return '&nbsp;&nbsp;#' + schedule.title;
                    },
                    taskTitle() {
                        return '<label><input type="checkbox" />Task</label>';
                    },
                    time(schedule) {
                        return schedule.title + ' <i className="fa fa-refresh"></i>' + schedule.start;
                    },
                    monthMoreClose() {
                        return '<span className="tui-full-calendar-icon tui-full-calendar-ic-close"></span>';
                    },
                    monthGridHeader(dayModel) {
                        var date = parseInt(dayModel.date.split('-')[2], 10);
                        var classNames = ['tui-full-calendar-weekday-grid-date '];
                  
                        if (dayModel.isToday) {
                          classNames.push('tui-full-calendar-weekday-grid-date-decorator');
                        }
                  
                        return '<span className="' + classNames.join(' ') + '">' + date + '</span>';
                    },
                    monthGridHeaderExceed(hiddenSchedules) {
                        return '<span className="weekday-grid-more-schedules">+' + hiddenSchedules + '</span>';
                    },
                    monthGridFooter() {
                        return '';
                    },
                    monthGridFooterExceed(hiddenSchedules) {
                        return '';
                    },
                    monthDayname(model) {
                        return String(model.label).toLocaleUpperCase();
                    },
                }}
                timezones={[
                    {
                        timezoneOffset: 540,
                        displayLabel: 'GMT+08:00',
                        tooltip: 'Singapore'
                    },
                    // {
                    // timezoneOffset: 540,
                    // displayLabel: 'GMT+09:00',
                    // tooltip: 'Seoul'
                    // },
                    // {
                    // timezoneOffset: -420,
                    // displayLabel: 'GMT-08:00',
                    // tooltip: 'Los Angeles'
                    // }
                ]}
                useDetailPopup
                useCreationPopup
                month={{
                    daynames: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
                    startDayOfWeek: 0,
                    narrowWeekend: true,
                    // visibleWeeksCount: 3,
                }}
                week={{
                    daynames: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
                    startDayOfWeek: 0,
                    narrowWeekend: true,
                    showTimezoneCollapseButton: true,
                    timezonesCollapsed: true
                }}
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
            />

        )

        return(
            <div className="container">
                <h1>MyCalendar</h1>
                <>
                <div id="menu">
                    <span id="menu-navi">
                        <button type="button" className="btn btn-default btn-sm move-today" data-action="move-today">Today</button>
                        <button type="button" className="btn btn-default btn-sm move-day" data-action="move-prev">
                        <i className="calendar-icon ic-arrow-line-left" data-action="move-prev"></i>
                        </button>
                        <button type="button" className="btn btn-default btn-sm move-day" data-action="move-next">
                        <i className="calendar-icon ic-arrow-line-right" data-action="move-next"></i>
                        </button>
                    </span>
                    <span id="renderRange" className="render-range">{this.state.dateRange}</span>
                </div>

                {/* <button onClick={this.weekChangeButton}>Week</button> */}
                {MyCalendar()}

                <button onClick={this.handleClickNextButton}>Go next!</button>
            </>


            </div>

        )
    }
}

export default TUICalendarTest;