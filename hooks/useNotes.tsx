import React from 'react'
import localforage from 'localforage'
import { Note } from '../types'
import { generateNote } from '../utils/notes'

const DEBUG = false

const initialState = {
  allNotes: {},
  searchText: '',
}

interface NotesState {
  allNotes: { [nid: string]: Note }
  searchText: string
}

enum NotesAction {
  CREATE_NOTE,
  SEED_NOTES,
  SAVE_NOTE,
  DELETE_NOTE,
  SET_SEARCH_TEXT,
}

function notesReducer(
  state: NotesState,
  action: { type: NotesAction; payload?: any }
) {
  switch (action.type) {
    case NotesAction.CREATE_NOTE:
      state = {
        ...state,
        allNotes: { ...state.allNotes, [action.payload.id]: action.payload },
      }
      return state
    case NotesAction.SEED_NOTES:
      state = { ...state, allNotes: action.payload }
      return state
    case NotesAction.CREATE_NOTE:
      localforage
        .setItem<Note>(action.payload.id, action.payload)
        .then(value => DEBUG && console.log('created', action.payload.id))
      state = {
        ...state,
        allNotes: {
          ...state.allNotes,
          [action.payload.id]: action.payload,
        },
      }
      return state
    case NotesAction.SAVE_NOTE:
      const updatedNote: Note = action.payload
      localforage
        .setItem<Note>(updatedNote.id, updatedNote)
        .then(value => DEBUG && console.log('saved', updatedNote))
      state = {
        ...state,
        allNotes: {
          ...state.allNotes,
          [updatedNote.id]: updatedNote,
        },
      }
      return state
    case NotesAction.DELETE_NOTE:
      localforage
        .removeItem(action.payload)
        .then(value => DEBUG && console.log('deleted', action.payload))
      const allNotesWithoutThisOne = state.allNotes
      delete allNotesWithoutThisOne[action.payload]
      state = {
        ...state,
        allNotes: { ...allNotesWithoutThisOne },
      }
      return state
    case NotesAction.SET_SEARCH_TEXT:
      state = { ...state, searchText: action.payload }
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
    createNote: function createNote(text: string) {
      const newNote = generateNote(text)
      dispatch({
        type: NotesAction.CREATE_NOTE,
        payload: newNote,
      })
      return newNote
    },
    saveNote: function saveNote(note: Note) {
      return dispatch({ type: NotesAction.SAVE_NOTE, payload: note })
    },
    deleteNote: function deleteNote(nid: string) {
      return dispatch({ type: NotesAction.DELETE_NOTE, payload: nid })
    },
    setSearchText: function setSearchText(text: string) {
      return dispatch({ type: NotesAction.SET_SEARCH_TEXT, payload: text })
    },
  }

  const notesList = React.useMemo(() => {
    return Object.keys(state.allNotes)
      .map(k => state.allNotes[k])
      .sort((a: Note, b: Note) => b.updatedAt - a.updatedAt)
  }, [state.allNotes])

  const filteredNotes = React.useMemo(() => {
    if (!state.searchText) return notesList
    return notesList.filter(n => {
      const sanitizeReg = /\s*\W*/g
      const sourceText = n.text.toLowerCase().replace(sanitizeReg, '')
      const targetText = state.searchText.toLowerCase().replace(sanitizeReg, '')
      return sourceText.includes(targetText)
    })
  }, [notesList, state.searchText])

  const selectors = {
    notesList,
    filteredNotes,
    activeNote: state.allNotes[nid],
  }

  return {
    state,
    actions,
    selectors,
  }
}
