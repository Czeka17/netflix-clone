import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Movie from "../components/movies/movie";
import Fuse from "fuse.js";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { Movieobj } from "../lib/types";
import Footer from "../components/layout/footer";
import Filters from "../components/layout/filters";
import { useState } from "react";
import { useMovies } from "../context/MoviesContext";

function Search() {
	const { popularMovies, topRatedMovies, upcomingMovies, popularTvSeries } =
		useMovies();

	const [selectedGenreId, setSelectedGenreId] = useState<number>(0);
	const [selectedDirection, setSelectedDirection] = useState("");

	function applyFilters(selectedType: number) {
		setSelectedGenreId(selectedType);
	};

	function sortByvoteAverage(selectedDirection: string) {
		setSelectedDirection(selectedDirection);
	};

	const movies = popularMovies.concat(
		topRatedMovies,
		upcomingMovies,
		popularTvSeries
	);

	const uniqueMovies = movies.filter(
		(movie, index, self) => index === self.findIndex((m) => m.id === movie.id)
	);

	const options = {
		keys: ["title"],
		threshold: 0.4,
		includeScore: true,
	};

	const fuse = new Fuse(uniqueMovies, options);

	const router = useRouter();

	const searchQuery = router.query.q;

	const query = Array.isArray(searchQuery) ? searchQuery[0] : searchQuery;

	const searchResults = fuse.search(query || "");

	const filteredMovies = searchResults.map((result) => result.item);

	let sortedMovies: Movieobj[] | undefined;

	if (searchQuery) {
		sortedMovies = filteredMovies.sort((a, b) =>
			a.title.localeCompare(b.title)
		);
	}

	if (searchQuery === "") {
		sortedMovies = uniqueMovies.sort((a, b) => a.title.localeCompare(b.title));
	}

	return (
		<>
			<Head>
				<title>Search</title>
				<meta
					name='description'
					content={`Search results for ${searchQuery}`}
				/>
			</Head>
			<div className='flex flex-col items-center pt-24 text-white pb-40 min-h-[100vh]'>
				<h1 className='text-xl'>
					Search Results for <span className='font-bold'>{searchQuery}</span>
				</h1>
				<Filters
					applyFilters={applyFilters}
					sortByvoteAverage={sortByvoteAverage}
				/>
				<div className='grid grid-cols-1 px-4 mx-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-[1400px]'>
					{sortedMovies &&
						sortedMovies
							.filter((movie) =>
								selectedGenreId !== 0
									? movie.genre_ids.includes(selectedGenreId)
									: true
							)
							.sort((a, b) =>
								selectedDirection === "descending"
									? b.vote_average - a.vote_average
									: selectedDirection === "ascending"
									? a.vote_average - b.vote_average
									: 0
							)
							.map((movie, index) => (
								<div
									key={movie.id}
									className='p-2 my-24 md:my-20 mx-10 md:mx-1 h-[10rem]'
									aria-label={`search result`}
								>
									<Movie
										movie={movie}
										isWatchlist={false}
										isTvSerie={popularTvSeries.includes(movie)}
									/>
								</div>
							))}
				</div>
				{filteredMovies.length === 0 && searchQuery !== "" && (
					<p className='text-white text-2xl text-center flex justify-center items-center p-6'>
						Cant find movie that you are looking for.
					</p>
				)}
			</div>
			<Footer />
		</>
	);
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession({ req: context.req });

	if (!session) {
		return {
			redirect: {
				destination: "/auth",
			},
		};
	}
	return {
		props: { session },
	};
}

export default Search;
