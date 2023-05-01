import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';

function Watchlist() {
  const { data: session, status } = useSession();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchWatchlist() {
      if (status === 'authenticated') {
        const response = await fetch('/api/watchlist/getWatchlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: session.user.email }),
        });
        const data = await response.json();
        setMovies(data.watchlist);
      }
    }
    fetchWatchlist();
  }, [session, status]);

  return (
    <section className="py-10">
      <div className="h-[175px] w-[175px] lg:h-[250px] lg:w-[250px]">
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
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
  const session = await getSession({req: context.req});

  if(!session){
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    };
  }

  return {
    props: { session },
  };
}
export default Watchlist;