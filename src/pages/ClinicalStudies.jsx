import { useState } from 'react';
import { useTheme } from '../App.jsx';
import { faker } from '@faker-js/faker';
import { FileText, Users, Calendar, Activity } from 'lucide-react';

const generateStudies = () => {
  return Array(6).fill().map((_, i) => ({
    id: i,
    name: faker.helpers.arrayElement(['ADNI Biomarker Study', 'EEG in Epilepsy', 'Cognitive Reserve in Aging', 'Parkinson\'s Progression', 'Multiple Sclerosis MRI', 'Stroke Recovery Trial']),
    phase: faker.helpers.arrayElement(['Phase I', 'Phase II', 'Phase III', 'Observational']),
    enrolled: faker.number.int({ min: 40, max: 300 }),
    startDate: faker.date.past().toLocaleDateString(),
    status: faker.helpers.arrayElement(['Recruiting', 'Active', 'Completed', 'Analysis']),
    pi: faker.person.fullName()
  }));
};

export default function ClinicalStudies() {
  const { darkMode } = useTheme();
  const [studies] = useState(generateStudies());

  return (
    <div>
      <div className="mb-6"><h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Clinical Studies</h1><p className="text-sm text-gray-500">Ongoing research and clinical trials at NYUROX™</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studies.map(study => (
          <div key={study.id} className={`rounded-xl shadow-sm p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'} hover:shadow-md transition`}>
            <div className="flex items-start justify-between"><h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{study.name}</h3><Activity className="w-5 h-5 text-purple-500" /></div>
            <div className="mt-3 space-y-2"><div className="flex items-center gap-2 text-sm"><FileText className="w-4 h-4 text-gray-400" /><span>{study.phase}</span></div><div className="flex items-center gap-2 text-sm"><Users className="w-4 h-4 text-gray-400" /><span>{study.enrolled} patients enrolled</span></div><div className="flex items-center gap-2 text-sm"><Calendar className="w-4 h-4 text-gray-400" /><span>Started: {study.startDate}</span></div></div>
            <div className="mt-4 flex justify-between items-center"><span className={`px-2 py-1 rounded-full text-xs ${study.status === 'Active' ? 'bg-green-100 text-green-700' : study.status === 'Recruiting' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{study.status}</span><span className="text-xs text-gray-500">PI: {study.pi}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}