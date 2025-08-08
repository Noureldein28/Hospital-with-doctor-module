import React, { useState, useEffect } from 'react';
import PatientsTable from './PatientsTable';

const PatientsList = ({ onAddMedicine }) => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from an API
  useEffect(() => {
    const mockPatients = [
      {
        id: 1,
        name: 'John Doe',
        address: '123 Main St, New York, NY',
        age: 45,
        bloodType: 'A+',
        date: '2024-01-15'
      },
      {
        id: 2,
        name: 'Jane Smith',
        address: '456 Oak Ave, Los Angeles, CA',
        age: 32,
        bloodType: 'O-',
        date: '2024-01-14'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        address: '789 Pine St, Chicago, IL',
        age: 58,
        bloodType: 'B+',
        date: '2024-01-13'
      },
      {
        id: 4,
        name: 'Sarah Wilson',
        address: '321 Elm St, Houston, TX',
        age: 28,
        bloodType: 'AB+',
        date: '2024-01-12'
      },
      {
        id: 5,
        name: 'Robert Brown',
        address: '654 Maple Dr, Phoenix, AZ',
        age: 41,
        bloodType: 'O+',
        date: '2024-01-11'
      },
      {
        id: 6,
        name: 'Emily Davis',
        address: '987 Cedar Ln, Philadelphia, PA',
        age: 36,
        bloodType: 'A-',
        date: '2024-01-10'
      },
      {
        id: 7,
        name: 'David Miller',
        address: '147 Birch Rd, San Antonio, TX',
        age: 52,
        bloodType: 'B-',
        date: '2024-01-09'
      },
      {
        id: 8,
        name: 'Lisa Garcia',
        address: '258 Spruce St, San Diego, CA',
        age: 29,
        bloodType: 'AB-',
        date: '2024-01-08'
      }
    ];

    // Simulate API call delay
    setTimeout(() => {
      setPatients(mockPatients);
      setLoading(false);
    }, 1000);
  }, []);

  const clearSearch = () => {
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading patients...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Patient Records</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage patient information and prescriptions
            </p>
          </div>

          {/* Search */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Patients</dt>
                <dd className="text-lg font-medium text-gray-900">{patients.length}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Active Cases</dt>
                <dd className="text-lg font-medium text-gray-900">{patients.length - 2}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Pending Reviews</dt>
                <dd className="text-lg font-medium text-gray-900">3</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <PatientsTable
        patients={patients}
        onAddMedicine={onAddMedicine}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default PatientsList;