import { useState, useEffect } from 'react';

function GetQrCode({url}) {
 
    var request = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`
    
    return (
      <div>
          <img src = {request} />
      </div>
    );
}

export default GetQrCode;