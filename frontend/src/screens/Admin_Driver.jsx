import DriversTable from "../components/DriverManagement";

const AdminDriver = (() => {
 
  return (
    <div>
      <h1 style={{textAlign: 'center', color: 'white'  }}>Driver Details</h1>
      <DriversTable />
    </div>
  );
});

export default AdminDriver;