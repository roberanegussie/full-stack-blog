import React, { useEffect, useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext'
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const User = () => {
    
    const state = useLocation().state;
    const navigate = useNavigate();
    const [userData, setUserDetails] = useState({});  
    const { currentUser } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    
    const handleEmailClick = async (e)=>{
        e.preventDefault()
        try{ 
            const response = await axios.put(`/users/updateEmail/${currentUser.id}`, {email}) 
            navigate(0);
            setErrorMessages([]);
        }
        catch (err){
            const errorResponse = err.response?.data;
            let messages = [];

            if (err.response?.status === 400) {
            messages = [errorResponse?.message || 'Please enter a valid email.'];
            } else if (err.response?.status === 409) {
                messages = [errorResponse?.message || 'Email already exists.'];
            } else if (errorResponse?.errors) {
                messages = errorResponse.errors.map(err => err.msg);
            } else {
                messages = ['An unexpected error occurred.'];
            }

            setErrorMessages(messages);
            /*
            if (err.response) {
                console.error("Error response data:", err.response.data);
                console.error("Error response status:", err.response.status);
            } else {
                console.error("Error message:", err.message);
            }
            */
        }
    }

    const handleUsernameClick = async (e)=>{
        e.preventDefault()
        try{ 
            const response = await axios.put(`/users/updateUsername/${currentUser.id}`, {username})
            navigate(0);
            setErrorMessages([]); 
            
        }
        catch (err){
            const errorResponse = err.response?.data;
            let messages = [];

            if (err.response?.status === 400) {
            messages = [errorResponse?.message || 'Please enter a valid username.'];
            } else if (err.response?.status === 409) {
                messages = [errorResponse?.message || 'Username already exists.'];
            } else if (errorResponse?.errors) {
                messages = errorResponse.errors.map(err => err.msg);
            } else {
                messages = ['An unexpected error occurred.'];
            }
            setErrorMessages(messages);
            /*
            if (err.response) {
                console.error("Error response data:", err.response.data);
                console.error("Error response status:", err.response.status);
            } else {
                console.error("Error message:", err.message);
            }
            */
        }
    }

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
        <div className='content'>            
            <Card className='card'>
            <CardContent>
                <Typography variant="h4" className='content'>
                    My profile
                </Typography>
                <Typography variant="h5" className='content-1'>
                    <div className="value">
                        <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>
                    </div>
                    
                    <div className="value-1">
                        {userData?.username}
                    </div> 
                     <Button size="small">
                            <Popup trigger={<EditIcon />} className='popup'>
                                <Card>
                                    <CardContent>
                                    <TextField
                                        label="New Username"
                                        id="outlined-size-normal"
                                        placeholder={userData?.username}
                                        onChange={(e)=>setUsername(e.target.value)}
                                    />
                                    <Button onClick={handleUsernameClick}>Update</Button>
                                    {errorMessages.length > 0 && (
                                        <ul style={{ color: 'red' }}>
                                            {errorMessages.map((msg, index) => (
                                            <li key={index}>{msg}</li>
                                        ))}
                                        </ul>
                                    )}
                                    </CardContent>
                                </Card>
                            </Popup>
                    </Button> 
                </Typography>
                <Typography variant="h5" className='content-2'>
                    <div className="value">
                        <EmailOutlinedIcon className='value'></EmailOutlinedIcon>
                    </div>
                    <div className="value-1">
                        {userData?.email}
                    </div> 
                    <Button size="small">
                            <Popup trigger={<EditIcon />} className='popup'>
                                <Card>
                                    <CardContent>
                                    <TextField
                                        label="New Email Address"
                                        id="outlined-size-normal"
                                        placeholder={userData?.email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                    <Button onClick={handleEmailClick}>Update</Button>
                                    {errorMessages.length > 0 && (
                                        <ul style={{ color: 'red' }}>
                                            {errorMessages.map((msg, index) => (
                                            <li key={index}>{msg}</li>
                                        ))}
                                        </ul>
                                    )}
                                    </CardContent>
                                </Card>
                            </Popup>
                    </Button>
                </Typography>
            </CardContent>
            </Card>
        </div>
    );
};

export default User;
/*
<Button size="small">
                        <Popup trigger={<EditIcon />} >
                            <Card>
                                <CardContent>
                                <TextField
                                    label="New Username"
                                    id="outlined-size-normal" 
                                    placeholder={userData?.username}
                                />
                                </CardContent>
                            </Card>
                        </Popup>
                    </Button> 
*/