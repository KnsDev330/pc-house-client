import React from 'react';
import { FaUsers, FaMoneyBillWave, FaCommentAlt, FaTools } from 'react-icons/fa';


const BussinessSummary = () => {
    return (
        <div className='relative overflow-hidden'>
            <div className='summary-div p-5 py-20 w-full scale-105'>
                <p className="text-4xl font-semibold text-white text-center mt-[-5]" style={{ textShadow: '0 0 5px #84db6a' }}>Company Statistics</p>
                <p className='text-center text-xl font-mwduim md:font-semibold text-white mb-10 summary-text mt-2'>Our company statistics</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="summary flex flex-col items-center">
                        <FaUsers className='text-8xl text-success' />
                        <p className="text-2xl font-bold text-white summary-text">10000+ Customers</p>
                    </div>
                    <div className="summary flex flex-col items-center">
                        <FaMoneyBillWave className='text-8xl text-success' />
                        <p className="text-2xl font-bold text-white summary-text">120M+ Revenue</p>
                    </div>
                    <div className="summary flex flex-col items-center">
                        <FaCommentAlt className='text-8xl text-success' />
                        <p className="text-2xl font-bold text-white summary-text">33K+ Reviews</p>
                    </div>
                    <div className="summary flex flex-col items-center">
                        <FaTools className='text-8xl text-success' />
                        <p className="text-2xl font-bold text-white summary-text">50+ Tools</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default BussinessSummary;