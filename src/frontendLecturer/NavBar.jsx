import React from 'react';
import './Lecturer.css';
import logoweiss from '../images/logoweiss.png';
import { Button } from 'react-bootstrap';
import LectureTable from './LectureTable';
import Lectureform from './Lectureform';
import { useState } from 'react';
import Logout from './Logout';
import { useUser } from './UseUser.jsx';
import LandingAdmin from '../frontendAdmin/LandingAdmin.jsx';


function NavBar() {

    const { user } = useUser();

    return(
        <nav className="nav-bar">
        <img src={logoweiss} className='logoweiss' alt="OEHLogo" />
        <div>
        <div className="button-bars">
        {user.admin? <LandingAdmin/> : <div />}
        {
        user.name? <Logout /> : <div />
        }</div>
        </div>
        </nav>
    )
}

export default NavBar;