import React from 'react'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import debounce from 'lodash/debounce'
import { style } from './style'

// https://github.com/Ionaru/easy-markdown-editor#toolbar-icons
const options = {
  autofocus: true,
  spellChecker: false,
  uploadImage: false,
  // toolbar: ['preview', 'side-by-side'],
  toolbar: false,
  toolbarTips: false,
  status: false,
}

export interface RawEditorProps {
  onSave: (text: string) => void
  initialValue: string
}

export function RawEditor({ onSave, initialValue }: RawEditorProps) {
  const [textValue, setTextValue] = React.useState('')
  const handleSave = React.useCallback(debounce(onSave, 1000), [onSave])

  React.useEffect(() => {
    setTextValue(initialValue)
  }, [initialValue])

  function handleChange(text) {
    setTextValue(text)
    handleSave(text)
  }

  return (
    <div className="wrapper">
      <SimpleMDE
        id="primary-editor"
        value={textValue}
        onChange={handleChange}
        options={options}
      />
      <style jsx global>
        {`
          .wrapper {
            display: block;
            max-width: 800px;
            margin: 0 auto;
            padding: 0 ${style.space3};
          }
          .cm-s-easymde {
            border-radius: ${style.borderRadius};
            border: ${style.borderWidth} solid ${style.stroke};
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
    </div>
  )
}
