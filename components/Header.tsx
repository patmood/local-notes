import React from 'react'
import { useRouter } from 'next/router'

export function Header({ createNote }: { createNote: () => string }) {
  const router = useRouter()

  function handleClick() {
    const id = createNote()
    router.push(`/[nid]`, `/${id}`)
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
