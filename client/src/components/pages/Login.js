import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { UserContext } from "../../App";

//Components
import Navbar from "../Navbar";

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Input states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const userData = useContext(UserContext);

    //User info set functions
    const userIsLoggedIn = userData[5];
    const userEmail = userData[6];
    const userRole = userData[7];
    const userName = userData[8];
    const userId = userData[9];

    const navigate = useNavigate();
    useEffect(() => {
        if (userData[2] !== 'Guest') {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);
    const loginHandler = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3001/getuser', {
        localEmail: email,
        localPassword: password
      }).then((res) => {
          if (res.data[0]) {
            userIsLoggedIn(true);
            userEmail(email);
            userRole(res.data[0].role_name);
            userName(res.data[0].username);
            userId(res.data[0].id);
            if (rememberMe) {
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);    
            }
            setIsLoggedIn(true);
          }
      });
    }
    return (
        <>
            <Navbar/>
            <section className="loginPage">
                <h3>Login</h3>
                <form onSubmit={loginHandler} className="formContainer">
                    <div className="formControl">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="formControl">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="formControl">
                        <input type="checkbox" name="rememberMe" id="rememberMe" value={rememberMe} onChange={(e) => {setRememberMe(e.target.checked)}}/>
                        <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <input type="submit" value="Login" className="sellBtn" />
                </form>
            </section>
        </>
    );
}
export default Login;