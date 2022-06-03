import { useState, useContext, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../App";

//Components
import Navbar from "../Navbar";

const Register = () => {
    const userData = useContext(UserContext);

    //Input states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if (userData[0]) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData[0]]);
    const submitHandler = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3001/register', {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            birthdate
        })
        .then((res) => {
            if (res.data === 'ER_DUP_ENTRY') {
                console.log('User with that phone number or email already exists!');
            } else {
                if (rememberMe === true) {
                    const userIsLoggedIn = userData[5];
                    const userEmail = userData[6];
                    const userRole = userData[7];
                    const userName = userData[8];
                    const userId = userData[9];
                    Axios.post('http://localhost:3001/getuser', {
                        localEmail: email,
                        localPassword: password
                    })
                    .then((res) => {
                        console.log(res.data);
                        userIsLoggedIn(true);
                        userEmail(email);
                        userRole(res.data[0].role_name);
                        userName(res.data[0].username);
                        userId(res.data[0].id);
                        localStorage.setItem('email', email);
                        localStorage.setItem('password', password);
                        navigate('/');
                    });
                } else {
                    navigate('/');
                }
            }
        });
    }
    return (
        <>
            <Navbar/>
            <section className="loginPage">
                <h2>Register</h2>
                <form onSubmit={submitHandler} className="formContainer">
                    <div className="formControl">
                        <label htmlFor="firstName">First name:</label>
                        <input type="text" name="firstName" id="firstName" required value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
                    </div>
                    <div className="formControl">
                        <label htmlFor="lastName">Last name:</label>
                        <input type="text" name="lastName" id="lastName" required value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
                    </div>
                    <div className="formControl">
                        <label htmlFor="birthdate">Birthdate:</label>
                        <input type="date" name="birthdate" id="birthdate" required value={birthdate} onChange={(e) => {setBirthdate(e.target.value)}}/>
                    </div>
                    <div className="formControl">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" required value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                    <div className="formControl">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" required value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                    <div className="formControl">
                        <label htmlFor="phoneNumber">Phone number:</label>
                        <input type="text" name="phoneNumber" id="phoneNumber" required value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                    </div>
                    <div className="formControl">
                        <input type="checkbox" name="rememberMe" id="rememberMe" value={rememberMe} onChange={(e) => {setRememberMe(e.target.checked)}}/>
                        <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <input type="submit" value="Register" className="sellBtn"/>
                </form>
            </section>
        </>
    );
}
export default Register;