import React, { useState, useEffect } from 'react';
import {Movieobj} from '../lib/types'
import MovieContext from './MovieContext'
import { useSession } from "next-auth/react";
interface MovieContextProps {

    watchlist:Movieobj[]
    watchlistUpdate:(movie:Movieobj[]) => void
  }

const MovieContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session, status } = useSession()

  const [watchlist, setWatchlist] = useState<Movieobj[]>([]);

  useEffect(() => {
    async function getWatchlistMovies(email:any) {
        const response = await fetch('/api/watchlist/getWatchlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        console.log('running')
        const data = await response.json();
        setWatchlist(data.watchlist)
      }
      getWatchlistMovies(session?.user?.email)
  },[])


  function watchlistUpdate(movie:Movieobj[]){
    setWatchlist(movie)
  }



  const contextValue: MovieContextProps = {

    watchlist:watchlist,
    watchlistUpdate:watchlistUpdate
  };

  return <MovieContext.Provider value={contextValue}>{children}</MovieContext.Provider>;
};

export default MovieContextProvider;
