import React from 'react'
import { useRouter } from 'next/router'

import { Note, AllNotes } from '../types'
import { SearchInput } from './SearchInput'
import style from './style'
import { NoteListItem } from './NoteListItem'
const sanitizeReg = /\s*\W*/g

export function NotesList({
  activeNote,
  allNotes,
}: {
  activeNote: null | Note
  allNotes: AllNotes
}) {
  const [searchText, setSearchText] = React.useState('')
  const [noteList, setNoteList] = React.useState<Note[]>([])
  const router = useRouter()

  React.useEffect(() => {
    setNoteList(
      Object.keys(allNotes)
        .map(k => allNotes[k])
        .sort((a: Note, b: Note) => b.updatedAt - a.updatedAt)
    )
  }, [allNotes])

  const filteredNotes = React.useMemo(() => {
    if (!searchText) return noteList
    return noteList.filter(n => {
      const sourceText = n.text.toLowerCase().replace(sanitizeReg, '')
      const targetText = searchText.toLowerCase().replace(sanitizeReg, '')
      return sourceText.includes(targetText)
    })
  }, [noteList, searchText])

  if (!activeNote && filteredNotes.length > 0) {
    router.push(`/[nid]`, `/${filteredNotes[0].id}`)
  }

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
