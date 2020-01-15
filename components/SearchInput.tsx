import React, { FormEvent } from 'react'
import style from './style'

export function SearchInput({
  onChange,
  onSubmit,
}: {
  onChange: (val: string) => void
  onSubmit: (e: FormEvent) => void
}) {
  return (
    <>
      <form className="SearchInput" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search"
          onChange={e => onChange(e.currentTarget.value.trim())}
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
          padding: ${style.space1};
          margin: 0;
          display: block;
          border-radius: ${style.borderRadius};
          border: ${style.borderWidth} solid ${style.stroke};
        }
      `}</style>
    </>
  )
}
