import { useState, useEffect } from 'react';
import LectureTable from './LectureTable';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';


function GetQrCode() {
    let navigate = useNavigate();
    const handleBack = () => { navigate('/eduRate/landing') };
    let { lectureID } = useParams();
    const url = `http://localhost:5173/eduRate/feedback?id=${lectureID}`;
    const encodedUrl = encodeURIComponent(url);
    var request = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}`
    
    return (
      <div>
        <NavBar />
        <h2>Scanne den QR-Code oder gehe direkt auf folgende Seite: {url}</h2>
        <div></div>
          <img src = {request} />
        <div></div>
          <button className='logout-button' onClick={handleBack}>Zurück</button>
      </div>
    );
}

export default GetQrCode;