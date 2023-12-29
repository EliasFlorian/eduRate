import React from 'react';
import { Table } from 'react-bootstrap';

function LectureTable() {
    return (
      <Table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ort</th>
            <th>Datum</th>
            <th>Uhrzeit</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>HTL Wien Ottakring</td>
          <td>20.12.2023</td>
          <td>12:30-14:00</td>
          <td><button className='viewFeedback'onClick={handleFeedbackview}>Feedback ansehen</button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>AHS Wien</td>
          <td>13.12.2023</td>
          <td>14:50-16:00</td>
          <td><button className='viewFeedback'onClick={handleFeedbackview}>Feedback ansehen</button></td>
        </tr>
      </tbody>
      </Table>
    );
  }

  function handleFeedbackview() {
    window.location.href = "/eduRate/feedbackview";
  }

  export default LectureTable;