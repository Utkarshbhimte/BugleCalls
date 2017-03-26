import React from 'react';

const Header = () => {
    return (
        <header>
            <h3>[ BugleCalls ]</h3>
            <input type="checkbox" id="trigger"/>
            <label htmlFor="trigger" className="hamburger">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </label>
        </header>
    )
};


export default Header;
