import React, { useState } from 'react';

const PatientList = () => {
  // This is mock data. In a real application, you would fetch this from your backend.
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', age: 45, lastVisit: '2023-03-15' },
    { id: 2, name: 'Jane Smith', age: 32, lastVisit: '2023-03-18' },
    { id: 3, name: 'Bob Johnson', age: 58, lastVisit: '2023-03-20' },
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setIsViewModalOpen(true);
  };

  const handleEdit = (patient) => {
    setSelectedPatient({ ...patient });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setPatients(patients.map(p => p.id === selectedPatient.id ? selectedPatient : p));
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Patient List</h1>
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Age</th>
              <th className="py-3 px-6 text-left">Last Visit</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">{patient.name}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  <span>{patient.age}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span>{patient.lastVisit}</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      onClick={() => handleView(patient)}
                      className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(patient)}
                      className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isViewModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setIsViewModalOpen(false)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Patient Details</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Name: {selectedPatient.name}<br />
                  Age: {selectedPatient.age}<br />
                  Last Visit: {selectedPatient.lastVisit}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Patient</h3>
              <form onSubmit={handleEditSubmit} className="mt-2 px-7 py-3">
                <input
                  type="text"
                  value={selectedPatient.name}
                  onChange={(e) => setSelectedPatient({ ...selectedPatient, name: e.target.value })}
                  className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Name"
                />
                <input
                  type="number"
                  value={selectedPatient.age}
                  onChange={(e) => setSelectedPatient({ ...selectedPatient, age: e.target.value })}
                  className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Age"
                />
                <input
                  type="date"
                  value={selectedPatient.lastVisit}
                  onChange={(e) => setSelectedPatient({ ...selectedPatient, lastVisit: e.target.value })}
                  className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
                <div className="items-center px-4 py-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;