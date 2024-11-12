import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { 
  Stethoscope, 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Menu,
  UserPlus,
  CalendarPlus,
  ChevronRight
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import PatientRegistration from './components/PatientRegistration';
import PatientList from './components/PatientList';
import ScheduleAppointment from './components/ScheduleAppointment';
import GenerateReport from './components/GenerateReport';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-blue-800 min-h-screen transition-all duration-300 ease-in-out`}>
          <div className="p-4">
            <div className="flex items-center justify-between">
              {sidebarOpen && (
                <Link to="/" className="flex items-center space-x-2 text-white">
                  <Stethoscope size={24} />
                  <span className="font-bold">HMS</span>
                </Link>
              )}
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-white hover:bg-blue-700 rounded-lg p-2"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          <nav className="mt-8">
            <NavLink to="/" icon={<LayoutDashboard size={20} />} text="Dashboard" expanded={sidebarOpen} />
            <NavLink to="/register" icon={<UserPlus size={20} />} text="New Patient" expanded={sidebarOpen} />
            <NavLink to="/patients" icon={<Users size={20} />} text="Patients" expanded={sidebarOpen} />
            <NavLink to="/schedule-appointment" icon={<Calendar size={20} />} text="Appointments" expanded={sidebarOpen} />
            <NavLink to="/generate-report" icon={<FileText size={20} />} text="Reports" expanded={sidebarOpen} />
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/register" element={<PatientRegistration />} />
              <Route path="/patients" element={<PatientList />} />
              <Route path="/schedule-appointment" element={<ScheduleAppointment />} />
              <Route path="/generate-report" element={<GenerateReport />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

function NavLink({ to, icon, text, expanded }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 mb-2 transition-colors duration-200
        ${isActive 
          ? 'text-blue-800 bg-white' 
          : 'text-white hover:bg-blue-700'
        }
        ${expanded ? 'mx-4 rounded-lg' : 'mx-2 rounded-md justify-center'}`
      }
    >
      {icon}
      {expanded && <span className="ml-3">{text}</span>}
      {expanded && isActive && <ChevronRight className="ml-auto" size={16} />}
    </Link>
  );
}

export default App;