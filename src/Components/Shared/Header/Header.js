import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth } from '../../../firebase.init';

import './Header.css';

const Header = () => {
    const [user] = useAuthState(auth);
    return (
        <div className="navbar bg-base-100 mb-4 lg:mb-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/reviews'>Reviews</Link></li>
                        <li><Link to='/items'>All Items</Link></li>
                        <li><Link to='/blogs'>Blogs</Link></li>
                        {user && <li><Link to='/dashboard' className='font-semibold'>Dashboard</Link></li>}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">PC-HOUSE</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/reviews'>Reviews</Link></li>
                    <li><Link to='/items'>All Items</Link></li>
                    <li><Link to='/blogs'>Blogs</Link></li>
                    {user && <li><Link to='/dashboard' className='font-semibold'>Dashboard</Link></li>}
                </ul>
            </div>
            <div className="navbar-end pr-8">
                {user ? <button className="btn btn-outline btn-error" onClick={() => signOut(auth)}>Logout</button> : <Link to='/login' className="btn">Login</Link>}
            </div>
        </div>
    );
};

export default Header;