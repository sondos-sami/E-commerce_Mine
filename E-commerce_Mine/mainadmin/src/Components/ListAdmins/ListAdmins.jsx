import React, { useEffect, useState } from 'react';
import './ListAdmins.css';

const ListAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAdmins = async () => {
            const response = await fetch("http://localhost:4000/listadmins");
            const data = await response.json();
            setAdmins(data);
        };

        fetchAdmins();
    }, []);

    const handleDelete = async (email) => {
        if (window.confirm("Are you sure you want to delete this admin?")) {
            const response = await fetch("http://localhost:4000/deleteadmin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    requestingAdminEmail: localStorage.getItem("requestingAdminEmail"), 
                }),
            });

            const data = await response.json();
            if (data.success) {
                alert(data.message);
                setAdmins(prevAdmins => prevAdmins.filter(admin => admin.email !== email));
            } else {
                setError(data.message);
            }
        }
    };

    return (
        <div className='list-admins'>
            <h2>Admin List</h2>
            {error && <p className="error">{error}</p>}
            <ul>
                {admins.map(admin => (
                    <li key={admin.email}>
                        {admin.name} - {admin.email}
                        <button onClick={() => handleDelete(admin.email)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListAdmins;