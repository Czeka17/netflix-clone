import { useRef, useState } from "react";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/router";
async function createUser(email,name,password){
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
		body: JSON.stringify({email, name, password}),
		headers: {
			'Content-Type': 'application/json'
		}
    })
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Something went wrong!')
    }
    return data;
}

function AuthForm() {
    const router = useRouter()
    const [authMode, setAuthMode] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();


    function authModeHandler(e){
        e.preventDefault()
        setAuthMode((prevstate) => !prevstate)
        setAnimate(true);
        setTimeout(() =>{
            setAnimate(false)
        },500)
    }

    async function submitHandler(event){
        event.preventDefault();

        if(authMode){
            const enteredEmail = emailInputRef.current.value;
            const enteredPassword = passwordInputRef.current.value;

            const result = await signIn('credentials', {redirect:false,
            email: enteredEmail,
        password:enteredPassword
    })
    if(!result.error){
        router.replace('/')
    }
        }else{
            try{
                const enteredName = nameInputRef.current.value;
                const enteredEmail = emailInputRef.current.value;
                const enteredPassword = passwordInputRef.current.value;

                const result = await createUser(enteredEmail,
                    enteredName,enteredPassword)
                    console.log(result)
            }catch(error){
                console.log(error)
            }
        }
    }
    return(
        <section className="z-20 bg-black m-4 bg-opacity-70 py-6 px-10 h-[550px] rounded">
            <div className="z-20 font-mono">
                <h1 className="text-center text-4xl font-bold tracking-wide text-white">Moowiz</h1>
                <p className="text-white">Log in or create a free account now!</p>
                <p className="text-white">Watch tons of movies in one place!</p>
            </div>
            <form className="flex flex-col justify-center items-center z-20 h-full relative" onSubmit={submitHandler}>
                <div className="absolute top-0 left-0 w-full flex flex-col items-center">
                {!authMode && <input className={`py-5 px-10 m-3 rounded-lg border-2 border-double border-red-700 bg-neutral-800 text-white w-full ${animate ? 'animate-pulse' : ''}`} type="name" id="name" placeholder="name" ref={nameInputRef}/>}
                <input className="py-5 px-10 m-3 rounded-lg border-2 border-double border-red-700 bg-neutral-800 w-full text-white" type="email" id="email" placeholder="email" ref={emailInputRef} />
                <input className="py-5 px-10 m-3 rounded-lg border-2 border-double  w-full border-red-700 bg-neutral-800 text-white" type="password" id="password" placeholder="password" ref={passwordInputRef} />
                </div>
                <div>
                    <p></p>
                </div>
                <div className="absolute bottom-20 left-0 w-full flex flex-col items-center">
                    <button className="m-4 py-3 w-full bg-red-700 text-white rounded">{authMode ? 'Log in' : 'Create account'}{isLoading && <p>Loading...</p>}</button>
                    <button className="text-white border-2 w-full py-2 rounded bg-neutral-800" onClick={authModeHandler}>{authMode ? 'Create new account' : 'I have existing account'}</button>
                </div>
            </form>
        </section>
    )
}

export default AuthForm;