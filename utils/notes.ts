import uuid from 'uuid/v1'
import faker from 'faker'
import { Note } from '../types'

export function generateNote() {
  const now = Date.now()
  return {
    id: uuid(),
    createdAt: now,
    updatedAt: now,
    text: `# ${faker.lorem.sentence()}\n\n${faker.lorem.sentence()}\n\n${faker.lorem.sentence()}`,
  } as Note
}
