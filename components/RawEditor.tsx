import React, { Ref } from 'react'
import MyMDE from './MyMDE'
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
  id: string
}

export function RawEditor({ onSave, initialValue, id }: RawEditorProps) {
  const [textValue, setTextValue] = React.useState('')
  const [mdeInstance, setMdeInstance] = React.useState(null)
  const handleSave = React.useCallback(debounce(onSave, 1000), [onSave])

  React.useEffect(() => {
    setTextValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    mdeInstance && mdeInstance.codemirror.focus()
  }, [id])

  function handleChange(text: string) {
    setTextValue(text)
    handleSave(text)
  }

  return (
    <div className="wrapper">
      <MyMDE
        value={textValue}
        onChange={handleChange}
        options={options}
        getMdeInstance={setMdeInstance}
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
