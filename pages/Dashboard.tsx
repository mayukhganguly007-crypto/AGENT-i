
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// Added User to the imports
import { CreditCard, TrendingUp, Users, Zap, ExternalLink, Settings, ShoppingBag, Terminal, Activity, ChevronRight, Play, User } from 'lucide-react';
import { MOCK_AGENTS } from '../constants';
import { useApp } from '../App';

const revenueData = [
  { name: 'Mon', revenue: 1200, users: 40 },
  { name: 'Tue', revenue: 1900, users: 55 },
  { name: 'Wed', revenue: 1600, users: 50 },
  { name: 'Thu', revenue: 2400, users: 80 },
  { name: 'Fri', revenue: 2800, users: 95 },
  { name: 'Sat', revenue: 3500, users: 120 },
  { name: 'Sun', revenue: 3100, users: 110 },
];

const Dashboard: React.FC = () => {
  const { userRole, purchasedAgents } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'billing'>('overview');

  const myPurchasedAgents = MOCK_AGENTS.filter(a => purchasedAgents.includes(a.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 relative">
             {/* User is now correctly imported */}
             <User className="text-white w-10 h-10" />
             <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-gray-950 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-4xl font-heading font-bold mb-2">Hello, Alex</h1>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-indigo-500/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-400 border border-indigo-500/20">
                {userRole === 'creator' ? 'Verified Architect' : 'Strategic Partner'}
              </span>
              <p className="text-gray-500 text-sm flex items-center">
                <Activity className="w-4 h-4 mr-2 text-green-500" />
                Infrastructure online
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center space-x-2 bg-white/5 px-6 py-3 rounded-2xl text-sm border border-white/10 hover:bg-white/10 transition font-bold">
            <Settings className="w-4 h-4" />
            <span>Preferences</span>
          </button>
          <Link to="/enlist" className="flex items-center space-x-2 bg-indigo-600 px-8 py-3 rounded-2xl text-sm font-bold shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 transition group">
            <Zap className="w-4 h-4 group-hover:scale-110 transition" />
            <span>Launch New Node</span>
          </Link>
        </div>
      </div>

      {userRole === 'creator' ? (
        /* CREATOR VIEW */
        <div className="space-y-12 animate-in fade-in duration-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Cumulative Revenue', value: '$24,892', trend: '+14.2%', icon: CreditCard, color: 'text-green-500' },
              { label: 'Active Instances', value: '142', trend: '+8', icon: Zap, color: 'text-indigo-500' },
              { label: 'Retention Rate', value: '96%', trend: '+2.1%', icon: Users, color: 'text-purple-500' },
              { label: 'Neural Capacity', value: '72%', trend: 'Optimum', icon: Activity, color: 'text-yellow-500' },
            ].map(stat => (
              <div key={stat.label} className="glass-panel p-8 rounded-[2rem] hover:border-white/20 transition relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-[40px] rounded-full -z-10 group-hover:bg-indigo-500/10 transition"></div>
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl bg-white/5 ${stat.color} shadow-inner`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-white/10 text-gray-500'}`}>
                    {stat.trend}
                  </span>
                </div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-3xl font-heading font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 glass-panel p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-2xl font-heading font-bold text-white">Market Performance</h3>
                <div className="flex space-x-2">
                  {['7D', '1M', '3M', '1Y'].map(t => (
                    <button key={t} className={`px-4 py-2 rounded-xl text-xs font-bold transition ${t === '7D' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="name" stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} dx={-10} />
                    <Tooltip 
                      contentStyle={{ background: '#0f172a', border: '1px solid #ffffff10', borderRadius: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }} 
                      itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-panel p-10 rounded-[2.5rem] flex flex-col shadow-2xl relative overflow-hidden">
              <h3 className="text-2xl font-heading font-bold text-white mb-10">Portfolio</h3>
              <div className="space-y-8 flex-grow overflow-y-auto pr-4 scrollbar-hide max-h-[400px]">
                {MOCK_AGENTS.slice(0, 3).map(agent => (
                  <div key={agent.id} className="flex items-center justify-between group p-2 hover:bg-white/5 rounded-3xl transition">
                    <div className="flex items-center space-x-5">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-xl border border-white/5 group-hover:scale-105 transition">
                        <img src={agent.imageUrl} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-white mb-1 group-hover:text-indigo-400 transition">{agent.name}</h4>
                        <div className="flex items-center space-x-2">
                           <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{agent.sector}</span>
                           <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                           <span className="text-[10px] font-bold text-green-500">Active</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              <button className="mt-10 pt-8 border-t border-white/5 w-full text-indigo-400 text-sm font-bold hover:text-indigo-300 transition flex items-center justify-center group">
                Manage All Agents
                <TrendingUp className="w-4 h-4 ml-3 group-hover:-translate-y-1 transition" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* BUYER VIEW */
        <div className="space-y-12 animate-in fade-in duration-700">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <h3 className="text-3xl font-heading font-bold flex items-center">
                  Subscribed Fleet
                  <span className="ml-4 px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-sm">{myPurchasedAgents.length}</span>
                </h3>

                {myPurchasedAgents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {myPurchasedAgents.map(agent => (
                      <div key={agent.id} className="glass-panel p-8 rounded-[2rem] hover:border-indigo-500/30 transition shadow-xl relative group overflow-hidden">
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-600/5 blur-[50px] rounded-full group-hover:bg-indigo-600/10 transition"></div>
                        <div className="flex items-start justify-between mb-8">
                          <div className="flex items-center space-x-5">
                            <div className="w-16 h-16 rounded-[1.25rem] overflow-hidden shadow-2xl border border-white/10 group-hover:scale-105 transition">
                              <img src={agent.imageUrl} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h4 className="font-bold text-xl text-white group-hover:text-indigo-400 transition">{agent.name}</h4>
                              <p className="text-xs font-bold text-gray-500 tracking-widest uppercase">{agent.sector}</p>
                            </div>
                          </div>
                          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                            <Activity className="w-5 h-5 text-green-500" />
                          </div>
                        </div>

                        <div className="space-y-5 mb-10">
                           <div className="flex justify-between items-center text-sm">
                             <span className="text-gray-500 font-medium">Uptime Status</span>
                             <span className="text-green-500 font-bold">100.0%</span>
                           </div>
                           <div className="flex justify-between items-center text-sm">
                             <span className="text-gray-500 font-medium">Next Billing</span>
                             <span className="text-white font-bold">Aug 24, 2024</span>
                           </div>
                           <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-indigo-500 w-[65%] shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <button className="flex-1 py-3 bg-indigo-600 rounded-2xl text-xs font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/10 flex items-center justify-center space-x-2">
                             <Play className="w-3 h-3 fill-current" />
                             <span>Open Terminal</span>
                           </button>
                           <button className="flex-1 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold hover:bg-white/10 transition text-gray-300">
                             API Configuration
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glass-panel p-20 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-8 border-dashed border-2 border-white/10">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-gray-600">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-3">No Operational Agents</h4>
                      <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">Your fleet is currently empty. Visit the marketplace to find high-performance agents for lead generation and business promotion.</p>
                    </div>
                    <Link to="/" className="px-10 py-4 bg-indigo-600 rounded-2xl font-bold hover:bg-indigo-500 transition shadow-2xl shadow-indigo-600/20">
                      Explore Marketplace
                    </Link>
                  </div>
                )}
              </div>

              <div className="space-y-10">
                <h3 className="text-3xl font-heading font-bold">Cloud Terminal</h3>
                <div className="glass-panel rounded-[2.5rem] p-10 bg-black/40 relative overflow-hidden group border-indigo-500/10">
                  <div className="flex items-center space-x-3 mb-8">
                    <Terminal className="w-6 h-6 text-indigo-500" />
                    <span className="text-sm font-bold tracking-widest uppercase text-gray-500">Live Infrastructure Feed</span>
                  </div>
                  <div className="font-mono text-xs space-y-4">
                    <p className="text-green-500/80">[SYSTEM] Connection established to global relay node-04</p>
                    <p className="text-gray-400">[INFO] Encrypting traffic via RSA-4096...</p>
                    <p className="text-gray-400">[INFO] Agent clusters initialized: 0</p>
                    {myPurchasedAgents.length > 0 ? (
                      myPurchasedAgents.map(a => (
                        <p key={a.id} className="text-indigo-400 animate-pulse">[READY] {a.name} node operational. Awaiting task.</p>
                      ))
                    ) : (
                      <p className="text-rose-500/50">[WARN] No active subscriptions found for this node.</p>
                    )}
                    <div className="flex items-center space-x-2 pt-4">
                      <span className="text-indigo-500 font-bold">$</span>
                      <div className="w-2 h-4 bg-indigo-500 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                   <h4 className="text-xl font-bold text-white mb-6">Subscription Summary</h4>
                   <div className="space-y-6">
                      <div className="flex justify-between items-center pb-6 border-b border-white/5">
                        <span className="text-gray-500">Monthly Spending</span>
                        <span className="text-xl font-bold text-white">${myPurchasedAgents.reduce((acc, curr) => acc + curr.pricing.monthly, 0)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Annual Savings</span>
                        <span className="text-green-500 font-bold">-$0.00</span>
                      </div>
                      <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold hover:bg-white/10 transition mt-4">
                        View Billing History
                      </button>
                   </div>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
