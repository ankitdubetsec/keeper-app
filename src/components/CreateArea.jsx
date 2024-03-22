import axios from "axios";
import React, { useState } from "react";


function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    completed:false,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
      completed:false,
    });
    axios
    .post('https://keeper-app-1.onrender.com/api/v1/notes',note)
    .then(()=>{
     console.log("posted sucesssfully")
    })
    .catch((error)=>{
      console.log(error)
    })
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
