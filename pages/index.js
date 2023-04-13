import MainNavigation from "@/components/layout/main-navigation";
import FeaturedMovie from "@/components/movies/featured-movie";
import MovieList from "@/components/movies/movie-list";
import requests from "@/Requests";

function Home(){
return <div>
    <MainNavigation />
    <FeaturedMovie />
    <MovieList title={'Popular'} fetchURL={requests.requestPopular} />
    <MovieList title={'Top Rated'} fetchURL={requests.requestTopRated} />
    <MovieList title={'Upcoming'} fetchURL={requests.requestUpcoming} />
</div>
}
export default Home;