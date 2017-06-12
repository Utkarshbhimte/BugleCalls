import React, {
    Component,
    PropTypes,
} from 'react';
import Header from "./header"
import Card from "./card"

import SampleData from '../data.js'

class App extends Component {
    constructor(){
        super();

        this.state = {
            events: SampleData.events
        }
    }
    render() {
        return (
            <div className="contain-all">
                <Header />
                <div className="content-wrap">
                    <div className="container">
                        {
                            this.state.events.map((event, index) => {
                               return <Card key={index} data={event}/>;
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
