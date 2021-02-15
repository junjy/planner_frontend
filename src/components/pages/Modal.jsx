import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import axios from 'axios';
// import "../main.scss";

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";


class TestModal2 extends React.Component {
    state = {
      modal: false,
      event: {
        title: "",
        start: new Date()
      }
    };
  
    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };
  
    handleEventClick = ({ event, el }) => {
      this.toggle();
      this.setState({ event });
    };
  
    render() {
      return (
        <div id="calendar" className="container" ref="calendar">
          <FullCalendar
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth, listWeek"
            }}
            selectable={true}
            plugins={[interactionPlugin, dayGridPlugin, dayGridPlugin, bootstrapPlugin]}
            themeSystem="bootstrap"
            weekends={false}
            displayEventTime={true}
            timeZone="UTC"
            events={[
              { title: "event 1", date: "2019-05-01" },
              { title: "event 2", date: "2019-05-02" }
            ]}
            eventRender={this.handleEventRender}
            eventClick={this.handleEventClick}
          />
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>
              {this.state.event.title}
            </ModalHeader>
            <ModalBody>
              <div>
                <p>{this.state.event.start.toISOString()}</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Do Something</Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
  }
  

export default TestModal2;