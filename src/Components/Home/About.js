import React from 'react';

import { BsPatchCheckFill } from 'react-icons/bs'

const About = () => {
    return (
        <div className='bg-white'>
            <div className="hero py-10">
                <div className="hero-content flex-col lg:flex-row">
                    <img src='/img/about.jpg' className="max-w-[100%] md:max-w-[80%] lg:max-w-[40%] rounded-lg shadow-2xl" alt='computer' />
                    <div className='lg:px-[2%]'>
                        <h4 className="text-xl font-semibold text-orange-400">Welcome To The Best Computer Parts Manufacturer Around The World</h4>
                        <h1 className="text-4xl font-bold my-5">The Global Leader In Manufacturing Of Computer Components.</h1>
                        <p className='font-medium text-gray-500'>PC-HOUSE A Industry & Manufacturing Services Provider. Suitable For Factory, Manufacturing, Industry, Engineering, Construction And Any Related Industry Care Field.</p>

                        <p className="text-xl font-medium my-5">Providing Innovative Website Solution For Future</p>
                        <div className="features flex flex-col gap-1 mb-3">
                            <div className="feature flex items-center gap-2">
                                <BsPatchCheckFill className='text-green-600 text-2xl' /><span className='font-semibold text-gray-500'> We Use Qulity Manufacturing Materials</span>
                            </div>
                            <div className="feature flex items-center gap-2">
                                <BsPatchCheckFill className='text-green-600 text-2xl' /><span className='font-semibold text-gray-500'> PcHouse Provide Unique Technology</span>
                            </div>
                            <div className="feature flex items-center gap-2">
                                <BsPatchCheckFill className='text-green-600 text-2xl' /><span className='font-semibold text-gray-500'> Group Of Certified & Experienced Team</span>
                            </div>
                            <div className="feature flex items-center gap-2">
                                <BsPatchCheckFill className='text-green-600 text-2xl' /><span className='font-semibold text-gray-500'> The Best Services Of Computer Component</span>
                            </div>
                        </div>

                        <button className="btn border-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;