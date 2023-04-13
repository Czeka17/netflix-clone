import { useEffect, useState } from "react";
import axios from "axios";

function MovieList({ title, fetchURL }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);


  const handleMovieHover = (movie) => {
    setSelectedMovie(movie);
  };

  const handleMouseLeave = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="py-20 px-10 w-full h-[1500px] text-white ">
      <h2 className="m-20">{title}</h2>
      <div className="m-10 relative overflow-visible flex flex-row flex-wrap">
          {movies.map((movie, index) => (
            <div
              key={index}
              onMouseEnter={() => handleMovieHover(movie)}
              onMouseLeave={() => handleMouseLeave()}
              className="h-[250px] w-[250px]"
            >
              <div className="hover:scale-125 hover:-translate-y-1/2 hover:z-20 relative py-4 duration-300 overflow-visible mx-4">
        <div className="absolute w-[50px] h-[200px] bg-gradient-to-r from-black"></div>
              <img
                className="overflow-visible z-20"
                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                alt={movie?.title}
              />
              {selectedMovie?.id === movie.id && (
                <div className="absolute -bottom-8 left-0 right-0 bg-gray-700 rounded-b text-center"><h2 className=" text-white pb-2">{movie?.title}</h2>
                <p className="pb-2">Vote average: {movie?.vote_average}</p>
                </div>
              )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MovieList;