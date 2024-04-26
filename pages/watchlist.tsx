import { useContext } from 'react';
import { getSession } from 'next-auth/react';
import Movie from '../components/movies/movie';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import Footer from '../components/layout/footer';
import MovieContext from '../context/MovieContext';

function Watchlist() {
  const movieCtx = useContext(MovieContext)

  const movies = movieCtx.watchlist


  return (
    <div className='pt-20 relative'>
      <Head>
        <title>Watchlist</title>
        <meta name="description" content="Movies that you added to your watchlist" />
      </Head>
      <h2 className='text-center text-white text-2xl'>Your list</h2>
      {movies.length === 0 && <p className='text-center text-white text-3xl p-4 mt-6'>Your list is empty!</p>}
      <section className={`flex flex-wrap justify-center items-center`}>
        <div className='max-w-[1400px] pb-20 flex flex-wrap justify-center items-center mt-10'>
     {movies.map((movie, index) => (
        <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 my-12 md:my-10 mx-10 sm:mx-0 md:mx-0 px-10  flex justify-center items-center h-[15rem]'>
          <Movie movie={movie} index={index} isWatchlist={true} />
          </div>
          ))}

          </div>
          
    </section>
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