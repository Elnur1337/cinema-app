import {useEffect, useState, useContext} from 'react';
import Axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { MdEventSeat } from 'react-icons/md';

import Navbar from '../Navbar';

const ScreeningPage = () => {
    const {id} = useParams();
    const location = useLocation();
    const displayData = location.state;

    const userData = useContext(UserContext);
    const userId = userData[4];
    const userRole = userData[2];

    const seatSelectorClass = `seatSelector hall${displayData.hall_id}`;

    const [seatsData, setSeatsData] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(0);

    const navigate = useNavigate();
    useEffect(() => {
        if (!displayData) {
        navigate("/");
        } else {
            Axios.post('http://localhost:3001/getscreeningdata', {
                screening_id: id,
                hall_id: displayData.hall_id
            }).then((res) => {setSeatsData(res.data);});
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const buyHandler = () => {
        Axios.post('http://localhost:3001/buyticket', {
            screening_id: id,
            seat_id: selectedSeat,
            user_id: userId
        }).then(() => {navigate('/');});
    }
    let buyData = {
        screening_id: id,
        seat_id: selectedSeat,
        user_id: userId
    }
    return (
        <>
            <Navbar/>
            {displayData ? 
            <section className='bgContainer'>
                <section className='screeningPageMain'>
                    <article>
                        <img src={displayData.posterImg} alt="poster" className='posterImg' />
                        <div className='spInfo'>
                            <p className='movieTitle'>{displayData.title}</p>
                            <p className='movieGenres'>{displayData.genres.map((genre) => `${genre.name} `)}</p>
                            <p className='startingTime'>Starting date and time: {displayData.starting_date_time}</p>
                            <p className='hall'>Hall: {displayData.hall_id}</p>
                        </div>
                    </article>
                    <section className='seatGuideContainer'>
                        <div>
                            <p><MdEventSeat className="seatGuide orange" color="Orange" size="2rem"/>Normal</p>
                            <p><MdEventSeat className="seatGuide darkOranke" color="DarkOrange" size="2rem"/>VIP</p>
                            <p><MdEventSeat className="seatGuide red" color="Red" size="2rem"/>LoveBox</p>
                        </div>
                        <div>
                            <p><MdEventSeat className="seatGuide gray" color="Gray" size="2rem"/>Taken</p>
                            <p><MdEventSeat className="seatGuide lightBlue" color="LightBlue" size="2rem"/>Selected</p>
                        </div>
                    </section>
                </section>
                <section className={seatSelectorClass}>
                    {seatsData.map((seat) => {
                        if (seat.is_taken === 'Taken') {
                            if (seat.type_name === 'LoveBox') {
                                return <MdEventSeat key={seat.id} className="takenSeat" color="gray" size="2rem"/>;
                            } else {
                                return <MdEventSeat key={seat.id} className="takenSeat" color="gray" size="2rem"/>;
                            }
                        } else {
                            if (seat.type_name === 'Normal') {
                                return <MdEventSeat key={seat.id} className="seat" color={seat.id === selectedSeat ? "LightBlue" : "Orange"} size="2rem" onClick={() => {setSelectedSeat(seat.id)}}/>;
                            } else if (seat.type_name === 'VIP') {
                                return <MdEventSeat key={seat.id} className="seat" color={seat.id === selectedSeat ? "LightBlue" : "DarkOrange"} size="2rem" onClick={() => {setSelectedSeat(seat.id)}}/>;
                            } else {
                                return <MdEventSeat key={seat.id} className="seat" color={seat.id === selectedSeat ? "LightBlue" : "Red"} size="2rem" onClick={() => {setSelectedSeat(seat.id)}}/>;
                            }
                        }
                    })}
                </section>
                <p className='price'>Price: ${displayData.ticket_price}</p>
                <div className='btnContainer'>
                    {userRole !== 'Guest' ? selectedSeat ? <button className="buyTicket" onClick={buyHandler} state={buyData}>Buy ticket</button> : <p className="buyTicket disabled">Buy ticket</p> : <></>}
                    {/* {selectedSeat ? <Link to={"/"} className="buyTicket" state={buyData}>Buy ticket</Link> : <p className="buyTicket disabled">Buy ticket</p>} */}
                    {userRole !== 'Member' ? 
                        selectedSeat ? <button className='sellBtn' onClick={() => {
                            Axios.post('http://localhost:3001/sellticket', {
                                screening_id: id,
                                seat_id: selectedSeat
                            }).then(() => {navigate('/');});
                        }}>Sell ticket</button> : <button className='sellBtn' disabled>Sell ticket</button>
                    : <></>}
                </div>
            </section> : 
            <></>}
        </>
    );
}

export default ScreeningPage;