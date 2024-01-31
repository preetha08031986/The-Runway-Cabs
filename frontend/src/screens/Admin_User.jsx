import UsersTable from '../components/UserManagement.jsx';

const AdminScreen = (() => {
 
  return (
    <div>
      <h1 style={{textAlign: 'center', color: 'white'  }}>User Details</h1>
      <UsersTable />
    </div>
  );
});

export default AdminScreen;