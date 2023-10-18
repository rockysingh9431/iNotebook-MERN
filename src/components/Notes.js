import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = context;
    const navigate=useNavigate();
    //console.log("notes", notes)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    useEffect(() => {
        if(localStorage.getItem('token'))
            getAllNotes();
        else
            navigate('/login')
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const handleClick = (e) => {
       // console.log("handleclick is triggered", note)
        e.preventDefault()
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showAlert("Note has been updated successfully","success")
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
            <AddNote showAlert={props.showAlert}/>
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
                                        <input type="text" className="bg-input form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="bg-input form-control bg-secondary" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="tag">Tag</label>
                                        <input type="text" className="bg-input form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
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
            <div className="container p-2 mx-3 my-3">
                <h3>Your Notes</h3>
                <div className="container p-0 row">
                    {notes.map((note) => {
                        return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
                    })}
                </div>
            </div>
        </>

    )
}

export default Notes