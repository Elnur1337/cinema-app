import React, { useState, useContext, useEffect } from "react";
import { DayContext } from "./pages/Screenings";
import MovieCard from "./MovieCard";
import Axios from 'axios';

const MovieList = () => {
    const dayState = useContext(DayContext);
    const activeDay = dayState[0];
    const setActiveDay = dayState[1];
    const [screeningData, setScreeningData] = useState([]);
    const [moviesData, setMoviesData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        Axios.get('http://localhost:3001/getscreenings')
        .then((res) => {
            setScreeningData(res.data.filter((screening) => screening.type_name !== 'Private'));
        });
        Axios.get('http://localhost:3001/getmovies')
        .then((res) => {
            setMoviesData(res.data);
            setActiveDay("Tuesday");
            setActiveDay("Monday");
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        setDisplayData(screeningData.filter((item) => item.day_name === activeDay));
        setMovies(moviesData.filter((item) => item.day_name === activeDay));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeDay]);
    return (
        <section className="movieList">
            {movies.map((item) => {
                return <MovieCard key={item.TMDB_id} movie={item} screenings={displayData}/>
            })}
            
        </section>
    );
}

export default MovieList;