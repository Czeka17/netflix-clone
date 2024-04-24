import { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { MovieProps, Movieobj } from '../../lib/types';
import MovieContext from '../../context/MovieContext';
import MovieActions from './movie-actions';

async function addMovieHandler(email: string,movie: { id: number; title: string }){
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
async function deleteMovieHandler(email: string, movie: { id: number; title: string }) {

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
  } catch (error:any) {
    throw new Error(error.message || 'Something went wrong!');
  }
};
function Movie(props: MovieProps){
  const movieCtx = useContext(MovieContext)
  const { data: session, status } = useSession()
  const [newWatchlist, setNewWatchlist] = useState<{ id: number; title: string }[]>([]);


  async function movielistHandler() {
    if(!session || !session.user){
        return;
    }

    const email = session.user.email as string;

      if(newWatchlist.map(item => item.id).includes(props.movie.id)){
        const result = await deleteMovieHandler(email, movieCtx.selectedMovie!)
        const indexToDelete = newWatchlist.findIndex(movie => movie.id === movieCtx.selectedMovie!.id);
        const updatedWatchlist = [...newWatchlist.slice(0, indexToDelete), ...newWatchlist.slice(indexToDelete + 1)];
        setNewWatchlist(updatedWatchlist)
        return result
      }else{
        const result = await addMovieHandler(email, movieCtx.selectedMovie!)
        const updatedWatchlist: { id: number; title: string }[] = [...newWatchlist, movieCtx.selectedMovie!];
        setNewWatchlist(updatedWatchlist);
        return result
      }
  }

  useEffect(() => {
    setNewWatchlist([...props.watchlist]);
  }, [props.watchlist]);


     return  <div
            key={props.index}
            onMouseEnter={() => movieCtx.handleMovieHover(props.movie)}
            onMouseLeave={() => movieCtx.handleMouseLeave()}
            className="h-full w-full my-2 cursor-pointer" tabIndex={0}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className={`hover:scale-125 hover:-translate-y-1/2 hover:z-30 relative lg:py-0 py-4 duration-300 overflow-visible ${props.isWatchlist ? 'my-4' : 'my-32'}`} tabIndex={0}>
              <img
                className="overflow-visible z-20 focus:outline-none"
                src={`https://image.tmdb.org/t/p/original/${props.movie?.backdrop_path}`}
                alt={props.movie?.title}
                onClick={movieCtx.isHovering ? movieCtx.handleMovieClick : undefined}
              />
             {movieCtx.selectedMovie?.title !== props.movie.title && <p className='absolute text-center w-[100%] mt-2 text-white'>{props.movie.title}</p>}
              {movieCtx.isHovering && movieCtx.selectedMovie?.id === props.movie.id && (
                <MovieActions movie={props.movie} newWatchlist={newWatchlist} movielistHandler={movielistHandler} handleMovieClick={movieCtx.handleMovieClick} />
              )}
              </div>
            </div>
}
export default Movie;