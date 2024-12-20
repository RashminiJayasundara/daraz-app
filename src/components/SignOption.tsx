import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function SignOption() {



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
    <div className='column card'>
        <div className='row'>
            <button className='large-button'>Register</button>
            <button className='large-button'>Sign In</button>
        </div>
        <button onClick={signInWithGoogle}>
        <i className="bi bi-google" style={{fontSize:'30px'}}></i>
        </button>
        
    </div>
  )
}

export default SignOption