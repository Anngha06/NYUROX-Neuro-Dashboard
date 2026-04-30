import { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Activity, Users, FileText, AlertCircle, Brain, Waves, Microscope,
  BarChart3, Database, Menu, X, Sun, Moon, Bell, Download,
  Home, Settings, HelpCircle, LogOut
} from 'lucide-react';

// Import pages (we'll create them next)
import Dashboard from './pages/Dashboard';
import EEGAnalysis from './pages/EEGAnalysis';
import CognitiveReports from './pages/CognitiveReports';
import BiomarkerLab from './pages/BiomarkerLab';
import PatientRegistry from './pages/PatientRegistry';
import Analytics from './pages/Analytics';
import ClinicalStudies from './pages/ClinicalStudies';

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('nyurox_theme');
    return saved === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nyurox_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nyurox_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export utility function (will be used by the export button)
export const exportClinicalReport = () => {
  const reportData = {
    date: new Date().toISOString(),
    platform: "NYUROX™ Neural Diagnostics",
    version: "2.0",
    summary: "Clinical report exported from dashboard",
    metrics: {
      totalPatients: 156,
      eegStudies: 142,
      cognitiveAssessments: 89,
      criticalCases: 12
    }
  };
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Report Date,Platform,Total Patients,EEG Studies,Cognitive Assessments,Critical Cases\n"
    + `${reportData.date},${reportData.platform},${reportData.metrics.totalPatients},${reportData.metrics.eegStudies},${reportData.metrics.cognitiveAssessments},${reportData.metrics.criticalCases}`;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `nyurox_report_${new Date().toISOString().slice(0,19)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: 'Neuro Dashboard', path: '/', icon: Activity },
    { name: 'EEG Analysis', path: '/eeg', icon: Waves },
    { name: 'Cognitive Reports', path: '/cognitive', icon: Brain },
    { name: 'Biomarker Lab', path: '/biomarker', icon: Microscope },
    { name: 'Patient Registry', path: '/patients', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Clinical Studies', path: '/studies', icon: Database },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-200 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 ${darkMode ? 'bg-gray-800 border-r border-gray-700' : 'bg-white shadow-lg'}`}>
        
        <div className={`flex items-center justify-between p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>NYUROX™</span>
              <p className="text-[10px] text-purple-500 -mt-1">Neural Life Equations</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
        </div>

        <nav className="p-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg mb-1 transition-colors ${
                location.pathname === item.path 
                  ? darkMode 
                    ? 'bg-purple-900/50 text-purple-300' 
                    : 'bg-purple-50 text-purple-700'
                  : darkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>NYUROX™ v2.0</p>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
              Neural Diagnostics Platform
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72">
        <header className={`sticky top-0 z-40 border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between px-6 py-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
            
            <div className="flex items-center gap-4 ml-auto">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <Bell className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
              
              <button 
                onClick={exportClinicalReport}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white`}
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export Report</span>
              </button>
              
              <div className="flex items-center gap-3 ml-2 pl-3 border-l ${darkMode ? 'border-gray-700' : 'border-gray-200'}">
                <div className="text-right">
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dr. Ruturaj Sodha</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Chief Neuroscientist</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                  RS
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/eeg" element={<EEGAnalysis />} />
            <Route path="/cognitive" element={<CognitiveReports />} />
            <Route path="/biomarker" element={<BiomarkerLab />} />
            <Route path="/patients" element={<PatientRegistry />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/studies" element={<ClinicalStudies />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function WrappedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default WrappedApp;