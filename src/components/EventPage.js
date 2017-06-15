import React, {Component} from "react";
import FontAwesome from "react-fontawesome";
import RMoment from "react-moment";
import base from "../base";
import SampleData from "../data";

class EventPage extends Component {
    constructor() {
        super();

        this.state = {
            event: {},
            eventActivityData: {},
            actionStats: {sure: 0, undecided: 0, nope: 0},
            myAction: null
        };

        this.postActivity = this.postActivity.bind(this);
    }

    componentWillMount() {
        const eventId = this.props.params.eventId;
        const tempEventData = !!localStorage.getItem('tempEventData') ? JSON.parse(localStorage.getItem('tempEventData')) : false;

        if (!!tempEventData && tempEventData._id === eventId) {
            console.log('temp data matched 😊');
            this.setState({event: SampleData.events[0]});
        } else {
            console.warn('no temp data.😱 fetching...')
        }
    }

    componentDidMount() {
        const computeActivityData = () => this.computeActivityData();
        this.eventActivityRef = base.syncState(`eventActivity/${this.props.params.eventId}`, {
            context: this,
            state: 'eventActivityData',
            then(eventActivityData) {
                console.log({eventActivityData});
                computeActivityData(eventActivityData);
            }
        });


        // if (!this.state.eventActivityData) {
        //     console.log('No interaction yet on this event 😐');
        //     const eventActivityData = {};
        //     this.setState({eventActivityData});
        // }
    }

    computeActivityData = () => {
        console.log('computing activity data');

        const eventActivityData = {...this.state.eventActivityData};
        let actionStats = {sure: 0, undecided: 0, nope: 0};
        const userId = JSON.parse(localStorage.getItem('userData')).uid;

        const myAction = eventActivityData[userId];

        Object.keys(eventActivityData).forEach((uid) => {
            actionStats[eventActivityData[uid]]++;
        });

        console.log('computing result:',{actionStats, myAction});
        this.setState({actionStats, myAction})
    };

    postActivity = (event) => {
        const myAction = event.target.value;
        const userId = JSON.parse(localStorage.getItem('userData')).uid;
        const eventActivityData = this.state.eventActivityData;

        eventActivityData[userId] = myAction;
        this.setState({eventActivityData, myAction});

        this.computeActivityData();
        console.log('event action changes to', myAction);

    };

    componentWillUnmount() {
        base.removeBinding(this.eventActivityRef);
    }

    //TODO: create Agenda: a ul with timestamp at first then the heading
    render() {
        let event = this.state.event;
        return (
            <div className="contain-all plain-page event-page">
                <a href="/" className="fab-btn">
                    <FontAwesome name="chevron-left"/>
                </a>
                {   this.state.event &&
                <div className="event-wrap">
                    <div className="header">
                        <div className="container">
                            <h2>{event.name}</h2>
                            <small className="organizer">{event.organizer}</small>
                            <h5>{event.type}</h5>
                            <div className="tags-wrap">
                                {   event.tags &&
                                event.tags.map((tag) => {
                                    return <span key={tag} className="tag">{tag}</span>;
                                })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="container">

                            {
                                !event.sameDay &&

                                <div className="detail-point">
                                    <FontAwesome name="calendar-o"/>
                                    <RMoment format="DD MMM HH:mm A">{event.startTime}</RMoment> - <RMoment
                                    format="DD MMM HH:mm A">{event.endTime}</RMoment>
                                </div>
                            }

                            {
                                event.sameDay &&

                                <div className="detail-point">
                                    <FontAwesome name="calendar-o"/>
                                    <RMoment format="DD MMM">{event.startTime}</RMoment> [<RMoment
                                    format="HH:mm A">{event.startTime}</RMoment> - <RMoment
                                    format="HH:mm A">{event.endTime}</RMoment>]
                                </div>
                            }

                            <div className="detail-point">
                                <FontAwesome name="map-marker"/>
                                <span>{event.location}</span>
                            </div>

                            <div className="event-stats">
                                <div className="stat">
                                    😄 <br/> {this.state.actionStats.sure} going
                                </div>
                                <div className="stat">
                                    🤔 <br/> {this.state.actionStats.undecided} interested
                                </div>
                            </div>

                            <div className="event-activity">
                                <div>You are going too, right?</div>
                                <div className="action-wrap">
                                    <input id="sure-input" name="userAction" type="radio" value="sure"
                                           checked={this.state.myAction === 'sure'}
                                           onChange={this.postActivity}/>
                                    <label htmlFor="sure-input" className="act">Sure 👍</label>
                                    <input id="undecided-input" name="userAction" type="radio" value="undecided"
                                           checked={this.state.myAction === 'undecided'}
                                           onChange={this.postActivity}/>
                                    <label htmlFor="undecided-input" className="act">Undecided 🤔</label>
                                    <input id="nope-input" name="userAction" type="radio" value="nope"
                                           checked={this.state.myAction === 'nope'}
                                           onChange={this.postActivity}/>
                                    <label htmlFor="nope-input" className="act">Nope 😕</label>
                                </div>
                            </div>

                            <div className="form-button">
                                <a href={event.formLink} className="button button-primary" target="_blank">Take me to
                                    the Form</a>
                            </div>
                            { event.agenda &&
                            <div className="agenda-wrap">
                                <h4>Agenda</h4>
                                <ul>
                                    {
                                        event.agenda.map((stage, index) => {
                                            return <li key={index}>
                                                { stage.startTime &&
                                                <RMoment format="hh:mm A">{stage.startTime}</RMoment>
                                                }
                                                <span>
                                                    {stage.topic}
                                                </span>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                            }
                            { event.desc &&
                            <p>{event.desc}</p>
                            }
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

EventPage.propTypes = {};
EventPage.defaultProps = {};

export default EventPage;
