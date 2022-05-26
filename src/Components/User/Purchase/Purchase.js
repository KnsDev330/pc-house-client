import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URLS } from '../../../Constants/URLS';
import { auth } from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import OrderPlaced from '../OrderPlaced/OrderPlaced';


const Purchase = () => {

    const [user] = useAuthState(auth);
    const { id } = useParams();

    // showing loading screen if 
    const [showLoading, setShowLoading] = useState(true);

    // get part details
    const [part, setPart] = useState({});
    useEffect(() => {
        axios.get(`${URLS.serverRoot}/${URLS.getPart}/${id}`)
            .then(res => {
                const { ok, text, part } = res.data;
                if (!ok) return toast.error(text);
                setPart(part);
                setShowLoading(false);
            })
            .catch(err => toast.error(`Error: ${err?.response?.data?.text || err.message}`))
    }, [id]);

    // order placed page
    const [placed, setPlaced] = useState(false);

    const placeOrder = e => {
        setShowLoading(true);
        e.preventDefault();
        const data = {};
        const elements = e.target.elements;
        for (const elem of elements) {
            data[elem.name] = elem.value;
        }
        console.log(data)
        axios.post(`${URLS.serverRoot}/${URLS.placeOrder}`, { data }, { headers: { authorization: `Bearer ${localStorage.getItem('jwt')}` } })
            .then(data => {
                setShowLoading(false);
                const { ok, text, result } = data?.data;
                if (!ok) return toast.warn(`Error: ${text}`);
                if (result?.acknowledged && result?.insertedId?.length > 5) {
                    toast.success(`Success: ${text}`);
                    setPlaced(true);
                }
            })
            .catch(err => { setShowLoading(false); toast.error(`Error: ${err?.response?.data?.text || err.message}`); })
    }


    // set /show form errors
    const [err, setErr] = useState({});
    const changed = e => {
        // console.log(e.target.name, e.target.value)
        const target = e.target.name;
        const value = e.target.value;
        if (target === 'quantity') {
            if (value < part.minimum) setErr({ quantity: `Minimum order quantity: ${part.minimum}` });
            else if (value > part.available) setErr({ quantity: `Maximum order quantity: ${part.available}` });
            else setErr({});
        }
    }


    if (placed) return <OrderPlaced />;



    return (
        <div className='mx-auto w-[500px] max-w-full px-4 my-5 flex flex-col items-center grow-1'>
            <h2 className="text-2xl font-bold text-amber-400">Purchase</h2>
            <small>You can Purchase a part from here</small>
            <div className='bg-white border-2 rounded-xl flex flex-col items-center my-4 py-4 lg:py-8 px-4 w-full'>
                {
                    showLoading ? <Loading /> : <>

                        <form onSubmit={placeOrder} onChange={changed} className='flex flex-col items-center w-full'>

                            <img src={`/${part.img}`} alt={part.name} />

                            <input type="hidden" defaultValue={part.id} name='partId' className="input input-bordered w-full max-w-xs" disabled />

                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Part: </span></label>
                                <input type="text" defaultValue={part.name} name='partName' className="input input-bordered w-full max-w-xs" disabled />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Name: </span></label>
                                <input type="text" defaultValue={user.displayName} name='name' className="input input-bordered w-full max-w-xs" disabled />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Email: </span></label>
                                <input type="text" defaultValue={user.email} className="input input-bordered w-full max-w-xs" name='email' disabled />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Phone: </span></label>
                                <input type="text" placeholder="01xxx-xxxxxx" className="input input-bordered w-full max-w-xs" name='phone' required />
                                <label className="label pt-0">
                                    <span className="label-text-alt text-red-400">{err.phone && err.phone}</span>
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0"><span className="label-text">Address: </span></label>
                                <input type="text" placeholder="Enter your address" className="input input-bordered w-full max-w-xs" name='address' required />
                                <label className="label py-0 pb-2">
                                    <span className="label-text-alt text-red-400">{err.address && err.address}</span>
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0"><span className="label-text">Quantity: </span></label>
                                <input type="number" name='quantity' defaultValue={part.minimum} placeholder="Enter the purchase quantity" className="input input-bordered w-full max-w-xs" required />
                                <label className="label py-0 pb-2">
                                    <span className="label-text-alt text-red-400">
                                        {err.quantity && err.quantity}
                                    </span>
                                </label>
                            </div>
                            <input type="submit" value='Place Order' name='submit' disabled={!!err.quantity} className='btn btn-primary my-4 px-8 text-white' />

                        </form>
                    </>
                }
            </div>
        </div>
    );
};

export default Purchase;