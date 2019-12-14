import React from 'react'
import localforage from 'localforage'
import { Note } from '../types'
import Link from 'next/link'
import { SearchInput } from './SearchInput'
import style from './style'
import { NoteListItem } from './NoteListItem'
const sanitizeReg = /\s*\W*/g

export function NotesList({
  activeNote,
  allNotes,
}: {
  activeNote: null | Note
  allNotes: { [nid: string]: Note }
}) {
  const [searchText, setSearchText] = React.useState('')
  const [noteList, setNoteList] = React.useState<Note[]>([])

  React.useEffect(() => {
    setNoteList(Object.keys(allNotes).map(k => allNotes[k]))
  }, [allNotes])

  const filteredNotes = React.useMemo(() => {
    if (!searchText) return noteList
    return noteList.filter(n => {
      const sourceText = n.text.toLowerCase().replace(sanitizeReg, '')
      const targetText = searchText.toLowerCase().replace(sanitizeReg, '')
      return sourceText.includes(targetText)
    })
  }, [noteList, searchText])

  return (
    <div className="NotesList">
      <div>
        <SearchInput onChange={setSearchText} />
      </div>
      <ol>
        {filteredNotes.map(note => (
          <li key={note.id}>
            <NoteListItem note={note} />
          </li>
        ))}
      </ol>
      <style jsx>
        {`
          ol {
            list-style: none;
            margin: 0;
            padding: 0;
            border-radius: ${style.borderRadius};
            border: ${style.borderWidth} solid ${style.stroke};
          }
          li {
            display: flex;
          }
          li:not(:last-child) {
            border-bottom: ${style.borderWidth} solid ${style.stroke};
          }
        `}
      </style>
    </div>
  )
}
