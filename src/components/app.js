import React, {Component} from "react";
import RMoment from "react-moment";
import Moment from "moment";
import FontAwesome from "react-fontawesome";

import Header from "./header";
import Card from "./card";
import SampleData from "../data.js";

import base from "../base";

class App extends Component {
    constructor() {
        super();


        this.state = {
            eventsData: [],
            events: {},
            starredEvents: []
        }
    }


    componentWillMount() {
        // this runs right before the <App> is rendered
        this.ref = base.syncState(`/events`, {
            context: this,
            state: 'eventsData'
        });
        this.organizeEventData();

        const starredEvents = localStorage.getItem('starredEvents') ? JSON.parse(localStorage.getItem('starredEvents')) : [];
        this.setState({starredEvents});
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    organizeEventData = () => {
        let events = {};
        SampleData.events.forEach((event, index) => {
            console.log('event', index, Moment().calendar(Moment(event.startTime)), event.startTime);
            event.live = Moment().diff(Moment(event.startTime)) < 0;

            if (event.live) {
                events[event.startTime] = events[event.startTime] ? events[event.startTime] : [];
                events[event.startTime].push(event);
            }

        });

        this.setState({events});
    };

    toggleFav = (id) => {
        console.log(id);
        let starredEvents = this.state.starredEvents;
        const alreadyExisits = starredEvents.indexOf(id) >= 0;

        if (!alreadyExisits) {
            starredEvents.push(id);
        } else {
            // _.pull(starredEvents, id)
            starredEvents.splice(starredEvents.indexOf(id), 1);
        }

        console.log('starredEvents', starredEvents, alreadyExisits);
        localStorage.setItem('starredEvents', JSON.stringify(starredEvents));
        this.setState({starredEvents});
    };

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
                                            return <Card key={event._id} data={event}
                                                         toggleFav={this.toggleFav}
                                                         fav={this.state.starredEvents.indexOf(event._id) >= 0}/>;
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
