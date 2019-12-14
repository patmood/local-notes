import React from 'react'
import localforage from 'localforage'
import { Note } from '../types'

const initialState = {
  allNotes: {},
}

interface NotesState {
  allNotes: { [nid: string]: Note }
}

enum NotesAction {
  SEED_NOTES,
}

function notesReducer(
  state: NotesState,
  action: { type: NotesAction; payload: any }
) {
  switch (action.type) {
    case NotesAction.SEED_NOTES:
      const allNotes = action.payload
      state = { ...state, allNotes }
      return state
      break
    default:
      return state
      break
  }
}

export function useNotes(nid) {
  const [state, dispatch] = React.useReducer(notesReducer, initialState)

  React.useEffect(() => {
    const notes = {}
    localforage
      .iterate<Note, void>((val, key, i) => {
        notes[val.id] = val
      })
      .then(result => {
        dispatch({ type: NotesAction.SEED_NOTES, payload: notes })
      })
  }, [])

  return {
    allNotes: state.allNotes,
    activeNote: state.allNotes[nid],
  }
}
