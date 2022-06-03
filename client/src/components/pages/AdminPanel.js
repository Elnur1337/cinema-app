import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

//Components
import AdminNavbar from '../AdminNavbar';
import AddScreening from '../AddScreening';
import PrivateReqs from '../PrivateReqs';

const AdminPanel = () => {
    const userData = useContext(UserContext);
    const userRole = userData[2];
    const navigate = useNavigate();
    useEffect(() => {
        if (userRole === 'Member' || userRole === 'Guest') {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [shownAdminPage, setShownAdminPage] = useState('Add screening');
    return (
        <>
            <AdminNavbar shownAdminPage={shownAdminPage} setShownAdminPage={setShownAdminPage}/>
            {shownAdminPage === 'Add screening' && <AddScreening/>}
            {shownAdminPage === 'Private screening requests' && <PrivateReqs/>}
        </>
    );
}
export default AdminPanel;