import React, {Component} from "react";
import FontAwesome from "react-fontawesome";
import RMoment from "react-moment";
import Moment from "moment";

class Card extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let event = this.props.data;
        event.sameDay = Moment(event.startTime).diff(Moment(event.endTime), 'days') === 0;

        return (
            <div className="card">
                <div className="event-type">
                    <div className="count-wrap">
                        <FontAwesome name="chevron-up"/>
                        <count>{this.props.count}</count>
                    </div>
                    <div className="head">
                        <span>{event.type}</span>
                        <div className="tags-wrap">
                            {   event.tags &&
                            event.tags.map((tag, index) => {
                                return <div key={index} className="tag">{tag}</div>;
                            })
                            }
                        </div>
                    </div>
                </div>
                <div className="details">
                    <h4>{event.name}</h4>
                    <small className="hunter">{event.hunter.displayName}</small>

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
                        {event.location}
                    </div>

                    <div className="btn-wrap">
                        <a href={event.formLink} target="_blank" className="btn form"></a>
                        <a href={`/event/${event._id}`} className="btn info" onClick={ () => this.props.goToEventPage(event) }></a>
                        {/*<a href="" className="btn comments"></a>*/}
                    </div>
                </div>
            </div>
        );
    }
}

Card.propTypes = {};
Card.defaultProps = {};

export default Card;
