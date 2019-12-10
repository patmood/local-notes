import uuid from "uuid/v1";

export function createNote(text: string) {
  const now = Date.now();
  return {
    id: uuid(),
    createdAt: now,
    updatedAt: now,
    text
  };
}
