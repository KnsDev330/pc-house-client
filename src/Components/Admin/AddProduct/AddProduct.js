import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { URLS } from '../../../Constants/URLS';
import Loading from '../../Shared/Loading/Loading';


const AddProduct = () => {

    // loadings
    const [showLoading, setShowLoading] = useState(false);

    // load fake data
    const [fake, setFake] = useState({});
    const loadFake = () => {
        axios.get(`${URLS.serverRoot}/${URLS.demoProduct}`, { headers: { authorization: `Bearer ${localStorage.getItem('jwt')}` } })
            .then(data => {
                const { ok, text, demo } = data?.data;
                if (!ok) return toast.warn(`Error: ${text}`);
                if (demo) {
                    toast(`Loaded boss!! 👻`);
                    setFake(demo);
                }
            })
            .catch(err => toast.error(`Error: ${err?.response?.data?.text || err.message}`))
    }
    useEffect(() => {
        console.log(fake);
    }, [fake])



    // add new product
    const addProduct = e => {
        e.preventDefault();
        const data = {}, elements = e.target.elements;
        for (const elem of elements) { elem.name !== 'submit' && (data[elem.name] = elem.value); }
        setShowLoading(true);
        axios.post(`${URLS.serverRoot}/${URLS.addProduct}`, { data }, { headers: { authorization: `Bearer ${localStorage.getItem('jwt')}` } })
            .then(data => {
                const { ok, text, result } = data?.data;
                if (!ok) return toast.warn(`Error: ${text}`);
                if (result?.acknowledged && result?.insertedId) toast.success(`Success: ${text}`);
                setFake({});
                setShowLoading(false);
            })
            .catch(err => { setShowLoading(false); toast.error(`Error: ${err?.response?.data?.text || err.message}`); })
    }

    return (
        <div className='mx-auto w-[500px] max-w-full px-4 my-10 flex flex-col items-center grow-1'>
            <h2 className="text-2xl font-bold text-amber-400">Add New Product</h2>
            <small>Admins can add new products from here</small>
            <div className='bg-white border-2 rounded-xl flex flex-col items-center my-4 py-4 lg:py-8 px-4 w-full'>
                {
                    showLoading ? <Loading></Loading> : <>

                        <form onSubmit={addProduct} className='flex flex-col items-center w-full'>
                            <span>{fake?.name}</span>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Name: </span></label>
                                <input defaultValue={fake?.name} placeholder="Enter Product Name" className="input input-bordered w-full max-w-xs" name='name' required />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Image: </span></label>
                                <input defaultValue={fake?.img} placeholder="Enter Product image url" className="input input-bordered w-full max-w-xs" name='img' required />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Price: </span></label>
                                <input defaultValue={fake?.price} type="number" placeholder="Enter price" className="input input-bordered w-full max-w-xs" name='price' required />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Minimum: </span></label>
                                <input defaultValue={fake?.minimum} type="number" placeholder="Enter Minimum" className="input input-bordered w-full max-w-xs" name='minimum' required />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Available: </span></label>
                                <input defaultValue={fake?.available} type="number" placeholder="Enter Available" className="input input-bordered w-full max-w-xs" name='available' required />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0 pt-2"><span className="label-text">Description: </span></label>
                                <textarea defaultValue={fake?.desc} placeholder="Enter Description" className="input input-bordered w-full max-w-xs" name='desc' required />
                            </div>

                            <input type="submit" value='SUBMIT' name='submit' className='btn btn-primary my-4 px-8 text-white' />
                        </form>
                        {/* demo data load */}
                        <button className="btn btn-active btn-ghost" onClick={loadFake}>Load Demo</button>
                    </>
                }
            </div>
        </div>
    );
};

export default AddProduct;