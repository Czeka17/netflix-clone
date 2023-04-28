import MainNavigation from "@/components/layout/main-navigation";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
function Profile() {

  const { data: session, status } = useSession()
  return (
    <>
      <section className="text-white flex flex-col justify-center items-center h-screen">
        <h1 className="p-4 m-4">My profile</h1>
        <img className="w-[250px] h-[250px] rounded-full" src={session.user.image} />
        <p className="p-4 m-4">{session.user.name}</p>
      </section>
    </>
  );
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
export default Profile;