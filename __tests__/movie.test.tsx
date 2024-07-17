import { render, screen, fireEvent } from '@testing-library/react';
import Movie from '../components/movies/movie';
import { Movieobj } from '../lib/types';
import { SessionProvider } from 'next-auth/react';
const mockMovie: Movieobj = {
    id: 1,
    title: 'Movie 1',
    name:'Movie 1',
    vote_average: 7.5,
    release_date: '11-12-2020',
    genre_ids: [20, 10],
    backdrop_path: 'a',
    overview: 'Movie 1'
};

jest.mock('../context/MoviesContext', () => ({
    useMovies: () => ({
        watchlist: [],
        watchlistUpdate: jest.fn()
    })
}));

describe('Movie Component', () => {
    beforeAll(() => {
        const portalDiv = document.createElement('div');
        portalDiv.setAttribute('id', 'modals');
        document.body.appendChild(portalDiv);
    });

    afterAll(() => {
        const portalDiv = document.getElementById('portal');
        if (portalDiv) {
            document.body.removeChild(portalDiv);
        }
    });

    it('should render without crashing', () => {
        render(  <SessionProvider session={null}>
            <Movie movie={mockMovie} isWatchlist={false} />
        </SessionProvider>);
        expect(screen.getByText('Movie 1')).toBeInTheDocument();
    });

    it('should show MovieActions on hover', () => {
        render(<SessionProvider session={null}>
            <Movie movie={mockMovie} isWatchlist={false} />
        </SessionProvider>);
        
        const movieDiv = screen.getByTestId('movie');
        fireEvent.mouseEnter(movieDiv);
        
        expect(screen.getByTestId('movie-actions')).toBeInTheDocument();
    });

    it('should open YoutubeModal on image click', () => {
        render(<SessionProvider session={null}>
            <Movie movie={mockMovie} isWatchlist={false} />
        </SessionProvider>);
        
        const movieImage = screen.getByRole('img');
        fireEvent.mouseEnter(movieImage);
        fireEvent.click(movieImage);
        
        expect(screen.getByTestId('youtube-modal')).toBeInTheDocument();
    });

    
});
