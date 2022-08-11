import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
    const isAuth = false
    const activeLink = {
        color: 'white'
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
                {isAuth?(<button>Вийти</button>):(<Link to={'login'}>Ввійти</Link>)}         
            </div>
        </div>
    )
}
