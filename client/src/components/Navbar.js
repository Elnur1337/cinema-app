import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
    const userData = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <nav>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                {userData[2] !== 'Guest' && <li><Link to={'/private_screening_req'}>Request private screening</Link></li>}
                {(userData[2] !== 'Member' && userData[2] !== 'Guest') && <li><Link to={'/adminpanel'}>Admin Panel</Link></li>}
            </ul>
            {userData[0] ? 
                <ul>
                    <li className='username'>{userData[3]}</li>
                    <li onClick={() => {
                        localStorage.removeItem('email');
                        localStorage.removeItem('password');

                        const userIsLoggedIn = userData[5];
                        const userEmail = userData[6];
                        const userRole = userData[7];
                        const userName = userData[8];
                        const userId = userData[9];

                        userIsLoggedIn(false);
                        userEmail('');
                        userRole('Guest');
                        userName('');
                        userId(0);
                        
                        navigate('/');
                    }} className='logoutBtn'>Logout</li>
                </ul> : 
                <ul>
                    {location.pathname !== '/login' && <li><Link to={'/login'}>Login</Link></li>}
                    {location.pathname !== '/register' && <li><Link to={'/register'}>Register</Link></li>}
                </ul>
            }
        </nav>
    );
}
export default Navbar;