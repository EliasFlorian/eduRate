import { useState, useEffect } from 'react';
import LectureTable from './LectureTable';
import { useParams } from 'react-router-dom';


function GetQrCode() {
    let { lectureID } = useParams();
    const url = `/eduRate/${lectureID}`;
    const encodedUrl = encodeURIComponent(url);
    var request = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}`
    
    return (
      <div>
        <h2>Scanne den QR-Code oder gehe direkt auf folgende Seite: {url}</h2>
        <div></div>
          <img src = {request} />
      </div>
    );
}

export default GetQrCode;