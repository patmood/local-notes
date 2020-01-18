import React, { FormEvent } from 'react'
import { style } from './style'

export function SearchInput({
  onChange,
  onSubmit,
  searchText,
}: {
  onChange: (val: string) => void
  onSubmit: (e: FormEvent) => void
  searchText: string
}) {
  return (
    <>
      <form
        className="SearchInput"
        onSubmit={e => {
          onSubmit(e)
          onChange('')
        }}
      >
        <input
          type="text"
          placeholder="Search or create"
          onChange={e => onChange(e.currentTarget.value.trim())}
          value={searchText}
          autoFocus
        />
      </form>
      <style jsx>{`
        .SearchInput {
          padding: 0.5rem;
          display: flex;
        }
        input {
          flex-grow: 1;
          font-size: 1rem;
          padding: ${style.space1} ${style.space2};
          margin: 0;
          display: block;
          border-radius: ${style.borderRadius};
          border: ${style.borderWidth} solid ${style.stroke};
        }
      `}</style>
    </>
  )
}
