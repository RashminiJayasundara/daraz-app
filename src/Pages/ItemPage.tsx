import React ,{useState,useEffect, useContext}from 'react'
import { useLocation ,useNavigate} from 'react-router-dom'
import { productInfo } from '../components/MoreToLove';
import RatingsShower from '../components/RatingsShower';
import{ StoreContext, Store } from '../storeProvider';

export interface storeInfo{
    id:number;
    name:string;
    location:string;
    openDate: string;
}

function ItemPage() {
    const location = useLocation();
    const data:productInfo = location.state;
    const store:StoreContext = useContext(Store)
    const{state,dispatch} = store
    const [showInfo,setShowInfo] = useState(false);
    const [storeInfo,setStroeInfo] = useState<storeInfo>()
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchDta = async ()=>{
            try{
          const response =await fetch(`http://localhost:4000/stores/${data.soldBy}`)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const resdata = await response.json();
          console.log('Strore info:', resdata);
          setStroeInfo(resdata)
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
          fetchDta()
    },[])
  return (
    <div  className='singleItemCard'>
        <div >
            <img src={data.image} alt={data.name} className='singleItemimg'></img>
        </div>
        <div className='column' style={{width:"40vw"}}>
        <h2 style={{color:'red',fontWeight:'bolder'}}>RS. {data.price}</h2>
        <h5 style={{fontWeight:'bolder'}}>{data.description}</h5>
        <div className='rowColumn'>
        <RatingsShower rating={data.ratings}/>
        <h5>{data.reviewsCount} Reviews |</h5>
        <h5>{data.soldCount} Sold</h5>
        </div>
        </div>
        <div className='column' style={{width:"20vw", border:"2px solid rgb(241, 127, 4,0.5)", margin:"5px"}} >
        <div onMouseEnter={()=>setShowInfo(true)} onMouseLeave={()=>setShowInfo(false)}>
            <div className='storeInfo menuContainer'>
            <h4>Sold by   {data.soldBy}</h4>
            </div>
            {
                showInfo && <div className='menu' >
                    <h3>Store Info</h3>
                    <h5>Name: {storeInfo?.name}</h5>
                    <h5>Store No: {storeInfo?.id}</h5>
                    <h5>Location: {storeInfo?.location}</h5>
                    <h5>Open Since: {storeInfo?.openDate}</h5>
                </div>
            }

        </div>
        <div>
                <h3>Ship to</h3>
            </div>
            <button className='large-button'
            onClick={()=>{navigate('/placeOrder',{state:{ fromCart:false,
                product:{productInfo:data,count:1,selected:true}}}) }}>Buy Now</button>
            <button className='large-button'
            onClick={()=>dispatch({type:"ADD_TO_CART", payload:{productInfo:data,count:1,selected:false}})}>Add To Cart</button>
         </div>
         </div>
  )
}

export default ItemPage