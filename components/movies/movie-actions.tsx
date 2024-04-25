import React, { useState, useEffect } from "react";
import { MovieActionsProps } from "../../lib/types";
import { AiOutlineEllipsis, AiOutlineLike } from "react-icons/ai";
import { BsPlusLg, BsCheckLg } from "react-icons/bs";
import {
	saveLikesToLocalStorage,
	loadLikesFromLocalStorage,
} from "../../store/storage";

const MovieActions = React.memo(({
	movie,
	newWatchlist,
	handleMovieClick,
	movielistHandler,
}: MovieActionsProps) => {

	const [likes, setLikes] = useState<{ [key: number]: boolean }>(
		loadLikesFromLocalStorage()
	);
	useEffect(() => {
		const storedLikes = loadLikesFromLocalStorage();
		setLikes(storedLikes);
	}, []);

	useEffect(() => {
		saveLikesToLocalStorage(likes);
	}, [likes]);

	function likeHandler(movieId: number) {
		setLikes((prevLikes) => {
			const updatedLikes = { ...prevLikes, [movieId]: !prevLikes[movieId] };
			return updatedLikes;
		});
	}


	return (
		<div className='absolute -bottom-100 left-0 right-0 bg-gray-700 rounded-br rounded-bl text-center py-2'>
			<p className='text-xs text-white pb-2 lg:text-base'>{movie?.title}</p>
			<p
				className={`pb-2 text-xs ${
					movie?.vote_average > 6.9 ? "text-green-500" : "text-yellow-500"
				}`}
			>
				Vote average: {movie?.vote_average.toFixed(2)}
			</p>
			<div className='flex justify-around items-center pb-2'>
				<div className='flex flex-col justify-center items-center group'>
					<AiOutlineLike
						className={`text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500 hover:fill-blue-500 md:w-[34px] py-1 md:py-0 ${
							likes[movie.id] ? "fill-blue-700" : "fill-white"
						}`}
						onClick={() => likeHandler(movie.id)}
						style={{ transform: likes[movie.id] ? "scale(1.2)" : "scale(1)" }}
					/>
					
						<span
							className={`text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block ${
								likes[movie.id] ? "text-blue-700" : "text-white"
							}`}
						>
							{likes[movie.id] ? "Liked" : "Like"}
						</span>
					
				</div>
				<div
					className='flex flex-col justify-center items-center group text-white md:w-[70px]'
					onClick={movielistHandler}
				>
					{newWatchlist.map((item) => item.id).includes(movie.id) ? (
						<BsCheckLg className='text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500 py-1 md:py-0' />
					) : (
						<BsPlusLg className='text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500 py-1 md:py-0' />
					)}
					
						<span className='text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block'>
							{newWatchlist.map((item) => item.id).includes(movie.id)
								? "Added to list"
								: "Add to list"}
						</span>
					
				</div>

				<div className='flex flex-col justify-center items-center group text-white'>
					<AiOutlineEllipsis
						className='text-2xl cursor-pointer transition-all duration-300 group-hover:text-blue-500 text-white py-1 md:py-0'
						onClick={handleMovieClick}
					/>
					
						<span className='text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block'>
							More
						</span>
					
				</div>
			</div>
		</div>
	);
})
export default MovieActions;
