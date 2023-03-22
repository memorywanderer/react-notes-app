import NoteForm from "./NoteForm";
import { useNote } from "./NoteLayout";

export default function EditNote({ onSubmit, onAddTag, availableTags }) {
  const note = useNote()
  console.log("Tags", note.tags)
  return (
    <div className="new-note notes__new-note">
      <h1 className="title new-note__title">Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={data => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  )
}