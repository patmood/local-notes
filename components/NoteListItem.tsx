import React from 'react'
import { useRouter } from 'next/router'
import { Note } from '../types'

export function NoteListItem({ note }: { note: Note }) {
  const router = useRouter()
  const handleClick = e => router.push(`/[nid]`, `/${note.id}`)

  return (
    <li>
      <button onClick={handleClick}>
        <div>{note.text.substr(0, 20)}</div>
        <div>{note.createdAt}</div>
      </button>
    </li>
  )
}
