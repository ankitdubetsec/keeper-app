import React, { useState } from 'react';
// import BackButton from '../components/BackButton';
// import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  // setLoading(true);
  // const navigate = useNavigate();
  const { id } = useParams();
  // console.log(props.id)
  // const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/notes/${id}`)
      .then(() => {
        setLoading(false);
      //  enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
       // navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
       // enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  
  return (
   

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
    
  )
}

export default DeleteBook;
