import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardHome } from './components/DashboardHome';
import { PatientView } from './components/PatientView';
import { PatientsList } from './components/PatientsList';
import { Patient } from './types';

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (query: string) => {
    // Mock search logic
    if (query.toLowerCase().includes('maria') || query.includes('123')) {
      setSelectedPatient({
        id: 'p-1',
        firstName: 'María',
        lastName: 'García López',
        idNumber: '12345678A',
        dob: '1990-05-15',
        phone: '+34 600 123 456',
        bloodType: 'O+',
        allergies: ['Penicilina'],
        status: 'active',
      });
      setActiveModule('patients');
    } else {
      setSelectedPatient(null);
    }
  };

  const handleNavigate = (module: string) => {
    setActiveModule(module);
    setIsMobileMenuOpen(false);
    if (module !== 'patients') {
      setSelectedPatient(null);
    }
  };

  const renderContent = () => {
    if (selectedPatient) {
      let initialTab: 'obstetrics' | 'gynecology' | 'documents' = 'obstetrics';
      if (activeModule === 'gynecology') initialTab = 'gynecology';
      if (activeModule === 'documents') initialTab = 'documents';

      return <PatientView patient={selectedPatient} onBack={() => setSelectedPatient(null)} initialTab={initialTab} />;
    }

    switch (activeModule) {
      case 'dashboard':
        return <DashboardHome />;
      case 'patients':
      case 'obstetrics':
      case 'gynecology':
      case 'documents':
        return (
          <div className="space-y-6">
            {activeModule !== 'patients' && (
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  {activeModule === 'obstetrics' && 'Pacientes - Obstetricia'}
                  {activeModule === 'gynecology' && 'Pacientes - Ginecología'}
                  {activeModule === 'documents' && 'Archivo Documental'}
                </h2>
                <p className="text-sm text-slate-500">
                  {activeModule === 'obstetrics' && 'Seleccione una paciente para gestionar sus controles prenatales.'}
                  {activeModule === 'gynecology' && 'Seleccione una paciente para gestionar sus consultas ginecológicas.'}
                  {activeModule === 'documents' && 'Seleccione una paciente para gestionar sus documentos médicos.'}
                </p>
              </div>
            )}
            <PatientsList onSelectPatient={setSelectedPatient} hideHeader={activeModule !== 'patients'} />
          </div>
        );
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <Sidebar 
        activeModule={activeModule} 
        onNavigate={handleNavigate} 
        isOpen={isMobileMenuOpen}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          onSearch={handleSearch} 
          onMenuToggle={() => setIsMobileMenuOpen(true)} 
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
