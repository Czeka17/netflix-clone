import { useEffect, useState } from "react";
import requests from "@/Requests";
import axios from "axios";
import {AiOutlineQuestionCircle} from 'react-icons/ai'
import {BsFillPlayCircleFill} from 'react-icons/bs'
function MovieList() {

  const [movies,setMovies] = useState([])
 
  const movie = movies[Math.floor(Math.random() * movies.length)]
  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results)
    })
  }, [])

  console.log(movie)

  return (
    <div className="w-full h-[650px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[650px] bg-gradient-to-r from-black"></div>
    <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
    <div className="absolute w-full top-[20%] p-4 md:p-8">
      <h2 className="my-4 text-5xl font-bold">{movie?.title}</h2>
      <p className="flex max-w-2xl my-4">{movie?.overview}</p>
      <div className="flex flex-col items-start">
        <button className="py-2 px-8 my-2 bg-white text-black rounded font-bold flex items-center"><BsFillPlayCircleFill className="m-1 text-xl'" /> Play</button>
        <button className="py-2 px-8 my-2 bg-neutral-700  rounded font-bold flex items-center"><AiOutlineQuestionCircle className="m-1 text-xl" /> More information</button>
        <p>Vote average: {movie?.vote_average}</p>
      </div>
    </div>
      </div>
    </div>
  )
}

export default MovieList;