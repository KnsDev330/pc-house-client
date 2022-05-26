import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URLS } from '../../../Constants/URLS';
import Loading from '../../Shared/Loading/Loading';
import Checkout from '../Checkout/Checkout';
import Paid from '../Paid/Paid';


const stripePromise = loadStripe('pk_test_51L3jhFHWGjnaSr7N6YtTnaWvkUVAZMi0SGkMpyrobS0hq6pJwo9YJGKyfzQ2HGfgf2ugs3lDwlxfVm8vh5JT2CMu00j9od8zFj');

const Pay = () => {
    const { orderid } = useParams();
    const [success, setSuccess] = useState('');

    // load order details
    const { data: order, isLoading } = useQuery(['order', orderid], () => fetch(`${URLS.serverRoot}/${URLS.getOrder}/${orderid}`, {
        method: 'GET',
        headers: { 'authorization': `Bearer ${localStorage.getItem('jwt')}` }
    }).then(res => res.json()));


    if (isLoading || !order) return <Loading />
    if (success) return <Paid txid={success} />
    if (!order.ok) { toast.warn(`Error: ${order.text}`); return }

    return (
        <div className='px-5'>
            <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12">
                <div className="card-body">
                    <p className="text-success font-bold">Hello, {order.order?.name}</p>
                    <h2 className="text-xl">Pay for: <span className="text-2xl text-pink-500">{order.order.partName}</span></h2>
                    <p>Please pay: <strong>${(order.order.unitPrice * order.order.quantity).toLocaleString()}</strong></p>
                </div>
            </div>
            <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <Checkout order={order.order} setSuccess={setSuccess} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Pay;