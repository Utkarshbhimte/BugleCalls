import React, {Component} from "react";
import base from '../base'
import RMoment from "react-moment";

class AddEventForm extends Component {
    constructor() {
        super();

        this.state = {
            event: {},
            eventExist: false
        };
    }

    createEvent(e) {
        e.preventDefault();

        let event = this.state.event;
        console.log('grabbedData', event);

        if(event.formLink && event.formLink.indexOf("http") < 0){
            event.formLink = "https://" + event.formLink;
            console.log('http added ☺️')
        }

        const {uid, displayName} = JSON.parse(localStorage.getItem('userData'))
        const promptSuccess = () => this.promptSuccess();
        event.hunter = {uid, displayName};


        this.eventsRef = base.push('events', {
            data: {...event},
            then(err){
                if(!err){
                    console.log('Event is uploaded 🎉 🎊');
                    promptSuccess();
                }else{
                    console.error(err)
                }
            }
        });
        //available immediately, you don't have to wait for the callback to be called
        var generatedKey = this.eventsRef.key;

        base.update(`events/${generatedKey}`,{
            data: {_id: generatedKey},
            then(err){
                if(!err){
                    console.log('Event ID is also uploaded 🎉 🎊');
                }else{
                    console.error(err)
                }
            }
        });

        console.log('event', event)
    }

    promptSuccess = () => {
        console.log('reacher 👍');
        this.setState({submitSuccess: true});
    };

    handleInputChange = (Input) => {
        console.log('changedType.target', Input.target.getAttribute('name'));
        const key = Input.target.getAttribute('name');
        const value = key !== 'tags' ? Input.target.value : Input.target.value.split(',');
        const event = {
            ...this.state.event,
            [key]: value
        };
        this.setState({event});
    };

    render() {
        return (
            <div className="form-wrap plain-page contain-all">
                <a href="/" className="back-btn">Back</a>
                <div className="container">
                    <h2>Add an Event</h2>
                    {/* TODO: add tickets info and agenda thing*/}
                    <form ref={(input) => this.eventForm = input} onSubmit={(e) => this.createEvent(e)}>
                        <label htmlFor="">What type of Event is this?</label>
                        <div className="input-wrap">
                            <input id="event-type-1" name="type" type="radio" value="Hackathon"
                                   checked={this.state.event.type === 'Hackathon'}
                                   onChange={this.handleInputChange}/>
                            <label htmlFor="event-type-1">Hackathon</label>
                            <input id="event-type-2" name="type" type="radio" value="Talk"
                                   checked={this.state.event.type === 'Talk'}
                                   onChange={this.handleInputChange}/>
                            <label htmlFor="event-type-2">Talk</label>
                            <input id="event-type-3" name="type" type="radio" value="Study-Jam"
                                   checked={this.state.event.type === 'Study-Jam'}
                                   onChange={this.handleInputChange}/>
                            <label htmlFor="event-type-3">Study-Jam</label>
                            <input id="event-type-4" name="type" type="radio" value="Seminar"
                                   checked={this.state.event.type === 'Seminar'}
                                   onChange={this.handleInputChange}/>
                            <label htmlFor="event-type-4">Seminar</label>
                            <input id="event-type-5" name="type" type="radio" value="Full Day"
                                   checked={this.state.event.type === 'Full Day'}
                                   onChange={this.handleInputChange}/>
                            <label htmlFor="event-type-5">Full Day</label>
                        </div>

                        <input type="text" placeholder="Share the form link here (if any)"
                               name="formLink" onChange={this.handleInputChange}
                               value={this.state.event.formLink}/>
                        <input type="text" placeholder="Share any link for more information (if any)"
                               name="moreInfo" onChange={this.handleInputChange}
                               value={this.state.event.moreInfo}/>
                        <br/>
                        <input type="text" placeholder="Event Name"
                            name="name" onChange={this.handleInputChange}
                            value={this.state.event.name}/>
                        <input type="text" placeholder="Event Description (optional)"
                               name="desc" onChange={this.handleInputChange}
                               value={this.state.event.desc}/>
                        <input id="event-startTime" type="datetime-local" placeholder="Event StartTime"
                               name="startTime" onChange={this.handleInputChange}
                               value={this.state.event.startTime}/>
                        <label className="time-label" htmlFor="event-startTime">
                            { !this.state.event.startTime &&
                            <span className="placeholder">Start Time</span>
                            }
                            {   this.state.event.startTime &&
                                <RMoment format="DD MMMM YYYY, hh:mm A (dddd)">{this.state.event.startTime}</RMoment>
                            }
                        </label>
                        <input id="event-endTime" type="datetime-local" placeholder="Event EndTime"
                               name="endTime" onChange={this.handleInputChange}
                               value={this.state.event.endTime}/>
                        <label className="time-label" htmlFor="event-endTime">
                            { !this.state.event.endTime &&
                            <span className="placeholder">End Time</span>
                            }
                            {   this.state.event.endTime &&
                                <RMoment format="DD MMMM YYYY, hh:mm A (dddd)">{this.state.event.endTime}</RMoment>
                            }
                        </label>
                        <input type="text" placeholder="Event Location"
                               name="location" onChange={this.handleInputChange}
                               value={this.state.event.location}/>
                        <input type="text" placeholder="Oragnizer"
                               name="organizer" onChange={this.handleInputChange}
                               value={this.state.event.organizer}/>

                        <input type="text" placeholder="Add any additional tags;seperated by commas"
                               name="tags" onChange={this.handleInputChange}
                               value={this.state.event.tags}/>
                        <input type="submit" className="button button-primary"/>
                    </form>
                </div>
                <div className="complete-modal done">
                    <h3>Event Submitted</h3>
                    <h5>We</h5>
                </div>
            </div>
        );
    }
}

AddEventForm.propTypes = {};
AddEventForm.defaultProps = {};

export default AddEventForm;
