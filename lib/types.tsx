export interface Movieobj {
    id: number;
    title: string;
    name:string ;
    genre_ids:number[];
    backdrop_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
  }


  export interface MovieProps {
    movie: Movieobj
    index: number;
    isWatchlist:boolean
    isTvSerie?:boolean
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
    isTvSerie?:boolean;
  };

  export interface MovieObjectProps {
    popularMovies: Movieobj[];
    topRatedMovies: Movieobj[];
    upcomingMovies: Movieobj[];
    popularTvSeries: Movieobj[];
}
export interface MovieActionsProps {
	movie: Movieobj;
	newWatchlist: { id: number; title: string }[];
	movielistHandler: () => void;
	handleMovieClick: () => void;
}