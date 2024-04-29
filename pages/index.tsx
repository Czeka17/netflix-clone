import { GetServerSideProps } from 'next';
import Footer from '../components/layout/footer';
import FeaturedMovie from '../components/movies/featured-movie';
import MovieList from '../components/movies/movie-list';
import requests from '../Requests'
import { getSession } from "next-auth/react";
import axios from 'axios';
import Head from "next/head";
import React, { useEffect, useState } from 'react';
import { Movieobj } from '../lib/types';
import { MovieObjectProps } from '../lib/types';


const Home: React.FC<MovieObjectProps> = ({ popularMovies, topRatedMovies, upcomingMovies,popularTvSeries}) => {

  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    if(popularMovies && topRatedMovies && upcomingMovies && popularTvSeries){
      setIsLoading(false)
    }
  },[topRatedMovies,popularMovies,upcomingMovies,popularTvSeries])

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

export const getServerSideProps: GetServerSideProps<MovieObjectProps> = async (context) => {
    const session = await getSession({ req: context.req });
  
    if (!session) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        },
      };
    }

    const popularMoviesResponse = await axios.get<{ results: Movieobj[] }>(requests.requestPopular);
const popularMovies = popularMoviesResponse.data.results;

const topRatedMoviesResponse = await axios.get<{ results: Movieobj[] }>(requests.requestTopRated);

const topRatedMovies = topRatedMoviesResponse.data.results;

const upcomingMoviesResponse = await axios.get<{ results: Movieobj[] }>(requests.requestUpcoming);
const upcomingMovies = upcomingMoviesResponse.data.results;
  
const popularTvSeriesResponse = await axios.get<{results: Movieobj[]}>(requests.requestPopularTV);
const popularTvSeries = popularTvSeriesResponse.data.results.map((tvSeries) => {
    return { ...tvSeries, title: tvSeries.name };
});

    return {
      props: { session, popularMovies, topRatedMovies, upcomingMovies,popularTvSeries},
    };
  }

export default Home;