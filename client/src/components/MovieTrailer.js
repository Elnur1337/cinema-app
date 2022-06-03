import YouTube from 'react-youtube';

const MovieTrailer = ({videos}) => {
    console.log(videos);
    return (
        <section className='movieTrailer'>
            {videos.map((video) => {
                return (
                    <YouTube key={video.key} videoId={video.key}/>
                );
            })}
        </section>
    );
}
export default MovieTrailer;