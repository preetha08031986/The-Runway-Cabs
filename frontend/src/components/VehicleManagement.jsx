/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useVehiclemanagementQuery,useEditvehicleMutation,useDeletevehicleMutation } from '../slices/adminApiSlice';
import './UserManagement.css';
import { useSelector } from 'react-redux';

const VehicleTable = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: users, isLoading, error, refetch } = useVehiclemanagementQuery();
  
  useEffect(() => {
    refetch();
  }, [refetch]);

  const [editedUserId, setEditedUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [deletevehicle, { isLoading: isDeleting }] = useDeletevehicleMutation();
  const [editvehicle, { isLoading: isEditing }] = useEditvehicleMutation();

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log("Admin screen",userId);
      deletevehicle(userId).unwrap();
    }
  };

  const handleEditUser = async (userId, updatedUserData) => {
    console.log("edit",updatedUserData);
    const data = await editvehicle({ id: String(userId), data: updatedUserData }).unwrap();
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
            <th>Driver</th>
            <th>Reg.No</th>
            <th>Model</th>
            <th>Reg.Year</th>
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
          <th>Reg.No.</th>
          <th>Driver</th>
          <th>Model</th>
          <th>Reg.Year</th>
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
                <td><pre>{user.vehicle?.[0]?.number || ''}</pre></td>
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
                    <pre>{user.vehicle?.[0]?.model || ''}</pre>
                  )}
                </td>
                <td><pre>{user.vehicle?.[0]?.year || ''}</pre></td>
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

export default VehicleTable;