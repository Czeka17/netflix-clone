import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import requests from '../Requests';
import { ChildrenProps, Movieobj } from '../lib/types';
import { useSession } from 'next-auth/react';
import { MovieContextProps } from '../lib/types';


const MoviesContext = createContext<MovieContextProps | undefined>(undefined);

export function MoviesProvider({ children }:ChildrenProps) {
    const { data: session, status } = useSession();
  const [popularMovies, setPopularMovies] = useState<Movieobj[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movieobj[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movieobj[]>([]);
  const [popularTvSeries, setPopularTvSeries] = useState<Movieobj[]>([]);
  const [watchlist,setWatchlist] = useState<Movieobj[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popularMoviesResponse, topRatedMoviesResponse, upcomingMoviesResponse, popularTvSeriesResponse] = await Promise.all([
          axios.get<{ results: Movieobj[] }>(requests.requestPopular),
          axios.get<{ results: Movieobj[] }>(requests.requestTopRated),
          axios.get<{ results: Movieobj[] }>(requests.requestUpcoming),
          axios.get<{ results: Movieobj[] }>(requests.requestPopularTV),
        ]);

        setPopularMovies(popularMoviesResponse.data.results);
        setTopRatedMovies(topRatedMoviesResponse.data.results);
        setUpcomingMovies(upcomingMoviesResponse.data.results);
        setPopularTvSeries(popularTvSeriesResponse.data.results.map((tvSeries) => {
          return { ...tvSeries, title: tvSeries.name };
        }));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);
  useEffect(() => {
    const getWatchlistMovies = async (email: string | null | undefined) => {
      try {
        const response = await fetch('/api/watchlist/getWatchlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        setWatchlist(data.watchlist);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    if (session) {
      getWatchlistMovies(session?.user?.email);
    }
  }, [session, status]);

  const watchlistUpdate = (movies: Movieobj[]) => {
    setWatchlist(movies);
  };
  const contextValue = useMemo(
    () => ({
      popularMovies,
      topRatedMovies,
      upcomingMovies,
      popularTvSeries,
      isLoading,
      watchlist,
      watchlistUpdate
    }),
    [popularMovies, topRatedMovies, upcomingMovies, popularTvSeries, isLoading,watchlist]
  );

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};

export function useMovies () {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};
