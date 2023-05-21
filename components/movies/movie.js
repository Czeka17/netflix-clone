import { useState, useEffect } from 'react';
import {AiOutlineEllipsis, AiOutlineLike} from 'react-icons/ai'
import { BsPlusLg, BsCheckLg } from "react-icons/bs";

import { useSession } from 'next-auth/react';
import { saveLikesToLocalStorage, loadLikesFromLocalStorage } from '@/store/storage';

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
    return data;
  } catch (error) {
    throw new Error(error.message || 'Something went wrong!');
  }
};
function Movie(props){
  const { data: session, status } = useSession()
  const [likes, setLikes] = useState(loadLikesFromLocalStorage());
  const [newWatchlist, setNewWatchlist] = useState([])
  const [showButtons, setShowButtons] = useState(false);

  
  useEffect(() => {
    const storedLikes = loadLikesFromLocalStorage();
    setLikes(storedLikes);
  }, []);

  useEffect(() => {
    saveLikesToLocalStorage(likes);
  }, [likes]);

  function likeHandler(movieId) {
    setLikes((prevLikes) => {
      const updatedLikes = { ...prevLikes, [movieId]: !prevLikes[movieId] };
      return updatedLikes;
    });
  }
  
  useEffect(() => {
    function handleResize() {
      setShowButtons(window.innerWidth >= 1024); 
    }
    handleResize(); 
    window.addEventListener("resize", handleResize); 
    return () => window.removeEventListener("resize", handleResize); 
  }, []);

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



  useEffect(() => {
    setNewWatchlist([...props.watchlist]);
  }, [props.watchlist]);


     return  <div
            key={props.index}
            onMouseEnter={() => props.handleMovieHover(props.movie)}
            onMouseLeave={() => props.handleMouseLeave()}
            className="h-full w-full my-2 cursor-pointer" tabindex="0"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="hover:scale-125 hover:-translate-y-1/2 hover:z-30 relative lg:py-0 my-24 py-4 duration-300 overflow-visible" tabindex="0">
              <img
                className="overflow-visible z-20 focus:outline-none"
                src={`https://image.tmdb.org/t/p/original/${props.movie?.backdrop_path}`}
                alt={props.movie?.title}
                onClick={props.isHovering ? props.handleMovieClick : undefined}
              />
             {props.selectedMovie?.title !== props.movie.title && <p className='flex justify-center items-center text-center text-white text-xs lg:text-base p-2'>{props.movie.title}</p>}
              {props.isHovering && props.selectedMovie?.id === props.movie.id && (
                <div className="absolute -bottom-100 left-0 right-0 bg-gray-700 rounded-br rounded-bl text-center py-2">
                  <p className="text-xs text-white pb-2 lg:text-base">{props.movie?.title}</p>
                  <p className={`pb-2 text-xs ${
                  props.movie?.vote_average > 6.9 ? "text-green-500" : "text-yellow-500"
                }`}>Vote average: {props.movie?.vote_average}</p>
                  <div className="flex justify-around items-center pb-2">
                    <div className="flex flex-col justify-center items-center group">
                      <AiOutlineLike className={`text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500 hover:fill-blue-500 md:w-[34px] py-1 md:py-0 ${likes[props.movie.id] ? 'fill-blue-700' : 'fill-white'}`} onClick={() => likeHandler(props.movie.id)}  style={{ transform: likes[props.movie.id] ? 'scale(1.2)' : 'scale(1)' }}/>
                      {showButtons && <span className={`text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${likes[props.movie.id] ? 'text-blue-700' : 'text-white'}`}>
                      {likes[props.movie.id] ? 'Liked' : 'Like'}
                      </span>}
                    </div>
                    <div className="flex flex-col justify-center items-center group text-white md:w-[70px]" onClick={movielistHandler}>
                    {newWatchlist.map(item => item.id).includes(props.movie.id) ? (
    <BsCheckLg className="text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500 py-1 md:py-0" />
  ) : (
    <BsPlusLg className="text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500 py-1 md:py-0" />
  )}
  {showButtons &&<span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    {newWatchlist.map(item => item.id).includes(props.movie.id) ? 'Added to list' : 'Add to list'}
  </span>}
</div>

                    <div className="flex flex-col justify-center items-center group text-white">
                      <AiOutlineEllipsis className="text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500 text-white py-1 md:py-0"
  onClick={props.handleMovieClick}
/>
                {showButtons && <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    More
                  </span>}
                </div>
                </div>
                </div>
              )}
              </div>
            </div>
}
export default Movie;