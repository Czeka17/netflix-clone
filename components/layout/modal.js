import React, { useState, useEffect } from "react";

const Modal = ({ movie, showModal, hideModal }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (showModal) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [showModal]);

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
          <div>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              alt={movie?.title}
            />
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
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => hideModal()}
            >
              Close
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-red-500 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            ><a href={`https://www.youtube.com/results?q=${movie?.title}+trailer`} target="_blank">Watch Trailer</a>
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;