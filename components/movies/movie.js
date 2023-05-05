import { useState, useEffect } from 'react';
import {AiOutlineEllipsis, AiOutlineLike} from 'react-icons/ai'
import { BsPlusLg, BsCheckLg } from "react-icons/bs";

import { useSession } from 'next-auth/react';

async function addMovieHandler(email,movie){
  const response = await fetch('/api/watchlist/watchlist', {
    method: 'POST',
    body: JSON.stringify({email,movie}),
    headers: {
			'Content-Type': 'application/json'
		}
  })
  const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Something went wrong!')
    }
    return data;
}
async function deleteMovieHandler(email, movie) {

  try {
    console.log(email, movie)
    const response = await fetch('/api/watchlist/deleteMovie', {
      method: 'POST',
      body: JSON.stringify({email,movie}),
      headers: {
        'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message || 'Something went wrong!');
  }
};
function Movie(props){
  const { data: session, status } = useSession()
  const [isLiked, setIsLiked] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState([])
  const [newWatchlist, setNewWatchlist] = useState([...isInWatchlist])

  async function movielistHandler() {
      if(newWatchlist.map(item => item.id).includes(props.movie.id)){
        const result = await deleteMovieHandler(session.user.email, props.selectedMovie)
        const indexToDelete = newWatchlist.findIndex(movie => movie.id === props.selectedMovie.id);
        const updatedWatchlist = [...newWatchlist.slice(0, indexToDelete), ...newWatchlist.slice(indexToDelete + 1)];
        setNewWatchlist(updatedWatchlist)
        return result
      }else{
        const result = await addMovieHandler(session.user.email, props.selectedMovie)
        const updatedWatchlist =  [...newWatchlist, props.selectedMovie]
        setNewWatchlist(updatedWatchlist)
        return result
      }
  }

  function likeHandler(){
    setIsLiked((prevstate) => !prevstate)
  }

  useEffect(() => {
    setNewWatchlist([...isInWatchlist]);
  }, [isInWatchlist]);

  useEffect(() => {
    setIsInWatchlist(props.watchlist)
  }, [])

     return  <div
            key={props.index}
            onMouseEnter={() => props.handleMovieHover(props.movie)}
            onMouseLeave={() => props.handleMouseLeave()}
            className="h-[100px] w-[170px] h-full w-full lg:h-[250px] md:w-[250px] md:h-[200px] lg:w-[250px] my-10 lg:my-0 cursor-pointer mx-2 px-2"
          >
            <div className="hover:scale-125 hover:-translate-y-1/2 hover:z-30 relative my-24 py-4 duration-300 overflow-visible">
              <img
                className="overflow-visible z-20"
                src={`https://image.tmdb.org/t/p/original/${props.movie?.backdrop_path}`}
                alt={props.movie?.title}
                onClick={props.handleMovieClick}
              />
             {props.selectedMovie?.title !== props.movie.title && <p className='flex justify-center items-center text-center text-white'>{props.movie.title}</p>}
              {props.isHovering && props.selectedMovie?.id === props.movie.id && (
                <div className="absolute -bottom-1/2 left-0 right-0 bg-gray-700 rounded-b text-center py-2">
                  <h2 className=" text-white pb-2">{props.movie?.title}</h2>
                  <p className={`pb-2 ${
                  props.movie?.vote_average > 6.9 ? "text-green-500" : "text-yellow-500"
                }`}>Vote average: {props.movie?.vote_average}</p>
                  <div className="flex justify-evenly">
                    <div className="flex flex-col justify-center items-center group">
                      <AiOutlineLike className={`text-2xl cursor-pointer mx-1 transition-all duration-300 group-hover:text-blue-500 ${isLiked ? 'fill-blue-700' : ''}`} onClick={likeHandler}  style={{ transform: isLiked ? 'scale(1.2)' : 'scale(1)' }}/>
                      <span className={`text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isLiked ? 'text-blue-700' : 'text-white'}`}>
                        {isLiked ? 'liked' : 'like'}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center items-center group text-white" onClick={movielistHandler}>
  {newWatchlist.map(item => item.id).includes(props.movie.id) ? (
    <BsCheckLg className="text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500" />
  ) : (
    <BsPlusLg className="text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500" />
  )}
  <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    {newWatchlist.map(item => item.id).includes(props.movie.id) ? 'Delete from list' : 'Add to list'}
  </span>
</div>

                    <div className="flex flex-col justify-center items-center group text-white">
                      <AiOutlineEllipsis className="text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500 text-white"
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