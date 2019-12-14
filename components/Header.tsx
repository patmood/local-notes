import React from 'react'
import Link from 'next/link'

export function Header() {
  return (
    <header>
      <Link href="/new">
        <a>New note</a>
      </Link>
      <style jsx>
        {`
          header {
            display: flex;
            justify-content: end;
            padding: 1rem;
          }
        `}
      </style>
    </header>
  )
}
