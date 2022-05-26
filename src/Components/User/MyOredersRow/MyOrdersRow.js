import React from 'react';
import { Link } from 'react-router-dom';

const MyOrdersRow = ({ num, order, setCancelId }) => {
    const { partName, _id, paid, txid, status } = order;

    return (<tr>
        <th className='text-center'>{num + 1}</th>
        <td title={partName}>{partName.slice(0, 15)} ... {partName.slice(-15)}</td>
        <td>{paid ? <>Paid</> : <>
            <Link to={`/dashboard/pay/${_id}`} className='btn btn-xs btn-success mr-1'>Pay</Link>
            <label htmlFor='my-modal' className='btn btn-xs btn-error' onClick={() => setCancelId(_id)}>Cancel</label>
        </>}</td>
        <td>{txid ? txid : `Not paid yet`}</td>
        <td>{status === 'shipped' ? <p className='text-green-400'>Yes</p> : <small className='text-red-500'>No</small>}</td>
    </tr>);
};

export default MyOrdersRow;