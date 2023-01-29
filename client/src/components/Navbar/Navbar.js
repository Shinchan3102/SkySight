import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../App.css';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className='flex flex-around Navbar-container flex-between' id='mynav'>
            <div className='heading'>
                <NavLink to={'/'} className='head'>SkySight</NavLink>
            </div>
            <div className='flex'>
                <NavLink to='/' className='button'>Home</NavLink>
                <a href='#map' className='button btn-started'>Get Started</a>
            </div>
        </div>
    )
}

export default Navbar
