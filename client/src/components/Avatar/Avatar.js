import React from 'react'

const Avatar = (props) => {
    const style={
        backgroundColor:props.bgColor,
        padding:`${props.py} ${props.px}`,
        color : props.color || 'black',
        borderRadius : props.radius,
        fontSize : props.fSize,
        textAlign:"center",
        cursor:props.cursor|| null
    }
  return (
    <div style={style}>
      {props.children}
    </div>
  )
}

export default Avatar
