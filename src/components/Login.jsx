import React, { useState } from 'react';
import Img from '../assets/Img.png';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
      navigate('/');
    } catch (error) {
      console.error('Sign in error:', error.message);
      alert('Invalid email or password. Please try again.'); // Assuming the error message for invalid credentials
    }
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
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ background: 'white', border: 'none', borderRadius: '10px', width: '49%', marginRight: '50px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ background: 'white', border: 'none', borderRadius: '10px', width: '49%', marginRight: '50px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                style={{ border: '2px solid white', background: '#ff3333', color: 'white', width: '40%', marginRight: '50px' }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
        {errorMessage && (
          <Typography variant="h3" style={{ color: 'red', marginTop: '10px', marginRight: '310px', fontSize: '15px' }}>
            {errorMessage}
          </Typography>
        )}
        <Typography variant="h3" style={{ marginTop: '10px', marginRight: '310px', color: 'white', fontSize: '15px', cursor: 'pointer' }} >
          Join our club? <span onClick={() => navigate('/signup')}>Click here</span>
        </Typography>
      </div>
    </div>
  );
}
