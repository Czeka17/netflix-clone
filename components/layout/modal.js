import React, { useState, useEffect,} from "react";
import ReactPlayer from "react-player";
import axios from "axios";
const Modal = ({ movie, showModal, hideModal }) => {
  const [show, setShow] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState('');
  useEffect(() => {
    if (showModal) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [showModal]);

  // const apiKey = 'AIzaSyDd8qd3v5UTYoA0K2vxp9GSjt5Llju5QcA'
  useEffect(() => {
    const fetchTrailerUrl = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
        {
          params: {
            api_key: '502c330772f772740b274f7363e5b00a',
          },
        }
      );
      const videos = response.data.results;
      const trailer = videos.find((video) => video.type === 'Trailer');
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
      }
    };
    fetchTrailerUrl();
  }, [movie.id]);

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-opacity duration-500`}
    >
      <div className="flex items-center justify-center min-h-screen p-4 text-center">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={() => hideModal()}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex justify-center items-center">
            <ReactPlayer url={trailerUrl} controls={true}/>
          </div>
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-black">
            <h3 className="text-lg leading-6 font-medium text-white">
              {movie?.title}
            </h3>
            <div className="mt-2">
            <p className="text-sm text-gray-400 py-2">Release date: {movie?.release_date}</p>
              <p
                className={`text-sm ${
                  movie?.vote_average > 6.9 ? "text-green-500" : "text-yellow-500"
                }`}
              >
                vote average: {movie?.vote_average}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-white">{movie?.overview}</p>
            </div>
          </div>
          <div className="bg-black px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm my-2 "
              onClick={() => hideModal()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;