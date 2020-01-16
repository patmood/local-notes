import React from 'react'

import { Note } from '../types'
import { style } from './style'
import { NoteListItem } from './NoteListItem'

export function NotesList({
  activeNote,
  notesList,
  searchText,
}: {
  activeNote: null | Note
  notesList: Note[]
  searchText: string
}) {
  return (
    <div className="NotesList">
      {notesList.length > 0 && (
        <ol>
          {notesList.map(note => (
            <li
              key={note.id}
              className={activeNote && note.id === activeNote.id && 'active'}
            >
              <NoteListItem note={note} />
            </li>
          ))}
        </ol>
      )}
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
          .active {
            background-color: rgba(0, 0, 0, 0.15);
          }
        `}
      </style>
    </div>
  )
}
