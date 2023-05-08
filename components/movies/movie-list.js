import { useEffect, useState, useRef } from "react";
import Modal from "../layout/modal";
import { useSession } from "next-auth/react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import Movie from "./movie";
import Notification from "../layout/notification";
import { MdArrowBackIosNew, MdArrowForwardIos} from "react-icons/md";


function MovieList({ title, movieslist }) {
  const { data: session, status } = useSession()

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();
  const [watchlist, setWatchlist] = useState([]);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const carouselRef = useRef()

  const handleSlideChanged = (event) => {
    if (!hasScrolled) {
      setHasScrolled(true);
    }
    setActiveSlideIndex(event.item);
  };
    useEffect(() => {
      if(requestStatus === 'success' || requestStatus === 'error'){
          const timer = setTimeout(() =>{
              setRequestStatus(null);
              setRequestError(null)
          }, 3000);

          return () => clearTimeout(timer);
      }
  }, [requestStatus])


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
    async function getWatchlistMovies(){
    if (status === 'authenticated') {
      const response = await fetch('/api/watchlist/getWatchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session.user.email }),
      });
      const data = await response.json();
      setWatchlist(data.watchlist);
      console.log(watchlist)
    }
  }
  getWatchlistMovies()
  }, []);


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

  console.log('movie-list')

  return (
    <section className="relative py-2 px-2 w-full text-white overflow-visible bg-neutral-900">
  <div className="absolute top-0 left-0 w-0 h-0 ml-4 lg:ml-10 border-solid border-t-[0px] border-t-transparent
    border-l-[90vw] border-l-red-700
    border-b-[120px] border-b-transparent"></div>
      <div className="relative">
      <h2 className="ml-6 p-4 text-3xl font-bold rounded">{title}</h2>
      </div>
      <div className="relative">
        <div className="mx-6 lg:pl-20 lg:pr-12 mx-2">
        <AliceCarousel
          items={movies}
          responsive={responsive}
  disableDotsControls={true}
  disableButtonsControls={true}
  ref={carouselRef}
  onSlideChanged={handleSlideChanged}
          >
        {movies.map((movie, index) => (
          <div aria-label={`List of ${title} movies`}>
            <Movie movie={movie} index={index} isHovering={isHovering} selectedMovie={selectedMovie} watchlist={watchlist} handleMovieClick={handleMovieClick} handleMovieHover={handleMovieHover} handleMouseLeave={handleMouseLeave} />
            </div>
          ))}
          </AliceCarousel>
        </div>
          {showModal && <Modal movie={selectedMovie} showModal={showModal} hideModal={hideModal} />}
          {hasScrolled && activeSlideIndex > 0 && <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 lg:mx-4 pb-10 text-3xl lg:text-5xl text-red-700 h-1/2 duration-200 hover:scale-125 z-50"
        onClick={handlePrevButtonClick}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <MdArrowBackIosNew />
      </button>}
      {activeSlideIndex < movies.length-5 && <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 pb-10 lg:mx-4 text-3xl lg:text-5xl text-red-700 h-1/2 duration-200 hover:scale-125 z-50"
        onClick={handleNextButtonClick}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <MdArrowForwardIos />
      </button>}
      </div>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
    </section>
  );
}

export default MovieList;