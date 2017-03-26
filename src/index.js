// let's go!
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match} from 'react-router';

import './css/style.css';
import App from './components/app';

// const repo = `/${window.location.pathname.split('/')[1]}`;

const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Match exactly pattern="/" component={App} />
            </div>
        </BrowserRouter>
    )
}

render(<Root/>, document.querySelector('#main'));
