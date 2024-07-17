import { render, screen, fireEvent } from '@testing-library/react';
import YoutubeModal from '../components/movies/youtube-modal';
import { fetchTrailerUrl } from '../lib/api';

jest.mock('../lib/api', () => ({
    fetchTrailerUrl: jest.fn() as jest.Mock<Promise<string>>
  }));

const mockMovie = {
  id: 1,
  title: 'Movie 1',
  name:'Movie 1',
  vote_average: 7.5,
  release_date: '2020-11-12',
  backdrop_path:'a',
  overview: 'Movie 1 Overview',
  genre_ids: [10,20]
};

describe('YoutubeModal Component', () => {
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
  const hideModal = jest.fn();

  beforeEach(() => {
    (fetchTrailerUrl as jest.Mock).mockClear();
  });

  it('should render without crashing', () => {
    render(<YoutubeModal movie={mockMovie} hideModal={hideModal} isTvSerie={false} />);
    expect(screen.getByTestId('youtube-modal')).toBeInTheDocument();
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
  });

  it('should call fetchTrailerUrl on mount', async () => {
    (fetchTrailerUrl as jest.Mock).mockResolvedValue('https://trailer.url');
    render(<YoutubeModal movie={mockMovie} hideModal={hideModal} isTvSerie={false} />);

    expect(fetchTrailerUrl).toHaveBeenCalledWith(mockMovie.id, false);
  });

  it('should show loading spinner while loading trailer', async () => {
    (fetchTrailerUrl as jest.Mock).mockImplementation(() => new Promise(() => {})); 
    render(<YoutubeModal movie={mockMovie} hideModal={hideModal} isTvSerie={false} />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument(); 
  });

  it('should render ReactPlayer when trailer URL is fetched', async () => {
    (fetchTrailerUrl as jest.Mock).mockResolvedValue('https://trailer.url');
    render(<YoutubeModal movie={mockMovie} hideModal={hideModal} isTvSerie={false} />);

    const player = await screen.findByTestId('react-player');
    expect(player).toBeInTheDocument();
  });

  it('should close modal when close button is clicked', () => {
    render(<YoutubeModal movie={mockMovie} hideModal={hideModal} isTvSerie={false} />);
    
    fireEvent.click(screen.getByText('Close'));
    expect(hideModal).toHaveBeenCalledTimes(1);
  });
});
