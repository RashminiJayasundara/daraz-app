import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import useSignInPopup from '../customHooks/useSignInPopup';
import SignIn from '../Popup/SignIn';

function SignOption() {


  const{isPopupOpen,openPopup,closePopup} = useSignInPopup();
  const auth = getAuth();
  
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user); // Logged-in user details
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
      
  return (
    <div>
    <div className='column card'>
        <div className='row'>
            <button className='large-button' onClick={openPopup}>Register</button>
            <button className='large-button0' onClick={openPopup}>Sign In</button>
        </div>
        <button onClick={signInWithGoogle} className='iconbutton'>
        <i className="bi bi-google" style={{fontSize:'30px'}}></i>
        </button>
    </div> 
    {isPopupOpen && <SignIn onClose={closePopup} isOpen={isPopupOpen}></SignIn>}   
    </div>
  )
}

export default SignOption