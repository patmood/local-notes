import React from 'react'
import { useRouter } from 'next/router'
import { Note } from '../types'
import formatDistance from 'date-fns/formatDistance'
import { style } from './style'

export function NoteListItem({ note }: { note: Note }) {
  const router = useRouter()
  const handleClick = e => router.push(`/[nid]`, `/${note.id}`)

  const now = new Date()

  return (
    <button onClick={handleClick}>
      <div className="preview">{note.text.substr(0, 200)}</div>
      <small>{formatDistance(new Date(note.updatedAt), new Date())} ago</small>
      <style jsx>{`
        button {
          flex-grow: 1;
          cursor: pointer;
          text-align: left;
          font-size: 1rem;
          border: none;
          background: none;
          padding: 1rem;
          font-size: 0.9em;
        }

        .preview {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: ${style.space1};
        }

        small {
          font-size: 0.7em;
          color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </button>
  )
}
