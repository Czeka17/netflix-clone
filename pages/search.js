import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import requests from "@/Requests";
import axios from 'axios';
import Movie from "@/components/movies/movie";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Modal from "@/components/layout/modal";
import Footer from "@/components/layout/footer";
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
  
    const router = useRouter();
  const searchQuery = router.query.q; 
  const filteredMovies = uniqueMovies.filter((movie) =>
  movie.title.toLowerCase().includes(searchQuery.toLowerCase())
);
const sortedMovies = filteredMovies.sort((a, b) => a.title.localeCompare(b.title));


useEffect(() => {
    async function getWatchlistMovies(){
    if (status === 'authenticated') {
      const response = await fetch('/api/watchlist/getWatchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session.user.email }),
      });
      const data = await response.json();
      setWatchlist(data.watchlist);
      console.log(watchlist)
    }
  }
  getWatchlistMovies()
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
        <div className="flex flex-col items-center justify-center pt-20 text-white">
  <h1 className="text-xl">Search Results for <span className="font-bold">{searchQuery}</span></h1>
  <div className="grid grid-cols-1 px-4 mx-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
    {sortedMovies.map((movie, index) => (
      <div key={movie.id} aria-label={`search result`}>
        <Movie movie={movie} index={index} isHovering={isHovering} selectedMovie={selectedMovie} watchlist={newWatchlist} handleMovieClick={handleMovieClick} handleMovieHover={handleMovieHover} handleMouseLeave={handleMouseLeave} />
      </div>
    ))}
  </div>
  {filteredMovies.length === 0 && <p className="text-white text-2xl text-center flex justify-center items-center p-6">Cant find movie that you are looking for.</p>}
  {showModal && <Modal movie={selectedMovie} showModal={showModal} hideModal={hideModal} />}
</div>
<Footer />
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