import Footer from "@/components/layout/footer";
import FeaturedMovie from "@/components/movies/featured-movie";
import MovieList from "@/components/movies/movie-list";
import requests from "@/Requests";
import { getSession } from "next-auth/react";
import axios from 'axios';

function Home({ popularMovies, topRatedMovies, upcomingMovies }) {

  return (
    <div>
      <FeaturedMovie />
      <MovieList title={'Popular'} movieslist={popularMovies} />
      <hr className="border-t border-red-800 my-4"/>
      <MovieList title={'Top Rated'} movieslist={topRatedMovies} />
      <hr className="border-t border-red-800 my-4"/>
      <MovieList title={'Upcoming'} movieslist={upcomingMovies} />
      <Footer />
    </div>
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

export default Home;