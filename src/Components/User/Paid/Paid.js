import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Paid = () => {
    return (
        <div className='mx-auto w-[500px] max-w-full px-4 my-5 flex flex-col items-center grow-1'>
            <h2 className="text-2xl font-bold text-amber-400">Order Paid</h2>
            <small>You have successfully paid for the order</small>
            <div className='bg-white border-2 rounded-xl flex flex-col items-center my-4 py-4 lg:py-8 px-4 w-full'>
                <FaCheckCircle className='text-8xl text-green-500' />
                <h3 className="text-4xl my-4">Success</h3>
                <p className='text-center'>You have successfully paid for the order.</p>
                <p className='text-center'>You can view the order on you <Link to='/dashboard/my-orders' className='text-blue-500'>dashboard</Link></p>
            </div>
        </div>
    );
};

export default Paid;