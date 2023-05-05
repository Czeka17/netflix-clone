import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import Movie from '@/components/movies/movie';
import Modal from '@/components/layout/modal';
function Watchlist() {
  const { data: session, status } = useSession();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchWatchlist() {
      if (status === 'authenticated') {
        const response = await fetch('/api/watchlist/getWatchlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: session.user.email }),
        });
        const data = await response.json();
        setMovies(data.watchlist);
        setIsLoading(false)
      }
    }
    fetchWatchlist();
    console.log(movies)
  }, []);

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


  useEffect(() => {
    if(requestStatus === 'success' || requestStatus === 'error'){
        const timer = setTimeout(() =>{
            setRequestStatus(null);
            setRequestError(null)
        }, 3000);

        return () => clearTimeout(timer);
    }
}, [requestStatus])

let notification;

if(requestStatus === 'pending'){
  notification = {
      status: 'pending',
      title: 'Checking if movie is in list...',
      message: 'Checking if movie is in list'
  }
}

if(requestStatus === 'success') {
  notification = {
      status: 'success',
      title: 'Success!',
      message: 'Movie added successfully'
  }
}
if(requestStatus === 'error') {
  notification = {
      status: 'error',
      title: 'Error!',
      message: requestError
  }
}

  return (
    <div className='pt-20'>
      {!isLoading && movies.length === 0 && <p className='text-center text-white text-3xl p-4 mt-6'>Your list is empty!</p>}
      {isLoading ? <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-2">
        <div className="w-10 h-10 rounded-full bg-gray-600 animate-pulse"></div>
        <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse delay-150"></div>
        <div className="w-10 h-10 rounded-full bg-gray-800 animate-pulse delay-300"></div>
      </div>
    </div>


 :
      <section className="py-10 flex flex-wrap">
     {movies.map((movie, index) => (
        <div className="w-full sm:w-1/1 md:w-1/3 lg:w-1/4 xl:w-1/4 py-2 px-6 flex justify-center items-center">
          <Movie movie={movie} index={index} isHovering={isHovering} selectedMovie={selectedMovie} handleMovieClick={handleMovieClick} handleMovieHover={handleMovieHover} watchlist={movies} handleMouseLeave={handleMouseLeave} />
          </div>
          ))}
          {showModal && <Modal movie={selectedMovie} showModal={showModal} hideModal={hideModal} />}
    </section>}
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession({req: context.req});

  if(!session){
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    };
  }

  return {
    props: { session },
  };
}
export default Watchlist;