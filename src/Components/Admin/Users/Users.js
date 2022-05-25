import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { URLS } from '../../../Constants/URLS';
import Loading from '../../Shared/Loading/Loading';
import UserRow from '../UserRow/UserRow';

const Users = () => {

    const { data: users, isLoading, refetch } = useQuery('users', () => fetch(`${URLS.serverRoot}/${URLS.getUsers}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    }).then(res => res.json()));

    if (isLoading) return <Loading />;

    if (!users.ok) {
        toast.error(`Error: ${users?.text}`);
        return;
    }

    return (
        <div>
            <h2 className="text-2xl text-center mt-5">All Users: {users.length}</h2>
            <div className="overflow-x-auto mx-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.users.map((user, i) => <UserRow
                                key={user._id}
                                user={user}
                                num={i}
                                refetch={refetch}
                            ></UserRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;