import CartItem from './TodoItem';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../features/cart/cartSlice';
import axios from "axios";
import React, { useState } from "react";
// import './cart.css'
const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems, total, amount } = useSelector((store) => store.cart);
  const [tit, settit] = useState('');
  const [cont, setcont] = useState('');
  const [comp, setcom] = useState(false);
  const [dat, setdat] = useState('');


  


  const handleAddTodo = () => {
    const not={ completed: comp,
      title: tit,
      content: cont,
      due: dat,
      };
        dispatch(addTodo(not));
        settit('');
        setcont('');
        setdat('');
    
};
 

  return (
    <section className='cart'>
      <header>
        <h2>your Tasks</h2>
      </header>
      <div>
      <form
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            maxWidth: '100%',
            margin: 'auto',
          }}
        >
          <input
            name="title"
            placeholder="Title"
            value={tit}
            onChange={(e) => settit(e.target.value)}
            style={{
              flex: '1',
              padding: '0.75rem',
              border: '1px solid #b0b0b0',
              borderRadius: '5px',
              fontSize: '1rem',
            }}
          />
          <input
            name="due"
            type="date"
            placeholder="Due date"
            value={dat}
            onChange={(e) => setdat(e.target.value)}
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
            placeholder="Description..."
            rows="1"
            value={cont}
            onChange={(e) => setcont(e.target.value)}
            style={{
              flex: '2',
              padding: '0.75rem',
              border: '1px solid #b0b0b0',
              borderRadius: '5px',
              fontSize: '1rem',
              resize: 'none',
            }}
          />
          <button
            style={{
              backgroundColor: '#5f9ea0',
              color: '#ffffff',
              padding: '0.75rem 1rem',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'background 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#53868b')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#5f9ea0')}
            onClick={handleAddTodo}
          >
            Add
          </button>
        </form>
    </div>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
     
    </section>
  );
};
export default CartContainer;
