import React, { useEffect, useState,useContext } from 'react'
import Logo from '../img/logo.png'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../context/authContext';
const Navbar = () => {
  const {currentUser, logout} = useContext(AuthContext);
  const [userData, setUserDetails] = useState({});  

  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get(`/users/${currentUser.id}`);
            setUserDetails(res.data); 
        } catch (err) {
            if (err.response) {
                console.error("Error response data:", err.response.data);
                console.error("Error response status:", err.response.status);
            } else {
                console.error("Error message:", err.message);
            }
        }
    };
    fetchData();
}, [currentUser]);
  return (
    <div className='navbar'>
        <div className='container'>
            <div className='logo'>
                <Link to="/">
                <img src={Logo} alt="" />
                </Link>
            </div>
            <div className='links'>
                <Link className="link" to="/?cat=art">
                    <h6>ART</h6>
                </Link>
                <Link className="link" to="/?cat=science">
                    <h6>SCIENCE</h6>
                </Link>
                <Link className="link" to="/?cat=technology">
                    <h6>TECHNOLOGY</h6>
                </Link>
                <Link className="link" to="/?cat=cinema">
                    <h6>CINEMA</h6>
                </Link>
                <Link className="link" to="/?cat=sport">
                    <h6>SPORT</h6>
                </Link>
                <Link className="link" to="/?cat=food">
                    <h6>FOOD</h6>
                </Link>
                <Link className='link'to="/users/:id">
                    <span>{userData?.username}</span>
                </Link>
                {currentUser ? (
                    <span onClick={logout}>Logout</span> 
                    ) : ( 
                      <Link className='link' to="/login">
                        Login
                      </Link>
                    )}
                <span className="write">
                    <Link className="link" to="/write">Write</Link>
                </span>
            </div>
        </div>
    </div>
  );
};

export default Navbar