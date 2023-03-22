import NoteForm from "./NoteForm";

export default function NewNote({ onSubmit, onAddTag, availableTags }) {
  return (
    <div className="new-note notes__new-note">
      <h1 className="title new-note__title">New Note</h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </div>
  )
}