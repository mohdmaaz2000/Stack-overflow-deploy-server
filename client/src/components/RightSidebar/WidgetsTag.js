import React from 'react'

const WidgetsTag = () => {
  const tags = ['c','c++','css','python','java','javascript','reactjs','nextjs','php','mongodb','mysql','express','html','mern','nodejs']
  return (
    <div className='widget-tags'>
      <h4>Watched Tags</h4>
      <div className="widget-tags-div">
      {
        tags.map((element)=>(
          <p key={element}>{element}</p>
        ))

      }
      </div>
    </div>
  )
}

export default WidgetsTag
