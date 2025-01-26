import React ,{useState, useEffect}from 'react'
import { useNavigate } from 'react-router-dom';

export interface productInfo{
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  ratings: number;
  count: number;
  image: string ;
  reviewsCount:number;
  soldCount:number;
  soldBy:number;
}
function MoreToLove() {
  const[data,setData] = useState<productInfo[]>()
  const navigate = useNavigate();
  const handleItemClick =(item:productInfo)=>{
    navigate(`/item/${item.id}`,{state:item})
  }
  useEffect(()=>{
    const fetchDta = async ()=>{
      try{
    const response =await fetch("http://localhost:4000/products")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Users:', data);
    setData(data)
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}
    fetchDta()
  },[])
  
  return (
    <div>
      <h2 style={{fontWeight:'bolder'}}>More To Love</h2>
    <div className='grid'>
      {data && data.map((item:productInfo,index:number)=>{
        return(
          <button className='productbutton' onClick={()=>handleItemClick(item)}>
              <div key={item.id} className='productCard'>
            <img src={item.image} alt={item.name} className='productimg'></img>
            <h5>{item.name}</h5>
            <h4>{item.price}</h4>
          </div>
          </button>

        )
      })}
     
    </div>
    </div>
  )
}

export default MoreToLove