import React, {Component} from "react";
import {browserHistory} from "react-router";
import Moment from "moment";
import RMoment from "react-moment";
import FontAwesome from "react-fontawesome";
import * as _ from "lodash";

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
            toastMessage: null
        };

        this.goToEventPage.bind(this);
        this.logout.bind(this);
    }

    notify = (msg, link) => {
        const toastMessage = {
            msg, link: link ? link : null
        };
        this.setState({toastMessage});

        setTimeout(() => {
            this.setState({toastMessage: null});
        }, 2000);

    };

    componentWillMount() {
        const userData = !!localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
        const cachedEventData = !!localStorage.getItem('eventData') ? JSON.parse(localStorage.getItem('eventData')) : {};

        if (userData) {
            console.log({userData});
            this.setState({userData});
        } else {
            this.context.history.push(`/login`);
        }

        this.organizeEventData(cachedEventData);

        this.ref = base.listenTo(`/events`, {
            context: this,
            state: 'eventsData',
            asArray: true,
            then: (data) => {
                console.log('fetched data 🤖', {data: data.length, events: cachedEventData.length});

                if (cachedEventData.length !== data.length) {
                    localStorage.setItem('eventData', JSON.stringify(data));
                    this.organizeEventData(data);
                    this.notify('We just received new events 🎉');
                }
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

    componentDidMount() {
        const computeActivityData = () => this.computeActivityData();

        this.eventActivityRef = base.syncState(`eventActivity/`, {
            context: this,
            state: 'eventActivityData',
            then(eventActivityData) {
                console.log('fetched eventActivityData 🤖', this.state.eventActivityData);
                computeActivityData(eventActivityData);
            }
        });

    }


    computeActivityData = () => {
        console.log('computing activity data');

        const eventActivityData = {...this.state.eventActivityData};
        let myActivity = {};
        let eventInteractionData = {};

        Object.keys(eventActivityData).forEach( (eventId) => {
            const interactionData = eventActivityData[eventId];
            let actionStats = {sure: 0, undecided: 0, nope: 0, count: 0};
            const userId = JSON.parse(localStorage.getItem('userData')).uid;

            const myAction = interactionData[userId];
            myActivity[eventId] = myAction;

            _.valuesIn(interactionData).forEach( (act) => {
                actionStats[act]++;
            });

            eventInteractionData[eventId] = actionStats;
            // interactionData.forEach((uid) => {
            //     actionStats[eventActivityData[uid]]++;
            // });

            actionStats.count = actionStats.sure + actionStats.undecided;

            console.log('computing result:',{actionStats});
        });

        this.setState({myActivity, eventInteractionData})
    };


    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    organizeEventData = (fetchedData) => {
        let events = {};
        const rawEventsData = !!fetchedData ? fetchedData : this.state.eventsData;

        if (rawEventsData.length > 0) {
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
                                            return <Card key={i} data={event} count={(this.state.eventInteractionData && this.state.eventInteractionData[event._id]) ? this.state.eventInteractionData[event._id].count : 0}
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
                <toast
                    className={`${this.state.toastMessage ? 'active' : ''}`}>{this.state.toastMessage ? this.state.toastMessage.msg : ''}</toast>
            </div>
        );
    }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
