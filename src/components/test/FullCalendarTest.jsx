import React from 'react'
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import $ from 'jquery';


class FullCalendarTest extends React.Component {

   
    componentDidMount() {

        $(document).ready(function() {

            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-09-12',
                navLinks: true, // can click day/week names to navigate views
                selectable: true,
                selectHelper: true,
                select: function(start, end) {
                    // Display the modal.
                    // You could fill in the start and end fields based on the parameters
                    $('.modal').modal('show');
        
                },
                eventClick: function(event, element) {
                    // Display the modal and set the values to the event values.
                    $('.modal').modal('show');
                    $('.modal').find('#title').val(event.title);
                    $('.modal').find('#starts-at').val(event.start);
                    $('.modal').find('#ends-at').val(event.end);
        
                },
                editable: true,
                eventLimit: true // allow "more" link when too many events
        
            });
        
            // Bind the dates to datetimepicker.
            // You should pass the options you need
            $("#starts-at, #ends-at").datetimepicker();
        
            // Whenever the user clicks on the "save" button om the dialog
            $('#save-event').on('click', function() {
                var title = $('#title').val();
                if (title) {
                    var eventData = {
                        title: title,
                        start: $('#starts-at').val(),
                        end: $('#ends-at').val()
                    };
                    $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                }
                $('#calendar').fullCalendar('unselect');
        
                // Clear modal inputs
                $('.modal').find('input').val('');
        
                // hide modal
                $('.modal').modal('hide');
            });
        });

    }

    render() {
        return(
            <div id='calendar'>
                <div id='datepicker'></div>
        
                <div class="modal fade" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title">Create new event</h4>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <label class="col-xs-4" for="title">Event title</label>
                                        <input type="text" name="title" id="title" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <label class="col-xs-4" for="starts-at">Starts at</label>
                                        <input type="text" name="starts_at" id="starts-at" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <label class="col-xs-4" for="ends-at">Ends at</label>
                                        <input type="text" name="ends_at" id="ends-at" />
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" id="save-event">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )

    }

}

export default FullCalendarTest;
