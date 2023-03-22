import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CreatableReactSelect from "react-select/creatable"
import { v4 as uuidV4 } from 'uuid'

import './NoteForm.css'

export default function NoteForm({ title = "", markdown = "", tags = [], onSubmit, onAddTag, availableTags }) {
  const [selectedTags, setSelectedTags] = useState(tags)
  const titleRef = useRef()
  const markdownRef = useRef()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({
      title: titleRef.current.value,
      markdown: markdownRef.current.value,
      tags: selectedTags
    })

    navigate('..')
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      <div className="form__row">
        <label className='form__label'>
          <span>Title:</span>
          <input
            tabIndex={0}
            ref={titleRef}
            type="text"
            className="form__input"
            defaultValue={title}
            placeholder="Your title"
          />
        </label>
        <label className='form__label'>
          Tags:
          <CreatableReactSelect
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

            onCreateOption={label => {
              const newTag = { id: uuidV4(), label }
              onAddTag(newTag)
              setSelectedTags(prev => [...prev, newTag])
            }}
            value={selectedTags.map(tag => {
              return { label: tag.label, value: tag.id }
            })}
            options={
              availableTags.map(tag => {
                console.log("a tag:", tag)
                return { label: tag.label, value: tag.id }
              })}
            onChange={tags => {
              setSelectedTags(tags.map(tag => {
                return { label: tag.label, id: tag.value }
              }))
            }}
            className='form__select'
            isMulti
          />
        </label>
      </div>
      <label className='form__label'>
        Body:
        <textarea
          className='form__textarea'
          ref={markdownRef}
          name="markdown"
          id="markdown"
          cols="50"
          rows="15"
          defaultValue={markdown}
          placeholder="Enter text"
        ></textarea>
      </label>
      <div className="form__buttons">
        <button className='btn form__btn' type='submit'>Save</button>
        <Link to="..">
          <button className='btn btn--secondary form__btn' type='button'>Cancel</button>
        </Link>

      </div>
    </form>
  )
}
