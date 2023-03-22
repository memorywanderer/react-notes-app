import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'

export default function NoteLayout({ notes }) {
  const { id } = useParams()
  // Find the note with exact id
  const note = notes.find(n => n.id === id)

  // If there is no note with searching id then return to home page
  if (note === null) return <Navigate to="/" replace />
  return (
    <Outlet context={note} />
  )
}

export function useNote() {
  return useOutletContext()
}
