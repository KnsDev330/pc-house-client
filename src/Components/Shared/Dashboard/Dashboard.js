import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BiBasket, BiAddToQueue } from 'react-icons/bi';
import { FaTags, FaUsers, FaUserCircle, FaCommentDots } from 'react-icons/fa';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase.init';
import axios from 'axios';
import { URLS } from '../../../Constants/URLS';
import { toast } from 'react-toastify';

const Dashboard = () => {

    // check if admin
    const [user, loading] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (loading) return;
        axios.get(`${URLS.serverRoot}/${URLS.isAdmin}/${user.uid}`)
            .then(res => {
                setIsAdmin(!!res.data?.isadmin);
            })
            .catch(err => { console.log(err); toast.error(`Error: ${err?.response?.data?.text || err.message}`) })
    }, [user, loading]);


    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="side-nav" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="side-nav" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <small className='pl-4 pb-5'>Navigation</small>
                        {isAdmin && <>
                            <li><Link to='manage-orders'><FaTags /> Manage All Orders</Link></li>
                            <li><Link to='add-product'><BiAddToQueue /> Add A Product</Link></li>
                            <li><Link to='manage-products'><BiBasket /> Manage Products</Link></li>
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