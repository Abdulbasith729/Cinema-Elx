import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Movie = () => {
  const [movies, setMovies] = useState({
    popularMovies: [],
    upcomingMovies: [],
    topRatedTv: [],
  });
  const [error, setError] = useState(null);
  const [horizontalMode, setHorizontalMode] = useState(true); // Start with horizontal layout
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const sentinelRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = 'a9c2b66bd63fa6bad7573fd623b00154'; // Replace with your TMDB API key
        const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=${apiKey}`;
        const upcomingMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}&api_key=${apiKey}`;
        const topRatedTvUrl = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}&api_key=${apiKey}`;

        const popularMoviesResponse = await fetch(popularMoviesUrl);
        const upcomingMoviesResponse = await fetch(upcomingMoviesUrl);
        const topRatedTvResponse = await fetch(topRatedTvUrl);

        if (!popularMoviesResponse.ok || !upcomingMoviesResponse.ok || !topRatedTvResponse.ok) {
          throw new Error('Failed to fetch movie data');
        }

        const popularMoviesData = await popularMoviesResponse.json();
        const upcomingMoviesData = await upcomingMoviesResponse.json();
        const topRatedTvData = await topRatedTvResponse.json();

        setMovies((prevMovies) => ({
          popularMovies: [...prevMovies.popularMovies, ...popularMoviesData.results],
          upcomingMovies: [...prevMovies.upcomingMovies, ...upcomingMoviesData.results],
          topRatedTv: [...prevMovies.topRatedTv, ...topRatedTvData.results],
        }));

        setError(null);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setError('Error fetching movie data. Please try again later.');
      }
    };

    fetchMovies();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

  const handleMovieClick = (movie) => {
    navigate(`/movies/${movie.id}`, { state: movie });
  };

  const toggleLayoutMode = () => {
    setHorizontalMode((prevMode) => !prevMode);
  };

  return (
    <Box>
      <Navbar />
      <Box display="flex">
        <Sidebar />
        <Box display="flex" flexDirection="column" flexGrow={1} padding="20px">
          {error && <Typography variant="body1" color="error">{error}</Typography>}
          <Button variant="outlined" onClick={toggleLayoutMode}>
            {horizontalMode ? 'Switch to Vertical' : 'Switch to Horizontal'}
          </Button>
          <Typography variant="h4">Top Rated Movies</Typography>
          <MovieList
            movies={movies.topRatedTv}
            handleClick={handleMovieClick}
            horizontalMode={horizontalMode}
          />
          
          <Typography variant="h4">Upcoming Movies</Typography>
          <MovieList
            movies={movies.upcomingMovies}
            handleClick={handleMovieClick}
            horizontalMode={horizontalMode}
          />
          
          <Typography variant="h4">Popular Movies</Typography>
          <MovieList
            movies={movies.popularMovies}
            handleClick={handleMovieClick}
            horizontalMode={horizontalMode}
          />
          <div ref={sentinelRef}></div>
        </Box>
      </Box>
    </Box>
  );
};

const MovieList = ({ movies, handleClick, horizontalMode }) => (
  <div style={{ display: horizontalMode ? 'flex' : 'block', overflowX: horizontalMode ? 'auto' : 'hidden' }}>
    {movies.map((movie) => (
      <img
        key={movie.id}
        style={{ padding: 5, height: 150, width: 150, cursor: 'pointer' }}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onClick={() => handleClick(movie)}
      />
    ))}
  </div>
);

export default Movie;
