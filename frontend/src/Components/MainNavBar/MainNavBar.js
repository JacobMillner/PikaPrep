import React from 'react';
import { Link } from 'react-router-dom';
import './MainNavBar.css';


function MainNavBar() {
    return (
        <nav>
            <ul className="menu">
                <li className="logo"><Link to="/">Pika Prep</Link></li>
                <li className="item"><Link to="/users/">Users</Link></li>
                <li className="item button"><Link to="/login">Log In</Link></li>
                <li className="item button secondary"><Link to="/">Sign Up</Link></li>
            </ul>
        </nav>
    );
}

export default MainNavBar;