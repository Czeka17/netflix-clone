import React, { useEffect, useState, useRef } from "react";
import Modal from "../layout/modal";
import { useSession } from "next-auth/react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import Movie from "./movie";
import { MdArrowBackIosNew, MdArrowForwardIos} from "react-icons/md";
import classes from './movies-list.module.css'
import { getWatchlistMovies } from "../../lib/api";
import { Movieobj } from "../../lib/types";

  interface MovieListProps {
    title: string;
    movieslist: Movieobj[];
  };

function MovieList({ title, movieslist }: MovieListProps) {
  const { data: session, status } = useSession()

  const [movies, setMovies] = useState<Movieobj[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movieobj |null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [watchlist, setWatchlist] = useState<Movieobj[]>([]);
  const [newWatchlist, setNewWatchlist] = useState<Movieobj[]>([])
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const carouselRef = useRef<AliceCarousel | null>(null);

  const handleSlideChanged = (event: {item:number}) => {
    if (!hasScrolled) {
      setHasScrolled(true);
    }
    setActiveSlideIndex(event.item);
  };



  useEffect(() => {
    function handleResize() {
      setShowButtons(window.innerWidth >= 1024); 
    }
    handleResize(); 
    window.addEventListener("resize", handleResize); 
    return () => window.removeEventListener("resize", handleResize); 
  }, []);


  const handlePrevButtonClick = () => {
    carouselRef.current?.slidePrev(); 
  };

  const handleNextButtonClick = () => {
    carouselRef.current?.slideNext();
  };
  const handleMovieClick = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    async function fetchWatchlist() {
      if (status === 'authenticated' && session?.user) {
        const watchlist = await getWatchlistMovies(session.user.email);
        setWatchlist(watchlist);
      }
    }
  
    fetchWatchlist();
  }, [session, status]);

  useEffect(() => {
    if (watchlist.length === 0) {
      setNewWatchlist([]);
      return;
    }
    setNewWatchlist([...watchlist]);
  }, [watchlist]);


  useEffect(() => {
      setMovies(movieslist);
  }, [movieslist]);


  const responsive = {
    0: { items: 2 },
    576: { items: 3 },
    1024: { items: 4 },
    1440: { items: 5 }
};

  const handleMovieHover = (movie: Movieobj) => {
    setSelectedMovie(movie);
    setIsHovering(true)
  };

  const handleMouseLeave = () => {
    if (!showModal) {
      setSelectedMovie(null);
      setIsHovering(false)
    }
  };


useEffect(() => {
  const body = document.querySelector("body");
  if (showModal) {
    body?.classList.add("overflow-hidden");
  } else {
    body?.classList.remove("overflow-hidden");
  }
}, [showModal]);


  return (
    <section className="relative py-2 px-2 w-full text-white overflow-hidden">
  <div className="absolute top-0 left-0 w-0 h-0 ml-4 lg:ml-10 border-solid border-t-[0px] border-t-transparent
    border-l-[90vw] border-l-red-700
    border-b-[120px] border-b-transparent"></div>
    <img src="/svg/tv.svg" className={`absolute w-20 lg:w-40 h-40 m-8 opacity-50  ${classes.animateTV}`} alt="" />
    <img src="/svg/film.svg" className={`absolute w-20 lg:w-40 h-40 m-8 opacity-50  ${classes.animateFilm}`} alt="" />
      <div className="relative">
      <h2 className="ml-6 p-4 text-3xl font-bold rounded">{title}</h2>
      </div>
      <div className="relative">
        <div className="lg:pl-14 lg:pr-14">
        <AliceCarousel
          items={movies}
          responsive={responsive}
  disableDotsControls={true}
  disableButtonsControls={true}
  ref={carouselRef}
  onSlideChanged={handleSlideChanged}
  mouseTracking={true}
          >
        {movies.map((movie, index) => (
          <div className="px-5 lg:mx-2" aria-label={`List of ${title} movies`}>
            <Movie movie={movie} index={index} isHovering={isHovering} selectedMovie={selectedMovie} watchlist={newWatchlist} handleMovieClick={handleMovieClick} handleMovieHover={handleMovieHover} handleMouseLeave={handleMouseLeave} />
            </div>
          ))}
          </AliceCarousel>
        </div>
          {selectedMovie && showModal && <Modal movie={selectedMovie} showModal={showModal} hideModal={hideModal} />}
          {showButtons && hasScrolled && activeSlideIndex > 0 && <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 lg:mx-4 pb-10 text-3xl lg:text-5xl text-red-700 h-1/2 duration-200 hover:scale-125 z-40"
        onClick={handlePrevButtonClick}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <MdArrowBackIosNew />
      </button>}
      {showButtons && activeSlideIndex < movies.length-5 && <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 pb-10 lg:mx-4 text-3xl lg:text-5xl text-red-700 h-1/2 duration-200 hover:scale-125 z-40"
        onClick={handleNextButtonClick}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <MdArrowForwardIos />
      </button>}
      </div>
    </section>
  );
}

export default MovieList;