import { createContext } from 'react';
import {Movieobj} from '../lib/types'
interface MovieContextProps {
  watchlist:Movieobj[]
  watchlistUpdate:(movie:Movieobj[]) => void;
}
const defaultMovieContext: MovieContextProps = {
  
  watchlist: [],
  watchlistUpdate:(movie:Movieobj[]) => {}
};

const MovieContext = createContext<MovieContextProps>(defaultMovieContext);

export default MovieContext;


