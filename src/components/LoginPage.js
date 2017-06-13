import React, {
    Component
} from 'react';
import FontAwesome from "react-fontawesome";
import { Link } from 'react-router'
import base from '../base'

class LoginPage extends Component {
    constructor(){
        super();

        this.state = {};
    }

    componentDidMount() {
        base.onAuth((user) => {
            if(user) {
                this.authHandler(null, { user });
            }
        });
    }


    authenticate(provider) {
        console.log(`Trying to log in with ${provider}`);
        base.authWithOAuthPopup(provider, this.authHandler);
    }

    logout() {
        base.unauth();
        this.setState({ uid: null });
    }

    authHandler(err, authData)  {
        console.log(authData.user.providerData[0]);
        const userData = authData.user.providerData[0];

        localStorage.setItem('userData', JSON.stringify(userData));

        this.setState({...userData});
        if (err) {
            console.error(err);
            return;
        }

        // // grab the store info
        // const storeRef = base.database().ref(this.props.storeId);
        //
        // // query the firebase once for the store data
        // storeRef.once('value', (snapshot) => {
        //     const data = snapshot.val() || {};
        //
        //     // claim it as our own if there is no owner already
        //     if(!data.owner) {
        //         storeRef.set({
        //             owner: authData.user.uid
        //         });
        //     }
        //
        //     this.setState({
        //         uid: authData.user.uid,
        //         owner: data.owner || authData.user.uid
        //     });
        // });

    }

    render() {
        return (
            <div className="contain-all login-page">
                <div className="logo-wrap" ></div>
                <div className="container">
                    <h2>BugleCalls</h2>
                    <h4>Get notified about upcoming events near you</h4>
                </div>
                { !this.state.uid &&
                    <a onClick={() => this.authenticate('facebook')} className="button button-primary button-facebook"><FontAwesome name="facebook"/> Login via Facebook</a>
                }
                { this.state.uid &&
                    <a href="/">Go to HomePage</a>
                }
            </div>
        );
    }
}

LoginPage.propTypes = {};
LoginPage.defaultProps = {};

export default LoginPage;
