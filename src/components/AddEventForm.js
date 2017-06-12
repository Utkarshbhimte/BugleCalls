import React, {Component} from "react";

class AddEventForm extends Component {
    render() {
        let startTime = false;
        let endTime = false;
        return (
            <div className="form-wrap contain-all">
                <a href="/" className="back-btn">Back</a>
                <div className="container">
                    <h2>Add an Event</h2>
                    <form  ref={(input) => this.eventForm = input} >
                        <label htmlFor="">What type of Event is this?</label>
                        <div className="input-wrap">
                            <input id="event-type-1" name="eventType" type="radio" value="Hackathon"/>
                            <label htmlFor="event-type-1">Hackathon</label>
                            <input id="event-type-2" name="eventType" type="radio" value="Talk"/>
                            <label htmlFor="event-type-2">Talk</label>
                            <input id="event-type-3" name="eventType" type="radio" value="Study-Jam"/>
                            <label htmlFor="event-type-3">Study-Jam</label>
                            <input id="event-type-4" name="eventType" type="radio" value="Seminar"/>
                            <label htmlFor="event-type-4">Seminar</label>
                            <input id="event-type-5" name="eventType" type="radio" value="Full Day"/>
                            <label htmlFor="event-type-5">Full Day</label>
                        </div>
                        <input type="text" placeholder="Event Name"/>
                        <input type="text" placeholder="Event Description (optional)"/>
                        <input id="event-startTime" type="datetime-local" placeholder="Event StartTime"/>
                        <label className="time-label" htmlFor="event-startTime">
                            { !startTime &&
                               <span className="placeholder">Start Time</span>
                            }
                        </label>
                        <input id="event-endTime" type="datetime-local" placeholder="Event EndTime"/>
                        <label className="time-label" htmlFor="event-endTime">
                            { !endTime &&
                               <span className="placeholder">End Time</span>
                            }
                        </label>
                        <input type="text" placeholder="Event Location"/>
                        <input type="text" placeholder="Oragnizer"/>
                        <input type="text" placeholder="Share the form link here (if any)"/>
                        <input type="text" placeholder="Share any link for more information (if any)"/>
                        <input type="text" placeholder="Add any additional tags;seperated by commas"/>
                        <input type="submit" className="button button-primary"/>
                    </form>
                </div>
            </div>
        );
    }
}

AddEventForm.propTypes = {};
AddEventForm.defaultProps = {};

export default AddEventForm;
