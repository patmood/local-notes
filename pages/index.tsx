import React from 'react'
import Link from 'next/link'

export default () => {
  return (
    <main>
      <h1>Local Notes</h1>
      <Link href="/new">
        <a>Create new note</a>
      </Link>
    </main>
  )
}
