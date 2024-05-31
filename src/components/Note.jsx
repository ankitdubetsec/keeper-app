import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import DeleteBook from "./DeleteBook";
import  { useEffect } from "react";
import './note.css'

function Note(props) {

  // const { id } = useParams(); 
  // function handleClick() {
  //   console.log(id)
  //   axios.delete(`http://localhost:5000/notes/${id}`)
  //     // .then(() => {
  //     //   // If the deletion was successful on the server, update the state
  //     //   props.setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  //     //   console.log("Deleted successfully");
  //     // })
  //     // .catch(error => {
  //     //   console.error("Error deleting note:", error);
  //     // });
    
  // }
// console.log(props)
function handleClick() {
  props.onDelete(props.id);
  console.log(props)
  console.log("at delete")

}
let [isshown,setisshown]=React.useState(false)
let [tit,settit]=React.useState('')
let [cont,setcont]=React.useState('')
let [comp,setcomp]=React.useState(false)
// let [data,setdata]=React.useState({
//   title:"",
//   content:""
// })
useEffect(() => {
  //setLoading(true);
  console.log("rendered2");

  axios
    .get(`https://to-do-szns.onrender.com/api/v1/notes/${props.id}`)
    .then((res) => {
    //  console.log(res.data);
      settit(res.data.title);
      setcont(res.data.content);
     // setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      //setLoading(false);
    });
}, []);
function handleClick2() {

  
  
    setisshown(prevstate=>!prevstate)
   
 
  // console.log(props)
  // console.log("at delete")

}
const updateNote=async()=>{
  // const title2=prompt("enter new title")
  // const content2=prompt("enter new content")
  // const completed2=prompt("completed?")
  console.log(tit);
  const data = {
    title:tit,
    content:cont,
    completed:comp,
    
  };
  try {
    const response=await axios.patch(`https://to-do-szns.onrender.com/v1/notes/${props.id}`,data);
    const updatedNote = response.data;
      
      // Update the state of notes by mapping over the existing array
      // If the task ID matches the updated note, replace it with the updated note
      // Otherwise, keep the task as it is
      setNotes(notes.map(task => task._id === props.id ? updatedNote : data));
    //setNotes();
  } catch (error) {
    console.error('Error deleting task:', error);
  }
  console.log("update function")
}
function submitNote(){

  console.log("submit")
  setisshown(prevstate=>!prevstate)
  console.log(tit)
  //props.onUpdate(props.id,tit,cont);
  
}
console.log(props.completed)
console.log(props.due)
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      {props.completed&&<h1>Completed</h1>}
      {!props.completed&&<h1>{props.due.slice(0, 10)}</h1>}
      <button onClick={handleClick}>DELETE</button>
      <button onClick={handleClick2}>EDIT</button>
      {isshown&&<div>
      <form>
        <input
          name="title"
          onChange={(e)=>settit(e.target.value)}
          value={tit}
           placeholder="Edit Title"
        />
        <textarea
          name="content"
          onChange={(e)=>setcont(e.target.value)}
          value={cont}
          placeholder="Edit Note"
          rows="3"
        />
        <label >completed</label>
         <input className="radinp"
          name="completed"
          type="checkbox"
          onChange={(e)=>setcomp(prev=>!prev)}
          value={comp}
          placeholder="Completed"
           
        />
        <button className='addbtn' onClick={updateNote}>Update</button>
      </form>
    </div>
}
      
    </div>
  );
}

export default Note;
