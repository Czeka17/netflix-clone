import AuthForm from "@/components/auth/auth-form";

function auth(){
return <section className="bg-[url('/poster/hero-pattern.jpg')] bg-center bg-cover h-screen w-full flex flex-col justify-center items-center relative">
    <div>
        <div className="absolute h-screen w-screen bottom-0 left-0 bg-black z-10 opacity-50"></div>
    </div>
    <AuthForm />
</section>
}
export default auth;