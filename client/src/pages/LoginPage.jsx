import React from 'react'
import {Link} from 'react-router-dom'

export default function LoginPage() {
    return (
        <form onSubmit={(e) => e.preventDefault()} className='w-1/4 h-60 mx-auto mt-40'>
            <h1 className='text-lg text-white text-center'>Авторизація</h1>
            <label className='text-sm text-gray-400'>
                Імя користувача:
                <input type='text' placeholder='Імя користувача' className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
            </label>
            <label className='text-sm text-gray-400'>
                Пароль:
                <input type='password' placeholder='Пароль' className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
            </label>
            <div className="flex gap-8 justify-center mt-4">
                <button type='submit' className='flex justify-center items-center bg-gray-600 text-sm text-white rounded-sm py-2 px-4'>Ввійти</button>
                <Link to='/register' className='flex justify-center items-center text-sm text-white'>Немає акаунта?</Link>
            </div>
        </form>
    )
}
