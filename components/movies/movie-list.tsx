import React, { useEffect, useState, useRef, useContext } from "react";
import Modal from "../layout/modal";
import { useSession } from "next-auth/react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import Movie from "./movie";
import { MdArrowBackIosNew, MdArrowForwardIos} from "react-icons/md";
import classes from './movies-list.module.css'
import { getWatchlistMovies } from "../../lib/api";
import { Movieobj,MovieListProps  } from "../../lib/types";
import MovieContext from "../../context/MovieContext";


function MovieList({ title, movieslist }: MovieListProps) {
  const { data: session, status } = useSession()
  const movieCtx = useContext(MovieContext)
  const [movies, setMovies] = useState<Movieobj[]>([]);
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



  return (
    <section className="relative px-2 w-full text-white overflow-hidden">
  <div className="absolute top-0 left-0 w-0 h-0 border-solid border-t-[0px] border-t-transparent
    border-l-[90vw] border-l-red-700
    border-b-[120px] border-b-transparent"></div>
    <img src="/svg/tv.svg" className={`absolute w-20 lg:w-40 h-40 m-8 opacity-50  ${classes.animateTV}`} alt="" />
    <img src="/svg/film.svg" className={`absolute w-20 lg:w-40 h-40 m-8 opacity-50  ${classes.animateFilm}`} alt="" />
      <div className="relative">
      <h2 className="ml-6 p-4 text-3xl font-bold rounded">{title}</h2>
      </div>
      <div className="relative">
        <div className="lg:pl-14 lg:pr-14 py-6">
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
          <div className="px-6 md:px-10 lg:px-6 lg:py-6 lg:mx-2 max-w-[100vw]" aria-label={`List of ${title} movies`}>
            <Movie movie={movie} index={index}  watchlist={newWatchlist} isWatchlist={false} />
            </div>
          ))}
          </AliceCarousel>
        </div>
          {movieCtx.selectedMovie && movieCtx.showModal && <Modal movie={movieCtx.selectedMovie} />}
          {showButtons && hasScrolled && activeSlideIndex > 0 && <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 lg:mx-4 text-3xl lg:text-5xl text-red-700 h-1/2 duration-200 hover:scale-125 z-40"
        onClick={handlePrevButtonClick}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <MdArrowBackIosNew />
      </button>}
      {showButtons && activeSlideIndex < movies.length-5 && <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 lg:mx-4 text-3xl lg:text-5xl text-red-700 h-1/2 duration-200 hover:scale-125 z-40"
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