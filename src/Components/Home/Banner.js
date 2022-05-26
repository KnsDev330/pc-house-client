import React from 'react';

const Banner = () => {
    return (
        <div className='home-banner w-full h-[calc(100vh-64px)]'>
            <div className='h-[calc(100vh-64px)] px-[10%] flex flex-col justify-center pb-[10%]'>
                <div className='w-[800px] max-w-[90%]'>
                    <p className="font-bold text-white text-lg">Ready to Make your Dream</p>
                    <h1 className="text-4xl md:text-7xl font-semibold text-white my-5">The Best Solution for PC Components</h1>
                    <p className="font-semibold text-white text-lg">
                        Buying from PC-HOUSE guarantees you will get quality products, know more about us in the about section below
                    </p>
                    <button className='btn my-btn border-0 my-5 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500'>About Us</button>
                </div>

            </div>
        </div>
    );
};

export default Banner;