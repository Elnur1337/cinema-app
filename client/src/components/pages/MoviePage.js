import { useEffect, useState } from "react";
import Axios from 'axios';
import { useParams, Link } from "react-router-dom";

//Components
import Navbar from "../Navbar";
import MovieTrailer from "../MovieTrailer";
import Cast from "../Cast";
import Crew from "../Crew";

const MoviePage = () => {
    const {TMDB_id} = useParams();

    const [movieInfo, setMovieInfo] = useState({});
    const [movieScreenings, setMovieScreenings] = useState([]);
    const [isLoadingInfo, setIsLoadingInfo] = useState(true);
    const [isLoadingScreenings, setIsLoadingScreenings] = useState(true);
    const [isTrailerShown, setIsTrailerShown] = useState(false);

    const [imagePath, setImagePath] = useState('');

    let posterImg, displayData, trailerVideos, cast, crew;

    useEffect(() => {
        const getData = (id) => {
            const url = `https://api.themoviedb.org/3/movie/${id}?api_key=4b6436d292773d44d93cef444468c5ef&append_to_response=credits,videos,images`;
            Axios.get(url).then((res) => {
                setMovieInfo(res.data);
                setIsLoadingInfo(false);
            });
        }
        getData(TMDB_id);
        Axios.post('http://localhost:3001/getscreenings', {
            movie_id: TMDB_id
        }).then((res) => {
            setMovieScreenings(res.data);
            setIsLoadingScreenings(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (!isLoadingInfo && !isLoadingScreenings) {
            const images = movieInfo.images.backdrops;
            setImagePath(`https://image.tmdb.org/t/p/original${images[Math.floor(Math.random() * images.length)].file_path}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingInfo, isLoadingScreenings]);
    if (!isLoadingInfo && !isLoadingScreenings) {
        posterImg = `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`;
        trailerVideos = movieInfo.videos.results.filter((video) => video.site === 'YouTube' && video.type === 'Trailer');
        cast = movieInfo.credits.cast.filter((person) => person.known_for_department === 'Acting');
        crew = movieInfo.credits.crew.filter((person) => person.profile_path !== null);

        displayData = {
            TMDB_id: TMDB_id,
            title: movieInfo.title,
            posterImg,
            adult: movieInfo.adult,
            genres: movieInfo.genres
        }
    }
    return (
        <>
            <Navbar/>
            {isLoadingInfo && isLoadingScreenings ? <></> : 
                <>
                    <header className="moviePage" style={{
                        backgroundImage: `linear-gradient(
                                            90deg,
                                            rgba(0, 0, 0, 0.75) 0%,
                                            rgba(0, 0, 0, 0.75) 100%
                                            ),
                                            url(${imagePath})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover'
                        }}>
                        
                            <img src={posterImg} alt="poster" className="poster" />
                            <div className="movieInfoDiv">
                                <h4>{movieInfo.title}</h4>
                                {movieInfo.adult ? <p>18+</p> : <></>}
                                <p className='movieGenres'>{movieInfo.genres ? movieInfo.genres.map((genre) => `${genre.name} `) : <></>}</p>
                                <p className='movieCountries'>{movieInfo.production_countries ? movieInfo.production_countries.map((country) => `${country.iso_3166_1} `) : <></>}</p>
                                <p className='movieReleaseDate'>{movieInfo.release_date}</p>
                                <p>{movieInfo.runtime} minutes</p>
                                <p className='movieDesc'>{movieInfo.overview}</p>
                                <button onClick={() => {setIsTrailerShown(!isTrailerShown)}} className='sellBtn'>Watch trailer</button>
                                <div className="screenings">
                                    {movieScreenings.map((screening) => {
                                        displayData = {...displayData, hall_id: screening.hall_id, starting_date_time: screening.starting_date_time};
                                        return (
                                            <Link to={`/screening/${screening.id}`} key={screening.id} state={displayData}>
                                                <article className='screeningBlock'>
                                                    {screening.first_pause === 1 ? <span>*</span> : <></>}
                                                    {screening.second_pause === 1 ? <span>*</span> : <></>}
                                                    <p>{screening.starting_date_time}</p>
                                                    <p>{screening.vision_name}</p>
                                                </article>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>        
                    </header>
                    {isTrailerShown ? <MovieTrailer videos={trailerVideos}/> : <></>}
                    {cast ? <Cast cast={cast}/> : <></>}
                    {crew ? <Crew crew={crew}/> : <></>}
                </>   
            }
        </>
    );
}
export default MoviePage;