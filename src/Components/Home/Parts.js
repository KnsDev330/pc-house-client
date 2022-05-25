import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { URLS } from '../../Constants/URLS';

import { FaTags } from 'react-icons/fa';
import { GrCircleAlert } from 'react-icons/gr';
import { BsCheck2Circle } from 'react-icons/bs';
import { IoNewspaperOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';


const Parts = () => {
    // load items
    const [parts, setParts] = useState([]);
    useEffect(() => {
        axios.get(`${URLS.serverRoot}/${URLS.getParts}`)
            .then(res => {
                const { ok, text, parts: dbParts } = res.data;
                if (!ok) return toast.error(text);
                setParts(dbParts || []);
            })
            .catch(err => { console.log(err); toast.error(`Error: ${err?.response?.data?.text || err.message}`) })
    }, []);

    return (
        <div className='my-10 px-5'>
            <p className="text-4xl mb-5 font-s text-center">Order the part you need now</p>
            <div className="parts flex flex-wrap gap-5 justify-center">
                {parts.map(part => {
                    const { name, price, img, desc, minimum, available, id } = part;

                    return <div className="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img src={img} alt="Shoes" /></figure>
                        <div className="card-body gap-0">
                            <h2 className="card-title">{name}</h2>
                            <p className='flex items-center'><FaTags className='mr-2' /> Price: &nbsp; <span className="text-lg">{price.toLocaleString()} BDT</span> &nbsp; / unit</p>
                            <p className='flex items-center'><GrCircleAlert className='mr-2' /> Minimum: &nbsp; <span className="text-lg">{minimum} units</span></p>
                            <p className='flex items-center'><BsCheck2Circle className='mr-2' /> Available: &nbsp; <span className="text-lg">{available} units</span></p>
                            <p className='flex items-center'><IoNewspaperOutline className='mr-2' /> Description:</p><p><span className="text-sm">{desc}</span></p>
                            <Link to={`/purchase/${id}`} className="btn btn-primary mt-5">Buy Now</Link>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};

export default Parts;