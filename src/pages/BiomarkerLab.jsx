import { useState } from 'react';
import { useTheme } from '../App.jsx';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { faker } from '@faker-js/faker';

const generateBiomarkers = () => [
  { name: 'Tau Protein', value: 325, unit: 'pg/mL', normal: '<300', status: 'Elevated' },
  { name: 'Aβ42/Aβ40', value: 0.68, unit: 'ratio', normal: '>0.75', status: 'Low' },
  { name: 'NfL', value: 1250, unit: 'pg/mL', normal: '<1000', status: 'Elevated' },
  { name: 'GFAP', value: 145, unit: 'pg/mL', normal: '<120', status: 'Elevated' },
  { name: 'S100B', value: 0.42, unit: 'µg/L', normal: '<0.35', status: 'Elevated' },
  { name: 'BDNF', value: 28, unit: 'ng/mL', normal: '>25', status: 'Normal' },
];

const generatePatientBiomarkers = () => {
  return Array(8).fill().map(() => ({
    patient: faker.person.fullName(),
    date: faker.date.recent().toLocaleDateString(),
    tau: faker.number.int({ min: 200, max: 400 }),
    nfl: faker.number.int({ min: 800, max: 1600 }),
    gfap: faker.number.int({ min: 90, max: 180 })
  }));
};

export default function BiomarkerLab() {
  const { darkMode } = useTheme();
  const [biomarkers] = useState(generateBiomarkers());
  const [patientData] = useState(generatePatientBiomarkers());

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Biomarker Lab</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>CSF and blood-based neurological biomarkers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Current Biomarker Panel</h2>
          <div className="space-y-3">
            {biomarkers.map((bio, i) => (
              <div key={i} className={`flex justify-between items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <div><p className="font-medium">{bio.name}</p><p className="text-xs text-gray-500">Normal: {bio.normal}</p></div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{bio.value} {bio.unit}</span>
                  {bio.status === 'Elevated' && <TrendingUp className="w-4 h-4 text-red-500" />}
                  {bio.status === 'Low' && <TrendingDown className="w-4 h-4 text-yellow-500" />}
                  <span className={`text-xs px-2 py-1 rounded-full ${bio.status === 'Elevated' ? 'bg-red-100 text-red-700 dark:bg-red-900/30' : bio.status === 'Low' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{bio.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Patient Biomarker Results</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead><tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="text-left py-2 px-3">Patient</th><th>Date</th><th>Tau (pg/mL)</th><th>NfL (pg/mL)</th><th>GFAP (pg/mL)</th>
              </tr></thead>
              <tbody>
                {patientData.map((p, i) => (
                  <tr key={i} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <td className="py-2 px-3 text-sm">{p.patient}</td>
                    <td className="py-2 px-3 text-sm">{p.date}</td>
                    <td className="py-2 px-3 text-sm" style={{ color: p.tau > 300 ? '#ef4444' : '#22c55e' }}>{p.tau}</td>
                    <td className="py-2 px-3 text-sm" style={{ color: p.nfl > 1000 ? '#ef4444' : '#22c55e' }}>{p.nfl}</td>
                    <td className="py-2 px-3 text-sm" style={{ color: p.gfap > 120 ? '#ef4444' : '#22c55e' }}>{p.gfap}</td>
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