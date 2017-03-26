import React, {
    Component,
    PropTypes,
} from 'react';

class Card extends Component {
    render() {
        return (
            <div className="card">
                <span className="event-type">Hackathon</span>
                <h4>IoT Geeks - Arduino Day 2017</h4>
                <small className="organizer">Murugadoss Balasubramanian</small>
                <div className="tags-wrap">
                    <div className="tag">IoT</div>
                </div>
                <span className="time">Saturday, April 1 at 10 AM - 4 PM</span>
                <span className="location">Chennai</span>
                <div className="btn-wrap">
                    <a href="">Link to Registration Form</a>
                    <a href="">More Info</a>
                    <a href="">Comments</a>
                </div>
            </div>
        );
    }
}

Card.propTypes = {};
Card.defaultProps = {};

export default Card;
