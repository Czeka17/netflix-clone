import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
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
    <ul className="flex flex-row my-4 justify-between items-center mr-20 p-2">
        <li>
            <Link href='/' className=" hover:text-red-600 duration-200 mx-20 font-bold">
            MOOWIZ
            </Link>
        </li>
        <li>
            <Link href='/' className="hover:text-red-600 duration-200">
            Films
            </Link>
        </li>
        <li>
            <Link href='/watchlist' className=" hover:text-red-600 duration-200">
            My List
            </Link>
        </li>
        <li>
            <Link href='/profile' className="hover:text-red-600 duration-200 flex flex-row items-center">
            Profile
            </Link>
        </li>
        <li>
            <button onClick={logoutHandler} className="flex flex-row items-center hover:text-red-600 duration-300">Log out<FiLogOut className="mx-2 text-xl stroke-red-600"/></button>
        </li>
    </ul>
</nav>
}
export default MainNavigation;