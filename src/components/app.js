import React, {
    Component,
    PropTypes,
} from 'react';
import Header from "./header"
import Card from "./card"

class App extends Component {
    render() {
        return (
            <div className="contain-all">
                <Header />
                <div className="content-wrap">
                    <div className="container">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
