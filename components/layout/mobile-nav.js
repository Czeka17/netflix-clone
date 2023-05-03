import React, { useState, useEffect } from "react";
import Hamburger from "hamburger-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
function logoutHandler() {
  signOut();
}
function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  function hideNavHandler() {
    setIsOpen(false)
  }

  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <div className="fixed w-full h-16 bg-red-700 text-white z-40 duration-300">
      <div className="flex justify-between items-center px-4 h-full">
        <Link href="/" className="text-lg font-bold left-0 z-50">
          MOOWIZ
        </Link>
        <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
          color="white"
          label="Show menu"
          className="right-0"
        />
      </div>
      <nav className={`w-screen p-2 h-screen bg-red-700 duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{width: '100vw'}}>
        <ul className="flex flex-col justify-evenly items-center h-full text-white text-2xl">
          <li onClick={hideNavHandler}>
            <Link href="/">Films</Link>
          </li>
          <li onClick={hideNavHandler}>
            <Link href="/watchlist">My List</Link>
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