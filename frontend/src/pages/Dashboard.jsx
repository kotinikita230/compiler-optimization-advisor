import React from 'react';
import { 
  LineChart, Line, 
  BarChart, Bar, 
  PieChart, Pie, Cell, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function Dashboard({ result }) {
  if (!result) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-3xl font-bold text-slate-100 mb-4">Welcome to Compiler Optimization Advisor</h2>
        <p className="text-slate-400 text-lg">Analyze your code to get started with optimization recommendations.</p>
      </div>
    );
  }

  const performanceScore = result.performance_score || 0;
  const loopCount = result.loops?.loops_found || 0;
  const maxNesting = result.loops?.max_nesting_depth || 0;
  const hasRecursion = result.recursion?.has_recursion || false;
  const timeComplexity = result.time_complexity?.estimated_complexity || 'O(1)';
  const spaceComplexity = result.space_complexity?.estimated_complexity || 'O(1)';

  const compilerRecs = result.compiler_recommendations || {};
  const bestCompiler = compilerRecs.best_compiler;
  const compilerComparison = compilerRecs.comparison || [];

  const scoreColor = performanceScore >= 75 ? 'text-green-400' : performanceScore >= 50 ? 'text-yellow-400' : 'text-red-400';
  const scoreChartData = [{ name: 'Score', value: performanceScore }, { name: 'Remaining', value: 100 - performanceScore }];
  const scoreColors = ['#3b82f6', '#1e293b'];

  // Radar Chart Data - Code Quality Metrics
  const radarData = [
    { subject: 'Performance', A: performanceScore, fullMark: 100 },
    { subject: 'Complexity', A: Math.max(20, 100 - maxNesting * 20), fullMark: 100 },
    { subject: 'Efficiency', A: timeComplexity === 'O(1)' || timeComplexity === 'O(log n)' ? 90 : timeComplexity === 'O(n)' ? 70 : 40, fullMark: 100 },
    { subject: 'Memory', A: spaceComplexity === 'O(1)' ? 95 : spaceComplexity === 'O(n)' ? 70 : 50, fullMark: 100 },
    { subject: 'Structure', A: hasRecursion ? 60 : 85, fullMark: 100 },
  ];

  // Bar Chart Data - Optimizations by Impact and Priority
  const optimizationData = (result.optimizations || []).slice(0, 5).map((opt, idx) => ({
    name: opt.category?.substring(0, 15) || `Opt ${idx}`,
    Priority: opt.priority === 'High' ? 90 : opt.priority === 'Medium' ? 60 : 30,
    Impact: opt.impact === 'Very High' ? 100 : opt.impact === 'High' ? 80 : opt.impact === 'Medium' ? 50 : 20,
    suggestion: opt.suggestion
  }));

  // Line Chart Data - Complexity Growth
  const generateGrowthData = (complexity) => {
    const data = [];
    for (let n = 1; n <= 10; n++) {
      let ops = n;
      if (complexity.includes('n²')) ops = n * n;
      else if (complexity.includes('n³')) ops = n * n * n;
      else if (complexity.includes('log')) ops = n * Math.log2(n);
      else if (complexity === 'O(1)') ops = 1;
      else if (complexity.includes('2ⁿ') || complexity.includes('2^n')) ops = Math.pow(2, n);
      data.push({ n, operations: ops });
    }
    return data;
  };
  const growthData = generateGrowthData(timeComplexity);

  // Compiler Score Data
  const compilerChartData = compilerComparison.map(c => ({
    name: c.name,
    Score: c.score
  }));

  return (
    <div className="space-y-8">
      {/* 1. Best Compiler Recommendation Card (Primary Focus) */}
      {bestCompiler && (
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-lg p-8 border border-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
            <div className="text-8xl">🏆</div>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Best Compiler Recommendation</h2>
          <p className="text-blue-200 mb-6">Based on your code's language and characteristics.</p>
          
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
            <div className="bg-slate-900/60 rounded-lg p-6 border border-slate-700/50 flex-1 w-full shadow-inner">
              <div className="text-3xl font-extrabold text-white mb-2">{bestCompiler.name}</div>
              <div className="text-blue-300 font-semibold mb-4">Optimization Score: <span className="text-white text-xl">{bestCompiler.score}/100</span></div>
              <p className="text-slate-300 text-sm">{bestCompiler.reason}</p>
            </div>
            
            <div className="bg-slate-900/60 rounded-lg p-6 border border-slate-700/50 flex-1 w-full h-full shadow-inner">
              <h4 className="text-blue-300 font-semibold mb-3 uppercase tracking-wider text-sm">Recommended Flags</h4>
              <code className="block bg-slate-950 p-4 rounded border border-slate-800 text-pink-400 font-mono text-sm break-all shadow-inner">
                {bestCompiler.flags}
              </code>
            </div>
          </div>
        </div>
      )}

      {/* 2. Analysis Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="text-blue-400 text-3xl font-bold">{result.language?.toUpperCase()}</div>
          <div className="text-slate-400 text-sm mt-2 font-semibold tracking-wider">DETECTED LANGUAGE</div>
        </div>
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="text-purple-400 text-3xl font-bold">{loopCount}</div>
          <div className="text-slate-400 text-sm mt-2 font-semibold tracking-wider">LOOPS FOUND</div>
        </div>
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="text-orange-400 text-3xl font-bold">{maxNesting}</div>
          <div className="text-slate-400 text-sm mt-2 font-semibold tracking-wider">MAX NESTING</div>
        </div>
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 flex flex-col items-center justify-center text-center shadow-sm">
          <div className={`text-3xl font-bold ${hasRecursion ? 'text-red-400' : 'text-green-400'}`}>{hasRecursion ? 'Yes' : 'No'}</div>
          <div className="text-slate-400 text-sm mt-2 font-semibold tracking-wider">RECURSION</div>
        </div>
      </div>

      {/* 3. Compiler Comparison Chart & Table */}
      {compilerComparison.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-lg p-8 border border-slate-800 flex flex-col">
             <h3 className="text-xl font-bold text-slate-100 mb-6">Compiler Optimization Scores</h3>
             <div className="h-72 w-full flex-grow">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={compilerChartData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }} layout="vertical">
                   <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                   <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" />
                   <YAxis dataKey="name" type="category" stroke="#94a3b8" width={100} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                     cursor={{ fill: '#1e293b' }}
                   />
                   <Bar dataKey="Score" fill="#8b5cf6" radius={[0, 4, 4, 0]}>
                     {compilerChartData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.name === bestCompiler?.name ? '#3b82f6' : '#8b5cf6'} />
                     ))}
                   </Bar>
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </div>
          
          <div className="bg-slate-900 rounded-lg p-8 border border-slate-800 overflow-hidden flex flex-col">
            <h3 className="text-xl font-bold text-slate-100 mb-6">Compiler Comparison</h3>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="py-3 text-slate-300 font-semibold text-sm">Compiler</th>
                    <th className="py-3 text-slate-300 font-semibold text-sm">Score</th>
                    <th className="py-3 text-slate-300 font-semibold text-sm">Recommended Flags</th>
                    <th className="py-3 text-slate-300 font-semibold text-sm">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {compilerComparison.map((compiler, idx) => (
                    <tr key={idx} className={`border-b border-slate-800 hover:bg-slate-800/50 transition-colors ${compiler.name === bestCompiler?.name ? 'bg-blue-900/20' : ''}`}>
                      <td className="py-4 pr-4 font-semibold text-slate-100">
                        {compiler.name}
                        {compiler.name === bestCompiler?.name && <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Top</span>}
                      </td>
                      <td className="py-4 pr-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${compiler.score >= 90 ? 'bg-green-500/20 text-green-400' : compiler.score >= 70 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                          {compiler.score}
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        <code className="text-xs text-pink-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">{compiler.flags}</code>
                      </td>
                      <td className="py-4 text-sm text-slate-400">{compiler.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. Optimization Recommendations */}
      <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
        <h3 className="text-xl font-bold text-slate-100 mb-6">Detailed Recommendations</h3>
        <div className="space-y-4">
          {(result.optimizations || []).map((opt, idx) => (
            <div key={idx} className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                <div className="mb-2 sm:mb-0">
                  <h4 className="font-semibold text-slate-100 text-lg">{opt.suggestion}</h4>
                  <p className="text-sm text-blue-400 mt-1 font-medium">{opt.category}</p>
                </div>
                <span className={`self-start px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                  opt.priority === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  opt.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                  'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {opt.priority} PRIORITY
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 bg-slate-900/50 p-3 rounded-md">
                <span className="flex items-center gap-1">
                  <span className="text-slate-500">Impact:</span> 
                  <span className={opt.impact.includes('High') ? 'text-green-400 font-semibold' : 'text-slate-300'}>{opt.impact}</span>
                </span>
                {opt.code && (
                  <span className="flex items-center gap-2 ml-auto">
                    <span className="text-slate-500">Flag/Code:</span>
                    <code className="bg-slate-800 border border-slate-700 px-2 py-1 rounded text-pink-400 font-mono text-xs">{opt.code}</code>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimizations Impact Bar Chart */}
      {optimizationData.length > 0 && (
        <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
          <h3 className="text-xl font-bold text-slate-100 mb-6">Optimization Impact vs Priority</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={optimizationData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                  cursor={{ fill: '#1e293b' }}
                />
                <Legend />
                <Bar dataKey="Impact" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Priority" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* 5. Complexity Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
          <h3 className="text-xl font-bold text-slate-100 mb-4">Time Complexity</h3>
          <div className="text-4xl font-bold text-blue-400 mb-4">{timeComplexity}</div>
          <p className="text-slate-400">Based on loop nesting: {maxNesting} levels</p>
        </div>
        <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
          <h3 className="text-xl font-bold text-slate-100 mb-4">Space Complexity</h3>
          <div className="text-4xl font-bold text-purple-400 mb-4">{spaceComplexity}</div>
          <p className="text-slate-400">{(result.space_complexity?.factors || []).join(', ') || 'Constant space usage'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
          <h3 className="text-xl font-bold text-slate-100 mb-6">Code Quality Metrics</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Code Quality" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
          <h3 className="text-xl font-bold text-slate-100 mb-6">Complexity Growth ({timeComplexity})</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="n" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} 
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Legend />
                <Line type="monotone" dataKey="operations" name="Operations (Time)" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, fill: '#a855f7' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 6. Detailed Loop Analysis */}
      {result.loops?.loops && result.loops.loops.length > 0 && (
        <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
          <h3 className="text-xl font-bold text-slate-100 mb-6">Loop Analysis Breakdown</h3>
          <div className="space-y-4">
            {result.loops.loops.map((loop, idx) => (
              <div key={idx} className="bg-slate-800 rounded-lg p-5 border border-slate-700">
                <div className="flex flex-wrap justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-widest">{loop.type}</span>
                    <span className="text-slate-400 text-sm">Line {loop.line}</span>
                  </div>
                  <span className="text-slate-300 text-sm bg-slate-700 px-3 py-1 rounded-full">
                    Depth Level: <span className="text-white font-bold">{loop.nesting_level}</span>
                  </span>
                </div>
                <div className="bg-slate-950 p-3 rounded border border-slate-800 overflow-x-auto">
                  <code className="text-sm text-green-400 font-mono whitespace-pre">{loop.code}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Performance Score Card (Moved to bottom) */}
      <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Overall Performance Score</h2>
            <p className="text-slate-400 max-w-sm">Calculated based on your code's algorithmic efficiency, loop complexity, and structural health.</p>
          </div>
          <div className="flex items-center justify-center relative">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={scoreChartData}
                  cx={100}
                  cy={100}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {scoreChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={scoreColors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className={`absolute text-4xl font-bold ${scoreColor}`}>{performanceScore}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
