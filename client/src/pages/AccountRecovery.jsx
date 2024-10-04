import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Logo from '../img/logo.png'

const AccountRecovery = () => {
    const [inputs, setInputs] = useState({
        username:"",
        email:""
      })    
    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setInputs((prev)=>({ ...prev, [name]: value}));
      };  

    const handleUserCheck = async (e)=>{
        e.preventDefault()
        try{ 
            const response = await axios.post(`/users/checkUser`, inputs)
            navigate(`/reset/${response.data.id}`)
            setErrorMessages([]);             
        }
        catch (err){
            const errorResponse = err.response?.data;
            let messages = [];

            if (err.response?.status === 400) {
                messages = ['Please enter a username and an email.'];
            }
            else if (err.response?.status === 404) {
                messages = [errorResponse?.message];
            }
            else if (errorResponse?.errors) {
                messages = errorResponse.errors.map(err => err.msg);
            } else {
                messages = ['An unexpected error occurred.'];
            }
            setErrorMessages(messages);
        }
    }
    return (
        <div className='auth'>
            <div className='logo'>
            <Link to="/">
                <img src={Logo} alt="" />
            </Link>
            </div>
            
            <TextField sx={{ m: 1, width: '25ch' }} className='background'
                required
                id="outlined-required"
                label="Username"
                name='username'
                type='text'
                placeholder='Username'
                value={inputs.username} 
                onChange={handleChange}
            />
            <TextField sx={{ m: 1, width: '25ch' }} className='background'
                required
                id="outlined-required"
                label="Email"
                name='email'
                type='email'
                placeholder='Email'
                value={inputs.email} 
                onChange={handleChange}
            />
            <Button variant="contained" className='contained' onClick={handleUserCheck}>
                Update
            </Button>
            {errorMessages.length > 0 && (
                <ul style={{ color: 'red' }}>
                    {errorMessages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
                </ul>
            )}
        </div>
    )
}

export default AccountRecovery 