import React, { useState, useEffect, useRef } from "react";
import Notification from "../layout/notification";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
function SignupModal({showModal, hideModal, createUser}) {
  const router = useRouter()
    const [show, setShow] = useState(false);
    const [requestStatus, setRequestStatus] = useState();
    const [requestError, setRequestError] = useState();
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();


    async function submitHandler(e) {
        e.preventDefault()
        try{
          setRequestStatus('pending')
            const enteredName = nameInputRef.current.value;
            const enteredEmail = emailInputRef.current.value;
            const enteredPassword = passwordInputRef.current.value;
    
            const result = await createUser(enteredEmail,
                enteredName,enteredPassword)
                console.log(result)
                await signIn('credentials', {
                  redirect: false,
                  email: enteredEmail,
                  password: enteredPassword,
                });
                setRequestStatus('success')
                router.replace('/');
            }catch(error){
              setRequestError(error.message)
              setRequestStatus('error')
            }
    }


    useEffect(() => {
      if (showModal) {
        setShow(true);
      } else {
        setShow(false);
      }
    }, [showModal]);


    let notification;

    if(requestStatus === 'pending'){
      notification = {
          status: 'pending',
          title: 'Checking credentials...',
          message: 'Checking credentials'
      }
  }
  
  if(requestStatus === 'success') {
      notification = {
          status: 'success',
          title: 'Success!',
          message: 'Created user!'
      }
  }
  if(requestStatus === 'error') {
      notification = {
          status: 'error',
          title: 'Error!',
          message: requestError
      }
  }
    return <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-opacity duration-500`}
    >
      <div className="flex items-center justify-center min-h-screen p-4 text-center">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-red-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <h2 className="text-white text-2xl flex justify-center items-center p-4">Sign Up</h2>
            <form className="flex flex-col p-6" onSubmit={submitHandler}>
                <input type="name" id="name" placeholder="name" className="p-4 mx-10 my-2 rounded-lg bg-neutral-800 border-2 border-white" ref={nameInputRef} />
                <input type="email" id="email" placeholder="email"
                className="p-4 mx-10 my-2 rounded-lg bg-neutral-800 border-2 border-white" ref={emailInputRef} />
                <input type="password" id="password" placeholder="password" 
                className="p-4 mx-10 my-2 rounded-lg bg-neutral-800 border-2 border-white" ref={passwordInputRef}/>
                <div className="flex flex-row justify-end items-end">
                <button onClick={() => hideModal()} className="text-white p-2 m-2">Cancel</button>
                <button className="border-2 border-white bg-white text-red-700 bg-red-700 p-2 m-2 rounded-lg hover:text-white hover:bg-red-700 duration-300">Sign up</button>
                </div>
            </form>
        </div>
      </div>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
    </div>
}

export default SignupModal;