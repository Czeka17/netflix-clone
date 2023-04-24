import { getSession } from "next-auth/react";

function Watchlist({ movies, session }) {
  return (
    <section className="py-10">
      <h1 className="text-white flex justify-center items-center py-10">
      Your Watchlist
      </h1>
     <div>
        <ul className="flex flex-row flex-wrap justify-center items-center">
          {movies.map((movie) => (
            <li className="w-[250px] h-[250px] p-2 flex-wrap" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              />
              <p className="text-white">{movie.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    // Handle case when session is not available
    return {
      props: {
        session: null,
        movies: [],
      },
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    };
  }

  // Access session.user.email and fetch data
  const response = await fetch('http://localhost:3000/api/watchlist/getWatchlist', {
    method: 'POST',
    body: JSON.stringify({ email: session.user.email }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch movie list');
  }

  const data = await response.json();
  const movies = data.watchlist;

  return {
    props: {
      movies,
      session, // Include session data in the props
    },
  };
}

export default Watchlist;