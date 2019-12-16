import React from 'react'
import style from './style'

export function SearchInput({ onChange }: { onChange: (val: string) => void }) {
  return (
    <>
      <div className="SearchInput">
        <input
          type="text"
          placeholder="Search"
          onChange={e => onChange(e.currentTarget.value.trim())}
        />
      </div>
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
