import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ChangeEvent, useRef } from 'react';
import { ImSearch } from "react-icons/im";
import { useRouter } from 'next/router';

function DesktopNav(props: { navBg: string }){

    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null);



  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
  router.push(`/search?q=${searchQuery}`);
  };
  function SearchHandler(){
    inputRef.current?.focus();
  }

    function logoutHandler() {
        signOut();
      }
    return( <nav className={`fixed w-full text-white z-40 duration-300 ${props.navBg}`}>
    <ul className="flex flex-row my-4 justify-between items-center p-2">
      <li>
        <Link href='/' className="hover:text-red-600 duration-200 mx-20 font-bold flex items-center justify-center">
        <div className="max-w-[45px] max-h-[45px] mx-2">
        <img src="/logo.png"/>
        </div>
          Moowiz
        </Link>
      </li>
      <li>
      <Link href='/' className={`hover:text-red-600 duration-200 w-48 ${router.pathname === '/' ? 'text-red-600' : ''}`}>
          Films
        </Link>
      </li>
      <li className="ml-6">
      <Link href='/watchlist' className={`hover:text-red-600 duration-200 inline-block ${router.pathname === '/watchlist' ? 'text-red-600' : ''}`}>
          My List
        </Link>
      </li>
      <li className="flex flex-row items-center min-w-[250px] relative">
      <input
  className={`absolute right-8 w-48 mx-2 py-1 px-2 rounded bg-transparent text-white transition-opacity border-2 border-white outline-none focus:border-red-700`}
  type="text"
  placeholder="Search for a movie"
  onChange={handleInputChange}
  ref={inputRef}
/>
        <ImSearch
          className="absolute right-9 text-xl mx-3 hover:fill-red-700 duration-300"
          onClick={SearchHandler}
        />
      </li>
      <li className="md:mr-10 lg:mr-20">
        <button
          onClick={logoutHandler}
          className="flex flex-row items-center hover:text-red-600 duration-300"
        >
          Log out
          <FiLogOut className="mx-2 text-xl stroke-red-600" />
        </button>
      </li>
    </ul>
  </nav>)
}

export default DesktopNav;