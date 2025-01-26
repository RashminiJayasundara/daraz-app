import { gql,  useQuery } from '@apollo/client'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

interface VerifyEmailProps{
    email:string
}
const VerifyEmail:React.FC<VerifyEmailProps>=({email})=> {
  const inputRef = useRef<HTMLInputElement[]>([])
  let otp="";
  const SEND_OTP = gql`
  query SendOTP($email:String) {
    SendOTP(email:$email)
}
`
  const handleInput =(event:React.ChangeEvent<HTMLInputElement>,index:number)=>{
    const value = event.target.value
    otp+=value
    if(index < inputRef.current.length-1){
        inputRef.current[index+1]?.focus()
    }
    if(index===4){
      console.log(otp)
    }
  }
  const {loading,error,data} = useQuery(SEND_OTP)
  return (
    <div>
        <div>
        <h3>Register</h3>
        <h6>Your information is protected</h6>
        </div>
        <div>
            <h4>Please enter the 5-digit code sent to </h4>
            <h4>{email}</h4>
            <Link to={""}>Modify Email</Link>
        </div>
        <div className='otpBox'>
            {Array.from({length:5}).map((_,index)=>(
                <div className='otpNumBox' key={index}>
                     <input type='text' 
                     className='singleNumberInput'
                     maxLength={1}
                     ref={(el)=>{inputRef.current[index]=el!}}
                     onChange={(e)=>handleInput(e,index)}
                     ></input>
                </div>
            ))}
        </div>
    </div>
  )
}

export default VerifyEmail