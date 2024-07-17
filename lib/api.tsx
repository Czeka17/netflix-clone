'use server'
import axios from "axios";

export async function addMovieHandler(
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
export async function deleteMovieHandler(
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

    
export async function fetchTrailerUrl(movieId: number, isTvSerie?: boolean): Promise<string> {
    try {
      let response;
      if (isTvSerie) {
        response = await axios.get(
          `https://api.themoviedb.org/3/tv/${movieId}/videos`,
          {
            params: {
              api_key: `${process.env.NEXT_PUBLIC_TMDB_MOVIEDB_KEY}`,
            },
          }
        );
      } else {
        response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          {
            params: {
              api_key: `${process.env.NEXT_PUBLIC_TMDB_MOVIEDB_KEY}`,
            },
          }
        );
      }
      const videos = response.data.results;
      const trailer = videos.find((video: any) => video.type === 'Trailer');
      if (trailer) {
        return `https://www.youtube.com/watch?v=${trailer.key}`;
      } else {
        throw new Error('Trailer not found');
      }
    } catch (error) {
      console.error('Error fetching trailer URL:', error);
      throw error;
    }
  }

  export async function createUser(email:string,name:string,password:string){
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
    body: JSON.stringify({email, name, password}),
    headers: {
      'Content-Type': 'application/json'
    }
    })
    const data = await response.json();
  
    if(!response.ok){
        throw new Error(data.message || 'Something went wrong!')
    }
    return data;
  }