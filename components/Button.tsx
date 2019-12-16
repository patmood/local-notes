import React from 'react'
import style from './style'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  primary?: boolean
}

export function Button(props: ButtonProps) {
  return (
    <button {...props}>
      {props.children}
      <style jsx>
        {`
          button {
            background-color: transparent;
            border: ${style.borderWidth} solid ${style.stroke};
            border-radius: ${style.borderRadius};
            padding: ${style.space1} ${style.space2};
            transition: 300ms all;
            cursor: pointer;
            font-size: 0.8rem;
          }
          button:hover {
            background-color: rgba(0, 0, 0, 0.15);
          }
        `}
      </style>
    </button>
  )
}
