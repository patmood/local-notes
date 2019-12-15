import React from 'react'

import { useRouter } from 'next/router'
import { useNotes } from '../hooks/useNotes'
import { Note } from '../types'

import { Header } from '../components/Header'
import { NotesList } from '../components/NotesList'
import { NoteWrapper } from '../components/NoteWrapper'

function NotePage() {
  const router = useRouter()
  const nid = router.query.nid as string

  const { actions, allNotes, activeNote } = useNotes(nid)

  React.useEffect(() => {
    // Delete empty notes on navigation
    Object.values<Note>(allNotes).forEach(n => {
      if (!n.text) {
        actions.deleteNote(n.id)
      }
    })
  }, [nid, allNotes])

  return (
    <div className="container">
      <aside>
        <NotesList activeNote={activeNote} allNotes={allNotes} />
      </aside>
      <main>
        <Header saveNote={actions.saveNote} allNotes={allNotes} />
        <section>
          {activeNote && (
            <NoteWrapper
              note={activeNote}
              saveNote={actions.saveNote}
              deleteNote={actions.deleteNote}
            />
          )}
        </section>
      </main>
      <style jsx>
        {`
          .container {
            display: flex;
          }

          aside {
            width: 250px;
            flex: none;
          }
          main {
            flex-grow: 1;
          }
        `}
      </style>
    </div>
  )
}

export default NotePage
