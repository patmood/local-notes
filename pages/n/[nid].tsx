import React from 'react'
import localforage from 'localforage'
import { useRouter } from 'next/router'
import { NotesList } from '../../components/NotesList'
import { NoteWrapper } from '../../components/NoteWrapper'

function NotePage() {
  const router = useRouter()
  const nid = router.query.nid as string

  return (
    <div className="container">
      <aside>
        <NotesList nid={nid} />
      </aside>
      <main>{nid && <NoteWrapper nid={nid} />}</main>
      <style jsx>
        {`
          .container {
            display: flex;
          }

          aside {
            width: 200px;
            flex: none;
          }
          main {
            flex-grow: 1;
          }
        `}
      </style>
    </div>
  )
}

export default NotePage
