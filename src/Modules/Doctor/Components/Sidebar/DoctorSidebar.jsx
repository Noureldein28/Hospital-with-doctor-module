import React from 'react';

const DoctorSidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    {
      id: 'appointments',
      label: 'Appointments',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'patients',
      label: 'Patients',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 shadow-lg z-40" style={{ backgroundColor: '#03045E' }}>
      {/* Logo/Branding */}
      <div className="px-6 py-6 border-b border-blue-400">
        <h2 className="text-xl font-bold text-white">EliteCare</h2>
        <p className="text-blue-200 text-sm mt-1">Doctor Portal</p>
      </div>

      {/* Navigation Menu */}
      <nav className="px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-blue-200 hover:bg-blue-600 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Doctor Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-400">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">DS</span>
          </div>
          <div>
            <p className="text-white font-medium text-sm">Dr. Smith</p>
            <p className="text-blue-200 text-xs">Cardiologist</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSidebar;