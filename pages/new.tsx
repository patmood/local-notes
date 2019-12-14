import React from 'react'
import { useRouter } from 'next/router'
import { createNote } from '../utils/notes'
import localforage from 'localforage'

const DEFAULT_NOTE_CONTENTS = "# Title\n\nWhat's on your mind?"

export default () => {
  const router = useRouter()

  React.useEffect(() => {
    const note = createNote(DEFAULT_NOTE_CONTENTS)
    localforage
      .setItem(note.id, note)
      .then(result => router.push(`/${result.id}`))
  }, [])

  return <div>Creating new note...</div>
}
