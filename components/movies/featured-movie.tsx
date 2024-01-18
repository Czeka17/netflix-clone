import React, { useEffect, useState } from "react";
import {AiOutlineQuestionCircle} from 'react-icons/ai'
import Modal from "../layout/modal";
import { Movieobj } from "../../lib/types";
interface FeaturedMovieProps {
  Movies: Movieobj[];
}
const FeaturedMovie: React.FC<FeaturedMovieProps> = ({ Movies }) => {

  const [movies,setMovies] = useState<Movieobj[]>([])
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movieobj|null>(null);

  const handleMovieClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSelectedMovie(movie)
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    setMovies(Movies)
  }, [])
  const randomMovie = Math.floor(Math.random() * movies.length);
  const movie = selectedMovie || movies[randomMovie];

  return (
    <div className="w-full h-[650px] text-white">
      {showModal && <Modal hideModal={hideModal} movie={movie} showModal={showModal} />}
      <div className="w-full h-full relative">
        <div className="absolute w-full h-[650px] bg-gradient-to-r from-black"></div>
    <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
    <div className="absolute w-full bottom-0 p-4 md:p-10">
      <h2 className="my-4 text-2xl lg:text-5xl font-bold max-w-2xl">{movie?.title}</h2>
      <p className="max-w-xs text-sm lg:text-md my-4">
  {movie?.overview && movie.overview.length > 100
    ? `${movie.overview.split(/(?<=\.|\!|\?)\s+/).slice(0, 4).join(' ')}...`
    : movie?.overview}
</p>
<p className={`${
                  movie?.vote_average > 6.9 ? "text-green-500" : "text-yellow-500"
                }`}>Vote average: {movie?.vote_average.toFixed(2)}</p>
      <div className="flex flex-col items-start">
        <button className="py-2 px-8 my-2 bg-neutral-700  rounded font-bold flex items-center hover:bg-neutral-800 duration-300" onClick={handleMovieClick}><AiOutlineQuestionCircle className="m-1 text-xl" /> More information</button>
      </div>
    </div>
      </div>
    </div>
  )
}

export default FeaturedMovie;