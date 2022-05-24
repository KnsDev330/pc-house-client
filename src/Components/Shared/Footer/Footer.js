import React from 'react';
import { Link } from 'react-router-dom';

import twitter from '../../../images/social/twitter.svg';
import telegram from '../../../images/social/telegram.svg';
import facebook from '../../../images/social/facebook.svg';

import './Footer.css';

const Footer = () => {
    return (
        <footer className='mt-auto pb-8 px-8 bg-white'>
            <div className="links block flex flex-wrap gap-10 items-center justify-around my-8">
                <div className='flex flex-col items-start py-2'>
                    <h4 className="text-xl text-gray-500 font-semibold pb-2">Socials</h4>
                    <Link to='/' className='text-blue-500 flex justify-center'><img src={twitter} alt="" className='w-[20px] mr-1' /> Twitter</Link>
                    <Link to='/' className='text-blue-500 flex justify-center'><img src={telegram} alt="" className='w-[20px] mr-1' /> Telegram</Link>
                    <Link to='/' className='text-blue-500 flex justify-center'><img src={facebook} alt="" className='w-[20px] mr-1' /> Facebook</Link>
                </div>
                <div className='flex flex-col items-start py-2'>
                    <h4 className="text-xl text-gray-500 font-semibold pb-2">Company</h4>
                    <Link to='/' className='text-blue-500'>About</Link>
                    <Link to='/blogs' className='text-blue-500'>Blogs</Link>
                    <Link to='/' className='text-blue-500'>Contact</Link>
                </div>
                <div className='flex flex-col items-start py-2'>
                    <h4 className="text-xl text-gray-500 font-semibold pb-2">Terms & Policies</h4>
                    <Link to='/' className='text-blue-500'>Policies</Link>
                    <Link to='/' className='text-blue-500'>Terms of Use</Link>
                    <Link to='/' className='text-blue-500'>Privacy</Link>
                </div>
            </div>
            <div className="copyright text-center text-gray-500">
                2022 &copy; All Rights Reserved by PC HOUSE
            </div>
        </footer>
    );
};

export default Footer;