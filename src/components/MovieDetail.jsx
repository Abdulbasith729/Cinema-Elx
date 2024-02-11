import React, { useEffect, useState } from 'react';
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Rating } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

function MovieDetail() {
    const IMG_API = 'https://image.tmdb.org/t/p/w500/';
    const location = useLocation();
    const navigate = useNavigate();
    const { id, title, overview, poster_path } = location.state || {};
    const [cast, setCast] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [openReviewDialog, setOpenReviewDialog] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [similarMovies, setSimilarMovies] = useState([]);

    useEffect(() => {
        if (location.state) {
            fetchMovieDetails();
            fetchSimilarMovies();
            fetchReviews();
        }
    }, [location.state]);

    const fetchMovieDetails = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=a9c2b66bd63fa6bad7573fd623b00154`);
            if (!response.ok) {
                throw new Error('Failed to fetch cast data');
            }
            const data = await response.json();
            setCast(data.cast.slice(0, 5)); // Limit the cast to the first 5 actors
        } catch (error) {
            console.error('Error fetching cast:', error);
        }
    };

    const fetchSimilarMovies = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=a9c2b66bd63fa6bad7573fd623b00154`);
            setSimilarMovies(response.data.results);
        } catch (error) {
            console.error('Error fetching similar movies:', error);
        }
    };

    const fetchReviews = async () => {
        const db = getFirestore();
        const reviewsRef = collection(db, 'reviews');
        const q = query(reviewsRef, where('movieId', '==', id));

        try {
            const querySnapshot = await getDocs(q);
            const reviewsData = querySnapshot.docs.map(doc => doc.data());
            setReviews(reviewsData);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleSimilarMovieClick = async (movie) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=a9c2b66bd63fa6bad7573fd623b00154`);
            const movieDetail = response.data;
            navigate(`/movies/${movie.id}`, { state: movieDetail });
        } catch (error) {
            console.error('Error fetching similar movie details:', error);
        }
    };

    const handlePostReview = () => {
        setOpenReviewDialog(true);
    };

    const handleSubmitReview = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
    
        // Check if user is authenticated
        if (!user) {
            console.error("User not authenticated.");
            return;
        }
    
        const newReview = {
            content: reviewText,
            rating: rating,
            movieId: id // Add movie ID to the review
        };
    
        // Check if user email is available, otherwise use a dummy profile
        const userEmail = user.email ? user.email : "dummy@example.com";
        const userProfilePic = user.photoURL ? user.photoURL : "https://example.com/dummy-profile-pic.jpg";
    
        newReview.author = userEmail; // Set author to user's email or dummy email
        newReview.authorProfilePic = userProfilePic; // Set profile picture to user's profile picture or dummy profile picture
    
        try {
            const db = getFirestore();
            await addDoc(collection(db, "reviews"), newReview);
            setReviews([...reviews, newReview]); // Add new review to reviews array
            setOpenReviewDialog(false); // Close review dialog
            setReviewText(''); // Clear review text field
            setRating(0); // Reset rating
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };
    

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <Sidebar style={{ width: '20%' }} />
                <div style={{ display: 'flex', flex: 1 }}>
                    <div style={{ padding: '70px', width: '70%' }}>
                        {title && (
                            <>
                                <Typography>
                                    <img src={IMG_API + poster_path} height={340} width={340} style={{ borderRadius: 8 }} alt={title} />
                                </Typography>
                                <Typography style={{ fontSize: '25px', fontWeight: 'bold', marginTop: '10px' }}>{title}</Typography>
                                <Typography style={{ width: '60%' }}>{overview}</Typography>
                                <Button variant="contained" style={{ marginTop: 10 }} onClick={handlePostReview}>Post review</Button>
                                <div>
                                    <Typography variant="h6" style={{ marginTop: '25px', fontSize: '35px' }}>Cast:</Typography>
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {cast.map(actor => (
                                            <div key={actor.id} style={{ margin: '10px' }}>
                                                <img
                                                    src={actor.profile_path ? IMG_API + actor.profile_path : 'https://via.placeholder.com/100'}
                                                    alt={actor.name}
                                                    style={{ borderRadius: '50%', width: 100, height: 100 }}
                                                />
                                                <Typography variant="subtitle1">{actor.name}</Typography>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Typography variant="h6" style={{ marginTop: '25px', fontSize: '35px' }}>Similar Movies:</Typography>
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {similarMovies.map((movie, index) => (
                                            movie.poster_path && (
                                                <div key={`${movie.id}-${index}`} style={{ margin: '10px', cursor: 'pointer' }} onClick={() => handleSimilarMovieClick(movie)}>
                                                    <img src={IMG_API + movie.poster_path} alt={movie.title} style={{ borderRadius: '8px', width: '150px', height: '225px' }} />
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div style={{ padding: '70px', width: '70%' }}>
                        <Typography variant="h6" style={{ fontSize: '35px', textAlign: 'center' }}>Reviews :</Typography>
                        {reviews.map((review, index) => (
                            <div key={index} style={{ marginTop: '25px', border: '1px solid grey', textAlign: 'center', borderRadius: '8px' }}>
                                <img src={review.authorProfilePic || 'https://via.placeholder.com/50'} alt="Profile" style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
                                <Typography variant="subtitle1" style={{ fontSize: '20px' }}>Author: {review.author}</Typography>
                                <Rating name="read-only" value={review.rating} readOnly />
                                <Typography>{review.content}</Typography>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Review Dialog */}
            <Dialog open={openReviewDialog} onClose={() => setOpenReviewDialog(false)}>
                <DialogTitle>Post Review</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Review"
                        fullWidth
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenReviewDialog(false)}>Cancel</Button>
                    <Button onClick={handleSubmitReview} variant="contained">Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MovieDetail;
