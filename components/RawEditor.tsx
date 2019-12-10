import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import debounce from "lodash/debounce";

const options = {
  autofocus: true,
  spellChecker: false
};

export interface RawEditorProps {
  onSave: (text: string) => void;
  initialValue: string;
}

export function RawEditor({ onSave, initialValue }: RawEditorProps) {
  const [textValue, setTextValue] = React.useState(initialValue);
  const handleSave = React.useCallback(debounce(onSave, 1000), [onSave]);

  function handleChange(text) {
    setTextValue(text);
    handleSave(text);
  }

  return (
    <SimpleMDE
      id="primary-editor"
      value={textValue}
      onChange={handleChange}
      options={options}
    />
  );
}
