import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
// import Navbar from './components/Navbar';
import Signup from './components/Signup';
 import OtherReviews from './components/OtherReview';
import MyReview from './components/Myreview';
import Movie from './components/Movie';
import MovieDetail from './components/MovieDetail'; // Import MovieDetail component

function App() {
  return (
    <div>
  {/* Assuming Navbar is a component for navigation */}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Movie />} />
        <Route path='/OtherReviews' element={<OtherReviews />} />
        <Route path='/MyReview' element={<MyReview />} />
        <Route path='/movies/:id' element={<MovieDetail />} /> {/* Route for MovieDetail */}
      </Routes>
    </div>
  );
}

export default App;
