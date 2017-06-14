import React, {Component} from "react";
import FontAwesome from "react-fontawesome";
import base from "../base";

class LoginPage extends Component {
    constructor() {
        super();

        this.state = {};

        this.authHandler.bind(this);
    }

    componentDidMount() {
        base.onAuth((user) => {
            if (user) {
                this.authHandler(null, {user});
                this.context.history.push(`/`);
            }
        });
    }


    authenticate(provider) {
        console.log(`Trying to log in with ${provider}`);
        base.authWithOAuthPopup(provider, this.authHandler);
    }

    static contextTypes = {
        history: React.PropTypes.object.isRequired,
    };

    authHandler(err, authData) {
        const user = authData.user.providerData[0];

        localStorage.setItem('userData', JSON.stringify(user));

        base.post(`users/${user.uid}`, {
            data: {...user},
            then(err){
                if (!err) {
                    console.log('user data is uploaded to the DB 👍');
                }else{
                    console.error('err1',err);
                }
            }
        });

        if (err) {
            console.error('err2',err);
            return;
        }
    }


    render() {
        return (
            <div className="contain-all login-page">
                <div className="logo-wrap"></div>
                <div className="container">
                    <h2>BugleCalls</h2>
                    <h4>Get notified about upcoming events near you</h4>
                </div>
                <a onClick={() => this.authenticate('facebook')}
                   className="button button-primary button-facebook"><FontAwesome name="facebook"/> Login via
                    Facebook</a>
            </div>
        );
    }
}

LoginPage.propTypes = {};
LoginPage.defaultProps = {};

export default LoginPage;
