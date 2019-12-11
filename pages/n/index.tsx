import React from "react";
import { useRouter } from "next/router";
import { createNote } from "../../utils/notes";
import localforage from "localforage";

export default () => {
  const router = useRouter();

  React.useEffect(() => {
    const note = createNote("# Title\n\nWhat's on your mind?");
    localforage
      .setItem(note.id, note)
      .then(result => router.push(`/n/${result.id}`));
  }, []);

  return <div>Creating new note...</div>;
};
