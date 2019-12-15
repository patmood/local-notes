import React from 'react'
import localforage from 'localforage'
import Link from 'next/link'

import { RawEditor } from '../components/RawEditor'
import { Note } from '../types'

export function NoteWrapper({
  note,
  saveNote,
  deleteNote,
}: {
  note: Note
  saveNote: (note: Note) => void
  deleteNote: (nid: string) => void
}) {
  function handleSave(text) {
    const updatedNote: Note = { ...note, text, updatedAt: Date.now() }
    saveNote(updatedNote)
  }

  return <RawEditor onSave={handleSave} initialValue={note.text} />
}
