import React from 'react';
import {
    Link
} from "react-router-dom";

export const Navbar = () => {
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