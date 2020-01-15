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

  const { actions, selectors, state } = useNotes(nid)

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault()
    if (selectors.filteredNotes.length === 0) {
      const newNote = actions.createNote(state.searchText)
      router.push(`/[nid]`, `/${newNote.id}`)
    } else {
      router.push(`/[nid]`, `/${selectors.filteredNotes[0].id}`)
    }
  }

  React.useEffect(() => {
    // Delete empty notes on navigation
    Object.values<Note>(state.allNotes).forEach(n => {
      if (!n.text) {
        actions.deleteNote(n.id)
      }
    })
  }, [nid, state.allNotes])

  return (
    <div>
      <Header
        saveNote={actions.saveNote}
        allNotes={state.allNotes}
        setSearchText={actions.setSearchText}
        handleSearchSubmit={handleSearchSubmit}
      />
      <div className="container">
        <aside>
          <NotesList
            activeNote={selectors.activeNote}
            notesList={selectors.filteredNotes}
            searchText={state.searchText}
          />
        </aside>
        <main>
          <section>
            {selectors.activeNote && (
              <NoteWrapper
                note={selectors.activeNote}
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
