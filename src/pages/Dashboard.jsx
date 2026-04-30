import { useState } from 'react';
import { 
  Users, Waves, Brain, AlertCircle, TrendingUp, TrendingDown,
  User, Search, Filter
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { faker } from '@faker-js/faker';
import { useTheme } from '../App.jsx';

// ========== DUMMY DATA FUNCTIONS ==========
const generateNeuroPatients = () => {
  const conditions = [
    'Migraine with Aura', 'Epilepsy (TLE)', 'Parkinson\'s Disease',
    'Alzheimer\'s Early Onset', 'Multiple Sclerosis', 'Stroke Recovery',
    'Traumatic Brain Injury', 'Essential Tremor'
  ];
  const eegPatterns = ['Normal Alpha', 'Theta Slowing', 'Spike-Wave Discharge', 'Sharp Waves', 'Background Slowing'];
  const patients = [];
  for (let i = 1; i <= 15; i++) {
    patients.push({
      id: i,
      name: faker.person.fullName(),
      age: faker.number.int({ min: 22, max: 85 }),
      gender: faker.person.sex(),
      condition: faker.helpers.arrayElement(conditions),
      eegPattern: faker.helpers.arrayElement(eegPatterns),
      cognitiveScore: faker.number.int({ min: 45, max: 98 }),
      lastEEG: faker.date.recent({ days: 45 }).toLocaleDateString(),
      riskLevel: faker.helpers.arrayElement(['Low', 'Medium', 'High', 'Critical']),
    });
  }
  return patients;
};

const generateEEGTrends = () => {
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
  return weeks.map(week => ({
    week,
    alphaPower: faker.number.int({ min: 40, max: 85 }),
    thetaPower: faker.number.int({ min: 15, max: 45 }),
    seizureProbability: faker.number.int({ min: 2, max: 38 }),
  }));
};

const generateCognitiveDomains = () => {
  return [
    { domain: 'Memory', score: 78, avgBaseline: 82 },
    { domain: 'Attention', score: 85, avgBaseline: 80 },
    { domain: 'Executive Function', score: 72, avgBaseline: 78 },
    { domain: 'Processing Speed', score: 68, avgBaseline: 75 },
    { domain: 'Language', score: 82, avgBaseline: 79 },
    { domain: 'Visuospatial', score: 75, avgBaseline: 77 },
  ];
};

const generateDiagnosticStats = () => {
  return [
    { test: 'EEG (Routine)', completed: 142, pending: 18, abnormal: 67 },
    { test: 'MRI Brain', completed: 98, pending: 12, abnormal: 43 },
    { test: 'Cognitive Assessment', completed: 156, pending: 9, abnormal: 89 },
    { test: 'Evoked Potentials', completed: 64, pending: 21, abnormal: 28 },
    { test: 'Polysomnography', completed: 47, pending: 8, abnormal: 31 },
  ];
};

const generateBiomarkerData = () => {
  return [
    { biomarker: 'Tau Protein', value: 325, normalRange: '<300', status: 'Elevated', unit: 'pg/mL' },
    { biomarker: 'Aβ42/Aβ40 Ratio', value: 0.68, normalRange: '>0.75', status: 'Low', unit: 'ratio' },
    { biomarker: 'NfL (Neurofilament)', value: 1250, normalRange: '<1000', status: 'Elevated', unit: 'pg/mL' },
    { biomarker: 'GFAP', value: 145, normalRange: '<120', status: 'Elevated', unit: 'pg/mL' },
    { biomarker: 'S100B', value: 0.42, normalRange: '<0.35', status: 'Elevated', unit: 'µg/L' },
  ];
};

const generateRecentDiagnostics = () => {
  const actions = [
    'EEG Report Generated', 'MRI Analysis Complete', 'Cognitive Score Updated',
    'Seizure Risk Assessment', 'Biomarker Panel Processed', 'Follow-up Scheduled'
  ];
  const patients = ['Eleanor Chen', 'James Okonkwo', 'Maria Garcia', 'David Kim', 'Sarah Johnson'];
  const doctors = ['Dr. Sharma', 'Dr. Chen', 'Dr. Patel', 'Dr. Williams'];
  return Array(8).fill().map((_, i) => ({
    id: i,
    patient: faker.helpers.arrayElement(patients),
    action: faker.helpers.arrayElement(actions),
    time: faker.date.recent({ days: 3 }).toLocaleString(),
    status: faker.helpers.arrayElement(['completed', 'processing', 'scheduled']),
    doctor: faker.helpers.arrayElement(doctors)
  }));
};

// ========== STAT CARD COMPONENT ==========
const StatCard = ({ title, value, change, icon: Icon, subtitle }) => {
  const { darkMode } = useTheme();
  return (
    <div className={`rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md ${
      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
          <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
          {subtitle && <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{subtitle}</p>}
          {change !== undefined && change !== 0 && (
            <div className="flex items-center mt-2">
              {change > 0 ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />}
              <span className={`text-xs font-medium ml-1 ${change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {Math.abs(change)}% from last month
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${Icon === Brain ? 'from-purple-500 to-indigo-600' : 'from-blue-500 to-blue-600'}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

// ========== PATIENT TABLE COMPONENT ==========
const PatientTable = ({ patients }) => {
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskColor = (risk) => {
    const colors = {
      'Low': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'High': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'Critical': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };
    return colors[risk] || 'bg-gray-100 text-gray-800';
  };

  const getCognitiveScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 65) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Neurological Patients</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search patients..."
              className={`pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className={`p-2 border rounded-lg ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
            <Filter className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <th className="text-left py-3 px-4 text-xs font-medium uppercase">Patient</th>
              <th className="text-left py-3 px-4 text-xs font-medium uppercase">Age/Gender</th>
              <th className="text-left py-3 px-4 text-xs font-medium uppercase">Condition</th>
              <th className="text-left py-3 px-4 text-xs font-medium uppercase">EEG Pattern</th>
              <th className="text-left py-3 px-4 text-xs font-medium uppercase">Cognitive Score</th>
              <th className="text-left py-3 px-4 text-xs font-medium uppercase">Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-purple-900/50' : 'bg-purple-100'}`}>
                      <User className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{patient.name}</span>
                  </div>
                </td>
                <td className={`py-3 px-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{patient.age} / {patient.gender}</td>
                <td className={`py-3 px-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{patient.condition}</td>
                <td className={`py-3 px-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{patient.eegPattern}</td>
                <td className={`py-3 px-4 text-sm font-semibold ${getCognitiveScoreColor(patient.cognitiveScore)}`}>{patient.cognitiveScore}/100</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(patient.riskLevel)}`}>{patient.riskLevel}</span>
                </td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ========== EEG TRENDS CHART ==========
const EEGTrendsChart = ({ data }) => {
  const { darkMode } = useTheme();
  return (
    <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>EEG Band Power Trends (6 Weeks)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
          <XAxis dataKey="week" stroke={darkMode ? '#9ca3af' : '#9ca3af'} />
          <YAxis stroke={darkMode ? '#9ca3af' : '#9ca3af'} />
          <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#fff', borderColor: darkMode ? '#374151' : '#e5e7eb' }} />
          <Legend wrapperStyle={{ color: darkMode ? '#fff' : '#000' }} />
          <Line type="monotone" dataKey="alphaPower" stroke="#8b5cf6" strokeWidth={2} name="Alpha (µV²)" />
          <Line type="monotone" dataKey="thetaPower" stroke="#06b6d4" strokeWidth={2} name="Theta (µV²)" />
          <Line type="monotone" dataKey="seizureProbability" stroke="#ef4444" strokeWidth={2} name="Seizure Risk (%)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// ========== COGNITIVE RADAR CHART ==========
const CognitiveRadar = ({ data }) => {
  const { darkMode } = useTheme();
  return (
    <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Cognitive Domain Profile</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke={darkMode ? '#374151' : '#e5e7eb'} />
          <PolarAngleAxis dataKey="domain" tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: darkMode ? '#9ca3af' : '#9ca3af' }} />
          <Radar name="Patient Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
          <Radar name="Age-Matched Baseline" dataKey="avgBaseline" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
          <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#fff' }} />
          <Legend wrapperStyle={{ color: darkMode ? '#fff' : '#000' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

// ========== BIOMARKER PANEL ==========
const BiomarkerPanel = ({ biomarkers }) => {
  const { darkMode } = useTheme();
  const getStatusIcon = (status) => {
    if (status === 'Elevated') return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (status === 'Low') return <TrendingDown className="w-4 h-4 text-yellow-500" />;
    return null;
  };
  return (
    <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Neuro-Biomarker Panel</h2>
      <div className="space-y-3">
        {biomarkers.map((bio, idx) => (
          <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{bio.biomarker}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Normal: {bio.normalRange}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{bio.value} {bio.unit}</span>
              {getStatusIcon(bio.status)}
              <span className={`text-xs px-2 py-1 rounded-full ${
                bio.status === 'Elevated' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                bio.status === 'Low' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                'bg-green-100 text-green-700'
              }`}>{bio.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ========== MAIN DASHBOARD COMPONENT ==========
export default function Dashboard() {
  const { darkMode } = useTheme();
  const [patients] = useState(generateNeuroPatients());
  const [eegTrends] = useState(generateEEGTrends());
  const [cognitiveDomains] = useState(generateCognitiveDomains());
  const [diagnosticStats] = useState(generateDiagnosticStats());
  const [biomarkers] = useState(generateBiomarkerData());
  const [recentDiagnostics] = useState(generateRecentDiagnostics());

  const stats = [
    { title: 'Active Neuro Patients', value: '156', change: 12, icon: Users, subtitle: '+8 new this week' },
    { title: 'EEG Studies', value: '142', change: 8, icon: Waves, subtitle: '34 abnormal findings' },
    { title: 'Cognitive Assessments', value: '89', change: -3, icon: Brain, subtitle: 'Avg score: 74.2' },
    { title: 'Critical Cases', value: '12', change: 5, icon: AlertCircle, subtitle: 'Requires immediate review' },
  ];

  return (
    <>
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-xl font-bold">NYUROX™ Neural Diagnostics Platform</h1>
            <p className="text-purple-100 text-sm mt-1">Leveraging Neural Life Equations for precision neurology</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs">v2.0 - Clinical Beta</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs">HIPAA Compliant</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, idx) => <StatCard key={idx} {...stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <EEGTrendsChart data={eegTrends} />
        <CognitiveRadar data={cognitiveDomains} />
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Diagnostic Test Volume & Abnormal Findings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={diagnosticStats}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="test" stroke={darkMode ? '#9ca3af' : '#9ca3af'} angle={-15} textAnchor="end" height={60} />
              <YAxis stroke={darkMode ? '#9ca3af' : '#9ca3af'} />
              <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#fff', borderColor: darkMode ? '#374151' : '#e5e7eb' }} />
              <Legend wrapperStyle={{ color: darkMode ? '#fff' : '#000' }} />
              <Bar dataKey="completed" fill="#8b5cf6" name="Completed" />
              <Bar dataKey="pending" fill="#eab308" name="Pending" />
              <Bar dataKey="abnormal" fill="#ef4444" name="Abnormal Findings" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <BiomarkerPanel biomarkers={biomarkers} />
        <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Neuro-Diagnostics</h2>
          <div className="space-y-3">
            {recentDiagnostics.map((activity) => (
              <div key={activity.id} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-500' : activity.status === 'processing' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activity.patient}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.doctor}</p>
                  <p className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{new Date(activity.time).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PatientTable patients={patients} />
    </>
  );
}