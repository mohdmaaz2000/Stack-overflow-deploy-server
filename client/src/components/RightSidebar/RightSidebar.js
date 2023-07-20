import React from 'react'
import './RightSidebar.css'
import Widget from './Widget'
import WidgetsTag from './WidgetsTag'


const RightSidebar = () => {
  return (
    <aside className='right-sidebar'>
            <Widget />
            <WidgetsTag />
    </aside>
  )
}

export default RightSidebar
