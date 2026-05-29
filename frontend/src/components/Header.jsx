import React from 'react';

export default function Header({ currentPage, setCurrentPage }) {
  return (
    <header className="bg-slate-900 border-b border-slate-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-blue-400">⚡</div>
            <h1 className="text-3xl font-bold text-slate-100">Compiler Optimization Advisor</h1>
          </div>
          <nav className="flex gap-4">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                currentPage === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('analyzer')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                currentPage === 'analyzer'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Analyzer
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
