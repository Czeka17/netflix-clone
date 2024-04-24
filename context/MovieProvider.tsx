import React, { createContext, useContext, useState } from 'react';
import {Movieobj} from '../lib/types'
import MovieContext from './MovieContext'
interface MovieContextProps {
    showModal:boolean;
    isHovering:boolean;
    selectedMovie:Movieobj | null;
    handleMovieHover:(movie:Movieobj) => void;
    handleMouseLeave:() => void;
    handleMovieClick:() => void;
    hideModal:() => void
  }

const MovieContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [isHovering,setIsHovering] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movieobj | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleMovieHover = (movie: Movieobj) => {
    setSelectedMovie(movie);
    setIsHovering(true)
  };
const handleMovieClick = () => {
    setShowModal(true);
  };
  const hideModal = () =>{
    setShowModal(false)
  }
  const handleMouseLeave = () => {
    if (!showModal) {
      setSelectedMovie(null);
      setIsHovering(false)
    }
  };

  const contextValue: MovieContextProps = {
    showModal:showModal,
    isHovering:isHovering,
    selectedMovie:selectedMovie,
    handleMovieHover:handleMovieHover,
    handleMouseLeave:handleMouseLeave,
    handleMovieClick:handleMovieClick,
    hideModal:hideModal
  };

  return <MovieContext.Provider value={contextValue}>{children}</MovieContext.Provider>;
};

export default MovieContextProvider;
