import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import { useParams } from 'react-router-dom';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Login from "./Login";
import Signup from './Signup'
import Search from "./Search";
// import './styles.css'


function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { id } = useParams(); 
  // Use useParams at the top level
  // console.log(id)

 

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
          await axios.delete(`http://localhost:5500/api/v1/notes/${taskId}`, {
            headers: {
                'auth-token': localStorage.getItem('token'), // Replace with your actual token or any other header
                'Content-Type': 'application/json', // Example header
                // Add any other headers as needed
            }
        });
          setNotes(notes.filter(task => task._id !== taskId));
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      }

  

 

  return (
    <div>
      <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
         {/* <Route path="/login" element={<Login/>} />  */}

        <Route exact path='/tasks' element={<CreateArea onAdd={addNote} Search={<Search/>}icon={
        <Note
        //   key={notee._id}
        //   id={notee._id}
        //   title={notee.title}
        //   content={notee.content}
        //   completed={notee.completed}
        //   due={notee.due}
        //  onDelete={()=>deleteNote(notee._id)} 
        />
      }/>} />
       </Routes>
      {/* <CreateArea onAdd={addNote} />
      {notes.map((notee) => (
        <Note
          key={notee._id}
          id={notee._id}
          title={notee.title}
          content={notee.content}
          completed={notee.completed}
          due={notee.due}
         onDelete={()=>deleteNote(notee._id)} 
        />
      ))} */}
      </Router>
    </div>
  );
}

export default App;

