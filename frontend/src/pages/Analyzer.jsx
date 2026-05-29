import React, { useState } from 'react';
import { analyzeCode, uploadFile, getSupportedLanguages } from '../api';

export default function Analyzer({ onAnalysis }) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('auto');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [languages, setLanguages] = useState(['Python', 'Java', 'C', 'C++']);

  const handleAnalyzeCode = async () => {
    if (!code.trim()) {
      setError('Please enter code to analyze');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const result = await analyzeCode(code, language);
      onAnalysis(result);
    } catch (err) {
      setError(err.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setLoading(true);
    setError('');
    try {
      const result = await uploadFile(file);
      setCode(result.code || '');
      setLanguage(result.language || language);
      onAnalysis(result);
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
        <h2 className="text-2xl font-bold text-slate-100 mb-4">Code Analyzer</h2>
        
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-slate-300 font-medium mb-2">Upload Source File (Auto-detects language)</label>
          <input
            type="file"
            onChange={handleFileUpload}
            disabled={loading}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-400 file:text-slate-100 file:bg-blue-600 file:border-0 file:rounded file:px-4 file:py-2 file:mr-4 file:cursor-pointer hover:file:bg-blue-700 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-slate-300 font-medium mb-2">Paste Code or Upload</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your source code here..."
            className="w-full h-96 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 font-mono text-sm focus:outline-none focus:border-blue-500 resize-none"
          />
          <div className="text-slate-500 text-xs mt-1">{code.length} characters</div>
        </div>

        <button
          onClick={handleAnalyzeCode}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          {loading ? 'Analyzing...' : '🚀 Analyze Code'}
        </button>
      </div>

      <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
        <h3 className="text-xl font-bold text-slate-100 mb-4">Supported Languages</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {languages.map((lang) => (
            <div key={lang} className="bg-slate-800 rounded-lg p-4 text-center border border-slate-700">
              <div className="text-2xl font-bold text-blue-400">{lang}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
        <h3 className="text-xl font-bold text-slate-100 mb-4">What We Analyze</h3>
        <ul className="space-y-3 text-slate-300">
          <li className="flex items-start">
            <span className="text-blue-400 mr-3">✓</span>
            <div>
              <strong>Loop Detection:</strong> Identifies loops and calculates maximum nesting depth
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-3">✓</span>
            <div>
              <strong>Recursion Detection:</strong> Detects recursive functions and tail recursion patterns
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-3">✓</span>
            <div>
              <strong>Time Complexity:</strong> Estimates algorithmic time complexity
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-3">✓</span>
            <div>
              <strong>Space Complexity:</strong> Analyzes memory usage patterns
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-3">✓</span>
            <div>
              <strong>Optimizations:</strong> Provides targeted compiler and algorithm optimization recommendations
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
