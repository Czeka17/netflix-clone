import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
function MainNavigation() {

    const { data: session, status } = useSession()
    function logoutHandler() {
      signOut();
    }


    const [navBg, setNavBg] = useState("transparent");
    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        if (currentScrollPos > 0) {
          setNavBg("bg-black");
        } else {
          setNavBg("bg-transparent"); 
        }
      };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
return <nav className={`fixed w-full text-white z-40 duration-300 ${navBg}`}>
    <ul className="flex flex-row mr-60 my-5 justify-between items-center">
        <li>
            <Link href='/' className="p-5 hover:text-red-600 duration-200">
            WATCH&CHILL
            </Link>
        </li>
        <li>
            <Link href='/' className="p-5 hover:text-red-600 duration-200">
            Films
            </Link>
        </li>
        <li>
            <Link href={`watchlist?email=${session.user.email}`} className="p-5 hover:text-red-600 duration-200">
            My List
            </Link>
        </li>
        <li>
            <Link href='/profile' className="p-5 hover:text-red-600 duration-200">
            Profile
            </Link>
        </li>
        <li>
            <button onClick={logoutHandler}>Log out</button>
        </li>
    </ul>
</nav>
}
export default MainNavigation;