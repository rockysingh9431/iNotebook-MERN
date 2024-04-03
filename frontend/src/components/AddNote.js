import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title,note.description,note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note Added Successfully","success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <h3 className="container my-3 text-center">Welcome to iNotebook you can add your notes here</h3>
            <div className="container my-3">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control bg-input " id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control bg-input " id="description" name="description" onChange={onChange} value={note.description} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="tag">Tag</label>
                        <input type="text" className="form-control bg-input " id="tag" name="tag" onChange={onChange} value={note.tag}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
