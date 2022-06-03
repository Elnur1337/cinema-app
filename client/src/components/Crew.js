import {useState} from 'react';

const Crew = ({crew}) => {
    const [numberOfShownCrew, setNumberOfShownCrew] = useState(10);
    const shownCrew = crew.slice(0,numberOfShownCrew);
    return (
        <section className='castSection'>
            <h3>Crew</h3>
            <div className='castCards'>
                {shownCrew.map((person) => {
                    const personImg = `https://image.tmdb.org/t/p/original${person.profile_path}`;
                    return (
                        <article key={person.credit_id} className="creditsCard">
                            <img src={personImg} alt="person" className='castImg'/>
                            <h4>{person.name}</h4>
                            <p>{person.job}</p>
                        </article>
                    );
                })}
            </div>
            {crew.lenght === shownCrew.lenght ? <></> : <button onClick={() => {setNumberOfShownCrew(numberOfShownCrew + 10)}}>Load more</button>}
        </section>
    );
}
export default Crew;