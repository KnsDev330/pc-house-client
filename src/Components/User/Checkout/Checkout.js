import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { URLS } from '../../../Constants/URLS';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../Shared/Loading/Loading';

const Checkout = ({ order, setSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    const { _id, name } = order;

    // get stripe intent
    useEffect(() => {
        axios.post(`${URLS.serverRoot}/${URLS.createPaymentIntent}`, { orderId: _id }, { headers: { 'authorization': `Bearer ${localStorage.getItem('jwt')}` } })
            .then(data => {
                const { ok, text, intent } = data.data;
                if (!ok) return toast.warn(`Error: ${text}`);
                setClientSecret(intent);
                console.log('intent', intent)
            })
            .catch(err => toast.error(`Error: ${err?.response?.data?.text || err.message}`));
    }, [_id])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;
        const card = elements.getElement(CardElement);
        if (card === null) return;

        const { error } = await stripe.createPaymentMethod({ type: 'card', card });

        setCardError(error?.message || '');
        setProcessing(true);
        console.log('sp', clientSecret, error)
        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: name
                },
            },
        });
        console.log('ie', intentError);
        if (intentError) {
            setCardError(intentError?.message);
            setProcessing(false);
        }
        else {
            setCardError('');
            setSuccess(paymentIntent.id);

            //store payment on database
            const payment = { orderId: _id, txid: paymentIntent.id }
            axios.patch(`${URLS.serverRoot}/${URLS.storePayment}`, { payment }, { headers: { 'authorization': `Bearer ${localStorage.getItem('jwt')}` } })
                .then(data => {
                    const { ok, text } = data.data;
                    if (!ok) return toast.warn(`Error: ${text}`);
                    setProcessing(false);
                    toast.success(`Success: ${text}`);
                })
                .catch(err => { toast.error(`Error: ${err?.response?.data?.text || err.message}`); setProcessing(false) })
        }
    }

    return (
        <>
            {
                processing ? <>
                    <Loading />
                </> : <>
                    <form onSubmit={handleSubmit}>
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                        <button className='btn btn-success btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret || processing}>
                            Pay
                        </button>
                    </form>
                    {cardError && <p className='text-red-500'>{cardError}</p>}
                </>
            }
        </>
    );
};

export default Checkout;