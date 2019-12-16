import React from 'react'
import { Note } from '../types'
import { Button } from './Button'

export function FileUploadButton({
  saveNote,
}: {
  saveNote: (note: Note) => void
}) {
  const inputRef = React.useRef(null)

  function handleClick() {
    inputRef.current.click()
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files[0]

    if (file) {
      var reader = new FileReader()
      reader.onload = function(evt) {
        try {
          const result = evt.target.result
          if (typeof result === 'string') {
            const json = JSON.parse(result)
            Object.values(json).forEach((v: any) => {
              const { id, text, createdAt, updatedAt } = v
              if (id && text && createdAt && updatedAt) {
                const newNote: Note = { id, text, createdAt, updatedAt }
                saveNote(newNote)
              } else {
                // collect errors and warn
                console.warn(`Could not save note:`, v)
              }
            })
          }
        } catch (e) {
          throw e
        }
      }
      reader.onerror = function(evt) {
        throw new Error('error reading file')
      }
      reader.readAsText(file)
    }
  }

  return (
    <>
      <Button onClick={handleClick}>Import notes</Button>
      <input type="file" hidden ref={inputRef} onChange={handleChange} />
    </>
  )
}
