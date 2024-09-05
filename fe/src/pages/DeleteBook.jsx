import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
// import { response } from 'express'
import { useSnackbar } from 'notistack'

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error occurred while fetching the book details.');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  }, [id, navigate]);


  const handleDeleteBook = () => {
    setLoading(true);
    axios.delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
        enqueueSnackbar('Book deleted.', { variant: 'success' });
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error occurred. Check console for more details.');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete "{title}" by {author}</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Permanently delete this book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Confirm Deletion
        </button>
      </div>
    </div>
  )
}

export default DeleteBook