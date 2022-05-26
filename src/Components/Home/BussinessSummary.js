import React from 'react';
import { FaUsers, FaMoneyBillWave, FaCommentAlt, FaTools } from 'react-icons/fa';


const BussinessSummary = () => {
    return (
        <div className='relative overflow-hidden'>
            <div className="blur bg-no-repeat bg-center w-full scale-105 relative">
                <div className='py-20 translate-y-full'>
                    <p className="text-4xl font-semibold text-white" style={{ textShadow: '0 0 5px #84db6a' }}>Some Statistics</p>
                    <div className="flex justify-center flex-wrap gap-10">
                        <div className="summary flex flex-col items-center">
                            <FaUsers className='text-8xl text-success' />
                            <p className="text-2xl font-bold text-white">10000+ Customers</p>
                        </div>
                        <div className="summary flex flex-col items-center">
                            <FaMoneyBillWave className='text-8xl text-success' />
                            <p className="text-2xl font-bold  text-white">120M+ Revenue</p>
                        </div>
                        <div className="summary flex flex-col items-center">
                            <FaCommentAlt className='text-8xl text-success' />
                            <p className="text-2xl font-bold text-white">33K+ Reviews</p>
                        </div>
                        <div className="summary flex flex-col items-center">
                            <FaTools className='text-8xl text-success' />
                            <p className="text-2xl font-bold text-white">50+ Tools</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='summary-div p-5 w-full scale-105'>
                <p className="text-4xl font-semibold text-white text-center mb-5 mt-[-5]" style={{ textShadow: '0 0 5px #84db6a' }}>Some Statistics</p>
                <div className="flex flex-wrap justify-center gap-10">
                    <div className="summary flex flex-col items-center">
                        <FaUsers className='text-8xl text-success' />
                        <p className="text-2xl font-bold text-white">10000+ Customers</p>
                    </div>
                    <div className="summary flex flex-col items-center">
                        <FaMoneyBillWave className='text-8xl text-success' />
                        <p className="text-2xl font-bold  text-white">120M+ Revenue</p>
                    </div>
                    <div className="summary flex flex-col items-center">
                        <FaCommentAlt className='text-8xl text-success' />
                        <p className="text-2xl font-bold text-white">33K+ Reviews</p>
                    </div>
                    <div className="summary flex flex-col items-center">
                        <FaTools className='text-8xl text-success' />
                        <p className="text-2xl font-bold text-white">50+ Tools</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default BussinessSummary;