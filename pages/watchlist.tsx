import { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import Movie from '../components/movies/movie';
import Modal from '../components/layout/modal';
import { getWatchlistMovies } from '../lib/api';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';

import { Movieobj } from '../lib/types';
import Footer from '../components/layout/footer';
import MovieContext from '../context/MovieContext';

function Watchlist() {
  const { data: session, status } = useSession();
  const movieCtx = useContext(MovieContext)
  const [movies, setMovies] = useState<Movieobj[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [delayedTransition,setDelayedTransition] = useState(false)


  useEffect(() => {
    async function fetchWatchlist() {
      if (status === 'authenticated' && session?.user) {
        const watchlist = await getWatchlistMovies(session.user.email);
        setMovies(watchlist);
        setIsLoading(false)
        setTimeout(() => {
          setDelayedTransition(true)
        }, 300)
      }
    }
  
    fetchWatchlist();
  }, [session, status]);


  return (
    <div className='pt-20 relative'>
      <Head>
        <title>Watchlist</title>
        <meta name="description" content="Movies that you added to your watchlist" />
      </Head>
      <h2 className='text-center text-white text-2xl'>Your list</h2>
      {!isLoading && movies.length === 0 && <p className='text-center text-white text-3xl p-4 mt-6'>Your list is empty!</p>}
      {!delayedTransition ? <div className={`flex justify-center items-center mt-20 transition-opacity ${!isLoading ? 'opacity-0' : 'opacity-100'} duration-300`}>
  <img src="/logo.png" className='animate-spin-slow max-w-[50%]'/>
</div>
 :
      <section className={`flex flex-wrap justify-center items-center`}>
        <div className='max-w-[1400px] pb-20 flex flex-wrap justify-center items-center mt-10'>
     {movies.map((movie, index) => (
        <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 my-40 md:my-10 mx-10 sm:mx-0 md:mx-0 px-10  flex justify-center items-center h-[15rem]'>
          <Movie movie={movie} index={index}   watchlist={movies} isWatchlist={true} />
          </div>
          ))}
          {movieCtx.showModal && <Modal movie={movieCtx.selectedMovie} />}
          </div>
          
    </section>}
    <Footer/>
    </div>
    
  );
}
export async function getServerSideProps(context:GetServerSidePropsContext) {
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