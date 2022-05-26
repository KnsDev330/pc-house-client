import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { URLS } from '../../../Constants/URLS';
import { auth } from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';


const MyProfile = () => {

    // loadings
    const [user, loading] = useAuthState(auth);
    const [showLoading, setShowLoading] = useState(true);

    // get part details
    const [profile, setProfile] = useState({});
    useEffect(() => {
        if (!user) return;
        axios.get(`${URLS.serverRoot}/${URLS.profile}`, { headers: { authorization: `Bearer ${localStorage.getItem('jwt')}` } })
            .then(res => {
                const { ok, text, profile } = res.data;
                if (!ok) return toast.error(text);
                setProfile(profile);
                setShowLoading(false);
            })
            .catch(err => toast.error(`Error: ${err?.response?.data?.text || err.message}`))
    }, [user]);

    // set /show form errors
    const [err, setErr] = useState({ isErr: true });
    const changed = e => {
        const value = e.target.value;
        const name = e.target.name;
        const minLength = e.target.minLength;
        setErr({ isErr: false })
        if ((value.length < minLength) && (value.length !== 0)) {
            const newErr = { isErr: true };
            newErr[name] = `Invalid ${name} value`;
            setErr(newErr);
        }
    }

    // set / update profile
    const updateProfile = e => {
        e.preventDefault();
        const data = { uid: user.uid }, elements = e.target.elements;
        for (const elem of elements) { elem.name !== 'update' && (data[elem.name] = elem.value); }
        axios.patch(`${URLS.serverRoot}/${URLS.profile}`, { data }, { headers: { authorization: `Bearer ${localStorage.getItem('jwt')}` } })
            .then(data => {
                const { ok, text, update } = data?.data;
                if (!ok) return toast.warn(`Error: ${text}`);
                if (update?.acknowledged && update?.modifiedCount > 0) toast.success(`Success: ${text}`);
                setErr({ isErr: true })
            })
            .catch(err => toast.error(`Error: ${err?.response?.data?.text || err.message}`))
    }


    if (loading) return <Loading />;

    return (
        <div className='mx-auto w-[500px] max-w-full px-4 my-5 flex flex-col items-center grow-1'>
            <h2 className="text-2xl font-bold text-amber-400">Profile</h2>
            <small>You can view /or update your peofile information here</small>
            <div className='bg-white border-2 rounded-xl flex flex-col items-center my-4 py-4 lg:py-8 px-4 w-full'>
                {
                    showLoading ? <Loading></Loading> : <>

                        <form onChange={changed} onSubmit={updateProfile} className='flex flex-col items-center w-full'>

                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Name: </span></label>
                                <input type="text" defaultValue={user.displayName} name='name' className="input input-bordered w-full max-w-xs" disabled />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Email: </span></label>
                                <input type="text" defaultValue={user.email} className="input input-bordered w-full max-w-xs" name='email' disabled />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Education: </span></label>
                                <input type="text" defaultValue={profile.education} placeholder="Enter your education" className="input input-bordered w-full max-w-xs" name='education' minLength='3' />
                                <label className="label pt-0">
                                    <span className="label-text-alt text-red-400">{err.education && err.education}</span>
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Phone: </span></label>
                                <input type="text" defaultValue={profile.phone} placeholder="01xxx-xxxxxx" className="input input-bordered w-full max-w-xs" name='phone' minLength='10' />
                                <label className="label pt-0">
                                    <span className="label-text-alt text-red-400">{err.phone && err.phone}</span>
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0"><span className="label-text">City: </span></label>
                                <input type="text" defaultValue={profile.city} placeholder="Enter your city" className="input input-bordered w-full max-w-xs" name='city' minLength='3' />
                                <label className="label py-0 pb-2">
                                    <span className="label-text-alt text-red-400">{err.city && err.city}</span>
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0"><span className="label-text">Linked In Profile: </span></label>
                                <input type="text" defaultValue={profile.linkedin} placeholder="Enter your city Linked In Profile url" className="input input-bordered w-full max-w-xs" name='linkedin' minLength="4" />
                                <label className="label py-0 pb-2">
                                    <span className="label-text-alt text-red-400">{err.linkedin && err.linkedin}</span>
                                </label>
                            </div>
                            <input type="submit" value='UPDATE' name='update' disabled={err.isErr} className='btn btn-primary my-4 px-8 text-white' />

                        </form>
                    </>
                }
            </div>
        </div>
    );
};

export default MyProfile;