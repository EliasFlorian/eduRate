import React from 'react';
import './Lecturer.css';
import logoweiss from '../images/logoweiss.png';
import { Button } from 'react-bootstrap';
import LectureTable from './LectureTable';
import Lectureform from './Lectureform';
import { useState } from 'react';
import Logout from './Logout';
import { useUser } from './UseUser.jsx';


function NavBar() {

    const { user } = useUser();

    return(
        <nav className="nav-bar">
        <img src={logoweiss} className='logoweiss' alt="OEHLogo" />
        {
        user.name? <Logout /> : <div />
        }
        </nav>
    )
}

export default NavBar;