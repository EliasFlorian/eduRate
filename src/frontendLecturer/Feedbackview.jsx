import React from "react";
import './Lecturer.css';
import logoweiss from '../images/logoweiss.png';
import { Table } from 'react-bootstrap';
import Logout from "./Logout";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



function Feedbackview () {
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);
  const { lectureID } = useParams();
  let navigate = useNavigate();
  const handleBack = () => {
    navigate('/eduRate/landing');
};
 

  const categories = [
    { label: "Ich habe viel Neues erfahren.", key: "rankingCategory1" },
    { label: "Die Inhalte wurden verständlich vermittelt.", key: "rankingCategory2" },
    { label: "Der/die Vortragende wirkt kompetent.", key: "rankingCategory3" },
    { label: "Ich weiß jetzt, wie ich mein Wunschstudium finde.", key: "rankingCategory4" },
    { label: "Die Präsentationsfolien waren ansprechend gestaltet.", key: "rankingCategory5" }
  ];

 
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(`http://localhost:3000/feedback?lectureID=${lectureID}`);
        if (!response.ok) {
          throw new Error(`Error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFeedback(data);
        console.log("Fetched Feedback:", data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setError(error.message);
      }
    };

    fetchFeedback();
  }, [lectureID]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!feedback) {
    return <div>Loading feedback...</div>;
  }

    return (
      <div className="feedback-view">
        {/* Navigation Bar */}
        <nav className="nav-bar">
        <img src={logoweiss} className='logoweiss' alt="OEHLogo" />
        <Logout></Logout>
        </nav>
        <h1>Vortrag Nr.: {lectureID}</h1>
        <Table className='table'>
      <thead className="tablehead">
        <tr>
          <th>Ratingkategorie</th>
          <th>Rating Durchschnitt</th>
        </tr>
      </thead>
      <tbody className="tableview">
      {categories.map(category => (
            <tr key={category.key}>
              <td>{category.label}</td>
              <td>{feedback[category.key]}</td>
            </tr>
          ))}
      </tbody>
    </Table>

    <Table className="table">
    <thead className="tablehead">
        <tr>
          <th>Feedback</th>
        </tr>
      </thead>
      <tbody className="tableview">
      <tr>
          <td>{feedback.feedback}</td>
          </tr>
        </tbody>
</Table>
<button className='logout-button' onClick={handleBack}>Zurück</button>
 </div>     
    )
}

export default Feedbackview;

