import React from 'react'
import { productInfo } from './MoreToLove'
import { useNavigate } from 'react-router-dom';


interface SearchResultShowerProps{
    products:productInfo[]
}

const SearchResultShower: React.FC<SearchResultShowerProps> =({products})=> {
    const navigate = useNavigate();
    const handleItemClick =(item:productInfo)=>{
    navigate(`/item/${item.id}`,{state:item})
    }
  return (
     <div className='grid'>
          {products.map((item:productInfo,index:number)=>{
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
  )
}

export default SearchResultShower