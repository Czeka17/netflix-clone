import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "@react-hook/media-query";
import DesktopNav from "./desktop-nav";
import MobileNavigation from "./mobile-nav";
function MainNavigation() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

    const { data: session, status } = useSession()


    const [navBg, setNavBg] = useState("transparent");
    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        if (currentScrollPos > 0) {
          setNavBg("bg-neutral-900");
        } else {
          setNavBg("bg-transparent"); 
        }
      };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
return <>
{session && !isDesktop && <MobileNavigation />}
  {session && isDesktop && <DesktopNav navBg={navBg} />}
</>
}

export default MainNavigation;