import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { URLS } from '../../../Constants/URLS';
import Loading from '../../Shared/Loading/Loading';
import MyOrdersRow from '../MyOredersRow/MyOrdersRow';
import { FiAlertTriangle } from 'react-icons/fi';
import axios from 'axios';


const MyOrders = () => {

    const { data: orders, isLoading, refetch } = useQuery('users', () => fetch(`${URLS.serverRoot}/${URLS.getMyOrders}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    }).then(res => res.json()));


    // cancel an order
    const [cancelId, setCancelId] = useState('');
    const cancelOrder = productId => axios.delete(`${URLS.serverRoot}/${URLS.cancelOrder}/${cancelId}`, { headers: { authorization: `Bearer ${localStorage.getItem('jwt')}` } })
        .then(data => {
            const { ok, text, result } = data.data;
            if (!ok) return toast.warn(`Error: ${text}`);
            if (result.acknowledged && result.deletedCount > 0) {
                refetch();
                toast.success(`Success: ${text}`);
            }
        })
        .catch(err => toast.error(`Error: ${err?.response?.data?.text || err.message}`))

    if (isLoading) return <Loading />;
    if (!orders.ok) {
        toast.error(`Error: ${orders?.text}`);
        return;
    }

    return (
        <div>
            <h2 className="text-2xl text-center mt-5">All Orders</h2>
            <div className="overflow-x-auto mx-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>No.</th>
                            <th>Part</th>
                            <th>Status</th>
                            <th>TxID</th>
                            <th>Shipped</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.orders.map((order, i) => <MyOrdersRow
                                key={i}
                                order={order}
                                num={i}
                                refetch={refetch}
                                setCancelId={setCancelId}
                            ></MyOrdersRow>)
                        }
                    </tbody>
                </table>
            </div>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <div className='bg-white rounded-xl flex flex-col items-center my-4 py-4 lg:py-8 px-4 w-full'>
                        <FiAlertTriangle className='text-8xl text-red-400' />
                        <h3 className="text-4xl my-4">Confirm</h3>
                        <p className='text-center'>Confirm your order cancellation</p>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn btn-error" onClick={cancelOrder}>Cancel Order</label>
                        <label htmlFor="my-modal" className="btn btn-success" >Keep Order</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrders;