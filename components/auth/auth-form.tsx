import React, { useRef, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignupModal from "./signup-modal";
import Notification from "../layout/notification";
import { LegacyRef } from "react";
function AuthForm() {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [requestStatus, setRequestStatus] = useState<string | null>();

    const emailInputRef = useRef<HTMLInputElement>();
    const passwordInputRef = useRef<HTMLInputElement>();

    useEffect(() => {
        if(requestStatus === 'success' || requestStatus === 'error'){
            const timer = setTimeout(() =>{
                setRequestStatus(null);
            }, 3000);
  
            return () => clearTimeout(timer);
        }
    }, [requestStatus])

    function handleModalClick() {
        setShowModal(true);
      };
    
      function hideModal() {
        setShowModal(false);
      };



      async function submitHandler(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        setRequestStatus('pending')
            const enteredEmail = emailInputRef.current!.value;
            const enteredPassword = passwordInputRef.current!.value;

            const result = await signIn('credentials', {redirect:false,
            email: enteredEmail,
        password:enteredPassword
    })
    if(!result?.error){
        setRequestStatus('success')
        router.replace('/')
    }else{
        setRequestStatus('error')
    }
        }


        let notification: { status: string; title: string; message: string } | null = null;

  if(requestStatus === 'pending'){
    notification = {
        status: 'pending',
        title: 'Checking...',
        message: 'Checking credentials'
    }
}

if(requestStatus === 'success') {
    notification = {
        status: 'success',
        title: 'Success!',
        message: 'logged in successfully'
    }
}
if(requestStatus === 'error') {
    notification = {
        status: 'error',
        title: 'Error!',
        message: 'Invalid inputs!'
    }
}
    return(
        <section className="z-20 bg-black m-4 bg-opacity-70 py-6 px-10 h-[550px] rounded">
            <div className="z-20 font-mono text-center">
                <h1 className="text-center text-4xl font-bold tracking-wide text-white">Moowiz</h1>
                <p className="text-white">Log in or create a free account now!</p>
                <p className="text-white">Watch tons of movies in one place!</p>
            </div>
            <div>
            <form className="z-20 h-full" onSubmit={submitHandler} role="form">
                <div className="w-full flex flex-col items-center">
                <input className="py-5 px-10 m-3 rounded-lg border-2 border-double border-red-700 bg-neutral-800 w-full text-white" type="email" id="email" placeholder="email" ref={emailInputRef as LegacyRef<HTMLInputElement>} />
                <input className="py-5 px-10 m-3 rounded-lg border-2 border-double  w-full border-red-700 bg-neutral-800 text-white" type="password" id="password" placeholder="password" ref={passwordInputRef as LegacyRef<HTMLInputElement>} />
                <button className="m-4 py-3 w-full bg-red-700 text-white rounded hover:bg-red-600 duration-200">Log in</button>
                </div>
            </form>
            <button className="text-white border-2 w-full py-2 rounded bg-neutral-800 hover:bg-neutral-700 duration-200" onClick={handleModalClick}>Create new account</button>
            <div className="w-full flex flex-col items-center pt-2">
            <p className="text-white">email: test@test.pl</p>
            <p className="text-white">password: test123</p>
            </div>
            </div>
            {showModal && <SignupModal showModal={showModal} hideModal={hideModal} />}
            {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
        </section>
    )
}

export default AuthForm;


