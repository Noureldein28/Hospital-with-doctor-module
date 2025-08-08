import React, { useState, useEffect } from 'react';
import AppointmentCard from './AppointmentCard';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - in real app, this would come from an API
  useEffect(() => {
    const mockAppointments = [
      {
        id: 1,
        patientName: 'John Doe',
        time: '09:00',
        status: 'upcoming',
        date: new Date().toISOString().split('T')[0],
        notes: 'Follow-up checkup for hypertension'
      },
      {
        id: 2,
        patientName: 'Jane Smith',
        time: '10:30',
        status: 'upcoming',
        date: new Date().toISOString().split('T')[0],
        notes: 'Annual physical examination'
      },
      {
        id: 3,
        patientName: 'Mike Johnson',
        time: '11:00',
        status: 'completed',
        date: new Date().toISOString().split('T')[0],
        notes: 'Cardiology consultation'
      },
      {
        id: 4,
        patientName: 'Sarah Wilson',
        time: '14:00',
        status: 'upcoming',
        date: new Date().toISOString().split('T')[0],
        notes: 'Diabetes management review'
      },
      {
        id: 5,
        patientName: 'Robert Brown',
        time: '15:30',
        status: 'cancelled',
        date: new Date().toISOString().split('T')[0],
        notes: 'Routine checkup - cancelled by patient'
      }
    ];
    setAppointments(mockAppointments);
  }, []);

  const filteredAppointments = appointments.filter(appointment => {
    if (filterStatus === 'all') return true;
    return appointment.status.toLowerCase() === filterStatus;
  });

  const getWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getWeekDates();

  const getAppointmentCount = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr).length;
  };

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h2 className="text-lg font-semibold text-gray-900">Weekly Appointments</h2>
          
          {/* Status Filter */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Appointments</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Week View */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-md font-medium text-gray-900 mb-4">This Week Overview</h3>
        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date, index) => {
            const isToday = date.toDateString() === new Date().toDateString();
            const appointmentCount = getAppointmentCount(date);
            
            return (
              <div
                key={index}
                className={`p-3 text-center rounded-lg border transition-colors ${
                  isToday 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="text-xs text-gray-600 mb-1">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                  {date.getDate()}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {appointmentCount} {appointmentCount === 1 ? 'apt' : 'apts'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Appointments List */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Today's Appointments ({filteredAppointments.length})
        </h3>
        
        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500">No appointments found for the selected filter.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;