import Link from "next/link";
import { useState, useEffect } from "react";
function MainNavigation() {

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
return <nav className={`fixed w-full text-white z-10 duration-300 ${navBg}`}>
    <ul className="flex flex-row mr-60 my-5 justify-between items-center">
        <li>
            <Link href='/' className="p-5 hover:text-violet-600 duration-200">
            WATCH&CHILL
            </Link>
        </li>
        <li>
            <Link href='/' className="p-5 hover:text-violet-600 duration-200">
            Films
            </Link>
        </li>
        <li>
            <Link href='/' className="p-5 hover:text-violet-600 duration-200">
            My List
            </Link>
        </li>
        <li>
            <Link href='/' className="p-5 hover:text-violet-600 duration-200">
            Profile
            </Link>
        </li>
    </ul>
</nav>
}
export default MainNavigation;