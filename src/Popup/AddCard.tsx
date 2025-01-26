import React from 'react'
import {useForm} from 'react-hook-form'
interface AddCardProps{
    onClose:()=>void
}
interface FormData{
  cardNumber: string;
  cardHolderName:string;
  expireDate:string;
  cvv:number
}
const AddCard:React.FC<AddCardProps> =({onClose}) =>{
  const {
    handleSubmit,
    register,
    formState:{errors},
  } = useForm<FormData>({defaultValues:{},mode:"onBlur"});

  const onSubmit =(data:FormData)=>{
    console.log(data)
  }
  return (
    <div >
        <span  onClick={onClose} style={{cursor:"pointer"}} >&times;</span>
        <h3>Provide Furthure Information</h3>
        <h5 style={{color:"green"}}>Your Payment Info is safe with us</h5>
        <div className='row' style={{justifyContent:"flex-start",width:"100%",backgroundColor:"rgba(105, 105, 100, 0.5)",borderRadius:"5px"}}>
            <i className="bi bi-credit-card" style={{margin:"5px"}}></i>
            <h4>Add a New Card</h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} >
        <div className='column'>
          <div className='rowColumn' style={{justifyContent:"space-around"}}>
            <div className='column'>
            <label>Card Number</label>
        <input className="formInput" type='text' id='cardNumber' {...register("cardNumber",
          {required:"Please Enter Card Number"})}></input>
          {errors.cardNumber && (
                <span style={{ color: "red" }}>
                  {errors.cardNumber.message}
                </span>
              )}
            </div>
         <div className='column'>
        <label>Card Holder Name</label>
        <input className="formInput" type='text' id='cardHolderName' {...register("cardHolderName",
          {required:"Please Enter Card Holder Name"})}></input>
          {errors.cardHolderName && (
                <span style={{ color: "red" }}>
                  {errors.cardHolderName.message}
                </span>
              )}
          </div> 
          </div>
        <div className='rowColumn' style={{justifyContent:"space-around"}}>
        <div className='column'>
        <label>Expire Date</label>
        <input className="formInput" type='month' id='expireDate' {...register("expireDate",
          {required:"Please Enter ExpireDate"})} min="2024.01"></input>
          {errors.expireDate && (
                <span style={{ color: "red" }}>{errors.expireDate.message}</span>
              )}
        </div>
        <div className='column'>
        <label>CVV</label>
        <input className="formInput" type='text' id='cvv' {...register("cvv",
          {required:"CVV is Required",pattern:{
            value:/^\d{3}$/g,
            message:"Please Enter 3 digit cvv"
          }})}></input>
          {errors.cvv && (
                <span style={{ color: "red" }}>{errors.cvv.message}</span>
              )}
        </div>
          </div>
          <button type="submit" className='large-button' style={{width:"50%",alignSelf:"center"}}>Submit</button>
          </div>
      </form>
       
    </div>
  )
}

export default AddCard