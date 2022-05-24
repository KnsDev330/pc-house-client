import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BiBasket } from 'react-icons/bi';
import { FaPlusSquare, FaTags, FaUsers, FaUserCircle, FaCommentDots } from 'react-icons/fa';

import './Dashboard.css';

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(true);

    return (
        <div>
            <Outlet />
            <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col items-center justify-center">



                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" class="drawer-overlay"></label>
                    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <small className='pl-4 pb-5'>Navigation</small>
                        {isAdmin && <>
                            <li><Link to='manage-orders'><FaTags /> Manage All Orders</Link></li>
                            <li><Link to='add-product'><FaPlusSquare /> Add A Product</Link></li>
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