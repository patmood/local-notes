import React from 'react'
import localforage from 'localforage'
import Link from 'next/link'

import { RawEditor } from '../components/RawEditor'
import { Note } from '../types'

export function NoteWrapper({ note }: { note: Note }) {
  function handleSave(text) {
    if (!text) {
      // Delete callback
      // console.log('deleted', nid)
      // localforage.removeItem(nid)
    } else {
      const updatedNote: Note = { ...note, text, updatedAt: Date.now() }
      // Save callback
      localforage
        .setItem<Note>(updatedNote.id, updatedNote)
        .then(value => console.log('saved testnote', value))
    }
  }

  return <RawEditor onSave={handleSave} initialValue={note.text} />
}
