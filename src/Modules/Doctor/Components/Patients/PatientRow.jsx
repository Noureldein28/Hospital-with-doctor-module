import React from 'react';

const PatientRow = ({ patient, onAddMedicine }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {patient.name}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {patient.address}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {patient.age}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          patient.bloodType === 'O+' || patient.bloodType === 'O-' 
            ? 'bg-red-100 text-red-800'
            : patient.bloodType === 'A+' || patient.bloodType === 'A-'
            ? 'bg-blue-100 text-blue-800'
            : patient.bloodType === 'B+' || patient.bloodType === 'B-'
            ? 'bg-green-100 text-green-800'
            : 'bg-purple-100 text-purple-800'
        }`}>
          {patient.bloodType}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(patient.date).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onAddMedicine(patient)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          Add Medicine
        </button>
      </td>
    </tr>
  );
};

export default PatientRow;