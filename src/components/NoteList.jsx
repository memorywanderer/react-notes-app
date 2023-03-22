import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ReactSelect from "react-select"
import ReactModal from 'react-modal'

import './NoteList.css'
import './Modal.css'

export default function NoteList({
  notes,
  availableTags,
  updateTag,
  deleteTag
}) {
  const [title, setTitle] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function closeModal() {
    setModalIsOpen(false)
  }
  // This function checks if there are titles which match tags
  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        // if title isn't empty
        (title === "" ||
          // check it to matching with title of note
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        // if selected tags more than 0
        (selectedTags.length === 0 ||
          // every tag of the selected tags must matches to tags of the note
          // if the tags matching then return true 
          selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
      )
    })

  }, [title, selectedTags, notes])

  return (
    <div className='list notes__list'>
      <div className="list__header">
        <h1 className="title list__title">Note list</h1>
        <div className="list__buttons">
          <Link to='/new'>
            <button className="btn list__btn">Create</button>
          </Link>
          <button onClick={() => setModalIsOpen(true)} className="btn btn--secondary list__btn">Edit tags</button>
        </div>
      </div>
      <form className="list__form">
        <label className='form__label'>
          Title:
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form__input"
            placeholder='Search'
          />
        </label>
        <label className='form__label'>
          Tags:
          <ReactSelect
            value={selectedTags.map(tag => {
              return { label: tag.label, value: tag.id }
            })}
            options={
              availableTags && availableTags.map(tag => {
                return { label: tag.label, value: tag.id }
              })}
            onChange={tags => {
              setSelectedTags(tags.map(tag => {
                return { label: tag.label, id: tag.value }
              }))
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: ".25em",
              colors: {
                ...theme.colors,
                primary: '#007aff', // select border
                primary25: '#007aff', // background of selected option
                neutral0: 'black', // background of select
                neutral10: '#3a3a3c',// badge
                neutral80: '#f5f5f7' // badge font
              },
            })}
            className='form__select'
            isMulti
          />
        </label>
      </form>
      <div className="list__notes">
        {filteredNotes.map(note => {
          return <NoteCard key={note.id} id={note.id} title={note.title} tags={note.tags} />
        })}
      </div>
      <EditTagsModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        availableTags={availableTags}
        updateTag={updateTag}
        deleteTag={deleteTag}
      />
    </div>
  )
}

function NoteCard({ id, title, tags }) {
  return (
    <Link className="card notes__card" to={`/${id}`}>

      <div className="card__body">
        <span className="card__title">{title}</span>
        {tags.length > 0 && (
          <div className="card__tags">
            {tags.map(tag => {
              return <div key={tag.id} className="badge card__badge">
                {tag.label}
              </div>
            })}
          </div>
        )}

      </div>
    </Link>
  )
}

function EditTagsModal({
  modalIsOpen,
  closeModal,
  availableTags,
  updateTag,
  deleteTag
}) {
  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Tags"
    >
      <div className="modal__row">
        <h1>Edit tags</h1>
        <button onClick={closeModal} className="btn btn--danger">&times;</button>
      </div>
      <form className='form__tags'>
        {availableTags.map(tag => {
          return <div key={tag.id} className="form__tag">
            <input
              onChange={e => updateTag(tag.id, e.target.value)}
              type="text" className="form__input"
              value={tag.label}
            />
            <button onClick={() => deleteTag(tag.id)} className="btn btn--danger-outline">Delete tag</button>
          </div>
        })}
      </form>
    </ReactModal>
  )
}