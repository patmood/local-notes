import React from 'react'
import localforage from 'localforage'
import { Note } from '../types'
import Link from 'next/link'

export function NotesList({
  nid,
  allNotes,
}: {
  nid?: string
  allNotes: Note[]
}) {
  return (
    <div className="NotesList">
      <ol>
        {allNotes.map(note => (
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
          }

          li {
            border: 1px solid #ccc;
            border-radius: 3px;
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
