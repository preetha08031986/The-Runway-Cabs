/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useUsermanagementQuery,useDeleteuserMutation,useEdituserMutation } from '../slices/adminApiSlice';
import './UserManagement.css';
import { useSelector } from 'react-redux';

const UsersTable = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: users, isLoading, error, refetch } = useUsermanagementQuery();
  
  useEffect(() => {
    refetch();
  }, [refetch]);

  const [editedUserId, setEditedUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [deleteuser, { isLoading: isDeleting }] = useDeleteuserMutation();
  const [edituser, { isLoading: isEditing }] = useEdituserMutation();

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log("Admin screen",userId);
      deleteuser(userId).unwrap();
    }
  };

  const handleEditUser = async (userId, updatedUserData) => {
    console.log("edit",updatedUserData);
    const data = await edituser({ id: String(userId), data: updatedUserData }).unwrap();
    console.log(data);
    setEditedUserId(null);
    setEditedUserData({});
    refetch();
  };

  if (isLoading || error) {
    return (
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

      </table>
    )
  }

  return (
    <table className="users-table" style={{ backgroundColor: 'lightblue', color: 'black' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      {
        (isLoading || error) ? (
          <tbody>
            <tr>
              <td>{isLoading ? 'Loading...' : 'Error...'}</td>
              <td>{isLoading ? 'Loading...' : 'Error...'}</td>
              <td>{isLoading ? 'Loading...' : 'Error...'}</td>
              <td>{isLoading ? 'Loading...' : 'Error...'}</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td><pre>{user._id}</pre></td>
                <td>
                  {editedUserId === user._id ? (
                    <input
                      type="text"
                      value={editedUserData.name || user.name}
                      onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editedUserId === user._id ? (
                    <input
                      type="text"
                      value={editedUserData.email || user.email}
                      onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editedUserId === user._id ? (
                    <button
                      onClick={() => handleEditUser(user._id, editedUserData)}
                      disabled={isEditing}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button onClick={() => setEditedUserId(user._id)} disabled={userInfo._id === user._id}>Edit</button>
                      <button onClick={() => handleDeleteUser(user._id)} disabled={isDeleting || userInfo._id === user._id}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )
      }
    </table>
  );
};

export default UsersTable;