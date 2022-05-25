import axios from 'axios';
import { itMatchesOne } from 'daisyui/src/lib/postcss-prefixer/utils';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URLS } from '../../../Constants/URLS';
import { auth } from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

import './Purchase.css';

const Purchase = () => {

    const [user] = useAuthState(auth);
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // get part details
    const [part, setPart] = useState({});
    useEffect(() => {
        axios.get(`${URLS.serverRoot}/${URLS.getPart}/${id}`)
            .then(res => {
                const { ok, text, part } = res.data;
                if (!ok) return toast.error(text);
                setPart(part);
            })
            .catch(err => toast.error(`Error: ${err?.response?.data?.text || err.message}`))
    }, [id]);

    useEffect(() => console.log('part', user), [user]);

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

                            <img src={`/${part.img}`} alt={part.name} />

                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Part: </span></label>
                                <input type="text" defaultValue={part.name} className="input input-bordered w-full max-w-xs" {...register('partName', { required: true, })} disabled />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Name: </span></label>
                                <input type="text" defaultValue={user.displayName} className="input input-bordered w-full max-w-xs" {...register('name', { required: true, })} disabled />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Email: </span></label>
                                <input type="text" defaultValue={user.email} className="input input-bordered w-full max-w-xs" {...register('email', { required: true, })} disabled />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Phone: </span></label>
                                <input type="text" placeholder="01xxx-xxxxxx" className="input input-bordered w-full max-w-xs" {...register('phone', { required: true, minLength: 11 })} />
                                <label className="label pt-0">
                                    <span className="label-text-alt text-red-400">{errors.phone && "Invalid Phone Provided"}</span>
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0"><span className="label-text">Address: </span></label>
                                <input type="text" placeholder="Enter your address" className="input input-bordered w-full max-w-xs" {...register('address', { required: true })} />
                                <label className="label py-0 pb-2">
                                    <span className="label-text-alt text-red-400">{errors.address && "Invalid Phone Provided"}</span>
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0"><span className="label-text">Amount: </span></label>
                                <input type="text" placeholder="Enter the purchase amount" className="input input-bordered w-full max-w-xs" {...register('password', { required: true, })} />
                                <label className="label py-0 pb-2">
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