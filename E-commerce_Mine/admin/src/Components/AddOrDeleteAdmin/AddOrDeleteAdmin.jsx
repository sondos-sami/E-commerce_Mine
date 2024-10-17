import React, { useState, useEffect } from 'react';

const AddOrDeleteAdmin = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [user, setUser] = useState(null);   

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Stored user:', storedUser); 
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    } else {
      console.log('No user found in local storage.');
    }
  }, []);

  const handleAddAdmin = async () => {
    if (!user) {
      alert("You must be logged in to perform this action."); 
      return;
    }

    const response = await fetch('http://localhost:4000/addadmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ adminEmail, requestingAdminEmail: user.email }),
    });

    const result = await response.json();
    alert(result.message || 'Failed to add admin');
    if (result.success) setAdminEmail('');
  };

  const handleDeleteAdmin = async () => {
    if (!user) {
      alert("You must be logged in to perform this action."); 
      return;
    }

    const response = await fetch('http://localhost:4000/deleteadmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ adminEmail, requestingAdminEmail: user.email }),
    });

    const result = await response.json();
    alert(result.message || 'Failed to delete admin');
    if (result.success) setAdminEmail('');
  };

  return (
    <div>
      <h2>Add or Delete Admin</h2>
      <input
        type="email"
        placeholder="Admin Email"
        value={adminEmail}
        onChange={(e) => setAdminEmail(e.target.value)}
      />
      <button onClick={handleAddAdmin}>Add Admin</button>
      <button onClick={handleDeleteAdmin}>Delete Admin</button>
    </div>
  );
};

export default AddOrDeleteAdmin;
