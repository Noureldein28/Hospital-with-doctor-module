import React, { useState } from 'react';
import DoctorSidebar from './Components/Sidebar/DoctorSidebar';
import AppointmentsList from './Components/Appointments/AppointmentsList';
import PatientsList from './Components/Patients/PatientsList';
import AddMedicineModal from './Components/Medicine/AddMedicineModal';

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState('appointments');
  const [isAddMedicineModalOpen, setIsAddMedicineModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleAddMedicine = (patient) => {
    setSelectedPatient(patient);
    setIsAddMedicineModalOpen(true);
  };

  const handleCloseMedicineModal = () => {
    setIsAddMedicineModalOpen(false);
    setSelectedPatient(null);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'appointments':
        return <AppointmentsList />;
      case 'patients':
        return <PatientsList onAddMedicine={handleAddMedicine} />;
      default:
        return <AppointmentsList />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <DoctorSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize">
              {activeSection}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, Dr. Smith
              </span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">DS</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {renderActiveSection()}
        </main>
      </div>

      {/* Add Medicine Modal */}
      {isAddMedicineModalOpen && (
        <AddMedicineModal
          patient={selectedPatient}
          onClose={handleCloseMedicineModal}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;