import React from 'react'
import localforage from 'localforage'
import { useRouter } from 'next/router'
import { Header } from '../components/Header'
import { NotesList } from '../components/NotesList'
import { NoteWrapper } from '../components/NoteWrapper'
import { Note } from '../types'

function NotePage() {
  const [allNotes, setAllNotes] = React.useState<Array<Note>>([])
  const router = useRouter()
  const nid = router.query.nid as string

  React.useEffect(() => {
    const notes = []
    localforage
      .iterate<Note, void>((val, key, i) => {
        notes.push(val)
      })
      .then(result => {
        notes.sort((a: Note, b: Note) => b.createdAt - a.createdAt)
        setAllNotes(notes)
      })
  }, [])

  return (
    <div className="container">
      <aside>
        <NotesList nid={nid} allNotes={allNotes} />
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
