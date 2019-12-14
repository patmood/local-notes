import React from 'react'
import { useRouter } from 'next/router'
import { Note } from '../types'

export function NoteListItem({ note }: { note: Note }) {
  const router = useRouter()
  const handleClick = e => router.push(`/[nid]`, `/${note.id}`)

  return (
    <button onClick={handleClick}>
      <div>{note.text.substr(0, 20)}</div>
      <div>{note.updatedAt}</div>
      <style jsx>{`
        button {
          flex-grow: 1;
          cursor: pointer;
          text-align: left;
          font-size: 1rem;
          border: none;
          background: none;
          padding: 1rem;
        }
      `}</style>
    </button>
  )
}
