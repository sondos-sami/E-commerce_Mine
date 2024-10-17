import React, { useState } from 'react';
import './AddAdmin.css';

const AddAdmin = () => {
    const [adminName, setAdminName] = useState('');
    const [adminEmail, setAdminEmail] = useState('');
    const [error, setError] = useState('');

    const addAdmin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        const response = await fetch("http://localhost:4000/addadmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: adminName,
                email: adminEmail,
                requestingAdminEmail: localStorage.getItem("requestingAdminEmail"),
            }),
        });

        const data = await response.json();
        if (data.success) {
            alert(data.message);
            setAdminName('');
            setAdminEmail('');
        } else {
            setError(data.message);
        }
    };

    return (
        <div className='add-admin'>
            <h2>Add Admin</h2>
            <form onSubmit={addAdmin}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Add Admin</button>
            </form>
        </div>
    );
};

export default AddAdmin;