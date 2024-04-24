export interface Movieobj {
    id: number;
    title: string;
    backdrop_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
  }

  export interface MovieProps {
    movie: Movieobj
    index: number;
    watchlist: {
      id: number;
      title: string;
    }[];
    isWatchlist: boolean;
  }
  export interface NotificationProps {
    title: string;
    message: string | undefined;
    status: string;
  }
  export interface FeaturedMovieProps {
    Movies: Movieobj[];
  }
  export interface MovieListProps {
    title: string;
    movieslist: Movieobj[];
  };

  export interface MovieObjectProps {
    popularMovies: Movieobj[];
    topRatedMovies: Movieobj[];
    upcomingMovies: Movieobj[];
}
export interface MovieActionsProps {
	movie: Movieobj;
	newWatchlist: { id: number; title: string }[];
	movielistHandler: () => void;
	handleMovieClick: () => void;
}