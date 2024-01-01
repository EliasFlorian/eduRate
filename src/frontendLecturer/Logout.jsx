import { useNavigate } from 'react-router-dom';

function Logout() {
    let navigate = useNavigate();

    const handleLogout = () => {
        
        localStorage.removeItem('token');
        navigate('/eduRate/login');
    };

    return (
        <button className="logout-button" onClick={handleLogout}>Logout</button>
    );
}
export default Logout;

