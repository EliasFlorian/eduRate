import React from "react";
import { useNavigate } from "react-router-dom";

function LandingAdmin() {
    let navigate = useNavigate();

    const navNewUser = () => { 
        navigate('/eduRate/new');
    };

    return(
<div>
    <button className="viewFeedback" onClick={navNewUser}>Neuen User anlegen</button>
</div>)
}
export default LandingAdmin