import React, { useMemo } from "react";
import Movie from "./movie";
import classes from './movies-list.module.css'
import { MovieListProps  } from "../../lib/types";
import Slider from "react-slick";
import { MdArrowBackIosNew, MdArrowForwardIos} from "react-icons/md";
const MovieList = ({ title, movieslist }: MovieListProps) => {
  function SampleNextArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        style={{ ...style }}
        onClick={onClick}
      ><MdArrowForwardIos className="absolute top-1/2 left-[101%] transform -translate-x-1/2 -translate-y-1/2 text-3xl lg:text-5xl text-red-700 duration-200 hover:scale-125 z-40 cursor-pointer"/></div>
    );
  }
  
  function SamplePrevArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        style={{ ...style }}
        onClick={onClick}
      ><MdArrowBackIosNew className="absolute top-1/2 left-[-1%] transform -translate-x-1/2 -translate-y-1/2 text-3xl lg:text-5xl text-red-700 duration-200 hover:scale-125 z-40 cursor-pointer"/></div>
    );
  }
const settings = {
  infinite: true,
  speed: 500,
  slidesToShow:5,
  slidesToScroll: 2,   
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
   { 
    breakpoint:320,
    settings:{
      slidesToShow:1,
      slidesToScroll:1
    }
    }
  ],
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
};

const movieListItems = useMemo(() => {
  return  movieslist.map((movie, index) => (
    <div key={index} className="lg:px-12 xl:px-8 py-6 lg:px-4 px-6 max-w-[100vw]" aria-label={`List of ${title} movies`}>
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
      <div className="relative px-6 py-4">
        <div className="slider-container relative">
        <Slider {...settings} className="px-2 ">
        {movieListItems}
        </Slider>
        </div>    
      </div>
    </section>
  );
}

export default MovieList;
