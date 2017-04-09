import React, {
    Component,
    PropTypes,
} from 'react';

import FontAwesome from 'react-fontawesome';


class Card extends Component {
    render() {
        return (
            <div className="card">
                <span className="event-type">Hackathon</span>
                <div className="details">
                    <h4>IoT Geeks - Arduino Day 2017</h4>
                    <div className="tags-wrap">
                        <div className="tag">IoT</div>
                    </div>
                    <small className="organizer">Murugadoss Balasubramanian</small>
                    <span className="time">Saturday, April 1 at 10 AM - 4 PM</span>
                    <span className="location">Chennai</span>
                    <div className="btn-wrap">
                        <a href=""><FontAwesome name='info-circle'/></a>
                        <a href=""><FontAwesome name='file'/></a>
                        <a href=""><FontAwesome name='commenting'/></a>
                    </div>
                </div>
            </div>
        );
    }
}

Card.propTypes = {};
Card.defaultProps = {};

export default Card;
