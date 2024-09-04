import React from "react";
import { deleteTodo } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import axios from "axios";

const CartItem = ({ _id, completed, title, content, due }) => {
  const dispatch = useDispatch();
  let [isshown,setisshown]=React.useState(false);
  const [tit, settit] = useState('');
  const [cont, setcont] = useState('');
  const [comp, setcomp] = useState(false);
  const [dat, setdat] = useState('');
  const [id, setid] = useState('');

  function handleClick() {
    setisshown(prevstate=>!prevstate)

}
const updateNote=async(id)=>{
  // const title2=prompt("enter new title")
  // const content2=prompt("enter new content")
  // const completed2=prompt("completed?")
 console.log(id);
  
  const data = {
    title:tit,
    content:cont,
    completed:comp,
    
  };
  console.log(data);
  try {
    const response=await axios.patch(`https://keeper-app-mmhh.onrender.com/api/v1/notes/${id}`,data);
    const updatedNote = response.data;
      
  } catch (error) {
    alert(error)
  }
  console.log("update function")
}
// const handleUpdateTodo = (id) => {
//   console.log(id)
//   const note={ completed: comp,
//     title: tit,
//     content: cont,
//     due: dat,
//     completed:comp,
//     };
//       dispatch(updateTodo(id,note));
//       settit('');
//       setcont('');
//       setdat('');
//       setcomp('');
  
// };
  return (
    <article className='cart-item' style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: 'auto 1fr auto', gridColumnGap: '1.5rem', margin: '1.5rem 0' }}>
      <div>
        <h4 style={{ marginBottom: '0.5rem', fontWeight: 500, letterSpacing: '2px' }}>{title}</h4>
        <h4 className='item-price' style={{ color: 'var(--clr-grey-5)' }}>{content}</h4>
        <p style={{marginBottom:"0.5rem"}}></p>
        <button
          className='remove-btn'
          onClick={() => {
            dispatch(deleteTodo(_id));
          }}
          style={{ color: 'var(--clr-primary)', letterSpacing: 'var(--spacing)', cursor: 'pointer', fontSize: '0.85rem', background: 'transparent', border: 'none', marginTop: '0.375rem', transition: 'var(--transition)' }}
        >
          remove
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
        
        <button className='btn clear-btn' style={{ color: 'var(--clr-primary)', background: 'transparent', border: '1px solid var(--clr-primary)', padding: '0.25rem 0.5rem', cursor: 'pointer', transition: 'var(--transition)' }}>
        {completed ? 'completed' : 'pending'}
        </button>
        <button className='btn clear-btn' style={{ color: 'var(--clr-primary)', background: 'transparent', border: '1px solid var(--clr-primary)', padding: '0.25rem 0.5rem', cursor: 'pointer', transition: 'var(--transition)' }} onClick={handleClick}>
          Edit
        </button>
      </div>
      {isshown&&<div>
      <form style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            maxWidth: '100%',
            margin: 'auto',
          }}>
        <input
          name="title"
          onChange={(e)=>settit(e.target.value)}
          value={tit}
           placeholder="Edit Title"
           style={{
            flex: '1',
            padding: '0.75rem',
            border: '1px solid #b0b0b0',
            borderRadius: '5px',
            fontSize: '1rem',
          }}
        />
        <textarea
          name="content"
          onChange={(e)=>setcont(e.target.value)}
          value={cont}
          placeholder="Edit Note"
          rows="3"
          style={{
            flex: '1',
            padding: '0.75rem',
            border: '1px solid #b0b0b0',
            borderRadius: '5px',
            fontSize: '1rem',
          }}
        />
        <label >completed</label>
         <input className="radinp"
          name="completed"
          type="checkbox"
          onChange={(e)=>setcomp(prev=>!prev)}
          value={comp}
          placeholder="Completed"
           
        />
        <button className='addbtn' onClick={()=>updateNote(_id)}>Update</button>
      </form>
    </div>
}
    </article>
  );
};

export default CartItem;
