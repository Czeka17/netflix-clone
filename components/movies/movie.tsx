import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { MovieProps } from "../../lib/types";
import MovieActions from "./movie-actions";
import { Movieobj } from "../../lib/types";
import YoutubeModal from "./youtube-modal";
import { useMovies } from "../../context/MoviesContext";
async function addMovieHandler(
	email: string,
	movie: { id: number; title: string }
) {
	const response = await fetch("/api/watchlist/watchlist", {
		method: "POST",
		body: JSON.stringify({ email, movie }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Something went wrong!");
	}
	return data;
}
async function deleteMovieHandler(
	email: string,
	movie: { id: number; title: string }
) {
	try {
		console.log(email, movie);
		const response = await fetch("/api/watchlist/deleteMovie", {
			method: "POST",
			body: JSON.stringify({ email, movie }),
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		return data;
	} catch (error: any) {
		throw new Error(error.message || "Something went wrong!");
	}
}
function Movie(props: MovieProps) {
	const { watchlist, watchlistUpdate } = useMovies();
	const { data: session, status } = useSession();
	const [isHovering, setIsHovering] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState<Movieobj | null>(null);
	const [showModal, setShowModal] = useState(false);

	async function movielistHandler() {
		if (!session || !session.user) {
			return;
		}
		const email = session.user.email as string;

		if (watchlist.map((item) => item.id).includes(props.movie.id)) {
			const result = await deleteMovieHandler(email, selectedMovie!);
			const indexToDelete = watchlist.findIndex(
				(movie) => movie.id === selectedMovie!.id
			);
			const updatedWatchlist = [
				...watchlist.slice(0, indexToDelete),
				...watchlist.slice(indexToDelete + 1),
			];
			watchlistUpdate(updatedWatchlist);
			return result;
		} else {
			const result = await addMovieHandler(email, selectedMovie!);
			const updatedWatchlist = [...watchlist, selectedMovie!];
			watchlistUpdate(updatedWatchlist);
			return result;
		}
	}

	function handleMovieHover(movie: Movieobj) {
		setSelectedMovie(movie);
		setIsHovering(true);
	}
	function handleMovieClick() {
		setShowModal(true);
	}
	function handleMouseLeave() {
		setSelectedMovie(null);
		setIsHovering(false);
	}
	function hideModal() {
		setShowModal(false);
		setSelectedMovie(null);
		setIsHovering(false);
	}

	return (
		<div
			onMouseEnter={() => handleMovieHover(props.movie)}
			onMouseLeave={() => handleMouseLeave()}
			className='h-full w-full my-2 cursor-pointer py-2'
			tabIndex={0}
			style={{ WebkitTapHighlightColor: "transparent" }}
		>
			<div
				className={`hover:scale-110 hover:z-30 relative lg:py-0 py-4 duration-300 overflow-visible ${
					props.isWatchlist ? "my-4" : "my-32"
				}`}
				tabIndex={0}
			>
				<img
					className='overflow-visible z-20 focus:outline-none'
					src={`https://image.tmdb.org/t/p/original/${props.movie?.backdrop_path}`}
					alt={props.movie?.title}
					onClick={isHovering ? handleMovieClick : undefined}
				/>
				{selectedMovie?.title !== props.movie.title && (
					<p className='absolute text-center w-[100%] mt-2 text-white'>
						{props.movie.title}
					</p>
				)}
				{isHovering && selectedMovie?.id === props.movie.id && (
					<MovieActions
						movie={props.movie}
						newWatchlist={watchlist}
						movielistHandler={movielistHandler}
						handleMovieClick={handleMovieClick}
					/>
				)}
			</div>
			{selectedMovie && showModal && (
				<YoutubeModal
					movie={selectedMovie}
					showModal={showModal}
					hideModal={hideModal}
					isTvSerie={props.isTvSerie}
				/>
			)}
		</div>
	);
}
export default React.memo(Movie);
