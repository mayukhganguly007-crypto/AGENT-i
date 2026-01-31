
import React, { useState, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { ShoppingBag, PlusCircle, User, Bell, TrendingUp, Menu, X, Sparkles } from 'lucide-react';
import Marketplace from './pages/Marketplace';
import AgentDetails from './pages/AgentDetails';
import CreateAgent from './pages/CreateAgent';
import Dashboard from './pages/Dashboard';

// Simple global state for the demo
interface AppContextType {
  purchasedAgents: string[];
  purchaseAgent: (id: string) => void;
  userRole: 'buyer' | 'creator';
  setUserRole: (role: 'buyer' | 'creator') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userRole, setUserRole, purchasedAgents } = useApp();

  return (
    <nav className="glass-panel sticky top-0 z-50 px-4 py-3 sm:px-8 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <span className="font-heading text-2xl font-bold tracking-tight text-white">AGENT-i</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition">Explore</Link>
          <Link to="/dashboard" className="text-sm font-medium text-gray-400 hover:text-white transition flex items-center">
            Dashboard
            {purchasedAgents.length > 0 && (
              <span className="ml-2 w-5 h-5 bg-indigo-600 rounded-full text-[10px] flex items-center justify-center text-white">
                {purchasedAgents.length}
              </span>
            )}
          </Link>
          <Link to="/enlist" className="flex items-center space-x-1 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-sm font-medium transition group">
            <PlusCircle className="w-4 h-4 group-hover:text-indigo-400 transition" />
            <span>Enlist Agent</span>
          </Link>
          <div className="flex items-center space-x-4 pl-4 border-l border-white/10">
             <button 
              onClick={() => setUserRole(userRole === 'buyer' ? 'creator' : 'buyer')}
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 rounded-md hover:bg-white/10 transition text-indigo-400"
            >
              {userRole} Mode
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition"><User className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 p-2">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden pt-4 pb-3 border-t border-white/10 mt-3 space-y-4 animate-in slide-in-from-top-4">
          <Link to="/" className="block text-gray-400 hover:text-white py-2" onClick={() => setIsOpen(false)}>Explore</Link>
          <Link to="/dashboard" className="block text-gray-400 hover:text-white py-2" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link to="/enlist" className="block text-indigo-400 font-semibold py-2" onClick={() => setIsOpen(false)}>Enlist Agent</Link>
          <button 
            onClick={() => { setUserRole(userRole === 'buyer' ? 'creator' : 'buyer'); setIsOpen(false); }}
            className="w-full text-left text-[10px] font-bold uppercase py-2 text-gray-500"
          >
            Switch to {userRole === 'buyer' ? 'Creator' : 'Buyer'}
          </button>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="border-t border-white/5 py-16 px-4 sm:px-8 mt-20 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="text-white w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-xl">AGENT-i</span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">The premier decentralized marketplace for elite AI agents. Empowering businesses with operational excellence through specialized intelligence.</p>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-white">Sectors</h4>
        <ul className="text-sm text-gray-500 space-y-3">
          <li><a href="#" className="hover:text-indigo-400 transition">Lead Generation</a></li>
          <li><a href="#" className="hover:text-indigo-400 transition">SaaS Marketing</a></li>
          <li><a href="#" className="hover:text-indigo-400 transition">Dev Automations</a></li>
          <li><a href="#" className="hover:text-indigo-400 transition">Legal Tech</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-white">Platform</h4>
        <ul className="text-sm text-gray-500 space-y-3">
          <li><a href="#" className="hover:text-indigo-400 transition">API Documentation</a></li>
          <li><a href="#" className="hover:text-indigo-400 transition">Creator Dashboard</a></li>
          <li><a href="#" className="hover:text-indigo-400 transition">Success Stories</a></li>
          <li><a href="#" className="hover:text-indigo-400 transition">Pricing Policy</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-white">Global Feed</h4>
        <p className="text-sm text-gray-500 mb-6 flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-indigo-500" />
          New high-performance agents weekly.
        </p>
        <div className="flex group">
          <input type="email" placeholder="email@example.com" className="bg-white/5 border border-white/10 rounded-l-2xl px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition shadow-inner" />
          <button className="bg-indigo-600 px-6 py-3 rounded-r-2xl hover:bg-indigo-500 transition font-bold shadow-lg shadow-indigo-500/10">Join</button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-xs text-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">
      <p>&copy; 2024 AGENT-i Marketplace. All rights reserved.</p>
      <div className="flex space-x-6">
        <a href="#" className="hover:text-white transition">Privacy</a>
        <a href="#" className="hover:text-white transition">Terms</a>
        <a href="#" className="hover:text-white transition">Contact</a>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [purchasedAgents, setPurchasedAgents] = useState<string[]>([]);
  const [userRole, setUserRole] = useState<'buyer' | 'creator'>('buyer');

  const purchaseAgent = (id: string) => {
    if (!purchasedAgents.includes(id)) {
      setPurchasedAgents(prev => [...prev, id]);
    }
  };

  return (
    <AppContext.Provider value={{ purchasedAgents, purchaseAgent, userRole, setUserRole }}>
      <HashRouter>
        <div className="min-h-screen flex flex-col text-gray-200">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Marketplace />} />
              <Route path="/agent/:id" element={<AgentDetails />} />
              <Route path="/enlist" element={<CreateAgent />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
