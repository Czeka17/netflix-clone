import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MovieList from '../components/movies/movie-list';
import { MovieListProps } from '../lib/types';
import { Movieobj } from '../lib/types';

const mockMovies = [
  { id: 1, title: 'Movie 1',name:'Movie 1', vote_average: 7.5, release_date:'11-12-2020', genre_ids:[20,10], backdrop_path:'a', overview:'Movie 1' },
  { id: 2, title: 'Movie 2',name:'Movie 2', vote_average: 5.5, release_date:'11-12-2020', genre_ids:[10,12], backdrop_path:'a',overview:'Movie 2'   },
  { id: 3, title: 'Movie 3',name:'Movie 3', vote_average: 6.1, release_date:'11-12-2020', genre_ids:[22,14], backdrop_path:'a',overview:'Movie 3'  },
  { id: 4, title: 'Movie 4',name:'Movie 4', vote_average: 7.2, release_date:'11-12-2020', genre_ids:[27,7], backdrop_path:'a',overview:'Movie 4'  },
  { id: 5, title: 'Movie 5',name:'Movie 5', vote_average: 6.5, release_date:'11-12-2020', genre_ids:[20,2], backdrop_path:'a',overview:'Movie 5'   },
];


jest.mock('../components/movies/movie', () => {
    return ({ movie }: { movie: Movieobj }) => (
        <div data-testid="movie">{movie.title}</div>
    );
});


jest.mock('react-slick', () => {
    return (props: { children: React.ReactNode; nextArrow?: React.ReactElement; prevArrow?: React.ReactElement }) => (
      <div>
        <div data-testid="prev-arrow" onClick={props.prevArrow?.props?.onClick}>Prev</div>
        {props.children}
        <div data-testid="next-arrow" onClick={props.nextArrow?.props?.onClick}>Next</div>
      </div>
    );
  });
  


describe('MovieList Component', () => {
	const defaultProps: MovieListProps = {
		title: 'Top Movies',
		movieslist: mockMovies,
		isTvSerie: false,
	};

	it('should render without crashing', () => {
		render(<MovieList {...defaultProps} />);
		expect(screen.getByText('Top Movies')).toBeInTheDocument();
	});
    it('should render a list of movies', () => {
        render(<MovieList {...defaultProps} />);
        const movieElements = screen.getAllByTestId('movie');
        expect(movieElements.length).toBe(mockMovies.length);
        mockMovies.forEach((movie, index) => {
            expect(movieElements[index]).toHaveTextContent(movie.title);
        });
    });
    
    
      

	it('should render next and previous arrow buttons', () => {
		render(<MovieList {...defaultProps} />);
		expect(screen.getByTestId('next-arrow')).toBeInTheDocument();
		expect(screen.getByTestId('prev-arrow')).toBeInTheDocument();
	});

	it('should handle click on next arrow', () => {
		const { container } = render(<MovieList {...defaultProps} />);
		const nextArrow = screen.getByTestId('next-arrow');
		fireEvent.click(nextArrow);
	});

	it('should handle click on previous arrow', () => {
		const { container } = render(<MovieList {...defaultProps} />);
		const prevArrow = screen.getByTestId('prev-arrow');
		fireEvent.click(prevArrow);
	});
});
