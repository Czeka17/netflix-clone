import { createContext } from 'react';

export const MovieContext = createContext({
    selectedMovie: null,
    setSelectedMovie: () => {},
    showModal: false,
    setShowModal: () => {},
    isHovering: false,
    setIsHovering: () => {},
    handleMovieClick: () => {},
    hideModal: () => {},
    handleMovieHover: () => {},
    handleMouseLeave: () => {},
  });
  
