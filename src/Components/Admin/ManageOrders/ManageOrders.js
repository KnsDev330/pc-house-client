import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { URLS } from '../../../Constants/URLS';
import Loading from '../../Shared/Loading/Loading';
import { FiAlertTriangle } from 'react-icons/fi';

const ManageOrders = () => {
    const [showLoading, setShowLoading] = useState(false);

    const { data: orders, isLoading, refetch } = useQuery(['users', 'shipped'], () => fetch(`${URLS.serverRoot}/${URLS.getAllOrders}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    }).then(res => res.json()));


    // status: shipped
    const shipped = orderId => {
        setShowLoading(true);
        axios.patch(`${URLS.serverRoot}/${URLS.orderShipped}`, { orderId }, { headers: { authorization: `Bearer ${localStorage.getItem('jwt')}` } })
            .then(data => {
                setShowLoading(false);
                console.log(data.data.update)
                const { ok, text, update } = data.data;
                console.log(data.data, update)
                if (!ok) return toast.warn(`Error: ${text}`);
                refetch();
                if (update.modifiedCount > 1) toast.success(`Success: ${text}`);
            })
            .catch(err => { setShowLoading(false); toast.error(`Error: ${err?.response?.data?.text || err.message}`) })
    }


    // delete an unpaid order
    const [deleteId, setDeleteId] = useState('');
    const deleteOrder = () => axios.delete(`${URLS.serverRoot}/${URLS.deleteOrder}/${deleteId}`, { headers: { authorization: `Bearer ${localStorage.getItem('jwt')}` } })
        .then(data => {
            const { ok, text, result } = data.data;
            console.log(data.data)
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
            {
                showLoading ? <>
                    <Loading />
                </> : <>
                    <div className="overflow-x-auto mx-5">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>User</th>
                                    <th>Part</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.orders.map(({ partName, status, _id, email, paid }, i) => <tr>
                                        <th>{i + 1}</th>
                                        <th>{email}</th>
                                        <td title={partName}>{partName.slice(0, 15)} ... {partName.slice(-15)}</td>
                                        <td>{
                                            paid ? <>
                                                {status !== 'shipped' ? <>Pending <button className='btn btn-success btn-sm ml-1' onClick={() => shipped(_id)}>Ship</button></> : <span className='text-green-500'>Shipped</span>}
                                            </> : <span className='text-red-300'>
                                                Not Paid <label htmlFor="my-modal" className="btn btn-error btn-xs" onClick={() => setDeleteId(_id)}>Delete</label>
                                            </span>
                                        }</td>
                                    </tr>)
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
                                <p className='text-center'>Confirm order deletion</p>
                            </div>
                            <div className="modal-action">
                                <label htmlFor="my-modal" className="btn btn-error" onClick={deleteOrder}>Delete Order</label>
                                <label htmlFor="my-modal" className="btn btn-success" >Don't Delete</label>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default ManageOrders;