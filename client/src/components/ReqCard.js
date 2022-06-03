import { useEffect, useState } from "react";
import Axios from 'axios';

const ReqCard = ({data, reqs, setReqs}) => {
    let posterImg;
    const [movieInfo, setMovieInfo] = useState({});

    useEffect(() => {
        Axios.get(`https://api.themoviedb.org/3/movie/${data.TMDB_id}?api_key=4b6436d292773d44d93cef444468c5ef`)
        .then((res) => {setMovieInfo(res.data);});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (movieInfo) {
        posterImg = `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`;
    }
    const acceptHandler = () => {
        const postData = {
            selectedMovieId: data.TMDB_id,
            'startingDateTime': data.starting_date_time.slice(0, 19).replace('T', ' '),
            movieRuntime: movieInfo.runtime,
            firstPause: data.first_pause,
            secondPause: data.second_pause,
            ticketPrice: 0,
            selectedHall: data.hall_id,
            selectedVision: data.vision_id,
            selectedType : 6
        }
        console.log(postData.startingDateTime);
        Axios.post('http://localhost:3001/addscreening', postData)
        .then((res) => {
            console.log(res.data);
            if (res.data === 'Time is already taken!') {
                Axios.post('http://localhost:3001/declinereq', {
                    id: data.id
                }).then((res) => console.log(res));
            } else {
                Axios.post('http://localhost:3001/acceptreq', {
                    id: data.id
                }).then((res) => console.log(res));
            }
        });
        setReqs(reqs.filter((req) => req.id !== data.id));
    }
    const declineHandler = () => {
        Axios.post('http://localhost:3001/declinereq', {
            id: data.id
        }).then((res) => console.log(res));
        setReqs(reqs.filter((req) => req.id !== data.id));
    }
    return (
        <article>
            <img src={posterImg} alt="moviePoster" />
            <div>
                <h4>{movieInfo.title}</h4>
                <p>Starting date and time: {data.starting_date_time_formated}</p>
                {data.first_pause === 1 && <p>First pause: On</p>}
                {data.second_pause === 1 && <p>Second pause: On</p>}
                <p>Number of people: {data.people_number}</p>
                <p>Price: ${data.price}</p>
                <div>
                    <button className="sellBtn acceptBtn" onClick={() => {acceptHandler()}}>Accept</button>
                    <button className="sellBtn" onClick={() => {declineHandler()}}>Decline</button>
                </div>
            </div>
        </article>
    );
}
export default ReqCard;