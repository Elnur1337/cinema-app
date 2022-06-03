import { useEffect, useState } from 'react';
import Axios from'axios';
import {Link} from 'react-router-dom';

const MovieCard = ({screenings, movie}) => {
    const [movieInfo, setMovieInfo] = useState({});
    const [movieScreenings, setMovieScreenings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let displayData, posterImg = null, directors, producers;
    useEffect(() => {
        const getData = (id) => {
            const url = `https://api.themoviedb.org/3/movie/${id}?api_key=4b6436d292773d44d93cef444468c5ef&append_to_response=credits`;
            Axios.get(url)
            .then((res) => {
                setMovieInfo(res.data);
                setMovieScreenings(screenings.filter((screening) => screening.TMDB_id === movie.TMDB_id));
                setIsLoading(false);
            });
        }
        getData(movie.TMDB_id);
        return () => {setMovieInfo({})};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    if (!isLoading) {
            posterImg = `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`;
            directors = movieInfo.credits.crew.filter((crewMember) => crewMember.job === 'Director');
            producers = movieInfo.credits.crew.filter((crewMember) => crewMember.job === 'Producer');

            displayData = {
                TMDB_id: movie.TMDB_id,
                title: movieInfo.title,
                posterImg,
                adult: movieInfo.adult,
                genres: movieInfo.genres
            }
    }

    return (
        <article className='movieCard'>
            <Link to={`/movie/${movie.TMDB_id}`}><img src={posterImg} alt="moviePoster" className='moviePoster' /></Link>
            <section>
                <header>
                    <h4 className='movieTitle'><Link to={`/movie/${movie.TMDB_id}`}>{movieInfo.title}</Link></h4>
                    {movieInfo.adult && <p className='adult'>18+</p>}
                </header>
                <p className='movieGenres'>{movieInfo.genres ? movieInfo.genres.map((genre) => `${genre.name} `) : <></>}</p>
                <p className='movieCountries'>{movieInfo.production_countries ? movieInfo.production_countries.map((country) => `${country.iso_3166_1} `) : <></>}</p>
                <p className='movieReleaseDate'><strong>Release date: </strong>{movieInfo.release_date}</p>

                <p className='movieCast'><strong>Cast: </strong>{movieInfo.credits ? movieInfo.credits.cast.slice(0, 3).map((cast) => {
                    if (cast.order === 2) {
                        return `${cast.name}`;
                    } else {
                        return `${cast.name}, `;
                    }
                }) : <></>}</p>

                <p className='movieDirectors'><strong>Director: </strong>{directors ? directors.map((director, index) => {
                    if (directors.length > 1) {
                        if (directors.length - 1 === index) {
                            return director.name;
                        } else {
                            return `${director.name}, `
                        }
                    } else {
                        return director.name;
                    }
                }) : <></>}</p>

                <p className='movieProducers'><strong>Producer: </strong>{producers ? producers.map((producer, index) => {
                    if (producers.length > 1) {
                        if (producers.length - 1 === index) {
                            return producer.name;
                        } else {
                            return `${producer.name}, `
                        }
                    } else {
                        return producer.name;
                    }
                }) : <></>}</p>

                <p>{movieInfo.runtime} minutes</p>
                <p className='movieDesc'>{movieInfo.overview}</p>
                <div className='screeningsContainer'>
                    {movieScreenings.map((screening) => {
                        displayData = {...displayData, hall_id: screening.hall_id, starting_date_time: screening.starting_date_time, ticket_price: screening.ticket_price};
                        return (
                            <Link to={`/screening/${screening.id}`} key={screening.id} state={displayData}>
                                <article className='screeningBlock'>
                                    <div className='pauseContainer'>
                                        {screening.first_pause === 1 ? <span>*</span> : <></>}
                                        {screening.second_pause === 1 ? <span>*</span> : <></>}
                                    </div>
                                    <p>{screening.starting_date_time}</p>
                                    <p>{screening.vision_name}</p>
                                </article>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </article>
    );
}
export default MovieCard;