import { useState, useEffect } from 'react';
import LectureTable from './LectureTable';

const lectureID = 12; //hard coded here

function GetQrCode({url}) {
 
    var request = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`
    
    return (
      <div>
        <h2>Scanne den QR-Code oder gehe direkt auf folgende Seite: www.eduRate.at/{lectureID}</h2>
        <div></div>
          <img src = {request} />
      </div>
    );
}

export default GetQrCode;