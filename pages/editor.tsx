import React from "react";
import { RawEditor } from "../components/RawEditor";

import localforage from "localforage";

localforage.config({
  name: "Notes app"
});

const options = {
  autofocus: true,
  spellChecker: false
};

export default () => {
  const [initialText, setInitialText] = React.useState("");
  const [loadingText, setLoadingText] = React.useState(true);
  React.useEffect(() => {
    // get note
    localforage
      .getItem<string>("testnote")
      .then(value => {
        console.log("got initial value", value);
        setInitialText(value);
        setLoadingText(false);
      })
      .catch(err => console.log({ err }));
  }, []);
  function handleSave(text) {
    localforage
      .setItem<string>("testnote", text)
      .then(value => console.log("saved testnote", value))
      .catch(err => console.log({ err }));
  }
  return (
    <div>
      <h1>writer</h1>
      {!loadingText && (
        <RawEditor onSave={handleSave} initialValue={initialText} />
      )}
    </div>
  );
};
