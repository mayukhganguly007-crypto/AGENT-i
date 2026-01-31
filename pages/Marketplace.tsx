
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Star, Filter } from 'lucide-react';
import { MOCK_AGENTS } from '../constants';
import { Sector } from '../types';

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<Sector | 'All'>('All');

  const sectors = ['All', ...Object.values(Sector)];

  const filteredAgents = useMemo(() => {
    return MOCK_AGENTS.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            agent.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = selectedSector === 'All' || agent.sector === selectedSector;
      return matchesSearch && matchesSector;
    });
  }, [searchTerm, selectedSector]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-8">
      {/* Hero Section */}
      <div className="relative mb-16 py-16 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-600/20 blur-[120px] rounded-full -z-10"></div>
        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
          The Marketplace for <br />
          <span className="gradient-text">Hyper-Intelligent Agents</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
          Scale your business with autonomous AI experts. Hire, integrate, and automate in minutes.
        </p>
        
        <div className="max-w-2xl mx-auto relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-indigo-400 transition" />
          <input 
            type="text" 
            placeholder="Search agents by name, skill, or creator..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition shadow-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {sectors.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSector(s as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                selectedSector === s 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white bg-white/5 px-4 py-2 rounded-xl transition self-start">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Advanced Filters</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map(agent => (
          <Link key={agent.id} to={`/agent/${agent.id}`} className="group block">
            <div className="glass-panel rounded-3xl overflow-hidden h-full flex flex-col hover:border-indigo-500/50 transition-all duration-300 transform group-hover:-translate-y-1">
              <div className="relative h-48 bg-gray-900">
                <img src={agent.imageUrl} alt={agent.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold text-indigo-400 border border-indigo-500/30">
                    {agent.sector}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition">{agent.name}</h3>
                  <div className="flex items-center text-yellow-500 text-xs font-bold">
                    <Star className="w-3 h-3 fill-current mr-1" />
                    {agent.rating}
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{agent.tagline}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {agent.capabilities.slice(0, 2).map(cap => (
                    <span key={cap} className="text-[10px] bg-white/5 px-2 py-1 rounded-md text-gray-400">{cap}</span>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">From </span>
                    <span className="text-lg font-bold text-white">${agent.pricing.monthly}</span>
                    <span className="text-xs text-gray-500">/mo</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition">
                    <Filter className="w-5 h-5 rotate-90" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
