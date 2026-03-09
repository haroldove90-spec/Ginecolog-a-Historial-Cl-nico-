import React, { useState } from 'react';
import { Search, Bell, UserCircle } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div className="flex-1 flex items-center">
        <form onSubmit={handleSearch} className="w-full max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar paciente por DNI, nombre o HC... (ej. Maria)"
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value === '') onSearch('');
            }}
          />
        </form>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-slate-500 hover:text-slate-700 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-px bg-slate-200"></div>
        <button className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900">
          <UserCircle className="w-8 h-8 text-slate-400" />
          <span>Dr. Martínez</span>
        </button>
      </div>
    </header>
  );
}
