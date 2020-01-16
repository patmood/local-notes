import React from 'react'

import { RawEditor } from '../components/RawEditor'
import { Note } from '../types'

export function NoteWrapper({
  note,
  saveNote,
}: {
  note: Note
  saveNote: (note: Note) => void
}) {
  function handleSave(text) {
    const updatedNote: Note = { ...note, text, updatedAt: Date.now() }
    saveNote(updatedNote)
  }

  return <RawEditor onSave={handleSave} initialValue={note.text} />
}
