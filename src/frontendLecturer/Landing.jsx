import React from 'react';
import './Lecturer.css';
import logoweiss from '../images/logoweiss.png';
import { Button } from 'react-bootstrap';
import LectureTable from './LectureTable';
import Lectureform from './Lectureform';
import { useState } from 'react';
import Logout from './Logout';
import AverageFeedback from './TotalRatings';
//import {jwt_decode} from "jwt-decode";


function Landing() {
   // const token = localStorage.getItem('token'); // or however you store your token
   // const decoded = jwt_decode(token);
   // const lecturerID = decoded.lecturerID; 


    const [showForm, setShowForm] = useState(false); // State to control form visibility

    // Toggles the visibility of the form
    function handleNewEntry() {
        setShowForm(true);
    }

    function handleFormSubmit() {
        setShowForm(false);
    }

    return(
        <div className="rootpage">
        <div className="landing-page">
        {/* Navigation Bar */}
        <nav className="nav-bar">
        <img src={logoweiss} className='logoweiss' alt="OEHLogo" />
        <Logout></Logout>
        </nav>
        {!showForm && (
                    <button type="button" id='new-entry' onClick={handleNewEntry}>Neuen Vortrag anlegen</button>
                )}
        </div>
        <div></div>

        <h1>{showForm ? "Neuer Vortrag" : "Meine Vorträge"}</h1>
        <div></div>

        {showForm ? (
                <Lectureform onFormSubmit={handleFormSubmit} />
                    ) : (
                <LectureTable />
                         )}
                <AverageFeedback lecturerID={"alex"}></AverageFeedback>

                         

        </div>
        
   )
}


export default Landing;