import { useState, useEffect } from "react";
import Axios from 'axios';

//Components
import ReqCard from "./ReqCard";

const PrivateReqs = () => {
    const [reqs, setReqs] = useState([]);
    useEffect(() => {
        Axios.get('http://localhost:3001/getprivatereqs')
        .then((res) => {setReqs(res.data);});
    }, []);
    return (
        <section className="reqsList">
            {reqs.map((req) => {
                return <ReqCard key={req.id} data={req} reqs={reqs} setReqs={setReqs}/>
            })}
            {reqs.length === 0 && <p className="noMoreReqs">Yay, no more requests!</p>}
        </section>
    );
}
export default PrivateReqs;