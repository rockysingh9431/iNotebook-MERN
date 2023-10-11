import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = context;
    console.log("notes", notes)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    useEffect(() => {
        getAllNotes();
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const handleClick = (e) => {
        console.log("handleclick is triggered", note)
        e.preventDefault()
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn d-none" data-bs-toggle="modal" data-bs-target="#updateNote">Launch Modal</button>
            <div className="modal" tabIndex="-1" id="updateNote">
                <div className="modal-dialog">
                    < div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update Note</h5>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">
                            <div className="container my-3">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="tag">Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button ref={refClose} type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3">
                <h3>Your Notes</h3>
                <div className="container row">
                    {notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                    })}
                </div>
            </div>
        </>

    )
}

export default Notes