import { useUser } from './UseUser';
import './Lecturer.css';

function WelcomeText() {
    const { user } = useUser();
    return(
        <div className="welcomeText">
            Wilkommen {user.name}!
        </div>
    )
}

export default WelcomeText