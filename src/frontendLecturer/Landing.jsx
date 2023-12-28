import React from 'react';
import './Lecturer.css';
import logoweiss from '../images/logoweiss.png';
import { Button } from 'react-bootstrap';
import LectureTable from './LectureTable';

function Landing() {
    return(
        <div className="rootpage">
        <div className="landing-page">
        {/* Navigation Bar */}
        <nav className="nav-bar">
        <img src={logoweiss} class='logoweiss' alt="OEHLogo" />
        </nav>
        <button type="button" id='new-entry'onClick={handleNewEntry}>Neuen Vortrag anlegen</button>
        </div>
        <div></div>

        <h1>Meine Vorträge</h1>
        <div></div>

        <LectureTable></LectureTable>

        </div>
        
   )
}

function handleNewEntry() {
    console.log("New Entry Established")
}


export default Landing;