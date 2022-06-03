import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

//Pages
import Screenings from './components/pages/Screenings';
import ScreeningPage from './components/pages/ScreeningPage';
import MoviePage from './components/pages/MoviePage';
import PrivateScreeningReq from './components/pages/PrivateScreeningReq';
import AdminPanel from './components/pages/AdminPanel';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';

export const UserContext = React.createContext();

function App() {
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const localEmail = localStorage.getItem("email");
    const localPassword = localStorage.getItem("password");
    if (localEmail) {
      Axios.post('http://localhost:3001/getuser', {
        localEmail,
        localPassword
      }).then((res) => {
        if (res.data[0]) {
          setEmail(localEmail);
          setUserRole(res.data[0].role_name);
          setIsLoggedIn(true);
          setUsername(res.data[0].username);
          setUserId(res.data[0].id);
        }
      });
    }
  }, []);
  return (
    <UserContext.Provider value={[isLoggedIn, email, userRole, username, userId, setIsLoggedIn, setEmail, setUserRole, setUsername, setUserId]}>
      <Router>
        <Routes>
            <Route path="/" element={<Screenings/>}/>
            <Route path="/screening/:id" element={<ScreeningPage/>}/>
            <Route path="/movie/:TMDB_id" element={<MoviePage/>}/>
            <Route path="/private_screening_req" element={<PrivateScreeningReq/>}/>
            <Route path="/adminpanel" element={<AdminPanel/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile/:id" element={<Profile/>}/>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
