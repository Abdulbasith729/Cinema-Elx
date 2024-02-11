import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Img from '../assets/Img.png'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
 
const navigate = useNavigate()
  return (
    <div>
      <Toolbar style={{ borderBottom: '1px solid grey' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ fontSize: '28px' }}>
          <img src={Img} height={50} width={50} alt="Logo" />
          Cinema Elx
        </Typography>

        <Button variant="contained" onClick={()=> navigate('/login')}>Logout</Button>
      </Toolbar>


    </div>
  );
};

export default Navbar;
