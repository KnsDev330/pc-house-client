import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

import './Purchase.css';

const Purchase = () => {
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // get item details

    const onSubmit = (data) => {
        console.log(data);
    }

    // showing loading screen if registering
    const [showLoading, setShowLoading] = useState(false);
    useEffect(() => { setShowLoading(false) }, []);

    return (
        <div className='mx-auto w-[500px] max-w-full px-4 my-5 flex flex-col items-center grow-1'>
            <h2 className="text-2xl font-bold text-amber-400">Purchase</h2>
            <small>You can Purchase a part from here</small>
            <div className='bg-white border-2 rounded-xl flex flex-col items-center my-4 py-4 lg:py-8 px-4 w-full'>
                {
                    showLoading ? <Loading></Loading> : <>

                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-full'>

                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0"><span className="label-text">Part: </span></label>
                                <input type="text" placeholder="Enter You Email" className="input input-bordered w-full max-w-xs" {...register('email', { required: true, })} disabled />
                                <label className="label pt-0">
                                    <span className="label-text-alt text-red-400">{errors.email && "Invalid Email Provided"}</span>
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0"><span className="label-text">Email: </span></label>
                                <input type="text" placeholder="Enter You Email" className="input input-bordered w-full max-w-xs" {...register('email', { required: true, })} />
                                <label className="label pt-0">
                                    <span className="label-text-alt text-red-400">{errors.email && "Invalid Email Provided"}</span>
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0"><span className="label-text">Password: </span></label>
                                <input type="text" placeholder="Enter You Password" className="input input-bordered w-full max-w-xs" {...register('password', { required: true, })} />
                                <label className="label pt-0">
                                    <span className="label-text-alt text-red-400">{errors.password && "Invalid Password Provided"}</span>
                                </label>
                            </div>
                            <input type="submit" value='Place Order' className='btn btn-primary my-4 px-8 text-white' />

                        </form>
                    </>
                }
            </div>
        </div>
    );
};

export default Purchase;