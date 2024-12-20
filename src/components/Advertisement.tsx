import React from 'react'

function Advertisement() {
  return (
    <div className='advertisment' style={{justifyContent:'space-around'}}>
         <h3 style={{margin:'15px', color:'red' }}>Savings</h3>
        <div >
        <span>New Year Party Vibes</span>
        <span>Sales Ends: Dec 30 23.59</span>
        </div>
        <img src='https://static.vecteezy.com/system/resources/previews/005/281/953/large_2x/surprised-fashionable-curly-hair-woman-carrying-shopping-bags-with-red-sale-sign-on-yellow-background-photo.jpg' 
            alt='Happy Shopping' 
            className='advertisment-image'></img>
        {/* {/images/addvertismentImg.jpg} */}
    </div>
  )
}

export default Advertisement