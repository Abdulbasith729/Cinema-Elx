import React, { useEffect, useState } from 'react';
import { Typography, Grid, Rating, Avatar, Link } from '@mui/material';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

function OtherReviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        const db = getFirestore();
        const reviewsRef = collection(db, 'reviews');

        try {
            const querySnapshot = await getDocs(reviewsRef);
            const reviewsData = querySnapshot.docs.map(doc => doc.data());
            setReviews(reviewsData);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleUserClick = (userEmail) => {
        // Filter reviews by the selected user
        const userReviews = reviews.filter(review => review.author === userEmail);
        setReviews(userReviews);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Other Reviews
            </Typography>
            <Grid container spacing={2}>
                {reviews.map((review, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', minHeight: '200px' }}>
                            <Typography variant="h6">{review.movieTitle}</Typography>
                            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <Avatar alt={review.author} src={review.authorProfilePic || 'https://via.placeholder.com/50'} style={{ marginRight: '8px' }} />
                                <Link onClick={() => handleUserClick(review.author)}>{review.author}</Link>
                            </div>
                            <Rating name="read-only" value={review.rating} readOnly style={{ marginLeft: '20px' }} />
                            <Typography style={{ marginTop: '10px' }}>{review.content}</Typography>
                            {/* Make the poster clickable and redirect to the movie */}
                            <Link href={`/movies/${review.movieId}`}>
                                <img src={review.posterPath} alt={review.movieTitle} style={{ maxWidth: '100%', marginTop: '16px', cursor: 'pointer' }} />
                            </Link>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default OtherReviews;
