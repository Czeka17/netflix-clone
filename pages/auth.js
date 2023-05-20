import AuthForm from "@/components/auth/auth-form";
import Head from "next/head";
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
      <AuthForm />
    </section>
  );
}

export default AuthPage;