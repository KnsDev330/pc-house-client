import React from 'react';
import { toast } from 'react-toastify';
import { URLS } from '../../../Constants/URLS';

const UserRow = ({ num, user, refetch }) => {
    const { uid, email, role, name } = user;

    const makeAdmin = () => fetch(`${URLS.serverRoot}/${URLS.makeAdmin}/${uid}`, {
        method: 'PUT',
        headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(res => res.json())
        .then(data => {
            if (!data.ok) return toast.warn(`Error: ${data.text}`);
            if (data.result.modifiedCount > 0) {
                refetch();
                toast.success(`Successfully made an admin`);
            }
        });


    return (
        <tr>
            <th>{num + 1}</th>
            <td>{name || <small>Unknown</small>}</td>
            <td>{email}</td>
            <td>{role !== 'admin' ? <button onClick={makeAdmin} className="btn btn-xs">Make Admin</button> : `True`}</td>
        </tr>
    );
};

export default UserRow;