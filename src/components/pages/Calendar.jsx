import React from 'react'

class Home extends React.Component {
    render() {
        return(
            <div className="page-home">
                <div className="container">
                    <div className="img-overlay">
                        <p>My Calendar</p>
                        <div id="calendar"></div>
                        {/* <div id="calendar" style={{height: '800px'}}></div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home