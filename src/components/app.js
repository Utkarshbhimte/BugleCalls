import React, {Component} from "react";
import {browserHistory} from "react-router";
import Moment from "moment";
import RMoment from "react-moment";
import FontAwesome from "react-fontawesome";

import Header from "./header";
import Card from "./card";

import base from "../base";

class App extends Component {
    constructor() {
        super();


        this.state = {
            userData: {},
            eventsData: [],
            events: {},
            starredEvents: [],
            toastMessage: 'We just received new Events 🎉'
        };

        this.goToEventPage.bind(this);
        this.logout.bind(this);
    }

    componentWillMount() {
        const userData = !!localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;

        if (userData) {
            console.log({userData});
            this.setState({userData});
        } else {
            this.context.history.push(`/login`);
        }

        this.ref = base.listenTo(`/events`, {
            context: this,
            state: 'eventsData',
            asArray: true,
            then: (data) => {
                console.log('fetched data 🤖', {data: data.length, events: this.state.events});
                this.organizeEventData(data);
                console.log('updated fetched data 🤖', {data: data.length, events: this.state.events});
            }
        });

        const starredEvents = localStorage.getItem('starredEvents') ? JSON.parse(localStorage.getItem('starredEvents')) : [];
        this.setState({starredEvents});

        //  Clearing temp Event Data
        localStorage.setItem('tempEventData', null);
    }

    static contextTypes = {
        history: React.PropTypes.object,
    };

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    organizeEventData = (fetchedData) => {
        let events = {};
        const rawEventsData = !!fetchedData ? fetchedData : this.state.eventsData;

        if (rawEventsData !== {}) {
            rawEventsData.forEach((event) => {
                event.live = Moment().diff(Moment(event.startTime)) < 0;

                const startTime = Moment(event.startTime).format("MM-DD-YYYY");

                if (event.live) {
                    events[startTime] = events[startTime] ? events[startTime] : [];
                    events[startTime].push(event);
                }

            });
            this.setState({events});
        }

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

    goToEventPage = (eventData) => {
        console.log('event data', eventData);
        localStorage.setItem('tempEventData', JSON.stringify(eventData));
    };

    logout = () => {
        console.warn('loggin out');
        base.unauth();
        this.setState({userData: {}});
        localStorage.setItem('userData', null);
        this.context.history.push(`/login`);
    };

    render() {
        return (
            <div className="contain-all home-page">
                <Header logout={this.logout}/>
                <div className="content-wrap">
                    <div className="container">

                        { !this.state.events &&
                        <div className="loader-wrap">
                            <span className="loader"><span className="loader-inner"></span>
                            </span>
                        </div>
                        }

                        {
                            Object.keys(this.state.events).sort().map((date) => {
                                return <div key={date} className="day-wrap">
                                    <h5 className="time-heading"><RMoment fromNow>{date}</RMoment></h5>
                                    {
                                        this.state.events[date].sort().map((event, i) => {
                                            return <Card key={i} data={event}
                                                         toggleFav={this.toggleFav}
                                                         goToEventPage={this.goToEventPage}
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
                {   this.state.toastMessage &&
                    <toast>{this.state.toastMessage}</toast>
                }
            </div>
        );
    }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
