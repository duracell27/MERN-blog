import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'

export default function Navbar() {
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const activeLink = {
        color: 'white'
    }

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('tooken')
        toast('Ви вийшли із системи')
    }
    return (
        <div className="flex py-4 justify-between items-center">
            <span className="flex justify-center items-center  bg-gray-600  text-white rounded-sm px-6 py-2">
                Blog
            </span>
            {isAuth && (<ul className="flex gap-8">
                <li><NavLink to={'/'} style={({ isActive }) => isActive ? activeLink : undefined} className="text-sm text-gray-400 hover:text-white">Головна</NavLink></li>
                <li><NavLink to={'/posts'} style={({ isActive }) => isActive ? activeLink : undefined} className="text-sm text-gray-400 hover:text-white">Моі пости</NavLink></li>
                <li><NavLink to={'/new'} style={({ isActive }) => isActive ? activeLink : undefined} className="text-sm text-gray-400 hover:text-white">Додати пост</NavLink></li>
            </ul>)}

            <div className="flex justify-center items-center bg-gray-600 text-white rounded-sm px-4 py-2">
                {isAuth?(<button onClick={logoutHandler}>Вийти</button>):(<Link to={'login'}>Ввійти</Link>)}         
            </div>
        </div>
    )
}
