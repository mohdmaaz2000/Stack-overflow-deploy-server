import React, { useEffect, useState } from 'react'
import './LeftSidebar.css'
import { NavLink } from 'react-router-dom'

import Globe from '../../assets/Globe.svg'
import Hamburger from '../../assets/bars-solid.svg';

const LeftSidebar = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);


  const handleChangeDisplay = () => {
    setDisplay(!display);
  }
  const myStyle = {
    display:  width > 700 || display ? 'block' : 'none',
  }

  return (<div className='left-sidebar-container'>
    {width < 700 &&
      <img src={Hamburger} alt="bars" width={18} className='Hamburger-solid' onClick={ handleChangeDisplay} />
    }
    <div className='left-sidebar' >
      <nav className="side-nav" style={myStyle}>
        <NavLink to='/' className='side-nav-links' activeClassName='active' >
          <p>Home</p>
        </NavLink>

        <div className="side-nav-div">
          <div><p>PUBLIC</p></div>
          <NavLink to='/Question' className='side-nav-links' activeClassName='active' style={{ paddingLeft: '40px' }}>
            <img src={Globe} alt="globe " width={20} />
            <p style={{ paddingLeft: '10px' }}>Question</p>
          </NavLink>

          <NavLink to='/tags' className='side-nav-links' activeClassName='active'>
            <p>Tags</p>
          </NavLink>
          <NavLink to='/users' className='side-nav-links' activeClassName='active'>
            <p>Users</p>
          </NavLink >
          <NavLink to='/subscription' className='side-nav-links' activeClassName='active'>
            <p>Subscription</p>
          </NavLink>
          <NavLink to='/about' className='side-nav-links' activeClassName='active'>
            <p>About</p>
          </NavLink>

        </div>
      </nav>
    </div>
  </div>
  )
}

export default LeftSidebar
