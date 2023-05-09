import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
function Greetings(){
    const { data: session, status } = useSession()

    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
          const redirectTimer = setTimeout(() => {
            router.push("/");
          }, 5000);
      
          return () => clearTimeout(redirectTimer);
        } else {
          router.push("/");
        }
      }, [status]);
    return(
        <div className="w-screen fixed h-screen flex justify-center items-center z-50 bg-black">
            <h2 className="text-white shadow-2xl p-2 shadow-red-700 text-4xl lg:text-6xl text-center">Hello {session.user.name}!</h2>
        </div>
    )
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
export default Greetings;