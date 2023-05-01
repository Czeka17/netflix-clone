import { useEffect, useState, useRef } from "react";

import Modal from "../layout/modal";
import { useSession } from "next-auth/react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import Movie from "./movie";
import Notification from "../layout/notification";
import { MdArrowBackIosNew, MdArrowForwardIos} from "react-icons/md";
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
function MovieList({ title, movieslist }) {
  const { data: session, status } = useSession()

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();
  const carouselRef = useRef()

    useEffect(() => {
      if(requestStatus === 'success' || requestStatus === 'error'){
          const timer = setTimeout(() =>{
              setRequestStatus(null);
              setRequestError(null)
          }, 3000);

          return () => clearTimeout(timer);
      }
  }, [requestStatus])

  async function addToWatchlistHandler() {
    try{
      setRequestStatus('pending')
    const result = await addMovieHandler(session.user.email, selectedMovie)
    console.log(result)
    setRequestStatus('success')
    return result
    }catch(error){
      setRequestError(error.message)
      setRequestStatus('error')
    }
  }

  const handlePrevButtonClick = () => {
    carouselRef.current.slidePrev(); 
  };

  const handleNextButtonClick = () => {
    carouselRef.current.slideNext();
  };
  const handleMovieClick = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
      setMovies(movieslist);
  }, [movieslist]);

  const responsive = {
    0: { items: 2 },
    576: { items: 3 },
    1024: { items: 4 },
    1440: { items: 5 }
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

  let notification;

  if(requestStatus === 'pending'){
    notification = {
        status: 'pending',
        title: 'Checking if movie is in list...',
        message: 'Checking if movie is in list'
    }
}

if(requestStatus === 'success') {
    notification = {
        status: 'success',
        title: 'Success!',
        message: 'Movie added successfully'
    }
}
if(requestStatus === 'error') {
    notification = {
        status: 'error',
        title: 'Error!',
        message: requestError
    }
}

  return (
    <div className="py-2 px-2 lg:px-10 w-full text-white overflow-visible">
      <h2 className="m-2 text-3xl font-bold">{title}</h2>
      <div className="relative">
        <AliceCarousel
        infinite
          items={movies}
          responsive={responsive}
  disableDotsControls={true}
  disableButtonsControls={true}
  ref={carouselRef} 
          >
        {movies.map((movie, index) => (
          <Movie movie={movie} index={index} isHovering={isHovering} addToWatchlistHandler={addToWatchlistHandler} selectedMovie={selectedMovie} handleMovieClick={handleMovieClick} handleMovieHover={handleMovieHover} handleMouseLeave={handleMouseLeave} />
          ))}
          </AliceCarousel>
          {showModal && <Modal movie={selectedMovie} showModal={showModal} hideModal={hideModal} />}
          <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-3 text-5xl text-red-800 h-1/2 hover:bg-black hover:bg-opacity-50 duration-200"
        onClick={handlePrevButtonClick}
      >
        <MdArrowBackIosNew />
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-3 text-5xl text-red-800 h-1/2 hover:bg-black hover:bg-opacity-50 duration-200"
        onClick={handleNextButtonClick}
      >
        <MdArrowForwardIos />
      </button>
      </div>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <hr className="border-t border-red-800 my-4"/>
    </div>
  );
}

export default MovieList;