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
  export interface MovieContextProps {
    popularMovies: Movieobj[];
    topRatedMovies: Movieobj[];
    upcomingMovies: Movieobj[];
    popularTvSeries: Movieobj[];
    isLoading: boolean;
    watchlist:Movieobj[];
    watchlistUpdate:(movie:Movieobj[]) => void;
  }

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
export interface FiltersProps{
  applyFilters:(selectedType:number) => void
  sortByvoteAverage:(selectedDirection:string) => void
}
export interface ChildrenProps{
  children: React.ReactNode;
}
export interface ModalProps {
  movie:Movieobj | null
  hideModal:() => void;
  isTvSerie?:boolean;
}
export interface SignupModalProps {
  showModal: boolean;
  hideModal: () => void;
}