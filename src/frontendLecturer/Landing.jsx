import React from 'react';
import './Lecturer.css';
import logoweiss from '../images/logoweiss.png';
import { Button, Table } from 'react-bootstrap';
import LectureTable from './LectureTable';

function Landing() {
    return(
        <div className="rootpage">
        <div className="landing-page">
        {/* Navigation Bar */}
        <nav className="nav-bar">
        <img src={logoweiss} class='logoweiss' alt="OEHLogo" />
        </nav>
        </div>
        <Button className ="new-entry">Neuen Vortrag anlegen</Button>

        <h1>Meine Vorträge</h1>

        <LectureTable></LectureTable>
        
        </div>
        
   )
}


export default Landing;