import React ,{useContext,useState}from 'react'
import { useLocation } from 'react-router-dom'
import { cartItemInfo, Store, StoreContext } from '../storeProvider'
import AddCard from '../Popup/AddCard'



function PlaceOrderPage() {
  const location= useLocation()
  const {fromCart,product} = location.state
  const[buyCount,setBuyCount]= useState<number>(1)
  const store:StoreContext = useContext(Store)
  const{state,dispatch}=store
  const data:cartItemInfo[] = fromCart? state.cartItems as cartItemInfo[] : [product]
  const subTotal:number= fromCart? state.cartItems.reduce((a,c)=>c.selected? a+c.productInfo.price*c.count: a,0) : product?.productInfo.price * buyCount
  const[showCardDetailsPopup,setShowCardDetailsPopup]= useState<boolean>(false)
  return (
    <div>
    <div className='rowColumn' style={{marginLeft:"10vw",marginRight:"10vw",opacity:showCardDetailsPopup? "0.25":"1"}}>
        <div className='column' >
        <div className='cartItem'>
            <h3>Shipping Address</h3>
        </div>
        <div className='cartItem'>
            <h3>Payment Methods</h3>
            <div >
            <button  style={{cursor:'pointer',outline:'none',border:'none',background:"none"}} 
                    className='row'
                    onClick={()=>setShowCardDetailsPopup(true)}>
            <i className="bi bi-circle"></i>
            <i className="bi bi-credit-card"></i>
            <h4>Add a New Card</h4>
            </button>
            </div>
        </div>
        <div className='cartItem'>
             <h3>Shipping Method</h3>
             <h3>Item Details</h3>
             <div>
             {data.map((item)=>( item.selected &&
                <div key={item.productInfo.id} >
                <div className='row' style={{justifyContent:"flex-start"}}>
                <h5>Store name</h5>
                </div>
                <div className='row' style={{justifyContent:"space-between"}}> 
                    <div className='row'>
                    <img src={item.productInfo.image} alt={item.productInfo.description} className='productimg'></img>
                    <div className='column'>
                        <div className='row'>
                        <h5>{item.productInfo.description}</h5>
                        </div>
                        <h5>LKR {item.productInfo.price}</h5>
                    </div>
                    </div>
                    <div className='row'>
                    <button className='iconbutton' onClick={()=>fromCart? dispatch({type:"ADD_TO_CART",payload:item}): setBuyCount((pre)=>pre+1)}>
                    <i className="bi bi-plus" style={{ fontSize: '20px', cursor: 'pointer',color:"black" }}></i>
                    </button>
                    <h5>{fromCart? item.count: buyCount}</h5>
                    <button className='iconbutton' 
                    onClick={()=>fromCart? dispatch({type:"REMOVE_FROM_CART",payload:item}): setBuyCount((pre)=>pre-1)} 
                    disabled={fromCart? item.count===0: buyCount===0}>
                    <i className="bi bi-dash" style={{ fontSize: '20px', cursor: 'pointer',color:"black" }}></i>
                    </button>
                    </div>
                </div>
                </div>
             ))}
            </div>
        </div>
        </div>
        <div className='card '>
        <h3>Summary</h3>
        <div className='rowSpaceBetween'>
            <h4>Subtotal</h4>
            <h4>LKR {subTotal}</h4>
        </div>
        <div className='rowSpaceBetween'>
        <h4>Shipping Fee</h4>
        <h4>LKR 280.00</h4>
        </div>
        <div className='rowSpaceBetween'>
        <h4>Total</h4>
        <h4>LKR {subTotal+280}</h4>
        </div>
        <button className='large-button'>
                Place Order
        </button>
        </div>

    </div>
    {showCardDetailsPopup && 
            <div className='popup'>
            <AddCard onClose={()=>setShowCardDetailsPopup(false)}/>
            </div>}
    </div>
  )
}

export default PlaceOrderPage