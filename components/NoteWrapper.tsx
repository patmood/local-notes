import React from "react";
import localforage from "localforage";
import { useRouter } from "next/router";
import Link from "next/link";

import { RawEditor } from "../components/RawEditor";
import { Note } from "../types";

localforage.config({
  name: "Notes app"
});

export function NoteWrapper({ nid }: { nid: string }) {
  const [initialNote, setInitialNote] = React.useState<Note | null>(null);
  const [loadingNote, setLoadingNote] = React.useState(true);

  React.useEffect(() => {
    localforage.getItem<Note>(nid).then(value => {
      console.log("got initial value", value);
      if (value) {
        setInitialNote(value);
      }
      setLoadingNote(false);
    });
  }, []);

  if (loadingNote) {
    return <h1>Loading...</h1>;
  }

  if (!initialNote) {
    return (
      <h1>
        Note {nid} not found.{" "}
        <Link href="/n">
          <a>Create new one</a>
        </Link>
      </h1>
    );
  }

  function handleSave(text) {
    if (!text) {
      // TODO: delete note
    } else {
      const updatedNote: Note = { ...initialNote, text, updatedAt: Date.now() };
      localforage
        .setItem<Note>(updatedNote.id, updatedNote)
        .then(value => console.log("saved testnote", value));
    }
  }

  return <RawEditor onSave={handleSave} initialValue={initialNote.text} />;
}
