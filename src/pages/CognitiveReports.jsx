import { useState } from 'react';
import { useTheme } from '../App.jsx';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { faker } from '@faker-js/faker';

const generateCognitiveScores = () => {
  return Array(8).fill().map(() => ({
    patient: faker.person.fullName(),
    date: faker.date.recent().toLocaleDateString(),
    memory: faker.number.int({ min: 55, max: 95 }),
    attention: faker.number.int({ min: 60, max: 98 }),
    executive: faker.number.int({ min: 50, max: 92 }),
    processing: faker.number.int({ min: 45, max: 88 }),
    language: faker.number.int({ min: 65, max: 96 })
  }));
};

export default function CognitiveReports() {
  const { darkMode } = useTheme();
  const [scores] = useState(generateCognitiveScores());
  const radarData = [
    { domain: 'Memory', score: 78, baseline: 82 },
    { domain: 'Attention', score: 85, baseline: 80 },
    { domain: 'Executive', score: 72, baseline: 78 },
    { domain: 'Processing', score: 68, baseline: 75 },
    { domain: 'Language', score: 82, baseline: 79 },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Cognitive Reports</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Domain-specific cognitive assessments and longitudinal tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Cognitive Profile (vs Baseline)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <PolarAngleAxis dataKey="domain" tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fill: darkMode ? '#9ca3af' : '#9ca3af' }} />
              <Radar name="Patient" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
              <Radar name="Baseline" dataKey="baseline" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Cognitive Assessments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className="text-left py-2 px-3 text-xs">Patient</th><th>Date</th><th>Memory</th><th>Attention</th><th>Executive</th>
                </tr>
              </thead>
              <tbody>
                {scores.slice(0,5).map((s, i) => (
                  <tr key={i} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <td className="py-2 px-3 text-sm">{s.patient}</td>
                    <td className="py-2 px-3 text-sm">{s.date}</td>
                    <td className="py-2 px-3 text-sm">{s.memory}</td>
                    <td className="py-2 px-3 text-sm">{s.attention}</td>
                    <td className="py-2 px-3 text-sm">{s.executive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}