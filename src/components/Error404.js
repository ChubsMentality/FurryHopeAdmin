import React from 'react'
import '../css/Error404.css'
import error404 from '../assets/Error/error404.svg'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'

const Error404 = () => {
    return (
        <div className="error-404-body">
            <Sidebar />
            <div className='content'>
                <p className='error-404-header'>PAGE NOT FOUND</p>
                <img src={error404} className='error-404-img' />
                <p className='error-404-message'>Oops.. The page you're looking for couldn't be found <br/> or it doesn't exist.</p>
                <div className='error-404-other-links'>
                    <p className='try-other-links'>Try these links: </p>
                    <div className='other-links-container'>
                        <Link to='/manage' className='other-links'>
                            Manage Data
                        </Link>
                        <Link to='/add' className='other-links'>
                            Add An Animal
                        </Link>
                        <Link to='/addAdmin' className='other-links'>
                            Add an Admin Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error404;
