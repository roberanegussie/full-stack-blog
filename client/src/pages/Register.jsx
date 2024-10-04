import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios" 
import Logo from '../img/logo.png'
const Register = () => {
  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:"",
  })
  const [emailError,setEmailError]=useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter.');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character.');
    }
    return errors;
  };
  
  const handleChange = (e) =>{
    const { name, value } = e.target;
    setInputs((prev)=>({ ...prev, [name]: value}));
    if (name === 'password') {
      setPasswordErrors(validatePassword(value));
    }
  };
  const handleSubmit = async (e) =>{ 
    e.preventDefault()
    if (!validateEmail(inputs.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }
    if (passwordErrors.length > 0) {
      return; 
    }
    try{
      await axios.post("/auth/register",inputs)
      navigate("/login")
    }catch(err){
       const errorResponse = err.response?.data;
       if (errorResponse?.errors) {
         setErrorMessages(errorResponse.errors.map(err => err.msg));
       }
       if (err.response?.status === 409) {
        setErrorMessages([errorResponse?.message || 'Email or Username already exists']);
       }
       else {
         setErrorMessages(['An unexpected error occurred.']);
       }
    }
  }
  return (
    <div className='auth'>
      <div className='logo'>
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
      </div>
        <h1>Register</h1>
        <form>
            <input required  type="text" placeholder='username'  name='username'  value={inputs.username} onChange={handleChange}/>
            <input required  type="email" placeholder="email"  name="email" value={inputs.email} onChange={handleChange}/>
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            <input required  type="password" placeholder="password" name="password" value={inputs.password} onChange={handleChange}/>
            {passwordErrors.length > 0 && (
              <ul style={{ color: 'red' }}>
                  {passwordErrors.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            )}
            <button onClick={handleSubmit}>Register</button>
            {errorMessages.length > 0 && (
              <ul style={{ color: 'red' }}>
                {errorMessages.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
              </ul>
            )}
            <span>Already have an account?
                <Link to="/login"> Login</Link>
            </span>
        </form>
    </div>
  );
};

export default Register