import React, { useState, useEffect } from 'react';
import { Users, Calendar, Activity, ClipboardList, UserPlus, CalendarPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalPatients: 0,
    appointmentsToday: 0,
    activeCases: 0,
    pendingReports: 0,
  });

  const [patientGrowthData, setPatientGrowthData] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch dashboard data
    const fetchDashboardData = () => {
      setTimeout(() => {
        setDashboardData({
          totalPatients: 1250,
          appointmentsToday: 45,
          activeCases: 78,
          pendingReports: 12,
        });
      }, 1000);
    };

    const fetchPatientGrowthData = () => {
      setTimeout(() => {
        const data = [
          { month: 'Jan', patients: 980, growth: '+70' },
          { month: 'Feb', patients: 1050, growth: '+70' },
          { month: 'Mar', patients: 1100, growth: '+50' },
          { month: 'Apr', patients: 1150, growth: '+50' },
          { month: 'May', patients: 1200, growth: '+50' },
          { month: 'Jun', patients: 1250, growth: '+50' },
        ];
        setPatientGrowthData(data);
      }, 1000);
    };

    fetchDashboardData();
    fetchPatientGrowthData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-blue-600">Total Patients: {payload[0].value}</p>
          <p className="text-green-600">Monthly Growth: {payload[0].payload.growth}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Hospital Dashboard</h1>
        <div className="flex space-x-4">
          <Link
            to="/register"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus size={20} />
            <span>New Patient</span>
          </Link>
          <Link
            to="/schedule-appointment"
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <CalendarPlus size={20} />
            <span>New Appointment</span>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          icon={<Users className="text-blue-500" />} 
          title="Total Patients" 
          value={dashboardData.totalPatients}
          trend="+8% from last month"
        />
        <DashboardCard 
          icon={<Calendar className="text-green-500" />} 
          title="Appointments Today" 
          value={dashboardData.appointmentsToday}
          trend="5 pending"
        />
        <DashboardCard 
          icon={<Activity className="text-red-500" />} 
          title="Active Cases" 
          value={dashboardData.activeCases}
          trend="12 critical"
        />
        <DashboardCard 
          icon={<ClipboardList className="text-purple-500" />} 
          title="Pending Reports" 
          value={dashboardData.pendingReports}
          trend="Due today"
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Patient Growth</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={patientGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                tick={{ fill: '#64748b' }}
              />
              <YAxis 
                stroke="#64748b"
                tick={{ fill: '#64748b' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="patients" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ r: 6, fill: '#3b82f6' }}
                activeDot={{ r: 8, fill: '#2563eb' }}
                animationBegin={0}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ icon, title, value, trend }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      <span className="text-sm text-gray-500">{trend}</span>
    </div>
    <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default Dashboard;