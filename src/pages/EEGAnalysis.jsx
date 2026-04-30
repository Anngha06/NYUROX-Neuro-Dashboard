import { useState } from 'react';
import { useTheme } from '../App.jsx';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { faker } from '@faker-js/faker';
import { Activity, Download, Filter, Calendar } from 'lucide-react';

const generateEEGData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(m => ({
    month: m,
    alpha: faker.number.int({ min: 40, max: 85 }),
    theta: faker.number.int({ min: 15, max: 45 }),
    delta: faker.number.int({ min: 5, max: 25 }),
    beta: faker.number.int({ min: 10, max: 35 })
  }));
};

const generatePatientEEGList = () => {
  return Array(10).fill().map((_, i) => ({
    id: i,
    patient: faker.person.fullName(),
    date: faker.date.recent().toLocaleDateString(),
    alphaPower: faker.number.int({ min: 35, max: 90 }),
    thetaPower: faker.number.int({ min: 10, max: 50 }),
    seizureRisk: faker.number.int({ min: 5, max: 45 }),
    interpretation: faker.helpers.arrayElement(['Normal', 'Mild Slowing', 'Moderate Slowing', 'Epileptiform Discharges'])
  }));
};

export default function EEGAnalysis() {
  const { darkMode } = useTheme();
  const [eegTrends] = useState(generateEEGData());
  const [patientEEGs] = useState(generatePatientEEGList());

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>EEG Analysis</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Quantitative EEG band power trends and patient-level interpretation</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>EEG Band Power Trends (6 months)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={eegTrends}>
              <CartesianGrid stroke={darkMode ? '#374151' : '#e5e7eb'} strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#9ca3af'} />
              <YAxis stroke={darkMode ? '#9ca3af' : '#9ca3af'} />
              <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="alpha" stroke="#8b5cf6" name="Alpha (µV²)" />
              <Line type="monotone" dataKey="theta" stroke="#06b6d4" name="Theta (µV²)" />
              <Line type="monotone" dataKey="delta" stroke="#ef4444" name="Delta (µV²)" />
              <Line type="monotone" dataKey="beta" stroke="#f59e0b" name="Beta (µV²)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent EEG Studies</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Patient</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Alpha Power</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Theta Power</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Seizure Risk</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Interpretation</th>
              </tr>
            </thead>
            <tbody>
              {patientEEGs.map(eeg => (
                <tr key={eeg.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <td className="py-3 px-4 text-sm">{eeg.patient}</td>
                  <td className="py-3 px-4 text-sm">{eeg.date}</td>
                  <td className="py-3 px-4 text-sm">{eeg.alphaPower} µV²</td>
                  <td className="py-3 px-4 text-sm">{eeg.thetaPower} µV²</td>
                  <td className="py-3 px-4 text-sm font-semibold" style={{ color: eeg.seizureRisk > 30 ? '#ef4444' : '#22c55e' }}>{eeg.seizureRisk}%</td>
                  <td className="py-3 px-4 text-sm">{eeg.interpretation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}