import React from 'react'
import Link from 'next/link'

export function Header({ createNote }: { createNote: () => void }) {
  function handleClick() {
    const result = createNote()
    console.log({ result })
    // TODO: navigate to note
  }
  return (
    <header>
      <button onClick={handleClick}>New note</button>
      <style jsx>
        {`
          header {
            display: flex;
            justify-content: end;
            padding: 1rem;
          }
        `}
      </style>
    </header>
  )
}
