import React from 'react'
import LeftSidebar from '../../LeftSidebar/LeftSidebar'
import RightSidebar from '../../RightSidebar/RightSidebar'
import MainHomePage from '../../MainHomePage/MainHomePage'


const Home = () => {
  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className="home-container-2">
        <MainHomePage />
        <RightSidebar />
      </div>
    </div>
  )
}

export default Home
