// let's go!
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match} from 'react-router';

import './css/style.css';
import App from './components/app';
import AddEventForm from './components/AddEventForm'
import EventPage from './components/EventPage'

// const repo = `/${window.location.pathname.split('/')[1]}`;

const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Match exactly pattern="/" component={App} />
                <Match exactly pattern="/add" component={AddEventForm} />
                <Match exactly pattern="/event/:eventId" component={EventPage} />
            </div>
        </BrowserRouter>
    )
}

render(<Root/>, document.querySelector('#main'));
