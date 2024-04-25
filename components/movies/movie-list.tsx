import React, { useRef, useContext, useMemo } from "react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import Movie from "./movie";
import classes from './movies-list.module.css'
import { MovieListProps  } from "../../lib/types";
import MovieContext from "../../context/MovieContext";


const MovieList = ({ title, movieslist }: MovieListProps) => {
  const carouselRef = useRef<AliceCarousel | null>(null);

  const responsive = {
    0: { items: 2 },
    576: { items: 3 },
    1024: { items: 4 },
    1440: { items: 5 }
};

const movieListItems = useMemo(() => {
  return  movieslist.map((movie, index) => (
    <div key={index} className="px-6 md:px-10 lg:px-6 lg:py-6 lg:mx-2 max-w-[100vw]" aria-label={`List of ${title} movies`}>
      <Movie movie={movie} index={index} isWatchlist={false} />
      </div>
    ))
},[])

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
          items={movieslist}
          responsive={responsive}
  ref={carouselRef}
  mouseTracking={true}
          >
        {movieListItems}
          </AliceCarousel>
        </div>
          
         

     
        
      </div>
    </section>
  );
}

export default MovieList;