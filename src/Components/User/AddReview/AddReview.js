import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Rating from 'react-rating';
import { toast } from 'react-toastify';
import { URLS } from '../../../Constants/URLS';
import { auth } from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import { FaStar } from 'react-icons/fa';


const AddReview = () => {

    // loadings
    const [user, loading] = useAuthState(auth);
    const [showLoading, setShowLoading] = useState(false);

    // set /show form errors
    const [err, setErr] = useState({ isErr: true });
    const changed = e => {
        console.log(e)
        const value = e.target.value;
        const name = e.target.name;
        const minLength = e.target.minLength;
        setErr({ isErr: false })
        if ((value.length < minLength) && (value.length !== 0)) {
            const newErr = { isErr: true };
            newErr[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} must at least ${minLength} characters`;
            setErr(newErr);
        }
    }

    // add review
    const addReview = e => {
        e.preventDefault();
        const data = {}, elements = e.target.elements;
        for (const elem of elements) { elem.name !== 'update' && (data[elem.name] = elem.value); }
        data.text = data.review;
        delete data.review;
        console.log(data);
        setShowLoading(true);
        axios.post(`${URLS.serverRoot}/${URLS.addReview}`, { data }, { headers: { authorization: `Bearer ${localStorage.getItem('jwt')}` } })
            .then(data => {
                console.log(data.data)
                const { ok, text, result } = data?.data;
                if (!ok) return toast.warn(`Error: ${text}`);
                if (result?.acknowledged && result?.insertedId) toast.success(`Success: ${text}`);
                e.target.review.value = '';
                setShowLoading(false);
                setErr({ isErr: true });
            })
            .catch(err => { setShowLoading(false); toast.error(`Error: ${err?.response?.data?.text || err.message}`); })
    }

    if (loading) return <Loading />;

    return (
        <div className='mx-auto w-[500px] max-w-full px-4 my-5 flex flex-col items-center grow-1'>
            <h2 className="text-2xl font-bold text-amber-400">Add Review</h2>
            <small>You can add a review from this page</small>
            <div className='bg-white border-2 rounded-xl flex flex-col items-center my-4 py-4 lg:py-8 px-4 w-full'>
                {
                    showLoading ? <Loading></Loading> : <>

                        <form onChange={changed} onSubmit={addReview} className='flex flex-col items-center w-full'>

                            <input type="hidden" name="rating" defaultValue={5} />
                            <input type="hidden" name="img" defaultValue={user.photoURL || '/img/avatars/0.jpg'} />
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Rating: </span></label>
                                <Rating initialRating={5} emptySymbol={<FaStar className='text-3xl text-gray-500' />} fullSymbol={<FaStar className='text-3xl text-green-500' />} onChange={(v) => { document.querySelector("input[name='rating']").value = Number(v) }} />
                                <label className="label pt-0"><span className="label-text-alt text-red-400">{err.rating && err.rating}</span></label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Review: </span></label>
                                <textarea type="text" placeholder="Enter your review here" className="input input-bordered w-full max-w-xs" name='review' minLength='10' required />
                                <label className="label pt-0"><span className="label-text-alt text-red-400">{err.review && err.review}</span></label>
                            </div>

                            <input type="submit" value='SUBMIT' name='update' disabled={err.isErr} className='btn btn-primary my-4 px-8 text-white' />

                        </form>
                    </>
                }
            </div>
        </div>
    );
};

export default AddReview;