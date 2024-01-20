import { useNavigate } from 'react-router-dom';
import { useUser } from './UseUser';

function Logout() {
    let navigate = useNavigate();
    const { user, setAccessToken } = useUser();

    const handleLogout = () => {
        setAccessToken(null);
        //localStorage.removeItem('token');
        navigate('/eduRate/login');
    };

    return (
        <button className="logout-button" onClick={handleLogout}>Logout</button>
    );
}
export default Logout;

