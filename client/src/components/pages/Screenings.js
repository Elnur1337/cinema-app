import React, { useState } from 'react'

import Navbar from '../Navbar';
import Daysbar from '../Daysbar';
import MovieList from '../MovieList';

export const DayContext = React.createContext();

const Screenings = () => {
    const [activeDay, setActiveDay] = useState("Monday");
    return (
        <DayContext.Provider value={[activeDay, setActiveDay]}>
            <Navbar/>
            <Daysbar/>
            <MovieList/>
        </DayContext.Provider>
    );
}
export default Screenings;