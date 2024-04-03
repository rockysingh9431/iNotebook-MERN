import React, { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
  const navigate = useNavigate();

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) getAllNotes();
    else navigate("/login");
    // eslint-disable-next-line
  }, []);
 
  const ref = useRef(null);
  const refClose = useRef(null);

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note has been updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const updateNote = (currentNote) => {
    ref.current.click(); // Trigger the modal on update
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      {console.log("check")}
      <button
        ref={ref}
        type="button"
        className="btn d-none"
        data-bs-toggle="modal"
        data-bs-target="#updateNote"
      >
        Launch Modal
      </button>
      <div className="modal fade" tabIndex="-1" id="updateNote">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Note</h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                ref={refClose}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={(e) => handleClick(e)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container p-2 mx-3 my-3">
        <h3>Your Notes</h3>
        <div className="container p-0 row">
          {notes.map((note) => (
            <NoteItem
              key={note._id}
              showAlert={props.showAlert}
              updateNote={updateNote}
              note={note}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Notes;
