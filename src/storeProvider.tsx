import React ,{createContext, useReducer, ReactNode}from 'react'
import { productInfo } from './components/MoreToLove';

export interface cartItemInfo{
  productInfo:productInfo,
  count:number,
  selected:boolean,
}

export interface stateInfo{
  shippingAddress:{
    province: string;
    district:string;
    town:string;
    postalCode:number
  },
  cartItems:cartItemInfo[];
  language:string;
  userName:string;
  isPopupOpen:boolean;
}

export interface actionInfo{
  type:string;
  payload?:any;
}

function reducer(state:stateInfo, action:actionInfo):stateInfo{
  let id:number;
  let existItem:any;
 switch(action.type){
  case 'ADD_TO_CART':
    id =action.payload.productInfo.id
    existItem = state.cartItems.find((item)=>(item.productInfo.id===id))
    if(existItem){
      return {...state,cartItems:state.cartItems.map((item)=>item.productInfo.id!==id? item:{...existItem,count:existItem.count+1})}
    }else{
      return {...state,cartItems:[...state.cartItems,action.payload]}
    }
  case 'DELETE_FROM_CART':
    return {...state,cartItems:state.cartItems.filter((item,index)=>item.productInfo.id!==action.payload.productInfo.id)}
  case 'REMOVE_FROM_CART':
    existItem= state.cartItems.find((item)=>(item.productInfo.id===action.payload.productInfo.id))
    return {...state,cartItems:state.cartItems.map((item)=>item.productInfo.id!==action.payload.productInfo.id? item:{...existItem,count:existItem.count-1})}
  case 'ITEM_SELECT':
    existItem= state.cartItems.find((item)=>(item.productInfo.id===action.payload.productInfo.id))
    return {...state,cartItems:state.cartItems.map((item)=>item.productInfo.id!==action.payload.productInfo.id? item:{...existItem,selected:!existItem.selected})}
  case 'SET_PROVINCE':
    localStorage.setItem("province",JSON.stringify(action.payload))
    return{...state,shippingAddress:{...state.shippingAddress,province:action.payload}}
  case 'OPEN_POPUP':
    return {...state,isPopupOpen:true}
  case 'CLOSE_POPUP':
    return {...state,isPopupOpen:false}
  default:
    return state
 }
}

const initialState:stateInfo={
  shippingAddress:{
    province: (localStorage.getItem("province")? localStorage.getItem("province"):"NP") as string ,
    district:(localStorage.getItem("district")? localStorage.getItem("district"):"Jaffna") as string,
    town:"",
    postalCode:0
  },
  cartItems:[],
  language:(localStorage.getItem("language")? localStorage.getItem("language"):"EN") as string,
  userName:"",
  isPopupOpen:false
}
export interface StoreContext {
  state: stateInfo;
  dispatch: React.Dispatch<actionInfo>;
}
export const Store = createContext<StoreContext>({
  state:initialState,
  dispatch:()=>{}
});

interface StoreProviderProps {
  children: ReactNode;
}
const StoreProvider:React.FC<StoreProviderProps> =({children}) =>{
  const[state,dispatch] = useReducer(reducer,initialState)
  const value ={state,dispatch}
  return (
    <Store.Provider value={value}>{children}</Store.Provider>
  )
}

export default StoreProvider