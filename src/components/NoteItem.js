import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
const NoteItem = (props) => {
    const context=useContext(noteContext);
    const{deleteNote}=context;
    const { note,updateNote } = props
    const handleClick=()=>{
        deleteNote(note._id) 
        props.showAlert("Notes Deleted Successfully","success")
    }
    return (
        <div className="col-md-4">
            <div className="card my-3">
                <div className="card-body">
                    <div className="container align-items-center d-flex">
                        <h5 className="card-title mx-1">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-1" onClick={handleClick} ></i>
                        <i className="fa-solid fa-pen-to-square mx-1" onClick={()=>updateNote(note)}></i>
                    </div>
                    <div className="container mx-1">
                        <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
                        <p className="card-text">{note.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem