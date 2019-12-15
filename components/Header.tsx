import React from 'react'
import { useRouter } from 'next/router'
import { AllNotes } from '../types'
import { downloadNotes } from '../utils/notes'

export function Header({
  createNote,
  allNotes,
}: {
  createNote: () => string
  allNotes: AllNotes
}) {
  const router = useRouter()

  function handleClick() {
    const id = createNote()
    router.push(`/[nid]`, `/${id}`)
  }

  return (
    <header>
      <button onClick={handleClick}>New note</button>
      <button onClick={() => downloadNotes(allNotes)}>Download Notes</button>
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
