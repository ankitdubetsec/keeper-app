import axios from "axios";
import React, { useState } from "react";
 import './styles.css'
import { jwtDecode } from 'jwt-decode';


function CreateArea(props) {
  const token = localStorage.getItem('token');
  let decodedToken
          if (token) {
              // Decode the token to get user information
               decodedToken = jwtDecode(token);
              console.log(decodedToken.student.name)
             // setname(decodedToken.student.name)
          }
  console.log(props)
  const [note, setNote] = useState({
    title: "",
    content: "",
    completed:false,
    user:decodedToken.student.id,
    isfav:false,
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
   
    axios
    .post('http://localhost:5500/api/v1/notes',note, {
      headers: {
          'auth-token': localStorage.getItem('token'), // Replace with your actual token or any other header
          'Content-Type': 'application/json', // Example header
          // Add any other headers as needed
      }
  })
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
        
        <input name="due" type="Date" onChange={handleChange} value={note.due} placeholder="Due date"></input>
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Description..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
      
      {props.icon}
    </div>
  );
}

export default CreateArea;
