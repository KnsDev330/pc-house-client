import React from 'react';

import { FcBrokenLink } from 'react-icons/fc';

const NotFound = () => {
    return (
        <div className='px-5 py-10 mt-10 flex flex-col items-center'>
            Not Found
            <div className="bg-white rounded-lg shadow-lg p-10 my-10 max-w-[100%] flex flex-col items-center w-[400px] max-w-[90%]">
                <FcBrokenLink className='text-9xl max-w-[90%]' />
                <div className="error-message">
                    <strong>404</strong>. <span className="opacity-80">That's an error.</span><br />
                    Your requested resource could not be found on our server.<br />
                    It may have been deleted or never existed. <span className="opacity-80">That's all we know.</span>
                </div>
            </div>
        </div>
    );
};

export default NotFound;