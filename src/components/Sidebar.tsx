import React from 'react';
import { Users, Baby, Activity, FolderOpen, Settings, LayoutDashboard, X } from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onNavigate: (module: string) => void;
  isOpen: boolean;
}

export function Sidebar({ activeModule, onNavigate, isOpen }: SidebarProps) {
  return (
    <aside 
      className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-indigo-900 flex flex-col transform transition-transform duration-300 ease-in-out shadow-xl ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-indigo-800/50">
        <div className="flex items-center gap-2 text-white">
          <Activity className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight">GynObs</span>
        </div>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1">
        <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeModule === 'dashboard'} onClick={() => onNavigate('dashboard')} />
        <NavItem icon={<Users size={20} />} label="Pacientes" active={activeModule === 'patients'} onClick={() => onNavigate('patients')} />
        <NavItem icon={<Baby size={20} />} label="Obstetricia" active={activeModule === 'obstetrics'} onClick={() => onNavigate('obstetrics')} />
        <NavItem icon={<Activity size={20} />} label="Ginecología" active={activeModule === 'gynecology'} onClick={() => onNavigate('gynecology')} />
        <NavItem icon={<FolderOpen size={20} />} label="Archivo Documental" active={activeModule === 'documents'} onClick={() => onNavigate('documents')} />
      </nav>
      <div className="p-4 border-t border-indigo-800/50">
        <NavItem icon={<Settings size={20} />} label="Configuración" active={activeModule === 'settings'} onClick={() => onNavigate('settings')} />
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-indigo-800 text-white shadow-sm'
          : 'text-indigo-100 hover:bg-indigo-800/50 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
