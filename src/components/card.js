import React, {
    Component,
    PropTypes,
} from 'react';
import FontAwesome from 'react-fontawesome';

class Card extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let event = this.props.data;
        console.log(this.props.data);
        return (
            <div className="card">
                <span className="event-type">{event.type}</span>
                <div className="details">
                    <h4>{event.name}</h4>
                    <div className="tags-wrap">
                        {
                            event.tags.map( (tag, index) => {
                             return <div key={index} className="tag">{tag}</div>;
                            })
                        }
                    </div>
                    <small className="organizer">{event.organizer}</small>
                    <span className="time">{event.startTime}</span>
                    <span className="time">{event.endTime}</span>
                    <span className="location">{event.location}</span>
                    <div className="btn-wrap">
                        <a href="" className="btn info"></a>
                        <a href="" className="btn form"></a>
                        <a href="" className="btn comments"></a>
                    </div>
                </div>
            </div>
        );
    }
}

Card.propTypes = {};
Card.defaultProps = {};

export default Card;
