import React from 'react'
import { useRouter } from 'next/router'
import { Note, AllNotes } from '../types'
import { downloadNotes } from '../utils/notes'
import { FileUploadButton } from './FileUploadButton'
import { generateNote } from '../utils/notes'

export function Header({
  saveNote,
  allNotes,
}: {
  saveNote: (note: Note) => void
  allNotes: AllNotes
}) {
  const router = useRouter()

  function handleClick() {
    const newNote = generateNote()
    saveNote(newNote)
    router.push(`/[nid]`, `/${newNote.id}`)
  }

  return (
    <header>
      <button onClick={handleClick}>New note</button>
      <FileUploadButton saveNote={saveNote} />
      <button onClick={() => downloadNotes(allNotes)}>Download notes</button>
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
