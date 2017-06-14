import React from 'react';

const Header = (props) => {
    return (
        <header>
            <h3>[ BugleCalls ]</h3>
            <input type="checkbox" id="trigger"/>
            <label htmlFor="trigger" className="hamburger">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </label>
            <div className="side-nav">
                <label htmlFor="trigger" className="back-btn">
                    Back
                </label>
                <ul>
                <li><a href="">Home</a></li>
                <li><a href="">Bookmarked Events</a></li>
                <li><a onClick={props.logout}>Log Out</a></li>
                <li><a href="">About Us</a></li>
                </ul>
            </div>
        </header>
    )
};


export default Header;
