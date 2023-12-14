import React from 'react'

type Props = {
    title: string,
    style: string,
    onClick:  ()=> void
}

const Button = (props: Props) => {
  return (
    <button onClick={props.onClick} className={`border-1 ${props.style == "blue"?"bg-[#5a75d6]":"bg-[#d65a5a]" } px-2 py-1 shadow-sm rounded-sm text-white m-1`}>
        {props.title}
    </button>
  )
}

export default Button