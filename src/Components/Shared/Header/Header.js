import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../../../firebase.init';
import { FiMenu } from 'react-icons/fi';

import './Header.css';

const Header = () => {
    const [user] = useAuthState(auth);
    useEffect(() => {
        console.log(user)
    }, [user])
    const isLoginPage = useLocation().pathname.includes('/login');

    return (
        <div className="navbar bg-base-100 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/reviews'>Reviews</Link></li>
                        <li><Link to='/blogs'>Blogs</Link></li>
                        {
                            user && <>
                                <li><Link to='/dashboard' className='font-semibold'>Dashboard</Link></li>
                                <li><button className='btn btn-ghost text-red-500' onClick={() => { signOut(auth); localStorage.removeItem('jwt'); }}>Logout</button></li>
                            </>
                        }

                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">PC-HOUSE</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/reviews'>Reviews</Link></li>
                    <li><Link to='/blogs'>Blogs</Link></li>
                    {user && <li><Link to='/dashboard' className='font-semibold'>Dashboard</Link></li>}
                </ul>
            </div>
            <div className="navbar-end pr-3">
                {user ? <button className="btn btn-outline hidden md:inline-flex btn-error" onClick={() => signOut(auth)}>Logout</button> : <>
                    {isLoginPage && <Link to='/register' className="btn">Register</Link>}
                    {!isLoginPage && <Link to='/login' className="btn">Login</Link>}
                </>}
                {
                    useLocation().pathname.includes('/dashboard') && <label htmlFor="side-nav" className="btn btn-ghost lg:hidden drawer-button lg:hidden"><FiMenu className='h-[25px] w-[25px]' /></label>
                }
            </div>
        </div >
    );
};

export default Header;