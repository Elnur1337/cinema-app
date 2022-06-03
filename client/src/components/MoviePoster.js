import Axios from 'axios';
import imageNotFound from '../assets/imageNotFound.png';

const MoviePoster = ({data, setSelectedMovieId, setMovieRuntime, setSelectedMovieName}) => {
    const posterImg = `https://image.tmdb.org/t/p/w300${data.poster_path}`;
    return (
        <div className='addScreeningPoster'>
            <img src={data.poster_path ? posterImg : imageNotFound} alt="moviePoster" onClick={() => {
                setSelectedMovieId(data.id);
                setSelectedMovieName(data.title);
                const url = `https://api.themoviedb.org/3/movie/${data.id}?api_key=4b6436d292773d44d93cef444468c5ef`;
                Axios.get(url).then((res) => {setMovieRuntime(res.data.runtime);})
            }}/>
            <h4>{data.title}</h4>
            <p>{data.release_date}</p>
        </div>
    );
}
export default MoviePoster;