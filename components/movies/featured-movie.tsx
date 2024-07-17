import React, { useEffect, useState, useRef } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Modal from "./youtube-modal";
import { FeaturedMovieProps, Movieobj } from "../../lib/types";

function FeaturedMovie({ Movies }: FeaturedMovieProps) {
	const [movies, setMovies] = useState<Movieobj[]>([]);
	const [selectedMovie, setSelectedMovie] = useState<Movieobj | null>(null);
	const [showModal, setShowModal] = useState(false);

	const randomMovieIndex = useRef<number>(0);
	
	useEffect(() => {
		setMovies(Movies);
		randomMovieIndex.current = Math.floor(Math.random() * Movies.length);
	}, [Movies]);

	function handleMovieClick(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();
		setSelectedMovie(movies[randomMovieIndex.current]);
		setShowModal(true);
	}
	function hideModal() {
		setShowModal(false);
	}
	const movie = selectedMovie || movies[randomMovieIndex.current];

	return (
		<div className='w-full h-[650px] text-white'>
			{showModal && (
				<Modal
					movie={movie}
					hideModal={hideModal}
				/>
			)}
			<div className='w-full h-full relative'>
				<div className='absolute w-full h-[650px] bg-gradient-to-r from-black'></div>
				<img
				
					className='w-full h-full object-cover'
					src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
					alt={movie?.title}
				/>
				<div className='absolute w-full bottom-0 p-4 md:p-10'>
					<h2 className='my-4 text-2xl lg:text-5xl font-bold max-w-2xl'>
						{movie?.title}
					</h2>
					<p className='max-w-xs text-sm lg:text-md my-4'>
						{movie?.overview && movie.overview.length > 100
							? `${movie.overview
									.split(/(?<=\.|\!|\?)\s+/)
									.slice(0, 4)
									.join(" ")}...`
							: movie?.overview}
					</p>
					<p
						className={`${
							movie?.vote_average > 6.9 ? "text-green-500" : "text-yellow-500"
						}`}
					>
						Vote average: {movie?.vote_average.toFixed(2)}
					</p>
					<div className='flex flex-col items-start'>
						<button
							className='py-2 px-8 my-2 bg-neutral-700  rounded font-bold flex items-center hover:bg-neutral-800 duration-300'
							onClick={handleMovieClick}
						>
							<AiOutlineQuestionCircle className='m-1 text-xl' /> More
							information
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FeaturedMovie;
