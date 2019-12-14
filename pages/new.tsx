import React from 'react'
import { useRouter } from 'next/router'
import { createNote } from '../utils/notes'
import localforage from 'localforage'

// TODO: remove
import faker from 'faker'

const DEFAULT_NOTE_CONTENTS = "# Title\n\nWhat's on your mind?"

export default () => {
  const router = useRouter()

  React.useEffect(() => {
    const note = createNote(
      `# ${faker.lorem.sentence()}\n\n${faker.lorem.sentence()}\n\n${faker.lorem.sentence()}`
    )
    localforage
      .setItem(note.id, note)
      .then(result => router.push(`/${result.id}`))
  }, [])

  return <div>Creating new note...</div>
}
