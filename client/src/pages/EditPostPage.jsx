import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from '../utils/axios'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost } from '../redux/features/post/postSlice'


export default function EditPostPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [oldImage, setOldImage] = useState('')
  const [newImage, setNewImage] = useState('')

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setTitle(data.title)
    setText(data.text)
    setOldImage(data.imgUrl)

  }, [params.id])

  const submitHandler = () => {
    try {
      const updatedPost = new FormData()
      updatedPost.append('title', title)
      updatedPost.append('text', text)
      updatedPost.append('id', params.id)
      updatedPost.append('image', newImage)
      
      dispatch(updatePost(updatedPost))
      navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }

  const clearFormHandler = () => {
    setTitle('')
    setText('')
    setNewImage('')
  }


  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <label className='text-gray-300 py-2 bg-gray-600 text-sm mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>Прикріпити зображення
        <input type="file" onChange={(e) => {
          setNewImage(e.target.files[0])
          setOldImage('')
        }} className="hidden" />
      </label>
      <div className="flex object-cover py-2">
        {oldImage && <img src={`http://localhost:3002/${oldImage}`} alt='img' />}
        {newImage && <img src={URL.createObjectURL(newImage)} alt='img' />}
      </div>
      <label className='text-sm text-white opacity-70'>
        Заголовок поста:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Заголовок" className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none placeholder:text-gray-700' />
      </label>

      <label className='text-sm text-white opacity-70'>
        Текст:
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Текст поста" className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none resize-none h-40 placeholder:text-gray-700' />
      </label>
      <div className="flex gap-8 items-center justify-center mt-4">
        <button onClick={submitHandler} className='flex justify-center items-center bg-gray-600 text-sm text-white rounded-sm py-2 px-4'>Зберегти</button>
        <button onClick={clearFormHandler} className='flex justify-center items-center bg-red-600 text-sm text-white rounded-sm py-2 px-4'>Відмінити</button>
      </div>
    </form>
  )
}
