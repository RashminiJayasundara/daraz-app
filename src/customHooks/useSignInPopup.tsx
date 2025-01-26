import React,{useState, useContext} from 'react'
import { Store } from '../storeProvider'

const useSignInPopup =() =>{
 const[isPopupOpen,setIsPopupOpen] = useState(false)
 const store =useContext(Store)
 const{state,dispatch}=store
 const openPopup =()=>{
    setIsPopupOpen(true)
    dispatch({type:"OPEN_POPUP"})
 }
 const closePopup =()=>{
    setIsPopupOpen(false)
    dispatch({type:"CLOSE_POPUP"})
 }
  return {isPopupOpen,openPopup,closePopup}
}

export default useSignInPopup