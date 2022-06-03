import {useState} from 'react';
import { FaUserAlt } from 'react-icons/fa';

const Cast = ({cast}) => {
    const [numberOfShownCast, setNumberOfShownCast] = useState(10);
    const shownCast = cast.slice(0,numberOfShownCast);
    return (
        <section className='castSection'>
            <h3>Actors</h3>
            <div className='castCards'>
                {shownCast.map((person) => {
                    const personImg = `https://image.tmdb.org/t/p/original${person.profile_path}`;
                    return (
                        <article key={person.credit_id} className="creditsCard">
                            {person.profile_path ? <img src={personImg} alt="person" className='castImg'/> : <FaUserAlt size='7rem'/>}
                            <h4>{person.name}</h4>
                            <p>{person.character}</p>
                        </article>
                    );
                })}
            </div>
            {cast.length === shownCast.length ? <></> : <button className='sellBtn loadMoreBtn' onClick={() => {setNumberOfShownCast(numberOfShownCast + 10)}}>Load more</button>}
        </section>
    );
}
export default Cast;