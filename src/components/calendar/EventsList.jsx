import React from 'react'
import plannerAPI from '../../services/api'

class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            // text: null,
        }
    }

    componentDidMount() {

        plannerAPI.listEvents().then((response) => {
            // console.log(response.data.events);

            this.setState({
                events: response.data.events,
                // text: "calendar component mounted at 3pm"
            });
        }).catch(err => {
            console.log(err)
        })

    }


    render() {
        return(
            <div className="page-events">
                <div className="container">
                    <h1>My Calendar: All Events</h1>
                    {/* <p>Text: { this.state.text }</p> */}
                    { 
                        this.state.events.length > 0 ? (
                            this.state.events.map(element => {
                                return (
                                    <div className="events-display">
                                        <p><strong>Title: {element.title}</strong></p>
                                        <p>Start: {element.start}</p>
                                        <p>End: {element.end}</p>
                                        <br />
                                    </div>
                                )
                            })
                        ) : ''
                    }
                </div>
            </div>
        )
    }
}

export default Events;