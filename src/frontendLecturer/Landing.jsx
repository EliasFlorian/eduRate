import React from 'react';
import './Lecturer.css';
import logoweiss from '../images/logoweiss.png';
import { Button } from 'react-bootstrap';
import LectureTable from './LectureTable';
import Lectureform from './Lectureform';
import { useState } from 'react';
import Logout from './Logout';
import NavBar from './NavBar';

function Landing() {
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
        <NavBar />
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

        </div>
        
   )
}


export default Landing;