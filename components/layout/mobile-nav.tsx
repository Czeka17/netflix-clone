import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import Hamburger from "hamburger-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import { ImSearch } from "react-icons/im";
import Image from "next/image";

function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  function hideNavHandler() {
    setIsOpen(false)
  }
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null);
  function logoutHandler() {
    signOut();
  }


function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
  const searchQuery = event.target.value;
  setIsOpen(false)
router.push(`/search?q=${searchQuery}`);
};
function SearchHandler(){
  inputRef.current?.focus();
}

  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body?.classList.add("overflow-hidden");
    } else {
      body?.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <div className="fixed w-full h-16 bg-red-700 text-white z-40 duration-300">
      <div className="flex justify-between items-center px-4 h-full">
        <Link href="/" className="font-bold mr-4 left-0 z-50 flex flex-row items-center justify-center">
        <div className="max-w-[75px] max-h-[75px] mx-2">
        <Image src="/logo.png" alt="Mooviz logo" width={75} height={75}/>
        </div>
          Moowiz
        </Link>
        <li className="flex flex-row items-center relative w-[70%] mx-2">
          <input
            className={`absolute w-[100%] py-1 px-2 rounded bg-transparent border-2 border-white text-white`}
            type="text"
            placeholder="Search"
            onChange={handleInputChange}
            ref={inputRef}
          />
        <ImSearch
          className="absolute right-0 text-xl mx-2 cursor-pointer"
          onClick={SearchHandler}
        />
      </li>
       <div className="right-0">
       <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
          color="white"
          label="Show menu"
        />
       </div>
      </div>
      <nav className={`w-screen p-2 h-screen bg-red-700 duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{width: '100vw'}}>
        <ul className="flex flex-col justify-evenly items-center h-full text-white text-2xl">
          <li onClick={hideNavHandler}>
            <Link href="/" data-testid="films-link">Films</Link>
          </li>
          <li onClick={hideNavHandler}>
            <Link href="/watchlist" data-testid="watchlist-link">My List</Link>
          </li>
          <li>
            <button onClick={logoutHandler} className="flex flex-row items-center hover:text-red-600 duration-300">
              Log out<FiLogOut className="mx-2 text-xl stroke-white"/>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default MobileNavigation;