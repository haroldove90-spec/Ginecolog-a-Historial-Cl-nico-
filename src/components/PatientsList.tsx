import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, FileText, Activity, Calendar } from 'lucide-react';
import { Patient } from '../types';
import { PatientModal } from './PatientModal';

interface PatientsListProps {
  onSelectPatient: (patient: Patient) => void;
  hideHeader?: boolean;
}

const MOCK_PATIENTS: Patient[] = [
  {
    id: 'p-1',
    firstName: 'María',
    lastName: 'García López',
    idNumber: '12345678A',
    dob: '1990-05-15',
    phone: '+34 600 123 456',
    bloodType: 'O+',
    allergies: ['Penicilina'],
    status: 'active',
  },
  {
    id: 'p-2',
    firstName: 'Laura',
    lastName: 'Martínez Ruiz',
    idNumber: '87654321B',
    dob: '1985-11-20',
    phone: '+34 611 987 654',
    bloodType: 'A+',
    allergies: [],
    status: 'active',
  },
  {
    id: 'p-3',
    firstName: 'Ana',
    lastName: 'Sánchez Gómez',
    idNumber: '45678912C',
    dob: '1992-03-10',
    phone: '+34 622 345 678',
    bloodType: 'B-',
    allergies: ['Látex', 'Ibuprofeno'],
    status: 'inactive',
  },
];

export function PatientsList({ onSelectPatient, hideHeader = false }: PatientsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);

  const filteredPatients = patients.filter(
    (p) =>
      p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.idNumber.includes(searchTerm)
  );

  const handleSavePatient = (newPatient: Patient) => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setPatients([newPatient, ...patients]);
      setIsSaving(false);
      setIsModalOpen(false);
      // Optional: show toast notification here
    }, 800);
  };

  return (
    <div className="space-y-4">
      {!hideHeader && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-800">Directorio de Pacientes</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            Nueva Paciente
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, apellidos o DNI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm w-full sm:w-auto justify-center">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 min-w-[800px]">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Paciente</th>
                <th className="px-6 py-4 font-semibold">DNI / ID</th>
                <th className="px-6 py-4 font-semibold">Contacto</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  onClick={() => onSelectPatient(patient)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        {patient.firstName[0]}
                        {patient.lastName[0]}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          {patient.firstName} {patient.lastName}
                        </div>
                        <div className="text-xs text-slate-500">
                          {new Date().getFullYear() - new Date(patient.dob).getFullYear()} años
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-500">{patient.idNumber}</td>
                  <td className="px-6 py-4">{patient.phone}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {patient.status === 'active' ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Menu logic
                      }}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="w-8 h-8 text-slate-300 mb-3" />
                      <p className="text-base font-medium text-slate-900">No se encontraron pacientes</p>
                      <p className="text-sm mt-1">Intenta con otros términos de búsqueda.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <PatientModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSavePatient}
          isSaving={isSaving}
        />
      )}
    </div>
  );
}
