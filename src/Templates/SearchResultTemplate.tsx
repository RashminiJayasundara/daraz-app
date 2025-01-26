import React from 'react'

function SearchResultTemplate() {
  return (
    <div className='grid'>
        {Array(20)
          .fill(null) // Creates an array of length repeatCount
          .map((_, index) => (
            
                <svg key={index} width="300" height="200">
                    <rect x="20" y="25" width="20vw" height="25vw"
                     fill='orange'
                     className='loading-rect'
                     >
                        {Array(4).fill(null) .map((_, index) => (
                            <svg style={{display:"flex", flexDirection:"column",zIndex:"10000"}}>
                                <rect width="10vw" height="2vw" fill="white"></rect>
                            </svg>
                        ))}
                     </rect>
                </svg>
        
          ))}
    </div>
  )
}

export default SearchResultTemplate