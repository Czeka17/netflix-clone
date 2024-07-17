import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MovieActions from '../components/movies/movie-actions';
import {
	saveLikesToLocalStorage,
	loadLikesFromLocalStorage,
} from '../store/storage';
import { Movieobj } from '../lib/types';


const mockMovie = {
	id: 1,
      title: "Test Movie",
      name: "Test Movie",
      overview: "This is the overview for movie",
      backdrop_path: "/path/to/image1.jpg",
      vote_average: 7.50,
      genre_ids:[10,20],
      release_date:'21-02-2020'
};

const mockNewWatchlist:Movieobj[] = [];

jest.mock('../store/storage', () => ({
	saveLikesToLocalStorage: jest.fn(),
	loadLikesFromLocalStorage: jest.fn(),
}));

const mockHandleMovieClick = jest.fn();
const mockMovielistHandler = jest.fn();

describe('MovieActions Component', () => {
	beforeEach(() => {
		(loadLikesFromLocalStorage as jest.Mock).mockReturnValue({});
	});

	it('should render without crashing', () => {
		render(
			<MovieActions
				movie={mockMovie}
				newWatchlist={mockNewWatchlist}
				handleMovieClick={mockHandleMovieClick}
				movielistHandler={mockMovielistHandler}
			/>
		);

		expect(screen.getByText("Test Movie")).toBeInTheDocument();
		expect(screen.getByText("Vote average: 7.50")).toBeInTheDocument();
	});

	it('should toggle like state on click', () => {
		render(
			<MovieActions
				movie={mockMovie}
				newWatchlist={mockNewWatchlist}
				handleMovieClick={mockHandleMovieClick}
				movielistHandler={mockMovielistHandler}
			/>
		);

		const likeButton = screen.getByTestId('like-button');

		fireEvent.click(likeButton);
		expect(saveLikesToLocalStorage).toHaveBeenCalled();
		expect(likeButton).toHaveClass('fill-blue-700');
	});

	it('should toggle add to list state on click', () => {
		render(
			<MovieActions
				movie={mockMovie}
				newWatchlist={mockNewWatchlist}
				handleMovieClick={mockHandleMovieClick}
				movielistHandler={mockMovielistHandler}
			/>
		);

		const addToListButton = screen.getByTestId('add-button');

		fireEvent.click(addToListButton);
		expect(mockMovielistHandler).toHaveBeenCalled();
	});

	it('should call handleMovieClick when more button is clicked', () => {
		render(
			<MovieActions
				movie={mockMovie}
				newWatchlist={mockNewWatchlist}
				handleMovieClick={mockHandleMovieClick}
				movielistHandler={mockMovielistHandler}
			/>
		);

		const moreButton = screen.getByTestId('more-button');

		fireEvent.click(moreButton);
		expect(mockHandleMovieClick).toHaveBeenCalled();
	});
});
