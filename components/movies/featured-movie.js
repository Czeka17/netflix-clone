import { useEffect, useState } from "react";
import requests from "@/Requests";
import axios from "axios";
import {AiOutlineQuestionCircle} from 'react-icons/ai'
import {BsFillPlayCircleFill} from 'react-icons/bs'
import Modal from "../layout/modal";
function MovieList() {
  

  const [movies,setMovies] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (e) => {
    e.preventDefault();
    setSelectedMovie(movie)
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };
 
  const randomMovie = Math.floor(Math.random() * movies.length);
  const movie = selectedMovie || movies[randomMovie];
  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results)
    })
  }, [])


  return (
    <div className="w-full h-[650px] text-white mb-10">
      {showModal && <Modal hideModal={hideModal} movie={movie} showModal={showModal} />}
      <div className="w-full h-full">
        <div className="absolute w-full h-[650px] bg-gradient-to-r from-black"></div>
    <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
    <div className="absolute w-full top-[20%] p-4 md:p-8">
      <h2 className="my-4 text-5xl font-bold">{movie?.title}</h2>
      <p className="flex max-w-sm my-4">{movie?.overview}</p>
      <div className="flex flex-col items-start">
        <a href={`https://www.youtube.com/results?q=${movie?.title}+trailer`} target="_blank" className="py-2 px-8 my-2 bg-white text-black rounded font-bold flex items-center"><BsFillPlayCircleFill className="m-1 text-xl'" /> Play</a>
        <button className="py-2 px-8 my-2 bg-neutral-700  rounded font-bold flex items-center" onClick={handleMovieClick }><AiOutlineQuestionCircle className="m-1 text-xl" /> More information</button>
        <p className={`${
                  movie?.vote_average > 6.9 ? "text-green-500" : "text-yellow-500"
                }`}>Vote average: {movie?.vote_average}</p>
      </div>
    </div>
      </div>
    </div>
  )
}

export default MovieList;