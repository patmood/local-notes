import React from 'react'

import { useRouter } from 'next/router'
import { useNotes } from '../hooks/useNotes'

import { Header } from '../components/Header'
import { NotesList } from '../components/NotesList'
import { NoteWrapper } from '../components/NoteWrapper'

function NotePage() {
  const router = useRouter()
  const nid = router.query.nid as string

  const { allNotes, activeNote } = useNotes(nid)

  return (
    <div className="container">
      <aside>
        <NotesList activeNote={activeNote} allNotes={allNotes} />
      </aside>
      <main>
        <Header />
        <section>{nid && <NoteWrapper nid={nid} />}</section>
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
