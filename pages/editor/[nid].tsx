import React from "react";
import localforage from "localforage";
import { useRouter } from "next/router";

import { RawEditor } from "../../components/RawEditor";
import { Note } from "../../types";
import { createNote } from "../../utils/notes";

localforage.config({
  name: "Notes app"
});

export default () => {
  const router = useRouter();
  const nid = router.query.nid as string;
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
    return <h1>Note not found. Create new one? [Link]</h1>;
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

  return (
    <div>
      <h1>writer</h1>
      {!loadingNote && (
        <RawEditor onSave={handleSave} initialValue={initialNote.text} />
      )}
    </div>
  );
};
