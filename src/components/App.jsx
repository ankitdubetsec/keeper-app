import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import { useParams } from 'react-router-dom';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { id } = useParams(); 
  // Use useParams at the top level
  // console.log(id)

  useEffect(() => {
    setLoading(true);
    console.log("rendered");

    axios
      .get('https://keeper-app-2.onrender.com/api/v1/notes')
      .then((res) => {
      //  console.log(res.data);
        setNotes(res.data.note);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  console.log(notes)

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  //  function deleteNote(props) {
  //   // Use axios to send a DELETE request to the server
  //   // setLoading(true);
  //   // axios
  //   //   .delete(`http://localhost:5000/notes/${id}`)
  //   //   .then(() => {
  //   //     setLoading(false);
  //   //   //  enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
  //   //    // navigate('/');
  //   //    setNotes(prevNotes => {
  //   //     return prevNotes.filter((noteItem, index) => {
  //   //       return index !== id;
  //   //     });
  //   //   });
  //   //   })
  //   //   .catch((error) => {
  //   //     setLoading(false);
  //   //     // alert('An error happened. Please Chack console');
  //   //    // enqueueSnackbar('Error', { variant: 'error' });
  //   //     console.log(error);
  //   //   });
  //   console.log("delete")
  //  }
   const deleteNote = async (taskId) => {
        try {
          await axios.delete(`https://keeper-app-1.onrender.com/api/v1/notes/${taskId}`);
          setNotes(notes.filter(task => task._id !== taskId));
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      }

  

 

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((notee) => (
        <Note
          key={notee._id}
          id={notee._id}
          title={notee.title}
          content={notee.content}
          completed={notee.completed}
         onDelete={()=>deleteNote(notee._id)} // Pass deleteNote as a callback

         //onUpdate={()=>updateNote(notee._id,tit,cont)} // Pass deleteNote as a callback
        />
      ))}
      
    </div>
  );
}

export default App;

