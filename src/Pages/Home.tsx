import React from 'react'
import SignOption from '../components/SignOption'
import BestSellers from '../components/BestSellers'
import WelcomeDeals from '../components/WelcomeDeals'
import Choise from '../components/Choise'
import WeeklyDeals from '../components/WeeklyDeals'
import Advertisement from '../components/Advertisement'
import MoreToLove from '../components/MoreToLove'

function Home() {
  return (
    <div className='column margin'>
    <div className='row'>
        <div className='column'>
        <SignOption/>
        <WelcomeDeals/>
        </div>
        <div className='hideWhenSmallScreen'>
        <BestSellers/>
        </div>
       
       <div className='hideWhenSmallScreen column'>
        <Choise/>
        <WeeklyDeals/>
       </div>
    </div>
    <Advertisement/>
    <MoreToLove/>
    </div>
  )
}

export default Home