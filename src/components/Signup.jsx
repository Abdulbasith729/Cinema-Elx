import React, { useState } from 'react';
import Img from '../assets/Img.png';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);
      navigate('/login');
    } catch (error) {
      console.error('Sign up error:', error.message);
      if (error.code === 'auth/email-already-in-use') {
        alert('This email address is already in use. Please sign in instead.');
      } else {
        alert('An error occurred while signing up. Please try again later.');
      }
    }
  };

  const handleJoinClubClick = () => {
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', background: '#ff3333', height: '100vh' }}>
      {/* Left Column - Image */}
      <div style={{ flex: 1 }}>
        <img
          src={Img}
          alt="Cinema Elx"
          style={{ width: '100%', height: '100%', objectFit: 'contain', marginLeft: '150px' }}
        />
      </div>

      {/* Right Column - Form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Typography variant="h3" style={{ marginRight: '230px', marginTop: '180px', color: 'white' }}>
          CINEMA ELX
        </Typography>
        <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginTop: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ background: 'white', border: 'none', borderRadius: '10px', width: '40%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ background: 'white', border: 'none', borderRadius: '10px', width: '40%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Re-enter Password"
                variant="outlined"
                type="password"
                required
                style={{ background: 'white', border: 'none', borderRadius: '10px', width: '40%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                style={{ border: '2px solid white', background: '#ff3333', color: 'white', width: '40%' }}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography
          variant="h3"
          style={{ marginTop: '10px', marginRight: '250px', color: 'white', fontSize: '15px', cursor: 'pointer' }}
          onClick={handleJoinClubClick}
        >
          Already have an account? <span style={{ textDecoration: 'underline' }}>Click here</span>
        </Typography>
        {errorMessage && (
          <Typography variant="h3" style={{ color: 'red', marginTop: '10px' }}>
            {errorMessage}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Signup;
