import VehicleTable from '../components/VehicleManagement';

const AdminVehicle = (() => {
 
  return (
    <div>
      <h1 style={{textAlign: 'center', color: 'white'  }}>Vehicle Details</h1>
      <VehicleTable />
    </div>
  );
});

export default AdminVehicle;