import React ,{useContext}from 'react'
import { Store, StoreContext } from '../storeProvider'
import { useNavigate } from 'react-router-dom'

function CartPage() {
  const store:StoreContext = useContext(Store)
  const {state,dispatch} = store
  const navigate = useNavigate()    
  const subTotal=state.cartItems.reduce((a,c)=>c.selected? a+c.productInfo.price*c.count: a,0)
  return (
    <div className='rowColumn'style={{marginLeft:"10vw",marginRight:"10vw"}}>
        <div className='column' >
        <div className='cartItem'>
        <h3 style={{width:"50vw"}}>Cart({state.cartItems.length})</h3>
        </div>
        <div>
            {state.cartItems?.map((item,index)=>(
                <div className='cartItem'>
                <div className='row' style={{justifyContent:"flex-start"}}>
                <input type='checkbox' ></input>
                <h5>Store name</h5>
                </div>
                <div key={item.productInfo.id} className='row' style={{justifyContent:"space-between"}}> 
                    <div className='row'>
                    <input type='checkbox' checked={item.selected} 
                    onChange={()=>dispatch({type:"ITEM_SELECT",payload:item})}
                    disabled={item.count===0}></input>
                    <img src={item.productInfo.image} alt={item.productInfo.description} className='productimg'></img>
                    <div className='column'>
                        <div className='row'>
                        <h5>{item.productInfo.description}</h5>
                        <button className='iconbutton' onClick={()=>dispatch({type:"DELETE_FROM_CART",payload:item})}>
                        <i className="bi bi-trash3-fill" style={{ fontSize: '20px', cursor: 'pointer' ,color:"black"}}></i>
                        </button>
                        
                        </div>
                        <h5>LKR {item.productInfo.price}</h5>
                    </div>
                    </div>
                    <div className='row cartOperationBox'>
                    <button className='iconbutton' onClick={()=>dispatch({type:"ADD_TO_CART",payload:item})}>
                    <i className="bi bi-plus" style={{ fontSize: '20px', cursor: 'pointer',color:"black" }}></i>
                    </button>
                    <h5>{item.count}</h5>
                    <button className='iconbutton' onClick={()=>dispatch({type:"REMOVE_FROM_CART",payload:item})} disabled={item.count==0}>
                    <i className="bi bi-dash" style={{ fontSize: '20px', cursor: 'pointer',color:"black" }}></i>
                    </button>
                    </div>
                </div>
                </div>
            ))}
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
        <button className='large-button' 
            onClick={()=>navigate('/placeOrder',{state:{fromCart:true, product:[]}})}
            disabled={!state.cartItems.reduce((a,c)=>a || c.selected,false)}>
                Checkout ({state.cartItems.reduce((a,c)=>c.selected? a+c.count:a,0)})
        </button>
        </div>

    </div>
  )
}

export default CartPage