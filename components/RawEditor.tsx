import React from 'react'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import debounce from 'lodash/debounce'
import style from './style'
import { symbol } from 'prop-types'

const options = {
  autofocus: true,
  spellChecker: false,
  uploadImage: false,
  toolbar: false,
  toolbarTips: false,
  status: false,
}

export interface RawEditorProps {
  onSave: (text: string) => void
  initialValue: string
}

export function RawEditor({ onSave, initialValue }: RawEditorProps) {
  const [textValue, setTextValue] = React.useState(initialValue)
  const handleSave = React.useCallback(debounce(onSave, 1000), [onSave])

  function handleChange(text) {
    setTextValue(text)
    handleSave(text)
  }

  return (
    <>
      <label>
        <SimpleMDE
          id="primary-editor"
          value={textValue}
          onChange={handleChange}
          options={options}
        />
      </label>
      <style jsx global>
        {`
          label {
            display: block;
            max-width: 800px;
            margin: 0 auto;
            padding: ${style.space3};
          }
          .cm-s-easymde {
            // border: none;
            border-radius: ${style.borderRadius};
          }
          .cm-formatting-code-block {
            color: rgba(0, 0, 0, 0.3);
          }
          .cm-comment {
            font-family: monospace;
            font-size: 1rem;
          }
          .cm-formatting-code {
            color: rgba(0, 0, 0, 0.3);
          }
          .cm-formatting-code + .cm-comment {
            color: ${style.red};
          }
        `}
      </style>
    </>
  )
}
