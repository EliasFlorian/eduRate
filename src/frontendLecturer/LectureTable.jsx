import { Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function LectureTable() {
  const [lectures, setLectures] = useState([]);
  const [error, setError] = useState(null);

  let navigate = useNavigate();
  const handleFeedbackview= (lectureID) => {
    navigate(`/eduRate/feedbackview/${lectureID}`);
  }

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await fetch('http://localhost:3000/lectureList',
        { method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }});
        if (!response.ok) {
          throw new Error(`Error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLectures(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLectures();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!lectures.length) {
    return <div>Loading lectures...</div>;
  }

 

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
        {lectures.map((lecture) => (
    <tr key={lecture.id}>
      <td>{lecture.id}</td>
      <td>{lecture.ort}</td>
      <td>{lecture.date}</td>
      <td>{lecture.startzeit} - {lecture.endzeit}</td>
      <td>
        <button className='viewFeedback' onClick={() => handleFeedbackview(lecture.id)}>
          Feedback ansehen
        </button>
      </td>
    </tr>
  ))}
      </tbody>
      </Table>
    );
  }

  export default LectureTable;