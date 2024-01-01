import React from "react";
import './Lecturer.css';
import logoweiss from '../images/logoweiss.png';
import { Table } from 'react-bootstrap';
import Logout from "./Logout";


function Feedbackview () {
    return (
      <div className="feedback-view">
        {/* Navigation Bar */}
        <nav className="nav-bar">
        <img src={logoweiss} className='logoweiss' alt="OEHLogo" />
        <Logout></Logout>
        </nav>
        <Table className='table'>
      <thead className="tablehead">
        <tr>
          <th>Ratingkategorie</th>
          <th>Rating Durchschnitt</th>
        </tr>
      </thead>
      <tbody className="tableview">
        <tr><th>Ich habe viel Neues erfahren.</th>
        <th>4,6</th></tr>

        <tr><th>Die Inhalte wurden verständlich vermittelt.</th>
        <th>4,6</th></tr>

        <tr><th>Der/die Vortragende wirkt kompetent.</th>
        <th>4,6</th></tr>

        <tr><th>Ich weiß jetzt, wie ich mein Wunschstudium finde.</th>
        <th>4,6</th></tr>

        <tr><th>Die Präsentationsfolien waren ansprechend gestaltet.</th>
        <th>4,6</th></tr>
      </tbody>
    </Table>

    <Table className="table">
    <thead className="tablehead">
        <tr>
          <th>Feedback</th>
        </tr>
      </thead>
      <tbody className="tableview">
        <tr><th>War super!</th></tr>
        </tbody>
</Table>
 </div>     
    )
}

export default Feedbackview;

