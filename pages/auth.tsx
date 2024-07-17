import AuthForm from "../components/auth/auth-form";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

function AuthPage() {

  return (
    <section className="bg-[url('/poster/hero-pattern.jpg')] bg-center bg-cover h-screen w-full flex flex-col justify-center items-center relative">
      <Head>
        <title>Authentication</title>
        <meta name="description" content='Create free account and join Moowiz today!' />
      </Head>
      <div>
        <div className="absolute h-screen w-screen bottom-0 left-0 bg-black z-10 opacity-50"></div>
      </div>
      <AuthForm/>
    </section>
  );
}
export async function getServerSideProps(context:GetServerSidePropsContext) {
  const session = await getSession({req: context.req});

  if(session){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };
  }

  return {
    props: { session },
  };
}
export default AuthPage;