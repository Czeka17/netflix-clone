import {AiOutlineEllipsis, AiOutlineLike} from 'react-icons/ai'
import { BsPlusLg } from "react-icons/bs";

function Movie(props){
     return <div
            key={props.index}
            onMouseEnter={() => props.handleMovieHover(props.movie)}
            onMouseLeave={() => props.handleMouseLeave()}
            className="h-[175px] w-[175px] lg:h-[250px] lg:w-[250px]"
          >
            <div className="hover:scale-125 hover:-translate-y-1/2 hover:z-20 relative my-20 py-4 duration-300 overflow-visible mx-2">
              <div className="absolute w-[50px] h-[200px] bg-gradient-to-r from-black"></div>
              <img
                className="overflow-visible z-20"
                src={`https://image.tmdb.org/t/p/original/${props.movie?.backdrop_path}`}
                alt={props.movie?.title}
              />
              {props.isHovering && props.selectedMovie?.id === props.movie.id && (
                <div className="absolute -bottom-1/2 left-0 right-0 bg-gray-700 rounded-b text-center">
                  <h2 className=" text-white pb-2">{props.movie?.title}</h2>
                  <p className="pb-2">Vote average: {props.movie?.vote_average}</p>
                  <div className="flex justify-evenly">
                    <div className="flex flex-col justify-center items-center group">
                      <AiOutlineLike className="text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500" />
                      <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Like
                      </span>
                    </div>
                    <div className="flex flex-col justify-center items-center group" onClick={props.addToWatchlistHandler}>
                      <BsPlusLg className="text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500" />
                      <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Add to list
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