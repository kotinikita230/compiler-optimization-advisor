import React, { useState } from 'react';
import './App.css';
import { analyzeCode, uploadFile } from './api';
import Dashboard from './pages/Dashboard';
import Analyzer from './pages/Analyzer';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalysis = (result) => {
    setAnalysisResult(result);
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {currentPage === 'dashboard' && <Dashboard result={analysisResult} />}
        {currentPage === 'analyzer' && <Analyzer onAnalysis={handleAnalysis} />}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
