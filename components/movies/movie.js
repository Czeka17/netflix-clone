import { useState } from 'react';
import {AiOutlineEllipsis, AiOutlineLike} from 'react-icons/ai'
import { BsPlusLg } from "react-icons/bs";

function Movie(props){
  const [isLiked, setIsLiked] = useState(false)
  function likeHandler(){
    setIsLiked((prevstate) => !prevstate)
  }
     return <div
            key={props.index}
            onMouseEnter={() => props.handleMovieHover(props.movie)}
            onMouseLeave={() => props.handleMouseLeave()}
            className="h-[100px] w-[170px] lg:h-[250px] md:w-[250px] md:h-[200px] lg:w-[250px] my-20 lg:my-0 cursor-pointer"
          >
            <div className="hover:scale-125 hover:-translate-y-1/2 hover:z-30 relative my-24 py-4 duration-300 overflow-visible">
              <img
                className="overflow-visible z-20"
                src={`https://image.tmdb.org/t/p/original/${props.movie?.backdrop_path}`}
                alt={props.movie?.title}
                onClick={props.handleMovieClick}
              />
             {props.selectedMovie?.title !== props.movie.title && <p className='flex justify-center items-center'>{props.movie.title}</p>}
              {props.isHovering && props.selectedMovie?.id === props.movie.id && (
                <div className="absolute -bottom-1/2 left-0 right-0 bg-gray-700 rounded-b text-center py-2">
                  <h2 className=" text-white pb-2">{props.movie?.title}</h2>
                  <p className={`pb-2 ${
                  props.movie?.vote_average > 6.9 ? "text-green-500" : "text-yellow-500"
                }`}>Vote average: {props.movie?.vote_average}</p>
                  <div className="flex justify-evenly">
                    <div className="flex flex-col justify-center items-center group">
                      <AiOutlineLike className={`text-2xl cursor-pointer mx-1 transition-all duration-300 group-hover:text-blue-500 ${isLiked ? 'fill-blue-700' : 'fill-white'}`} onClick={likeHandler}  style={{ transform: isLiked ? 'scale(1.2)' : 'scale(1)' }}/>
                      <span className={`text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isLiked ? 'text-blue-700' : 'text-white'}`}>
                        {isLiked ? 'liked' : 'like'}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center items-center group" onClick={props.addToWatchlistHandler}>
                      <BsPlusLg className="text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500" />
                      <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {props.isInWatchlist ? 'Delete from list' : 'Add to list'}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center items-center group">
                      <AiOutlineEllipsis className="text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500"
  onClick={props.handleMovieClick}
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
}
export default Movie;