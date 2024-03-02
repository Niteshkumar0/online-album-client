import React, { useEffect } from 'react'
import nav from './navbar.module.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  
  let handleLogoutBtn = () => {
    localStorage.removeItem('users')
  }

  return (
    <div className={nav.container}>
        <div className={nav.logo}>
            <Link to='/' className={nav.Link1}>
                Gallery
            </Link>
        </div>
        <div className={nav.button}>
            <p> <Link to='/login' onClick={handleLogoutBtn} className={nav.Link}  >logout</Link></p>
        </div>
    </div>
  )
}

export default Navbar