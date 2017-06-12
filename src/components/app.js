import React, {Component} from "react";
import RMoment from "react-moment";
import Moment from "moment";
import FontAwesome from "react-fontawesome";

import Header from "./header";
import Card from "./card";
import SampleData from "../data.js";

class App extends Component {
    constructor() {
        super();

        let events = {};

        SampleData.events.forEach((event, index) => {
            console.log('event', index, Moment().calendar(Moment(event.startTime)), event.startTime);
            event.live = Moment().diff(Moment(event.startTime)) < 0;

            if (event.live) {
                events[event.startTime] = events[event.startTime] ? events[event.startTime] : [];
                events[event.startTime].push(event);
            }
        });

        this.state = {
            events: events
        }
    }

    render() {
        return (
            <div className="contain-all">
                <Header />
                <div className="content-wrap">
                    <div className="container">

                        {
                            Object.keys(this.state.events).map((date) => {
                                return <div key={date} className="day-wrap">
                                    <h5 className="time-heading"><RMoment fromNow>{date}</RMoment></h5>
                                    {
                                        this.state.events[date].map((event) => {
                                            return <Card key={event._id} data={event}/>;
                                        })
                                    }
                                </div>;
                            })
                        }

                    </div>
                </div>
                <a href="/add" className="fab-btn">
                    <FontAwesome name="plus"/>
                </a>
            </div>
        );
    }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
