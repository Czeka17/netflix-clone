import { GetServerSideProps } from 'next';
import Footer from '../components/layout/footer';
import FeaturedMovie from '../components/movies/featured-movie';
import MovieList from '../components/movies/movie-list';
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from 'react';

import { useMovies } from '../context/MoviesContext';

function Home() {
  const { popularMovies, topRatedMovies, upcomingMovies, popularTvSeries, isLoading } = useMovies();

  return (
    <div>
      <Head>
        <title>Moowiz</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta name="author" content="Jakub Czekański" />
        <meta name="description" content="Browse huge library of movies! Watch trailers and discover upcoming films" />
        <meta name="keywords" content="Movies, Films, Trailers, Cinema" />
      </Head>
      {!isLoading ?<div className='flex items-center justify-center flex-col'>
        <FeaturedMovie Movies={topRatedMovies} />
   <div className='flex items-center justify-center flex-col w-[100%] max-w-[1400px]'><MovieList title={'Popular'} movieslist={popularMovies} />
      <MovieList title={'Top Rated'} movieslist={topRatedMovies} />
      <MovieList title={'Upcoming'} movieslist={upcomingMovies} />
      <MovieList title={'TV popular'} movieslist={popularTvSeries} isTvSerie={true} />
      </div>
      
      </div> : <div className='flex justify-center items-center h-[100vh]'>
      <img src="/logo.png"/>
           </div>}
           <Footer/>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({ req: context.req });
  
    if (!session) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        },
      };
    }

   

    return {
      props: { session},
    };
  }

export default Home;