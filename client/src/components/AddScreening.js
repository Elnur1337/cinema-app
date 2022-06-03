import { useState, useEffect } from "react";
import Axios from "axios";

//Components
import MoviePoster from "./MoviePoster";

const AddScreening = () => {
    const [movies, setMovies] = useState([]);
    const [queryInput, setQueryInput] = useState([]);
    const [movieQueryInput, setMovieQueryInput] = useState('https://api.themoviedb.org/3/search/movie?api_key=4b6436d292773d44d93cef444468c5ef&query=doctor strange');
    const [halls, setHalls] = useState([]);
    const [screeningTypes, setScreeningTypes] = useState([]);
    const [selectedMovieName, setSelectedMovieName] = useState('');

    //Input states
    const [selectedMovieId, setSelectedMovieId] = useState(0);
    const [startingDateTime, setStartingDateTime] = useState('');
    const [startingDateTimeReq, setStartingDateTimeReq] = useState('');
    const [firstPause, setFirstPause] = useState(false);
    const [secondPause, setSecondPause] = useState(false);
    const [ticketPrice, setTicketPrice] = useState(8.00);
    const [selectedHall, setSelectedHall] = useState(1);
    const [selectedVision, setSelectedVision] = useState(1);
    const [selectedType, setSelectedType] = useState(1);

    const [movieRuntime, setMovieRuntime] = useState(0);
    
    let startingDateTimeTemp;

    useEffect(() => {
        Axios.get('http://localhost:3001/gethalls')
        .then((res) => {setHalls(res.data);});
        Axios.get('http://localhost:3001/getscreeningtypes')
        .then((res) => {setScreeningTypes(res.data);});
    }, []);

    useEffect(() => {
        Axios.get(movieQueryInput)
        .then((res) => {setMovies(res.data.results);});
        return () => setMovies([]);
    }, [movieQueryInput]);

    const handleSumbit = (e) => {
        e.preventDefault();
        console.log(startingDateTimeReq);
        const data = {
            selectedMovieId,
            'startingDateTime': startingDateTimeReq,
            movieRuntime, 
            firstPause,
            secondPause,
            ticketPrice,
            selectedHall,
            selectedVision,
            selectedType 
        }
        Axios.post('http://localhost:3001/addscreening', data)
        .then((res) => {console.log(res);})
    }
    return (
        <section className="addScreeningSection">
            <h2>Add screening</h2>
            <form onSubmit={handleSumbit}>
                <div className="formControl">
                    <label htmlFor="queryInput">Movie title:</label>
                    <input type="text" name="queryInput" id="queryInput" value={queryInput} onChange={(e) => {
                        setQueryInput(e.target.value);
                        if(queryInput.length > 1) {
                            setMovieQueryInput(`https://api.themoviedb.org/3/search/movie?language=en-US&api_key=4b6436d292773d44d93cef444468c5ef&query=${queryInput}`);
                        }
                    }} />
                </div>
            <section className="movieSelector">
                {movies.map((movie) => {
                    return <MoviePoster key={movie.id} data={movie} setSelectedMovieId={setSelectedMovieId} setMovieRuntime={setMovieRuntime} setSelectedMovieName={setSelectedMovieName}/>
                })}
            </section>
            <h3>{selectedMovieName}</h3>
                <div className="formControl">
                    <label htmlFor="startingDateTime">Starting date and time:</label>
                    <input type="datetime-local" name="startingDateTime" id="startingDateTime" required value={startingDateTime} onChange={(e) => {
                            setStartingDateTime(e.target.value);
                            const x = document.querySelector('#startingDateTime').value;
                            startingDateTimeTemp = x.replace('T', ' ');
                            startingDateTimeTemp += ':00';
                            setStartingDateTimeReq(startingDateTimeTemp);
                        }}/>
                </div>
                <div className="formControl">
                    <label htmlFor="firstPause">First pause:</label>
                    <input type="checkbox" name="firstPause" id="firstPause" value={firstPause} onChange={(e) => {setFirstPause(e.target.value)}}/>
                </div>
                <div className="formControl">
                    <label htmlFor="secondPause">Second pause:</label>
                    <input type="checkbox" name="secondPause" id="secoundPause" value={secondPause} onChange={(e) => {setSecondPause(e.target.value)}}/>
                </div>
                <div className="formControl">
                    <label htmlFor="ticketPrice">Ticket price:</label>
                    <input type="number" name="ticketPrice" id="ticketPrice" required value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)}/>
                </div>
                <div className="formControl">
                    <label htmlFor="hall">Hall:</label>
                    <select name="hall" id="hall" required value={selectedHall} onChange={(e) => setSelectedHall(e.target.value)}>
                        {halls.map((hall) => {
                            return (
                                <option key={hall.id} value={hall.id}>{`Hall ${hall.id} - ${hall.type_name}`}</option>
                            );
                        })}
                    </select>
                </div>
                <div className="formControl">
                    <label htmlFor="vision">Vision:</label>
                    <select name="vision" id="vision" required value={selectedVision} onChange={(e) => setSelectedVision(e.target.value)}>
                        {halls.map((vision) => {
                            if (vision.id <= selectedHall) {
                                return (
                                    <option key={vision.id} value={vision.id}>{vision.type_name}</option>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </select>
                </div>
                <div className="formControl">
                    <label htmlFor="type">Screening type:</label>
                    <select name="type" id="type" required value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                        {screeningTypes.map((type) => {
                            return (
                                <option key={type.id} value={type.id}>{type.type_name}</option>
                            );
                        })}
                    </select>
                </div>
                <input type="submit" value="Add screening" className="sellBtn"/>
            </form>
        </section>
    );
}
export default AddScreening;