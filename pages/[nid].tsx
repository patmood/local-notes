import React, { FormEvent } from 'react'

import { useRouter } from 'next/router'
import { useNotes } from '../hooks/useNotes'
import { Note } from '../types'

import { Header } from '../components/Header'
import { NotesList } from '../components/NotesList'
import { NoteWrapper } from '../components/NoteWrapper'

function NotePage() {
  const router = useRouter()
  const nid = router.query.nid as string

  const [searchText, setSearchText] = React.useState('')

  const { actions, allNotes, activeNote } = useNotes(nid)

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault()
    // TODO: Create or go to top note here
    console.log('do the thing')
  }

  React.useEffect(() => {
    // Delete empty notes on navigation
    Object.values<Note>(allNotes).forEach(n => {
      if (!n.text) {
        actions.deleteNote(n.id)
      }
    })
  }, [nid, allNotes])

  return (
    <div>
      <Header
        saveNote={actions.saveNote}
        allNotes={allNotes}
        setSearchText={setSearchText}
        handleSearchSubmit={handleSearchSubmit}
      />
      <div className="container">
        <aside>
          <NotesList
            activeNote={activeNote}
            allNotes={allNotes}
            searchText={searchText}
          />
        </aside>
        <main>
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
      </div>
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
