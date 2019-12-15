import uuid from 'uuid/v1'
import faker from 'faker'
import { Note, AllNotes } from '../types'

export function generateNote() {
  const now = Date.now()
  return {
    id: uuid(),
    createdAt: now,
    updatedAt: now,
    text: `# ${faker.lorem.sentence()}\n\n${faker.lorem.sentence()}\n\n${faker.lorem.sentence()}`,
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
    var elem = window.document.createElement('a')
    elem.href = window.URL.createObjectURL(blob)
    elem.download = filename
    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)
  }
}
