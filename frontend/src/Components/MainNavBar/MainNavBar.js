import React from 'react';
import { Link } from 'react-router-dom';

function MainNavBar() {
    return (
        <nav className="navbar navbar-dark bg-primary fixed-top">
            <Link className="navbar-brand" to="/">
                Pika Prep
            </Link>
        </nav>
    );
}

export default MainNavBar;