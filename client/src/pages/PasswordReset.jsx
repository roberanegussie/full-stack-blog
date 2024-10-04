import {React, useState }from 'react';
import { Link, useLocation, useNavigate, useParams  } from 'react-router-dom'
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl'; 
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Logo from '../img/logo.png'

const PasswordReset = () => {
  const { id } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();

  const validatePassword = (newPassword) => {
    const errors = [];
        if (newPassword.length < 8) {
            errors.push('Password must be at least 8 characters long.');
        }
        if(!/[a-z]/.test(newPassword)){
            errors.push('Password must contain at least one lowercase letter')
        }
        if (!/[A-Z]/.test(newPassword)) {
            errors.push('Password must contain at least one uppercase letter.');
        }
        if (!/\d/.test(newPassword)) {
            errors.push('Password must contain at least one number.');
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
            errors.push('Password must contain at least one special character.');
        }
        return errors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'newPassword') {
        setNewPassword(value);
        setPasswordErrors(validatePassword(value));
    } else if (name === 'confirmPassword') {
        setConfirmPassword(value);
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
        setErrorMessages(["Passwords do not match!"]);
    } else {
        setErrorMessages([]); 
    }
};

const handleSubmit = async (e) => { 
    e.preventDefault();

    if (passwordErrors.length > 0 || newPassword !== confirmPassword) {
        setErrorMessages(["Passwords do not match!"]);
        return; 
    }

    try {
        await axios.put(`/users/updatePassword/${id}`, { password: newPassword });
        navigate("/login");
    } catch (err) {
        const errorResponse = err.response?.data;
        if (errorResponse?.errors) {
            setErrorMessages(errorResponse.errors.map(err => err.msg));
        } else {
            setErrorMessages(['An unexpected error occurred.']);
        }
    }
};

  return (
    <div className='auth'>
        <div className='logo'>
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput className='background'
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                placeholder='New password'
                name='newPassword'
                onChange={handleChange}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword} 
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Password"
            />
            {passwordErrors.length > 0 && (
              <ul style={{ color: 'red' }}>
                  {passwordErrors.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            )}
            </FormControl>
            <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password </InputLabel>
            <OutlinedInput className='background'
                id="outlined-adornment-confirm-password"
                type={showPassword ? 'text' : 'password'}
                placeholder='Confirm new password'
                name='confirmPassword'
                onChange={handleChange}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Password"
            />
            {confirmPassword && newPassword && newPassword !== confirmPassword && (
                <ul style={{ color: 'red' }}>
                    <li>Passwords do not match!</li>
                </ul>
            )}
            </FormControl>
            <Button variant="contained" className='contained' onClick={handleSubmit}>Update</Button>
    </div>
  )
}

export default PasswordReset