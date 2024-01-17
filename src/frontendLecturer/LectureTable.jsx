import { Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function LectureTable() {
  const [lectures, setLectures] = useState([]);
  const [error, setError] = useState(null);

  let navigate = useNavigate();
  const handleFeedbackview = (lectureID) => {
    navigate(`/eduRate/feedbackview/${lectureID}`);
  }
  const handleQRCode = (lectureID) => {
    navigate(`/eduRate/qrCode/${lectureID}`);
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

  const formatDate = (datum) => {
    if (!datum || typeof datum !== 'string') {
        return 'Datum nicht verfügbar';
    }

    const parts = datum.split('-');
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
};


const handleDelete = async (lectureID) => {
  try {
    const url = `http://localhost:3000/lecture/${lectureID}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      // Remove the deleted lecture from the state
      setLectures(lectures.filter(lecture => lecture._id !== lectureID));
    } else {
      throw new Error(`Failed to delete lecture. Status: ${response.status}`);
    }
  } catch (error) {
    setError(error.message);
  }
};

    return (
      <Table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ort</th>
            <th>Datum</th>
            <th>Uhrzeit</th>
            <th>Feedback</th>
            <th>QR Code</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {lectures.map((lecture) => (
    <tr key={lecture._id}>
      <td>{lecture._id}</td>
      <td>{lecture.ort}</td>
      <td>{formatDate(lecture.datum)}</td>
      <td>{lecture.startzeit} - {lecture.endzeit}</td>
      <td>
        <button className='viewFeedback' onClick={() => handleFeedbackview(lecture._id)}>
          Feedback ansehen
        </button> </td> 
      <td> <button className='viewFeedback' onClick={() => handleQRCode(lecture._id)}>QR Code anzeigen</button>
      </td>
      <td> <button className='delete' onClick={() => handleDelete(lecture._id)}>Löschen</button></td>
    </tr>
  ))}
      </tbody>
      </Table>
    );
  }

  export default LectureTable;