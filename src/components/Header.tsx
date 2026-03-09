import React, { useState } from 'react';
import { Search, Bell, UserCircle, Menu } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onMenuToggle: () => void;
}

export function Header({ onSearch, onMenuToggle }: HeaderProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 gap-4">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
        <form onSubmit={handleSearch} className="w-full max-w-md relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar paciente por DNI, nombre o HC..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value === '') onSearch('');
            }}
          />
        </form>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="sm:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="hidden sm:block h-8 w-px bg-slate-200"></div>
        <button className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 p-1 sm:p-2 rounded-lg transition-colors">
          <UserCircle className="w-7 h-7 sm:w-8 sm:h-8 text-slate-400" />
          <span className="hidden sm:inline">Dr. Martínez</span>
        </button>
      </div>
    </header>
  );
}
