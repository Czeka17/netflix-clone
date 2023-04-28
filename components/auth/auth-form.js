import { useRef, useState } from "react";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/router";
import SignupModal from "./signup-modal";
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
    const [showModal, setShowModal] = useState(false)

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const handleModalClick = () => {
        setShowModal(true);
      };
    
      const hideModal = () => {
        setShowModal(false);
      };



    async function submitHandler(event){
        event.preventDefault();
            const enteredEmail = emailInputRef.current.value;
            const enteredPassword = passwordInputRef.current.value;

            const result = await signIn('credentials', {redirect:false,
            email: enteredEmail,
        password:enteredPassword
    })
    if(!result.error){
        router.replace('/Greetings')
    }
        }
    return(
        <section className="z-20 bg-black m-4 bg-opacity-70 py-6 px-10 h-[550px] rounded">
            <div className="z-20 font-mono">
                <h1 className="text-center text-4xl font-bold tracking-wide text-white">Moowiz</h1>
                <p className="text-white">Log in or create a free account now!</p>
                <p className="text-white">Watch tons of movies in one place!</p>
            </div>
            <div>
            <form className="z-20 h-full" onSubmit={submitHandler}>
                <div className="w-full flex flex-col items-center">
                <input className="py-5 px-10 m-3 rounded-lg border-2 border-double border-red-700 bg-neutral-800 w-full text-white" type="email" id="email" placeholder="email" ref={emailInputRef} />
                <input className="py-5 px-10 m-3 rounded-lg border-2 border-double  w-full border-red-700 bg-neutral-800 text-white" type="password" id="password" placeholder="password" ref={passwordInputRef} />
                <button className="m-4 py-3 w-full bg-red-700 text-white rounded">Log in</button>
                </div>
            </form>
            <button className="text-white border-2 w-full py-2 rounded bg-neutral-800" onClick={handleModalClick}>Create new account</button>
            </div>
            {showModal && <SignupModal createUser={createUser} showModal={showModal} hideModal={hideModal} />}
        </section>
    )
}

export default AuthForm;


