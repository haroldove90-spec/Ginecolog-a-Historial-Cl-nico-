import React from 'react';
import { Users, Calendar, AlertCircle } from 'lucide-react';

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Resumen Clínico</h1>
        <p className="text-sm text-slate-500">Hoy: {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Users className="w-6 h-6 text-indigo-600" />}
          title="Pacientes Activas"
          value="1,245"
          trend="+12% este mes"
          trendUp
        />
        <StatCard
          icon={<Calendar className="w-6 h-6 text-emerald-600" />}
          title="Citas Hoy"
          value="18"
          trend="4 pendientes"
          trendUp={false}
        />
        <StatCard
          icon={<AlertCircle className="w-6 h-6 text-rose-600" />}
          title="Embarazos Alto Riesgo"
          value="12"
          trend="-2 desde la semana pasada"
          trendUp
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Próximas Consultas</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Paciente {i}</p>
                  <p className="text-xs text-slate-500">Control Prenatal - Semana 2{i}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">10:{i}0 AM</p>
                <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium mt-1">Ver Ficha</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend, trendUp }: { icon: React.ReactNode; title: string; value: string; trend: string; trendUp: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-slate-50 rounded-lg">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-slate-600">{title}</h3>
      </div>
      <div className="mt-auto">
        <p className="text-3xl font-bold text-slate-900">{value}</p>
        <p className={`text-xs mt-2 font-medium ${trendUp ? 'text-emerald-600' : 'text-slate-500'}`}>
          {trend}
        </p>
      </div>
    </div>
  );
}
