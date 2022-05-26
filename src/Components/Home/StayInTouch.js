import React from 'react';

import { FiPhoneCall } from 'react-icons/fi';
import { MdMarkEmailRead } from 'react-icons/md';
import { FaTelegram } from 'react-icons/fa';

const StayInTouch = () => {
    return (
        <div className='bg-white mx-auto min-h-[30vh] mt-[30vh] pb-20'>
            <div className='contact-us bg-white lg:flex p-5'>
                <div className='flex justify-center'>
                    <div className="bg-white mt-[-20vh] rounded-lg lg:w-[80%] shadow-xl lg:flex py-5 md:py-10 lg:py-20 lg:px-10">
                        <div className='p-5'>
                            <h1 className="text-4xl font-semibold pb-5">Get Every Updates!</h1>
                            <p className="text-xl font-mdeium text-gray-400">PcHouse, A Industry & Manufacturing Services Provider. Suitable For Factory, Manufacturing, Industry, Engineering, Construction And Any Related Industry Care Field.</p>
                            <hr className='my-5' />
                            <h2 className="text-2xl font-mdeium pb-5">Do You Have Any Questions!</h2>
                            <div className='flex gap-5'><FiPhoneCall className='text-orange-400 text-3xl' /> <strong className='text-md font-mdeium md:text-xl text-blue-500'>+8801742424242</strong></div>
                            <div className='flex gap-5'><MdMarkEmailRead className='text-orange-400 text-3xl' /> <strong className='text-md font-mdeium md:text-xl text-blue-500'>me@kns.dev</strong></div>
                            <div className='flex gap-5'><FaTelegram className='text-orange-400 text-3xl' />
                                <strong className='text-md font-mdeium md:text-xl text-blue-500'><a href='https://t.me/knsdev' target='blank'>Telegram</a></strong>
                            </div>
                        </div>
                        <div className='p-5'>
                            <input type="text" className='my-custom-input w-full md:w-[48%] m-[1%] border-2 border-gray-300 ' placeholder='Name' name='name' />
                            <input type="text" className='my-custom-input w-full md:w-[48%] m-[1%] border-2 border-gray-300 ' placeholder='Email' name='email' />
                            <input type="text" className='my-custom-input w-full md:w-[48%] m-[1%] border-2 border-gray-300 ' placeholder='Phone' name='phone' />
                            <input type="text" className='my-custom-input w-full md:w-[48%] m-[1%] border-2 border-gray-300 ' placeholder='Country' name='coutnry' />
                            <textarea type="text" className='my-custom-input h-[140px] w-full md:w-[98%] m-[1%] border-2 border-gray-300' placeholder='Message Details' />
                            <div className="flex justify-center"><button className='btn btn-success w-[50%] lg:w-auto m-3'>SUBMIT</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StayInTouch;