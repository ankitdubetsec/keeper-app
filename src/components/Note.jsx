import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DeleteBook from "./DeleteBook";
import "./note.css";
import Extra from "./Extra";
import { jwtDecode } from "jwt-decode";
import Star from "./Star";

function Note() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);
  const [tit, settit] = useState("");
  const [cont, setcont] = useState("");
  const [comp, setcomp] = useState(false);
  const [fav, setfav] = useState(false);

  useEffect(() => {
    console.log("rendered");

    axios
      .get("http://localhost:5500/api/v1/notes", {
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        params: {
          query: searchQuery,
        },
      })
      .then((res) => {
        setNotes(res.data.note);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchQuery]);

  const deleteNote = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5500/api/v1/notes/${taskId}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      setNotes(notes.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateNote = async () => {
    const data = {
      title: tit,
      content: cont,
      completed: comp,
      isfav: fav,
    };
    try {
      const response = await axios.patch(
        `http://localhost:5500/api/v1/notes/${editNoteId}`,
        data,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      const updatedNote = response.data;
      setNotes(
        notes.map((note) => (note._id === editNoteId ? updatedNote : note))
      );
      setEditNoteId(null);
      settit("");
      setcont("");
      setcomp(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEditClick = (note) => {
    setEditNoteId(note._id);
    settit(note.title);
    setcont(note.content);
    setcomp(note.completed);
  };

  const submitNote = () => {
    setEditNoteId(null);
    settit("");
    setcont("");
    setcomp(false);
  };
  function clickk() {
    setfav((prevstate) => !prevstate);
    updateNote();
  }
  return (
    <>
      <input
        name="search"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        placeholder="Search tasks..."
        style={{
          display: "block",
          width: "200px",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          marginBottom: "20px",
          marginLeft: "10px",
          fontSize: "14px",
        }}
      />
      {notes.map((note) => (
        <div className="note" key={note._id}>
          <h1>{note.title}</h1>
          <p>{note.content}</p>
          {note.isfav && (
            <img src="images/star-filled.png" style={{ width: "10%" }}></img>
          )}
          <h1>{note.due && note.due.slice(0, 10)}</h1>

          <button onClick={() => deleteNote(note._id)}>DELETE</button>
          <button onClick={() => handleEditClick(note)}>EDIT</button>
          {editNoteId === note._id && (
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateNote();
                }}
              >
                <input
                  name="title"
                  onChange={(e) => settit(e.target.value)}
                  value={tit}
                  placeholder="Edit Title"
                />
                <textarea
                  name="content"
                  onChange={(e) => setcont(e.target.value)}
                  value={cont}
                  placeholder="Edit Note"
                  rows="3"
                />
                <label>favorite</label>
                <input
                  className="radinp"
                  name="favorite"
                  type="checkbox"
                  onChange={() => setfav((prev) => !prev)}
                  checked={fav}
                />
                <button className="addbtn" type="submit">
                  Update
                </button>
              </form>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default Note;
