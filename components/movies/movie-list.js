import { useEffect, useState } from "react";
import axios from "axios";
import {AiOutlineEllipsis, AiOutlineLike} from 'react-icons/ai'
import { BsPlusLg } from "react-icons/bs";
import Modal from "../layout/modal";
import { useSession } from "next-auth/react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';

async function addMovieHandler(email,movie){
  const response = await fetch('/api/watchlist/watchlist', {
    method: 'POST',
    body: JSON.stringify({email,movie}),
    headers: {
			'Content-Type': 'application/json'
		}
  })
  const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Something went wrong!')
    }
    return data;
}
function MovieList({ title, fetchURL }) {
  const { data: session, status } = useSession()

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);


  async function addToWatchlistHandler() {
    const result = await addMovieHandler(session.user.email, selectedMovie)
    console.log(result)
    return result
  }

  const handleMovieClick = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  const responsive = {
    0: { items: 2 },
    568: { items: 3 },
    1024: { items: 5 },
};

  const handleMovieHover = (movie) => {
    setSelectedMovie(movie);
    setIsHovering(true)
  };

  const handleMouseLeave = () => {
    if (!showModal) {
      setSelectedMovie(null);
      setIsHovering(false)
    }
  };


  return (
    <div className="py-20 px-10 w-full h-[500px] text-white overflow-visible">
      <h2 className="m-2">{title}</h2>
      <div className="relative">
        <AliceCarousel
        infinite
          items={movies}
          responsive={responsive}
  disableDotsControls={true} 
          >
        {movies.map((movie, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMovieHover(movie)}
            onMouseLeave={() => handleMouseLeave()}
            className="h-[175px] w-[175px] lg:h-[250px] lg:w-[250px]"
          >
            <div className="hover:scale-125 hover:-translate-y-1/2 hover:z-20 relative my-20 py-4 duration-300 overflow-visible mx-2">
              <div className="absolute w-[50px] h-[200px] bg-gradient-to-r from-black"></div>
              <img
                className="overflow-visible z-20"
                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                alt={movie?.title}
              />
              {isHovering && selectedMovie?.id === movie.id && (
                <div className="absolute -bottom-1/2 left-0 right-0 bg-gray-700 rounded-b text-center">
                  <h2 className=" text-white pb-2">{movie?.title}</h2>
                  <p className="pb-2">Vote average: {movie?.vote_average}</p>
                  <div className="flex justify-evenly">
                    <div className="flex flex-col justify-center items-center group">
                      <AiOutlineLike className="text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500" />
                      <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Like
                      </span>
                    </div>
                    <div className="flex flex-col justify-center items-center group" onClick={addToWatchlistHandler}>
                      <BsPlusLg className="text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500" />
                      <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Add to list
                      </span>
                    </div>
                    <div className="flex flex-col justify-center items-center group">
                      <AiOutlineEllipsis className="text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500"
  onClick={handleMovieClick}
/>
                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    More
                  </span>
                </div>
                </div>
                </div>
              )}
              </div>
            </div>
          ))}
          </AliceCarousel>
          {showModal && <Modal movie={selectedMovie} showModal={showModal} hideModal={hideModal} />}
      </div>
    </div>
  );
}

export default MovieList;