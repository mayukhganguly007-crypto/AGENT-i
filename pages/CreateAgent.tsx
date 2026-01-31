
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Sparkles, Loader2, Info, ChevronRight, Check } from 'lucide-react';
import { gemini } from '../services/geminiService';
import { Sector } from '../types';

const CreateAgent: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [idea, setIdea] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    sector: Sector.SALES,
    monthlyPrice: 29,
    yearlyPrice: 290,
    capabilities: ['', '', '']
  });

  const generateWithAI = async () => {
    if (!idea.trim()) return;
    setIsGenerating(true);
    const result = await gemini.generateAgentDescription(idea);
    if (result) {
      setFormData({
        ...formData,
        name: result.name || '',
        tagline: result.tagline || '',
        description: result.description || '',
        capabilities: result.capabilities || ['', '', '']
      });
      setStep(2);
    }
    setIsGenerating(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCapabilityChange = (index: number, value: string) => {
    const newCaps = [...formData.capabilities];
    newCaps[index] = value;
    setFormData(prev => ({ ...prev, capabilities: newCaps }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold mb-4">Enlist Your <span className="gradient-text">Agent-i</span></h1>
        <p className="text-gray-400">Share your specialized intelligence with the world and start earning.</p>
      </div>

      <div className="flex items-center justify-center space-x-4 mb-12">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-500'}`}>
          {step > 1 ? <Check className="w-4 h-4" /> : '1'}
        </div>
        <div className={`w-16 h-0.5 transition ${step > 1 ? 'bg-indigo-600' : 'bg-white/5'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-500'}`}>
          {step > 2 ? <Check className="w-4 h-4" /> : '2'}
        </div>
        <div className={`w-16 h-0.5 transition ${step > 2 ? 'bg-indigo-600' : 'bg-white/5'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-500'}`}>
          3
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-8 sm:p-12 shadow-2xl">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-4 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-indigo-400" />
                Describe your agent concept (Our AI will draft the profile)
              </label>
              <textarea 
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white h-40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition placeholder:text-gray-600"
                placeholder="e.g., A customer support agent that specialized in SaaS companies using React and Node.js. It should be friendly and handle technical documentation efficiently."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
              />
            </div>
            <button 
              onClick={generateWithAI}
              disabled={isGenerating || !idea.trim()}
              className="w-full bg-indigo-600 py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-indigo-500 transition disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  AI Architecting...
                </>
              ) : (
                <>
                  Draft Profile with AI
                  <ChevronRight className="w-5 h-5 ml-1" />
                </>
              )}
            </button>
            <div className="flex items-start space-x-3 p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
              <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-indigo-300/80 leading-relaxed">
                Using AI to draft your profile ensures higher conversion. You can manually edit everything in the next step.
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Agent Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Sector</label>
                <select 
                  name="sector" 
                  value={formData.sector} 
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                >
                  {Object.values(Sector).map(s => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Tagline</label>
              <input 
                type="text" 
                name="tagline" 
                value={formData.tagline} 
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Full Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white h-32 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="space-y-4">
              <label className="text-sm text-gray-400">Capabilities</label>
              {formData.capabilities.map((cap, i) => (
                <input 
                  key={i}
                  type="text" 
                  placeholder={`Capability ${i + 1}`}
                  value={cap} 
                  onChange={(e) => handleCapabilityChange(i, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              ))}
            </div>
            <div className="flex space-x-4">
               <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-2xl border border-white/10 font-bold hover:bg-white/5 transition">Back</button>
               <button onClick={() => setStep(3)} className="flex-1 py-4 rounded-2xl bg-indigo-600 font-bold hover:bg-indigo-500 transition">Set Pricing</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl border-2 border-indigo-500/50 bg-indigo-500/5">
                  <h4 className="font-bold mb-6 text-center">Monthly Subscription</h4>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl text-gray-500">$</span>
                    <input 
                      type="number" 
                      name="monthlyPrice"
                      value={formData.monthlyPrice}
                      onChange={handleInputChange}
                      className="bg-transparent text-5xl font-bold w-32 text-center focus:outline-none" 
                    />
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-4">Average for {formData.sector}: $39 - $69</p>
                </div>
                <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
                  <h4 className="font-bold mb-6 text-center">Yearly Subscription</h4>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl text-gray-500">$</span>
                    <input 
                      type="number" 
                      name="yearlyPrice"
                      value={formData.yearlyPrice}
                      onChange={handleInputChange}
                      className="bg-transparent text-5xl font-bold w-32 text-center focus:outline-none" 
                    />
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-4">Save ~20% for your users</p>
                </div>
             </div>
             
             <div className="space-y-4">
                <h4 className="font-bold">Connect AI Engine</h4>
                <p className="text-sm text-gray-400">To enable "Live Demo", provide your model's endpoint or system instructions.</p>
                <input 
                  type="text" 
                  placeholder="System Prompt / API URL"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
             </div>

             <button 
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-5 rounded-2xl font-bold text-lg hover:from-indigo-500 hover:to-purple-500 transition shadow-2xl shadow-indigo-500/20"
            >
              Launch Agent to Marketplace
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAgent;
