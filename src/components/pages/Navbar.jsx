import React from 'react'
import '../../css/main.css'

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // user: 'Sam',
            weekendsVisible: true,
            currentEvents: [],
            showPage: '',
            // list: [],
            // msg: '',
            // dateToday: {},

        };
    }

    componentDidMount() {


    }
    

    render() {
        return(
            <div className="navbar-top">
                {/* <div class="fixed-top">
                    <div class="collapse" id="navbarToggleExternalContent">
                        <div class="bg-light p-4">
                        <h5 class="text-white h4">Collapsed content</h5>
                        <span class="text-muted">Toggleable via the navbar brand.</span>
                        </div>
                    </div>
                    <nav class="navbar navbar-light bg-light">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                    </nav>
                </div> */}
                <nav class="navbar navbar-expand-md navbar-light bg-light" >
                    <a class="navbar-brand" href="#">MY PLANNER APP</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">New Event <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">TAB</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">TAB</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                        </li>
                        </ul>
                    </div>
                </nav>
                
            </div>
        )
    }
}

export default Navbar;
