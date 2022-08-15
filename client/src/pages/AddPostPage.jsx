import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPost } from '../redux/features/post/postSlice'

export default function AddPostPage() {

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')

    const submitHandler = () => {
        try {
            const data = new FormData()
            data.append('title', title)
            data.append('text', text)
            data.append('image', image)

            dispatch(createPost(data))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
            <label className='text-gray-300 py-2 bg-gray-600 text-sm mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>Прикріпити зображення
                <input type="file" onChange={e=>setImage(e.target.files[0])} className="hidden" />
            </label>
            <div className="flex object-cover py-2"></div>
            <label className='text-sm text-white opacity-70'>
                Заголовок поста:
                <input type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Заголовок" className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none placeholder:text-gray-700'/>
            </label>

            <label className='text-sm text-white opacity-70'>
                Текст:
                <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Текст поста" className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none resize-none h-40 placeholder:text-gray-700'/>
            </label>
            <div className="flex gap-8 items-center justify-center mt-4">
                <button onClick={submitHandler} className='flex justify-center items-center bg-gray-600 text-sm text-white rounded-sm py-2 px-4'>Додати</button>
                <button className='flex justify-center items-center bg-red-600 text-sm text-white rounded-sm py-2 px-4'>Відмінити</button>
            </div>
        </form>
    )
}
