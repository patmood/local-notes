import uuid from 'uuid/v1'
import { Note, AllNotes } from '../types'

export function generateNote(text: string = '') {
  const now = Date.now()
  return {
    id: uuid(),
    createdAt: now,
    updatedAt: now,
    text,
  } as Note
}

export function createBlob(allNotes: AllNotes, type: 'json' | 'csv' | 'zip') {
  if (type === 'json') {
    return {
      filename: `notes_backup_${Date.now()}.json`,
      blob: new Blob([JSON.stringify(allNotes)], {
        type: 'application/json',
      }),
    }
  } else {
    throw new Error(`Backup type ${type} not implemented`)
  }
}

export function downloadNotes(
  allNotes: AllNotes,
  type: 'json' | 'csv' | 'zip' = 'json'
) {
  const { filename, blob } = createBlob(allNotes, type)

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename)
  } else {
    const elem = window.document.createElement('a')
    elem.href = window.URL.createObjectURL(blob)
    elem.download = filename
    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)
  }
}
