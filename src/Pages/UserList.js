import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function UserList(){

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:4200/api/getData');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching user list:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (userId) => {
        navigate(`/edit/${userId}`);
    }

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:4200/api/deleteUser/${userId}`, {
              method: 'DELETE',
            });
        
            if (response.ok) {
              console.log('User deleted successfully');
            } else {
              console.error('Error deleting user:', response.status);
            }
          } catch (error) {
            console.error('Error deleting user:', error);
          }
    }

    return (
        <div className="container mt-4">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td className='actions-column'>
                                <button
                                    className="btn btn-sm btn-primary mr-1"
                                    onClick={() => handleEdit(user._id)}
                                >
                                    <BsPencilSquare />
                                </button>
                                <button
                                    className="btn btn-sm btn-danger mx-1"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    <BsTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;