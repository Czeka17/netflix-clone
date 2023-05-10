export async function getWatchlistMovies(email) {
    const response = await fetch('/api/watchlist/getWatchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    return data.watchlist;
  }
  