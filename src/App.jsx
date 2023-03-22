import { useMemo } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'
import { useLocalStorage } from './useLocalStorage'

import NewNote from './components/NewNote'
import NoteList from './components/NoteList'
import NoteLayout from './components/NoteLayout'
import Note from './components/Note'
import EditNote from './components/EditNote'

import './App.css'

function App() {
  const [notes, setNotes] = useLocalStorage("NOTES", [])
  const [tags, setTags] = useLocalStorage("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  function onUpdateNote(id, { tags, ...data }) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  function onDeleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function addTag(tag) {
    setTags(prev => [...prev, tag])
  }

  function updateTag(id, label) {
    // set a new tag with a new label
    setTags(prev => {
      return prev.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id) {
    // set new array of tags that exlude tag with current id
    setTags(prevTags => prevTags.filter(tag => tag.id !== id))
  }

  return (
    <div className="notes">
      <Routes>
        <Route path="/" element={<NoteList
          notes={notesWithTags}
          availableTags={tags}
          updateTag={updateTag}
          deleteTag={deleteTag} />}
        />
        <Route path="/new" element={<NewNote
          onSubmit={onCreateNote}
          onAddTag={addTag}
          availableTags={tags} />} />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route path='edit' element={<EditNote
            onSubmit={onUpdateNote}
            onAddTag={addTag}
            availableTags={tags} />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  )
}

export default App
