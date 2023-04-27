import Footer from "@/components/layout/footer";
import MainNavigation from "@/components/layout/main-navigation";
import FeaturedMovie from "@/components/movies/featured-movie";
import MovieList from "@/components/movies/movie-list";
import requests from "@/Requests";
import { getSession } from "next-auth/react";
import React, { useState, useEffect } from 'react';
function Home(){
return <div>
    <MainNavigation />
    <FeaturedMovie />
    <MovieList title={'Popular'} fetchURL={requests.requestPopular} />
    <MovieList title={'Top Rated'} fetchURL={requests.requestTopRated} />
    <MovieList title={'Upcoming'} fetchURL={requests.requestUpcoming} />
    <Footer />
</div>
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
export default Home;