import { GetServerSideProps } from 'next';
import Footer from '../components/layout/footer';
import FeaturedMovie from '../components/movies/featured-movie';
import MovieList from '../components/movies/movie-list';
import requests from '../Requests'
import { getSession } from "next-auth/react";
import axios from 'axios';
import Head from "next/head";
import React from 'react';
import { Movieobj } from '../lib/types';

interface HomeProps {
    popularMovies: Movieobj[];
    topRatedMovies: Movieobj[];
    upcomingMovies: Movieobj[];
}


const Home: React.FC<HomeProps> = ({ popularMovies, topRatedMovies, upcomingMovies }) => {

  return (
    <div>
      <Head>
        <title>Moowiz</title>
        <meta name="description" content="Browse huge library of movies! Watch trailers and discover upcoming films" />
        <meta name="keywords" content="Movies, Films, Trailers, Cinema" />
      </Head>
      <FeaturedMovie Movies={popularMovies} />
      <MovieList title={'Popular'} movieslist={popularMovies} />
      <hr className="border-t border-red-800 my-4"/>
      <MovieList title={'Top Rated'} movieslist={topRatedMovies} />
      <hr className="border-t border-red-800 my-4"/>
      <MovieList title={'Upcoming'} movieslist={upcomingMovies} />
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
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

  
    return {
      props: { session, popularMovies, topRatedMovies, upcomingMovies },
    };
  }

export default Home;