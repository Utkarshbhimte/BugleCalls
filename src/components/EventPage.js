import React, {Component} from "react";
import FontAwesome from "react-fontawesome";
import RMoment from "react-moment";
import SampleData from "../data";

class EventPage extends Component {
    constructor() {
        super();

        this.state = {
            event: {},
        }
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
                                {
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
                                    😄 <br/> 23 going
                                </div>
                                <div className="stat">
                                    🤔 <br/> 2 interested
                                </div>
                            </div>

                            <div className="form-button">
                                <a href={event.formLink} className="button button-primary" target="_blank">Take me to the Form</a>
                            </div>

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
