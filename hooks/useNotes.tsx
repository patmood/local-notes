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
  SAVE_NOTE,
  DELETE_NOTE,
}

function notesReducer(
  state: NotesState,
  action: { type: NotesAction; payload: any }
) {
  switch (action.type) {
    case NotesAction.SEED_NOTES:
      state = { ...state, allNotes: action.payload }
      return state
    case NotesAction.SAVE_NOTE:
      const newNote: Note = action.payload
      localforage
        .setItem<Note>(newNote.id, newNote)
        .then(value => console.log('saved', newNote))
      state = {
        ...state,
        allNotes: {
          ...state.allNotes,
          [newNote.id]: newNote,
        },
      }
      return state
    case NotesAction.DELETE_NOTE:
      localforage
        .removeItem(action.payload)
        .then(value => console.log('deleted', action.payload))
      const allNotesWithoutThisOne = state.allNotes
      delete allNotesWithoutThisOne[action.payload]
      state = {
        ...state,
        allNotes: { ...allNotesWithoutThisOne },
      }
      return state
    default:
      return state
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

  const actions = {
    saveNote: function saveNote(note: Note) {
      return dispatch({ type: NotesAction.SAVE_NOTE, payload: note })
    },
    deleteNote: function deleteNote(nid: string) {
      return dispatch({ type: NotesAction.DELETE_NOTE, payload: nid })
    },
  }

  return {
    allNotes: state.allNotes,
    activeNote: state.allNotes[nid],
    actions,
  }
}
