import { useState } from 'react';
import { useTheme } from '../App.jsx';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { faker } from '@faker-js/faker';

const generateMonthlyTrends = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(m => ({ month: m, patients: faker.number.int({ min: 80, max: 160 }), eegs: faker.number.int({ min: 60, max: 140 }) }));
};

const generateDiagnosisDistribution = () => [
  { name: 'Migraine', value: 38, color: '#8b5cf6' }, { name: 'Epilepsy', value: 27, color: '#06b6d4' }, { name: 'Parkinson\'s', value: 15, color: '#f59e0b' }, { name: 'Alzheimer\'s', value: 12, color: '#ef4444' }, { name: 'Other', value: 8, color: '#10b981' }
];

export default function Analytics() {
  const { darkMode } = useTheme();
  const [trends] = useState(generateMonthlyTrends());
  const [distribution] = useState(generateDiagnosisDistribution());

  return (
    <div>
      <div className="mb-6"><h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Analytics</h1><p className="text-sm text-gray-500">Population health trends and diagnostic KPIs</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-4`}>Patient & EEG Volume Trend</h2>
          <ResponsiveContainer width="100%" height={300}><LineChart data={trends}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="patients" stroke="#8b5cf6" name="Active Patients" /><Line type="monotone" dataKey="eegs" stroke="#06b6d4" name="EEG Studies" /></LineChart></ResponsiveContainer>
        </div>
        <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-4`}>Diagnosis Distribution</h2>
          <ResponsiveContainer width="100%" height={300}><PieChart><Pie data={distribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>{distribution.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}