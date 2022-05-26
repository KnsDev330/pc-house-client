import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div className='flex m-10 justify-center items-center w-full'>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    );
};

export default Loading;