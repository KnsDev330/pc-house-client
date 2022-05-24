import React, { useEffect, useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../../firebase.init';
import { formatErrMsg } from '../../../Hooks/formatErrMsg';
import Loading from '../Loading/Loading';

import './ResetPassword.css';

const ResetPassword = () => {

    // react hook form
    const { register, handleSubmit, formState: { errors } } = useForm();

    // handle password reset
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
    const onSubmit = async (data) => {
        sendPasswordResetEmail(data.email);
    }

    // showing error if any
    useEffect(() => { error && toast.error(formatErrMsg(error)) }, [error]);

    // showing loading screen if registering
    const [showLoading, setShowLoading] = useState(false);
    useEffect(() => { setShowLoading(sending) }, [sending]);

    return (
        <div className='mx-auto w-[500px] max-w-full px-4 flex flex-col items-center grow-1'>
            <h2 className="text-2xl font-bold text-amber-400">Password Reset</h2>
            <small>Send a password reset confirmation email</small>
            <div className='bg-white border-2 rounded-xl flex flex-col items-center my-4 py-4 lg:py-8 px-4 w-full'>
                {
                    showLoading ? <Loading></Loading> : <>

                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-full'>

                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0"><span className="label-text">Email: </span></label>
                                <input type="text" placeholder="Enter You Email" className="input input-bordered w-full max-w-xs" {...register('email', { required: true, })} />
                                <label className="label pt-0">
                                    <span className="label-text-alt text-red-400">{errors.email && "Invalid Email Provided"}</span>
                                </label>
                            </div>
                            <input type="submit" value='Send' className='btn btn-primary my-4 px-8 text-white' />
                            <p>Back to <Link to='/login' className='text-blue-400'>Login</Link><br /></p>

                        </form>
                    </>
                }
            </div>
        </div>
    );
};

export default ResetPassword;