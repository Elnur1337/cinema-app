import { useState } from "react";
import { Link } from "react-router-dom";
import { adminNavbarLinks } from "../data";

const AdminNavbar = ({setShownAdminPage}) => {
    const [activeLink, setActiveLink] = useState(2);
    return (
        <nav>
            <ul>
                {adminNavbarLinks.map((item) => {
                    if (item.id === 1) {
                        return(
                            <li key={item.id} className='normalLink'><Link to={'/'}>Home</Link></li>
                        );
                    } else {
                        return (
                            <li key={item.id} className={activeLink === item.id ? 'activeLink' : 'normalLink'} onClick={() => {
                                setActiveLink(item.id);
                                setShownAdminPage(item.link);
                            }}>{item.link}</li>
                        );
                    }
                })}
            </ul>
        </nav>
    );
}
export default AdminNavbar;