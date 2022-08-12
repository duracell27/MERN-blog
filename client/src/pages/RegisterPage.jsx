import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { checkIsAuth, registerUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export default function RegisterPage() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const { status } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (status) {
      toast(status)
    }
    if (isAuth) navigate('/')
  }, [status, isAuth, navigate])

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ userName, password }))
      setPassword('')
      setUserName('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className='w-1/4 h-60 mx-auto mt-40'>
      <h1 className='text-lg text-white text-center'>Реєстрація</h1>
      <label className='text-sm text-gray-400'>
        Імя користувача:
        <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Імя користувача' className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
      </label>
      <label className='text-sm text-gray-400'>
        Пароль:
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Пароль' className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
      </label>
      <div className="flex gap-8 justify-center mt-4">
        <button type='submit' onClick={handleSubmit} className='flex justify-center items-center bg-gray-600 text-sm text-white rounded-sm py-2 px-4'>Зареєструватись</button>
        <Link to='/login' className='flex justify-center items-center text-sm text-white'>Вже є акаунт?</Link>
      </div>
    </form>
  )
}
