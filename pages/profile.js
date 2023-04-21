import MainNavigation from "@/components/layout/main-navigation"
import { getSession } from "next-auth/react";

function Profile({session}) {
    return(
        <>
        <MainNavigation />
        <section className="text-white flex flex-col justify-center items-center h-screen">
        <h1 className="p-4 m-4">My profile</h1>
        <img className="w-[250px] h-[250px] rounded-full" src={session.user.image} />
        <p className="p-4 m-4">{session.user.name}</p>
        </section>
        </>
    )
}
export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (!session) {
      // Handle case when session is not available
      return {
        props: {
          session: null,
        },
      };
    }
  
    if (!response.ok) {
      throw new Error('Failed to fetch movie list');
    }
  
    return {
      props: {
        session, // Include session data in the props
      },
    };
  }
export default Profile