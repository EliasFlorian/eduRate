import React from "react";
import './Lecturer.css';
import logoweiss from '../images/logoweiss.png';
import { Table } from 'react-bootstrap';
import Logout from "./Logout";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Feedbackview () {
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState(null);
  const { lectureID } = useParams();
  let navigate = useNavigate();
  const handleBack = () => {
    navigate('/eduRate/landing');
};
 
  const categories = [
    { label: "Ich habe viel Neues erfahren.", key: "rating1" },
    { label: "Die Inhalte wurden verständlich vermittelt.", key: "rating2" },
    { label: "Der/die Vortragende wirkt kompetent.", key: "rating3" },
    { label: "Ich weiß jetzt, wie ich mein Wunschstudium finde.", key: "rating4" },
    { label: "Die Präsentationsfolien waren ansprechend gestaltet.", key: "rating5" }
  ];


  const calculateAverages = () => {
    if (feedback.length === 0) return null;
    const totals = { rating1: 0, rating2: 0, rating3: 0, rating4: 0, rating5: 0 };
    feedback.forEach(item => {
      totals.rating1 += item.rating1;
      totals.rating2 += item.rating2;
      totals.rating3 += item.rating3;
      totals.rating4 += item.rating4;
      totals.rating5 += item.rating5;
    });

    return {
      rating1: (totals.rating1 / feedback.length).toFixed(1), //1 Dezimalstelle
      rating2: (totals.rating2 / feedback.length).toFixed(1),
      rating3: (totals.rating3 / feedback.length).toFixed(1),
      rating4: (totals.rating4 / feedback.length).toFixed(1),
      rating5: (totals.rating5 / feedback.length).toFixed(1),
    };
  };

  const averages = calculateAverages();

 
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(`http://localhost:3000/feedback?id=${lectureID}`);
        if (!response.ok) {
          throw new Error(`Error! Status: ${response.status}`);
        }
        const feedback = await response.json();
        setFeedback(feedback);
        console.log("Fetched Feedback:", feedback);
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
    return <div>Du hast noch keinen Vortrag eingetragen!</div>;
  }

    return (
      <div className="feedback-view">
        {/* Navigation Bar */}
        <nav className="nav-bar">
        <img src={logoweiss} className='logoweiss' alt="OEHLogo" />
        <Logout></Logout>
        </nav>
        <h3>Vortrag Nr.: {lectureID}</h3>
        <h3>Anzahl der Bewertungen: {feedback.length}</h3>
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
              <td>{averages && averages[category.key]}</td>
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
      {feedback.map((item, index) => (
      <tr key={index}>
        <td>{item.feedback}</td>
      </tr>
    ))}
        </tbody>
</Table>
<button className='logout-button' onClick={handleBack}>Zurück</button>
 </div>     
    )
}

export default Feedbackview;

