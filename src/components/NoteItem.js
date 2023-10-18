import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props
    const handleClick = () => {
        deleteNote(note._id)
        props.showAlert("Notes Deleted Successfully", "success")
    }
    return (
        <div className="col-md-6">
            <div className="card my-3 bg-notes">
                <div className="card-body">
                    <div className="container m-0 p-0 d-flex flex-grow-1 justify-content-between">
                        <h5 className=" title-container card-title mx-1">{note.title}</h5>
                            <div className="icon-container">
                            <i className="fa-solid bg-input fa-trash mx-1 " onClick={handleClick} ></i>
                            <i className="fa-solid bg-input fa-pen-to-square mx-1" onClick={() => updateNote(note)}></i>
                            </div>
                    </div>
                    <div className="container m-0 p-0">
                        <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
                        <p className="card-text ">{note.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem