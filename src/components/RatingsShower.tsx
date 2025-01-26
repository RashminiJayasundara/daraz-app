import React from 'react'
interface RatingsShowerProps {
    rating: number; // The rating prop must be a number
  }

const RatingsShower: React.FC<RatingsShowerProps> = ({rating}) =>{
    const integer = Math.floor(rating)
    const floting= rating-integer
  return (
    <div className='row' style={{justifyContent:"normal"}}>
        {Array(integer)
          .fill(null) // Creates an array of length repeatCount
          .map((_, index) => (
            <i className="bi bi-star-fill" style={{marginRight:'3px'}}></i>
          ))}
          {floting>0.5 && 
          <i className="bi bi-star-half" style={{marginRight:'3px'}}></i>}
          <h5>{rating}</h5>
        
    </div>
  )
}

export default RatingsShower