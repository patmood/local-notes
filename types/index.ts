export interface Note {
  id: string
  text: string
  createdAt: number
  updatedAt: number
}

export interface AllNotes {
  [id: string]: Note
}
