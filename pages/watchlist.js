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
      }
    }
    fetchWatchlist();
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
    <div>
      <h2 className='text-white pt-40 text-3xl text-center'>Your list</h2>
      <section className="py-10 flex flex-wrap">
     {movies.map((movie, index) => (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2 px-10">
          <Movie movie={movie} index={index} isHovering={isHovering} selectedMovie={selectedMovie} handleMovieClick={handleMovieClick} handleMovieHover={handleMovieHover} handleMouseLeave={handleMouseLeave} />
          </div>
          ))}
          {showModal && <Modal movie={selectedMovie} showModal={showModal} hideModal={hideModal} />}
    </section>
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