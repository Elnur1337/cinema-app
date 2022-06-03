import {useState, useContext} from 'react';
import { navbarLinks } from "../data";
import { DayContext } from './pages/Screenings';

const Daysbar = () => {
    const [activeLink, setActiveLink] = useState(0);;
    const dayState = useContext(DayContext);
    const setActiveDay = dayState[1];
    return (
        <div className='daysnav'>
            <ul>
                {navbarLinks.map((item) => {
                    return (
                        <li key={item.id} className={item.id === activeLink ? "activeLink" : "normalLink"} onClick={() => {
                            setActiveLink(item.id);
                            setActiveDay(item.link);
                        }}>{item.link}</li>
                    );
                })}
            </ul>
        </div>
    );
}
export default Daysbar;