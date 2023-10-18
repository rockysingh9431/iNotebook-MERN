import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    // UseState hook to update notes
    const [notes, setNotes] = useState(notesInitial)
 
    // Function to fetch all notes from server
    const getAllNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token":" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlNGIwZWZmMzhjY2Y0NzYyMzQ5MTk2In0sImlhdCI6MTY5Mzk5NzM2OX0.vVQtkPUWwZGJe2Nih7g1LCgc6Ni4XYZouyhei9J5C0c"
            },
        });
        const json =await response.json();
        setNotes(json)
    }

    // Function to add Note
    const addNote = async (title, description, tag) => {
        // Api CAll
        const response = await fetch(`${host}/api/notes/addNote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlNGIwZWZmMzhjY2Y0NzYyMzQ5MTk2In0sImlhdCI6MTY5MzM4ODM1MX0.367os9XzF3JU2kzHMUl17QZdO77wIJoD1qWeLyZZZqI"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    // Function to delete node
    const deleteNote = async (id) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlNGIwZWZmMzhjY2Y0NzYyMzQ5MTk2In0sImlhdCI6MTY5MzM4ODM1MX0.367os9XzF3JU2kzHMUl17QZdO77wIJoD1qWeLyZZZqI"
            },
        });
        response.json();

        setNotes(notes.filter((note) => { return note._id !== id }))
    }

    // Function to edit note
    const editNote = async (id, title, description, tag) => {
        //API CALL
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlNGIwZWZmMzhjY2Y0NzYyMzQ5MTk2In0sImlhdCI6MTY5MzM4ODM1MX0.367os9XzF3JU2kzHMUl17QZdO77wIJoD1qWeLyZZZqI"
            },
            body: JSON.stringify({ title, description, tag })
        });
        response.json();

        // Edit Note
        let newNotes=JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break;
            }
        }
        setNotes(newNotes)
    }
    return (
        <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </noteContext.Provider>
    )
};
export default NoteState;