const key = `${process.env.NEXT_PUBLIC_TMDB_MOVIEDB_KEY}`

const requests = {
    requestTrending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}`,
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
    requestPopularTV: `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`,

};

export default requests