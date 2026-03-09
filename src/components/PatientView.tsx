import React, { useState } from 'react';
import { Patient, PrenatalControl, GynecologicalConsultation, Document } from '../types';
import { ArrowLeft, Plus, Activity, Calendar, FileText, AlertTriangle, CheckCircle, Upload } from 'lucide-react';
import { PrenatalControlModal } from './PrenatalControlModal';
import { GynecologyModal } from './GynecologyModal';
import { DocumentModal } from './DocumentModal';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PatientViewProps {
  patient: Patient;
  onBack: () => void;
  initialTab?: 'obstetrics' | 'gynecology' | 'documents';
}

export function PatientView({ patient, onBack, initialTab = 'obstetrics' }: PatientViewProps) {
  const [activeTab, setActiveTab] = useState<'obstetrics' | 'gynecology' | 'documents'>(initialTab);
  
  // Modals state
  const [isObsModalOpen, setIsObsModalOpen] = useState(false);
  const [isGynModalOpen, setIsGynModalOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{show: boolean, message: string}>({show: false, message: ''});
  
  // Data state
  const [controls, setControls] = useState<PrenatalControl[]>([
    {
      id: 'c-1',
      pregnancyId: 'preg-1',
      date: '2026-02-15',
      gestationalAgeWeeks: 20,
      gestationalAgeDays: 3,
      weightKg: 65,
      bloodPressureSys: 110,
      bloodPressureDia: 70,
      fundalHeightCm: 20,
      fetalHeartRateBpm: 145,
      notes: 'Desarrollo normal.',
    },
    {
      id: 'c-2',
      pregnancyId: 'preg-1',
      date: '2026-03-09',
      gestationalAgeWeeks: 24,
      gestationalAgeDays: 0,
      weightKg: 67,
      bloodPressureSys: 115,
      bloodPressureDia: 75,
      fundalHeightCm: 24,
      fetalHeartRateBpm: 140,
      notes: 'Movimientos fetales presentes.',
    },
  ]);

  const [consultations, setConsultations] = useState<GynecologicalConsultation[]>([
    {
      id: 'gyn-1',
      patientId: 'p-1',
      date: '2025-08-10',
      reason: 'Revisión anual',
      diagnosis: 'Z01.4 - Examen ginecológico general',
      treatment: 'Ninguno. Citología tomada.',
      nextRevision: '2026-08-10',
      notes: 'Paciente asintomática. Citología previa normal.',
    }
  ]);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'doc-1',
      patientId: 'p-1',
      type: 'ultrasound',
      name: 'Ecografía Morfológica 20 Semanas',
      date: '2026-02-15',
      url: '#',
    }
  ]);

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleAddControl = async (control: PrenatalControl) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setControls([...controls, control]);
    setIsSaving(false);
    setIsObsModalOpen(false);
    showToast('Control prenatal guardado exitosamente.');
  };

  const handleAddConsultation = async (consult: GynecologicalConsultation) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setConsultations([consult, ...consultations]);
    setIsSaving(false);
    setIsGynModalOpen(false);
    showToast('Consulta ginecológica guardada exitosamente.');
  };

  const handleAddDocument = async (doc: Document) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDocuments([doc, ...documents]);
    setIsSaving(false);
    setIsDocModalOpen(false);
    showToast('Documento subido exitosamente.');
  };

  const chartData = controls.map(c => ({
    semana: `Sem ${c.gestationalAgeWeeks}`,
    au: c.fundalHeightCm,
    peso: c.weightKg,
  }));

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toast.show && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-3 rounded-lg shadow-lg border border-emerald-200 animate-in fade-in slide-in-from-top-4">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {patient.lastName}, {patient.firstName}
            </h1>
            <p className="text-sm text-slate-500">
              DNI: {patient.idNumber} | Edad: {Math.floor((new Date().getTime() - new Date(patient.dob).getTime()) / 31557600000)} años
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          {activeTab === 'obstetrics' && (
            <button
              onClick={() => setIsObsModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Nuevo Control
            </button>
          )}
          {activeTab === 'gynecology' && (
            <button
              onClick={() => setIsGynModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Nueva Consulta
            </button>
          )}
          {activeTab === 'documents' && (
            <button
              onClick={() => setIsDocModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Upload className="w-4 h-4" />
              Subir Documento
            </button>
          )}
        </div>
      </div>

      {/* Alertas */}
      {patient.allergies.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-rose-800">Alergias Registradas</h3>
            <p className="text-sm text-rose-600 mt-1">{patient.allergies.join(', ')}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('obstetrics')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'obstetrics'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Obstetricia
          </button>
          <button
            onClick={() => setActiveTab('gynecology')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'gynecology'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Ginecología
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'documents'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Archivo Documental
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'obstetrics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
          {/* Columna Izquierda: Resumen */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                Embarazo Actual
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">FUR</span>
                  <span className="font-medium text-slate-900">2025-09-22</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">FPP (Ecográfica)</span>
                  <span className="font-medium text-slate-900">2026-06-29</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Edad Gestacional</span>
                  <span className="font-medium text-indigo-600">24 semanas, 0 días</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Grupo Sanguíneo</span>
                  <span className="font-medium text-rose-600">{patient.bloodType}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Fórmula Obstétrica</span>
                  <span className="font-medium text-slate-900">G2 P1 A0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Gráficas y Tabla */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Evolución de Altura Uterina (cm)</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="semana" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line type="monotone" dataKey="au" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Altura Uterina" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  Historial de Controles
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 font-medium">Fecha</th>
                      <th className="px-4 py-3 font-medium">EG</th>
                      <th className="px-4 py-3 font-medium">Peso</th>
                      <th className="px-4 py-3 font-medium">PA</th>
                      <th className="px-4 py-3 font-medium">AU</th>
                      <th className="px-4 py-3 font-medium">LCF</th>
                      <th className="px-4 py-3 font-medium text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {controls.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-900">{c.date}</td>
                        <td className="px-4 py-3 text-slate-600">{c.gestationalAgeWeeks}s {c.gestationalAgeDays}d</td>
                        <td className="px-4 py-3 text-slate-600">{c.weightKg} kg</td>
                        <td className="px-4 py-3 text-slate-600">{c.bloodPressureSys}/{c.bloodPressureDia}</td>
                        <td className="px-4 py-3 text-slate-600">{c.fundalHeightCm} cm</td>
                        <td className="px-4 py-3 text-slate-600">{c.fetalHeartRateBpm} lpm</td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-indigo-600 hover:text-indigo-900 font-medium text-xs">Ver detalle</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'gynecology' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-500" />
              Historial de Consultas Ginecológicas
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium">Fecha</th>
                  <th className="px-6 py-3 font-medium">Motivo</th>
                  <th className="px-6 py-3 font-medium">Diagnóstico</th>
                  <th className="px-6 py-3 font-medium">Próxima Revisión</th>
                  <th className="px-6 py-3 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {consultations.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{c.date}</td>
                    <td className="px-6 py-4 text-slate-600">{c.reason}</td>
                    <td className="px-6 py-4 text-slate-600">{c.diagnosis}</td>
                    <td className="px-6 py-4 text-slate-600">{c.nextRevision || '-'}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-600 hover:text-indigo-900 font-medium text-xs">Ver detalle</button>
                    </td>
                  </tr>
                ))}
                {consultations.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No hay consultas ginecológicas registradas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" />
              Archivos y Resultados
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium">Fecha</th>
                  <th className="px-6 py-3 font-medium">Tipo</th>
                  <th className="px-6 py-3 font-medium">Nombre del Documento</th>
                  <th className="px-6 py-3 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{d.date}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                        {d.type === 'ultrasound' ? 'Ecografía' : d.type === 'lab_result' ? 'Laboratorio' : d.type === 'consent' ? 'Consentimiento' : 'Otro'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{d.name}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-600 hover:text-indigo-900 font-medium text-xs">Descargar</button>
                    </td>
                  </tr>
                ))}
                {documents.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                      No hay documentos subidos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      {isObsModalOpen && (
        <PrenatalControlModal
          onClose={() => setIsObsModalOpen(false)}
          onSave={handleAddControl}
          isSaving={isSaving}
        />
      )}
      
      {isGynModalOpen && (
        <GynecologyModal
          onClose={() => setIsGynModalOpen(false)}
          onSave={handleAddConsultation}
          isSaving={isSaving}
        />
      )}

      {isDocModalOpen && (
        <DocumentModal
          onClose={() => setIsDocModalOpen(false)}
          onSave={handleAddDocument}
          isSaving={isSaving}
        />
      )}
    </div>
  );
}
