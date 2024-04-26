import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import requests from "../Requests";
import axios from 'axios';
import Movie from "../components/movies/movie";
import Fuse from "fuse.js";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { Movieobj } from "../lib/types";
import Footer from "../components/layout/footer";
  import { MovieObjectProps } from "../lib/types";


function Search({ popularMovies, topRatedMovies, upcomingMovies }: MovieObjectProps ){

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
  const searchQuery = router.query.q 
  const query = Array.isArray(searchQuery) ? searchQuery[0] : searchQuery;
    const searchResults = fuse.search(query || '');
    const filteredMovies = searchResults.map(result => result.item);
    let sortedMovies: Movieobj[] | undefined;
  if(searchQuery){
     sortedMovies = filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
  }
  if(searchQuery === ''){
    sortedMovies = uniqueMovies.sort((a, b) => a.title.localeCompare(b.title));
  }

    
      return (
        <>
        <Head>
        <title>Search</title>
        <meta name="description" content={`Search results for ${searchQuery}`} />
      </Head>
        <div className="flex flex-col items-center pt-24 text-white pb-40 min-h-[100vh]">
  <h1 className="text-xl">Search Results for <span className="font-bold">{searchQuery}</span></h1>
  <div className="grid grid-cols-1 px-4 mx-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-[1400px]">
    {sortedMovies && sortedMovies.map((movie, index) => (
      <div key={movie.id} className="p-2 my-24 md:my-20 mx-10 md:mx-1 h-[10rem]" aria-label={`search result`}>
        <Movie movie={movie} index={index} isWatchlist={false} />
      </div>
    ))}
  </div>
  {filteredMovies.length === 0 && searchQuery !== '' && <p className="text-white text-2xl text-center flex justify-center items-center p-6">Cant find movie that you are looking for.</p>}
</div>
<Footer/>
</>
      );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession({ req: context.req });
  
    if (!session) {
      return {
        redirect: {
          destination: '/auth',
        },
      };
    }
  
    const [popularMoviesResponse, topRatedMoviesResponse, upcomingMoviesResponse] = await Promise.all([
      axios.get(requests.requestPopular),
      axios.get(requests.requestTopRated),
      axios.get(requests.requestUpcoming),
    ]);
  
    const popularMovies = popularMoviesResponse.data.results;
    const topRatedMovies = topRatedMoviesResponse.data.results;
    const upcomingMovies = upcomingMoviesResponse.data.results;
    return {
      props: { session, popularMovies, topRatedMovies, upcomingMovies },
    };
  }

export default Search;