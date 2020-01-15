import React, { FormEvent } from 'react'
import { useRouter } from 'next/router'
import { Note, AllNotes } from '../types'
import { downloadNotes } from '../utils/notes'
import { FileUploadButton } from './FileUploadButton'
import { SearchInput } from './SearchInput'
import { Button } from './Button'
import { generateNote } from '../utils/notes'
import style from './style'

export function Header({
  saveNote,
  allNotes,
  setSearchText,
  handleSearchSubmit,
}: {
  saveNote: (note: Note) => void
  allNotes: AllNotes
  setSearchText: (text: string) => void
  handleSearchSubmit: (e: FormEvent) => void
}) {
  const router = useRouter()

  function handleClick() {
    const newNote = generateNote()
    saveNote(newNote)
    router.push(`/[nid]`, `/${newNote.id}`)
  }

  return (
    <header>
      <span className="search">
        <SearchInput onChange={setSearchText} onSubmit={handleSearchSubmit} />
      </span>

      <span className="button">
        <Button onClick={handleClick}>New note</Button>
      </span>
      <span className="button">
        <FileUploadButton saveNote={saveNote} />
      </span>
      <span className="button">
        <Button onClick={() => downloadNotes(allNotes)}>Download notes</Button>
      </span>
      <style jsx>
        {`
          header {
            display: flex;
            justify-content: end;
            align-items: center;
            padding: 1rem;
          }
          .search {
            flex-grow: 1;
          }
          .button {
            margin-right: ${style.space1};
          }
        `}
      </style>
    </header>
  )
}
