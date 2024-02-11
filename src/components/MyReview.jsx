import React, { useState } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Rating } from '@mui/material';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

function MyReview({ review, userCredentials, moviePoster }) {
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editedReviewText, setEditedReviewText] = useState(review.content);
    const [editedRating, setEditedRating] = useState(review.rating);

    const handleEdit = () => {
        setOpenEditDialog(true);
    };

    const handleEditSubmit = async () => {
        try {
            const db = userCredentials.firestore();
            const reviewDocRef = doc(db, 'reviews', review.id);
            await updateDoc(reviewDocRef, {
                content: editedReviewText,
                rating: editedRating
            });
            setOpenEditDialog(false);
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const db = userCredentials.firestore();
            const reviewDocRef = doc(db, 'reviews', review.id);
            await deleteDoc(reviewDocRef);
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div style={{ marginTop: '25px', border: '1px solid grey', textAlign: 'center', borderRadius: '8px' }}>
            <img src={review.authorProfilePic || 'https://via.placeholder.com/50'} alt="Profile" style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
            <Typography variant="subtitle1" style={{ fontSize: '20px' }}>Author: {review.author}</Typography>
            <Typography variant="subtitle1" style={{ fontSize: '20px' }}>Movie: {review.movieTitle}</Typography>
            <Rating name="read-only" value={review.rating} readOnly />
            <Typography>{review.content}</Typography>
            <img src={moviePoster} alt={review.movieTitle} style={{ maxWidth: '100%', marginTop: '16px' }} />
            <div>
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </div>
            {/* Edit Dialog */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit Review</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Review"
                        fullWidth
                        value={editedReviewText}
                        onChange={(e) => setEditedReviewText(e.target.value)}
                    />
                    <Rating
                        name="simple-controlled"
                        value={editedRating}
                        onChange={(event, newValue) => {
                            setEditedRating(newValue);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                    <Button onClick={handleEditSubmit} variant="contained">Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MyReview;
