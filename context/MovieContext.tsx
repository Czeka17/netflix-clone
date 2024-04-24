import { createContext } from 'react';
import {Movieobj} from '../lib/types'
// Define the type for the context value
interface MovieContextProps {
  showModal:boolean;
  isHovering:boolean;
  selectedMovie:Movieobj | null;
  handleMovieHover:(movie:Movieobj) => void;
  handleMouseLeave:() => void;
  handleMovieClick:() => void;
  hideModal:() => void;
}
const defaultMovieContext: MovieContextProps = {
  showModal: false,
  isHovering: false,
  selectedMovie: null,
  handleMovieHover: (movie: Movieobj) => {},
  handleMouseLeave: () => {}, 
  handleMovieClick: () => {}, 
  hideModal: () => {}, 
};

const MovieContext = createContext<MovieContextProps>(defaultMovieContext);

export default MovieContext;


