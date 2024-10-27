import React, { useEffect, useState } from "react";
import { adminGetAllUsers } from "../api/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      // Use admin credentials to fetch users
      const adminCredentials = { username: "admin", password: "admin123" }; // Static credentials
      const response = await adminGetAllUsers(adminCredentials);
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>All Registered Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
