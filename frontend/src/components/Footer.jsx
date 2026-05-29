import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-4">About</h3>
            <p className="text-slate-400">Compiler Optimization Advisor helps you analyze code and receive optimization recommendations.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Supported Languages</h3>
            <ul className="text-slate-400 space-y-2">
              <li>C</li>
              <li>C++</li>
              <li>Java</li>
              <li>Python</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Features</h3>
            <ul className="text-slate-400 space-y-2">
              <li>Code Analysis</li>
              <li>Complexity Estimation</li>
              <li>Optimization Tips</li>
              <li>Performance Scoring</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500">
          <p>&copy; 2024 Compiler Optimization Advisor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
