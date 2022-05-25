import React from 'react';
import { Link } from 'react-router-dom';

const MyOrdersRow = ({ num, order, setCancelId, refetch }) => {
    const { partName, _id, paid, txid } = order;

    return (<tr>
        <th>{num + 1}</th>
        <td>{partName.slice(0, 15)} ... {partName.slice(-15)}</td>
        <td>{paid ? <>Paid</> : <>
            <Link to={`/pay/${_id}`} className='btn btn-xs btn-success mr-1'>Pay</Link>
            <label htmlFor='my-modal' className='btn btn-xs btn-error' onClick={() => setCancelId(_id)}>Cancel</label>
        </>}</td>
        <td>{txid ? txid : `Not paid yet`}</td>
    </tr>);
};

export default MyOrdersRow;