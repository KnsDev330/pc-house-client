import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { format } from 'date-fns';
import axios from 'axios';
import { URLS } from '../../../Constants/URLS';
import { toast } from 'react-toastify';
import Rating from 'react-rating';

const Reviews = () => {

    // load reviews
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios.get(`${URLS.serverRoot}/${URLS.getReviews}/all`)
            .then(data => {
                const { ok, text, reviews } = data.data;
                if (!ok) return toast.warn(`Error: ${text}`);
                setReviews(reviews);
            })
            .catch(err => toast.error(`Error: ${err?.response?.data?.text || err.message}`))
    }, [])

    return (
        <div className='home-container my-10 py-10'>
            <div className="feedbacks-section mb-5 pb-5">
                <h3 className='text-center text-2xl font-bold text-orange-400'>Some Reviews</h3>
                <small className='block text-center mb-4'>You can see some reviews of our customers here</small>
                <div className="reviews  flex flex-wrap gap-5 justify-center mt-8">
                    {
                        reviews.map(review => {
                            const { _id, name, rating, time, text, img } = review;

                            return <div key={_id} className='w-[360px] max-w-[90%] flex bg-white'>
                                <div className='comment hover:shadow-xl transition duration-500 shadow-sm flex flex-col mx-auto p-3 px-lg-5 border border-1 rounded rounded-5 w-full'>
                                    <div className="comment-up-section flex">
                                        <img src={img} alt="avatar" className='rounded-full border-2 border-success w-[50px] h-[50px] mr-2' />
                                        <div className="flex justify-between items-center grow">
                                            <div className="flex flex-col ms-3">
                                                <div className="">{name}</div>
                                                <Rating
                                                    initialRating={rating}
                                                    emptySymbol={<FaStar style={{ color: '#ccc' }} />}
                                                    fullSymbol={<FaStar style={{ color: 'green' }} />}
                                                    readonly
                                                ></Rating>
                                            </div>
                                            <div className="comment-time" style={{ color: '#aaa' }}>
                                                {format(new Date(time * 1000), 'dd MMM, yyyy')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comment-body mt-3" style={{ textTransform: 'capitalize', color: '#818181' }}>
                                        {text}
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div >
    );
};

export default Reviews;