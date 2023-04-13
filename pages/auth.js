function auth(){
return <section className="bg-slate-900 h-screen flex flex-col justify-center items-center">
    <div>
    <h1 className="font-mono text-8xl font-bold tracking-wide text-green-700">Watch&Chill</h1>
    </div>
    <form className="flex flex-col justify-center items-center py-5">
        <input className="py-5 px-10 m-3 rounded-lg border-2 border-double border-green-700 bg-black" type="email" id="email" placeholder="email" />
        <input className="py-5 px-10 m-3 rounded-lg border-2 border-double border-green-700 bg-black" type="password" id="password" placeholder="password" />
        <button className="m-2 py-3 w-full bg-green-700">Log in</button>
    </form>
</section>
}
export default auth;