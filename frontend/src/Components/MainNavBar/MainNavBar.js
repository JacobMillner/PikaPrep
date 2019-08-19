import React from 'react';
import { Link } from 'react-router-dom';
import './MainNavBar.css';


function MainNavBar() {
    return (
        <nav>
            <ul className="menu">
                <li className="logo"><Link to="/">Pika Prep</Link></li>
                <li className="item button"><Link to="/">Log In</Link></li>
                <li className="item button secondary"><Link to="/">Sign Up</Link></li>
                <li className="toggle"><Link to="/"><i className="fas fa-bars"></i></Link></li>
            </ul>
        </nav>
    );
}

export default MainNavBar;