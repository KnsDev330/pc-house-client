import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';
import { format } from 'date-fns';
import axios from 'axios';
import { URLS } from '../../../Constants/URLS';
import { toast } from 'react-toastify';

const Reviews = () => {

    // load reviews
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios.get(`${URLS.serverRoot}/${URLS.getReviews}/all`)
            .then(data => {
                const { ok, text, reviews } = data.data;
                console.log(data.data)
                if (!ok) return toast.warn(`Error: ${text}`);
                setReviews(reviews);
            })
            .catch(err => toast.error(`Error: ${err?.response?.data?.text || err.message}`))
    })

    return (
        <div className='home-container my-20'>
            <div className="feedbacks-section mb-5 pb-5">
                <h3 className='text-center text-2xl font-bold text-orange-400'>Some Reviews</h3>
                <small className='block text-center mb-4'>You can see some reviews of our customers here</small>
                <div className="reviews bg-white p-8 flex flex-wrap gap-5 justify-center">
                    {
                        reviews.map(review => {
                            const { id, name, rating, time, text, img } = review;

                            return <div key={id} className='max-w-[400px] flex'>
                                <div className='comment shadow-sm flex flex-col mx-auto p-3 px-lg-5 border border-1 rounded rounded-5'>
                                    <div className="comment-up-section flex">
                                        <img src={img} alt="user avatar" className='rounded-full border-2 border-success w-[50px] h-[50px] mr-2' />
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