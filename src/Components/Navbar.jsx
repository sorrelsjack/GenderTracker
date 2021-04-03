import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";

export const Navbar = () => {
    const history = useHistory();

    // TODO: Fix this so it actually renders the screen it needs to...
    return (
        <div className="nav">
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/log'>Log My Gender</Link>
            <Link to='/history'>History</Link>
            <Link to='/contact'>Contact</Link>
        </div>
    )
}