import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { URLS } from '../../../Constants/URLS';
import Loading from '../../Shared/Loading/Loading';
import { FiAlertTriangle } from 'react-icons/fi';

const ManageProducts = () => {
    const [showLoading, setShowLoading] = useState(false);
    const { data: parts, isLoading, refetch } = useQuery('parts', () => fetch(`${URLS.serverRoot}/${URLS.getParts}`).then(res => res.json()));

    // delete an unpaid order
    const [deleteId, setDeleteId] = useState('');
    const deleteProduct = () => {
        setShowLoading(true);
        axios.delete(`${URLS.serverRoot}/${URLS.deleteProduct}/${deleteId}`, { headers: { authorization: `Bearer ${localStorage.getItem('jwt')}` } })
            .then(data => {
                setShowLoading(false);
                const { ok, text, result } = data.data;
                if (!ok) return toast.warn(`Error: ${text}`);
                if (result.acknowledged && result.deletedCount > 0) {
                    refetch();
                    toast.success(`Success: ${text}`);
                }
            })
            .catch(err => { setShowLoading(false); toast.error(`Error: ${err?.response?.data?.text || err.message}`) })
    }

    if (isLoading) return <Loading />;
    if (!parts.ok) {
        toast.error(`Error: ${parts?.text}`);
        return;
    }

    return (
        <div className='my-10'>
            <h2 className="text-2xl text-center mt-5">AlL Products</h2>
            {
                showLoading ? <>
                    <Loading />
                </> : <>
                    <div className="overflow-x-auto mx-5">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th className='text-center'>No.</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    parts.parts.map(({ _id, img, name }, i) => <tr key={i}>
                                        <th className='text-center'>{i + 1}</th>
                                        <th><img src={`/${img}`} alt={`Product`} className='w-[60px]' /></th>
                                        <td>{name}</td>
                                        <td><label htmlFor="my-modal" className="btn btn-error btn-xs" onClick={() => setDeleteId(_id)}>Delete</label></td>
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
                                <p className='text-center'>Confirm product deletion</p>
                            </div>
                            <div className="modal-action">
                                <label htmlFor="my-modal" className="btn btn-error" onClick={deleteProduct}>Delete Product</label>
                                <label htmlFor="my-modal" className="btn btn-success" >Don't Delete</label>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default ManageProducts;