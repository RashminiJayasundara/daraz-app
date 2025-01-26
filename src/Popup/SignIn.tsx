import React, { useMemo } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useQuery, useLazyQuery ,gql } from '@apollo/client';
import { useForm } from 'react-hook-form';
import VerifyEmail from './VerifyEmail';

interface signInProps{
    isOpen:boolean
    onClose:()=>void
}
interface formProps{
    email:string
}
const SignIn: React.FC<signInProps>=({isOpen,onClose})=> {
    const CHECK_USE_REGISTER = gql`
    query CheckUserIsRegister($email:String) {
    CheckUserIsRegister(email:$email)
    }
    `
    const auth = getAuth();
    const{register,
        handleSubmit,
        getValues,
        formState
    } = useForm<formProps>({defaultValues:{}})
    const [checkRegister,{loading,error,data}] = useLazyQuery(CHECK_USE_REGISTER)
    const{isSubmitted}= formState
    const signInWithGoogle = async () => {
        onClose()
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        console.log(result.user); // Logged-in user details
    } catch (error) {
        console.error("Error signing in:", error);
    }
    };
    const handleContinue =()=>{
        checkRegister({
            variables:{
                email:getValues("email")
            }
    })
    };
    if (!isOpen) return null;

    return (
      <div className="popup" style={{opacity:1}}>
        
          <span onClick={onClose} style={{ cursor: 'pointer' }}>
            &times;
          </span>
          <div style={{display:(isSubmitted && !data?.CheckUserIsRegister)?"none":"flex"}}>
          <div style={{display:"flex",flexDirection:"column", alignItems:"baseline"}}>
          <h3>Register / Sign In</h3>
          <form onSubmit={handleSubmit(()=>{
            handleContinue()
          })}>
            <div className='column'>
            <div className='row'>
              <label>Email</label>
              <input type="email" id="email" 
              {...register("email")} className="formInput" />
            </div>
           { data?.CheckUserIsRegister && <div className='row'>
              <label>Password</label>
              <input type="password" required className="formInput" />
            </div>}
            <button type="submit" className='large-button' >Continue</button>
            </div>
          </form>
          <button onClick={signInWithGoogle} className='iconbutton'>
        <i className="bi bi-google" style={{fontSize:'30px'}}></i>
        </button>
          </div>
          </div>
          {isSubmitted && !data?.CheckUserIsRegister && <VerifyEmail email={getValues("email")}/>}
      </div>
    );
}

export default SignIn