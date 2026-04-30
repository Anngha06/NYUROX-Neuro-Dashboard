import { useState } from 'react';
import { useTheme } from '../App.jsx';
import { Search, Filter, User } from 'lucide-react';
import { faker } from '@faker-js/faker';

const generateFullPatientList = () => {
  return Array(20).fill().map((_, i) => ({
    id: i,
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 90 }),
    gender: faker.person.sex(),
    condition: faker.helpers.arrayElement(['Migraine', 'Epilepsy', 'Parkinson\'s', 'Alzheimer\'s', 'MS', 'Stroke']),
    lastVisit: faker.date.recent({ days: 60 }).toLocaleDateString(),
    risk: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
    doctor: faker.helpers.arrayElement(['Dr. Sharma', 'Dr. Chen', 'Dr. Patel'])
  }));
};

export default function PatientRegistry() {
  const { darkMode } = useTheme();
  const [patients] = useState(generateFullPatientList());
  const [search, setSearch] = useState('');

  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.condition.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <div><h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Patient Registry</h1><p className="text-sm text-gray-500">Full list of neurological patients</p></div>
        <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search..." className={`pl-9 pr-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'}`} value={search} onChange={e => setSearch(e.target.value)} /></div>
      </div>
      <div className={`rounded-xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <table className="min-w-full">
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr><th className="py-3 px-4 text-left text-xs font-medium">Name</th><th>Age/Gender</th><th>Condition</th><th>Last Visit</th><th>Risk</th><th>Doctor</th></tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className="py-3 px-4"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center"><User className="w-4 h-4 text-purple-600" /></div>{p.name}</div></td>
                <td className="py-3 px-4">{p.age}/{p.gender}</td><td className="py-3 px-4">{p.condition}</td><td className="py-3 px-4">{p.lastVisit}</td>
                <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs ${p.risk === 'High' ? 'bg-red-100 text-red-700' : p.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{p.risk}</span></td>
                <td className="py-3 px-4">{p.doctor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}