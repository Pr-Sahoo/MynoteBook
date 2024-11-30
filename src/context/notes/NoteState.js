// import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all notes 
  const getNotes = async () => {
    //API calls
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0NmY3MTc3OGZiZDhkMDQ4NjhmMTRjIn0sImlhdCI6MTczMjcwNDU3MH0.ZL4lrjpM3qMpFUUUtaE_qcrbJMMS3PvUkkxB0GQF7L8"
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }
  // Add a note 
  const addNote = async (title, description, tag) => {
    //TODO API call
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0NmY3MTc3OGZiZDhkMDQ4NjhmMTRjIn0sImlhdCI6MTczMjcwNDU3MH0.ZL4lrjpM3qMpFUUUtaE_qcrbJMMS3PvUkkxB0GQF7L8"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json);
    
    console.log("adding a new note");
    const note = {
      "_id": "6746fb0c5186c5096652648f6",
      "user": "6746f71778fbd8d04868f14c1",
      "title": title,
      "tag": tag,
      "description": description,
      "date": "2024-11-27T10:57:16.199Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }
  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json",
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0NmY3MTc3OGZiZDhkMDQ4NjhmMTRjIn0sImlhdCI6MTczMjcwNDU3MH0.ZL4lrjpM3qMpFUUUtaE_qcrbJMMS3PvUkkxB0GQF7L8"
      },
      
    });

    const json = await response.json();
    console.log(json);
    console.log("deleting note with id " + id);
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);
  }
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': "application/json",
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0NmY3MTc3OGZiZDhkMDQ4NjhmMTRjIn0sImlhdCI6MTczMjcwNDU3MH0.ZL4lrjpM3qMpFUUUtaE_qcrbJMMS3PvUkkxB0GQF7L8"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    // console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    // console.log(newNotes);
    setNotes(newNotes);
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;