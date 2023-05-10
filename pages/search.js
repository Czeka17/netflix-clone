import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import requests from "@/Requests";
import axios from 'axios';
import Movie from "@/components/movies/movie";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Modal from "@/components/layout/modal";
import { getWatchlistMovies } from "@/lib/api";
import Fuse from "fuse.js";
function Search({ popularMovies, topRatedMovies, upcomingMovies }){
    const { data: session, status } = useSession()
    const [isHovering, setIsHovering] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [watchlist, setWatchlist] = useState([]);
    const [newWatchlist, setNewWatchlist] = useState([])
    const [showModal, setShowModal] = useState(false);
    const movies = popularMovies.concat(topRatedMovies, upcomingMovies);
    const uniqueMovies = movies.filter((movie, index, self) => 
    index === self.findIndex((m) => (
      m.id === movie.id
    ))
  );

  const options = {
    keys: ['title'],
    threshold: 0.4,
    includeScore: true,
  };
  const fuse = new Fuse(uniqueMovies, options);
  
    const router = useRouter();
  const searchQuery = router.query.q; 
    const searchResults = fuse.search(searchQuery);
    const filteredMovies = searchResults.map(result => result.item);
let sortedMovies
  if(searchQuery){
     sortedMovies = filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
  }
  if(searchQuery === ''){
    sortedMovies = uniqueMovies.sort((a, b) => a.title.localeCompare(b.title));
  }



useEffect(() => {
  async function fetchWatchlist() {
    if (status === 'authenticated') {
      const watchlist = await getWatchlistMovies(session.user.email);
      setWatchlist(watchlist);
    }
  }

  fetchWatchlist();
}, [session, status]);

  useEffect(() => {
    if (watchlist.length === 0) {
      setNewWatchlist([]);
      return;
    }
    setNewWatchlist([...watchlist]);
  }, [watchlist]);

  const handleMovieClick = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };
const handleMovieHover = (movie) => {
    setSelectedMovie(movie);
    setIsHovering(true)
  };

  const handleMouseLeave = () => {
    if (!showModal) {
      setSelectedMovie(null);
      setIsHovering(false)
    }
  };
    
      return (
        <>
        <div className="flex flex-col items-center justify-center pt-24 text-white">
  <h1 className="text-xl">Search Results for <span className="font-bold">{searchQuery}</span></h1>
  <div className="grid grid-cols-1 px-4 mx-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {sortedMovies.map((movie, index) => (
      <div key={movie.id} className="p-2 my-24 md:my-10 mx-10 md:mx-1 h-[10rem]" aria-label={`search result`}>
        <Movie movie={movie} index={index} isHovering={isHovering} selectedMovie={selectedMovie} watchlist={newWatchlist} handleMovieClick={handleMovieClick} handleMovieHover={handleMovieHover} handleMouseLeave={handleMouseLeave} />
      </div>
    ))}
  </div>
  {filteredMovies.length === 0 && searchQuery !== '' && <p className="text-white text-2xl text-center flex justify-center items-center p-6">Cant find movie that you are looking for.</p>}
  {showModal && <Modal movie={selectedMovie} showModal={showModal} hideModal={hideModal} />}
</div>
</>
      );
}
export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
  
    if (!session) {
      return {
        redirect: {
          destination: '/auth',
        },
      };
    }
  
    const popularMoviesResponse = await axios.get(requests.requestPopular);
    const popularMovies = popularMoviesResponse.data.results;
  
    const topRatedMoviesResponse = await axios.get(requests.requestTopRated);
    const topRatedMovies = topRatedMoviesResponse.data.results;
  
    const upcomingMoviesResponse = await axios.get(requests.requestUpcoming);
    const upcomingMovies = upcomingMoviesResponse.data.results;
  
    return {
      props: { session, popularMovies, topRatedMovies, upcomingMovies },
    };
  }

export default Search;