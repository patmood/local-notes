import React from 'react'
import localforage from 'localforage'
import { Note } from '../types'
import Link from 'next/link'
import { SearchInput } from './SearchInput'
import style from './style'

const sanitizeReg = /\s*\W*/g

export function NotesList({
  nid,
  allNotes,
}: {
  nid?: string
  allNotes: Note[]
}) {
  const [searchText, setSearchText] = React.useState('')
  const filteredNotes = React.useMemo(() => {
    if (!searchText) return allNotes
    return allNotes.filter(n => {
      const sourceText = n.text.toLowerCase().replace(sanitizeReg, '')
      const targetText = searchText.toLowerCase().replace(sanitizeReg, '')
      console.log({ sourceText, targetText })
      return sourceText.includes(targetText)
    })
  }, [allNotes, searchText])

  return (
    <div className="NotesList">
      <div>
        <SearchInput onChange={setSearchText} />
      </div>
      <ol>
        {filteredNotes.map(note => (
          <li key={note.id}>
            <Link href="/[nid]" as={`/${note.id}`}>
              <a className="list-link">
                <div>{note.text.substr(0, 20)}</div>
                <div>{note.createdAt}</div>
              </a>
            </Link>
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

          li:not(:last-child) {
            border-bottom: ${style.borderWidth} solid ${style.stroke};
          }
          .list-link {
            display: block;
            padding: 1rem;
          }
        `}
      </style>
    </div>
  )
}
