import { Link, useNavigate } from 'react-router-dom'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useNote } from './NoteLayout'

import "./Note.css"

export default function Note({ onDelete }) {
  const note = useNote()
  const navigate = useNavigate()
  return (
    <div className="note notes__note">
      <h1 className='title note__title'>
        {note.title}
      </h1>
      {note.tags.length > 0 && (
        <div className="note__tags">
          {note.tags.map(tag => {
            return <div key={tag.id} className="badge note__badge">
              {tag.label}
            </div>
          })}
        </div>
      )}
      <div className="list__buttons">
        <Link to={`/${note.id}/edit`}>
          <button className="btn list__btn">Edit</button>
        </Link>
        <button onClick={() => {
          onDelete(note.id)
          navigate('/')
        }}
          className="btn btn--danger list__btn"
        >
          Delete
        </button>
        <Link to="/">
          <button className="btn btn--secondary list__btn">Back</button>
        </Link>
      </div>
      <div className="note__body">
        <ReactMarkdown>
          {note.markdown}
        </ReactMarkdown>

      </div>
    </div>
  )
}
