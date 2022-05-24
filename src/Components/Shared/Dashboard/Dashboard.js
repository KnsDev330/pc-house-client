import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BiBasket, BiAddToQueue } from 'react-icons/bi';
import { FaTags, FaUsers, FaUserCircle, FaCommentDots } from 'react-icons/fa';

import './Dashboard.css';

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(true);

    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="side-nav" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="side-nav" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <small className='pl-4 pb-5'>Navigation</small>
                        {isAdmin && <>
                            <li><Link to='manage-orders'><FaTags /> Manage All Orders</Link></li>
                            <li><Link to='add-product'><BiAddToQueue /> Add A Product</Link></li>
                            <li><Link to='manage-product'><BiBasket /> Manage Products</Link></li>
                            <li><Link to='profile'><FaUserCircle /> My Proifle</Link></li>
                            <li><Link to='users'><FaUsers /> Users</Link></li>
                        </>}
                        {!isAdmin && <>
                            <li><Link to='my-orders'><FaTags /> My Orders</Link></li>
                            <li><Link to='add-review'><FaCommentDots /> Add A Review</Link></li>
                            <li><Link to='profile'><FaUserCircle /> My Proifle</Link></li>
                        </>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;