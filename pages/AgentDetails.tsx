
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
// Added TrendingUp to the imports
import { Star, CheckCircle, ArrowLeft, Send, Sparkles, User, Bot, Loader2, PartyPopper, Zap, TrendingUp } from 'lucide-react';
import { MOCK_AGENTS } from '../constants';
import { AIAgent, Message, Sector } from '../types';
import { gemini } from '../services/geminiService';
import { useApp } from '../App';

const AgentDetails: React.FC = () => {
  const { id } = useParams();
  const { purchaseAgent, purchasedAgents } = useApp();
  const agent = MOCK_AGENTS.find(a => a.id === id);
  const isOwned = agent ? purchasedAgents.includes(agent.id) : false;

  const [activeTab, setActiveTab] = useState<'details' | 'demo' | 'reviews'>('details');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'purchasing' | 'success'>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!agent) {
    return <div className="p-20 text-center text-gray-500 font-heading text-xl">Agent not found.</div>;
  }

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await gemini.testAgent(agent.name, agent.description, messages, input);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response || "The agent is busy calculating. Please try again." }]);
    setIsTyping(false);
  };

  const handlePurchase = async () => {
    if (isOwned) return;
    setPurchaseStatus('purchasing');
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));
    purchaseAgent(agent.id);
    setPurchaseStatus('success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-8">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-white mb-10 transition group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition" />
        Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Media & Demo */}
        <div className="lg:col-span-2">
          <div className="relative rounded-[2rem] overflow-hidden glass-panel border-white/10 mb-10 aspect-[21/9] group">
            <img src={agent.imageUrl} alt={agent.name} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>
            <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="px-3 py-1 bg-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-indigo-600/20">Market Leader</span>
                  <span className="text-gray-400 text-sm flex items-center">
                    <Zap className="w-3 h-3 mr-1 text-yellow-500" />
                    Operational in {agent.sector}
                  </span>
                </div>
                <h1 className="text-5xl font-heading font-bold text-white mb-2 leading-tight">{agent.name}</h1>
                <p className="text-gray-300 text-xl font-medium max-w-xl">{agent.tagline}</p>
              </div>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/5">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-bold text-lg">{agent.rating}</span>
                  <span className="text-gray-500 text-xs">({agent.reviewsCount})</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="flex border-b border-white/5 bg-white/5 backdrop-blur-xl">
              <button 
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-5 text-sm font-bold tracking-wide transition relative ${activeTab === 'details' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Agent Overview
                {activeTab === 'details' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-indigo-500 rounded-full"></div>}
              </button>
              <button 
                onClick={() => setActiveTab('demo')}
                className={`flex-1 py-5 text-sm font-bold tracking-wide transition relative ${activeTab === 'demo' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Try Live Interactive
                {activeTab === 'demo' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-indigo-500 rounded-full"></div>}
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 py-5 text-sm font-bold tracking-wide transition relative ${activeTab === 'reviews' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Performance Reviews
                {activeTab === 'reviews' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-indigo-500 rounded-full"></div>}
              </button>
            </div>

            <div className="p-10 min-h-[450px]">
              {activeTab === 'details' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-heading font-bold flex items-center">
                        <span className="w-2 h-8 bg-indigo-500 rounded-full mr-4"></span>
                        Executive Summary
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-lg">
                        {agent.description}
                      </p>
                      <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex items-start space-x-4">
                        <div className="p-3 bg-indigo-500/10 rounded-2xl">
                          {/* TrendingUp is now correctly imported */}
                          <TrendingUp className="text-indigo-400 w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-white font-bold">Business Impact</p>
                          <p className="text-sm text-gray-500">Typical clients see a 40% reduction in manual lead sorting within 30 days.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-2xl font-heading font-bold">Operational Scope</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {agent.capabilities.map((cap, i) => (
                          <div key={i} className="flex items-center space-x-4 p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition group">
                            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition">
                              <CheckCircle className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-bold text-gray-300 group-hover:text-white transition">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'demo' && (
                <div className="flex flex-col h-[550px] animate-in fade-in duration-300">
                  <div className="flex-grow overflow-y-auto mb-6 space-y-6 pr-4 scrollbar-hide" ref={scrollRef}>
                    {messages.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center text-center px-12 space-y-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-[2.5rem] flex items-center justify-center text-indigo-500 shadow-2xl animate-pulse">
                          <Sparkles className="w-10 h-10" />
                        </div>
                        <div>
                          <h4 className="text-white text-2xl font-bold font-heading mb-2">Simulated Neural Session</h4>
                          <p className="text-gray-500 text-sm max-w-sm mx-auto">Interact with {agent.name} to verify its domain expertise before purchase. The agent is strictly constrained to its {agent.sector} persona.</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                           {['Capabilities?', 'Pricing ROI?', 'Setup time?'].map(q => (
                             <button key={q} onClick={() => setInput(q)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs hover:bg-white/10 transition">{q}</button>
                           ))}
                        </div>
                      </div>
                    )}
                    {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-6 rounded-3xl text-sm shadow-xl ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white/10 text-gray-200 border border-white/5 rounded-tl-none'}`}>
                          <div className="flex items-center space-x-2 mb-2 opacity-50 text-[10px] uppercase font-bold tracking-widest">
                            {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                            <span>{m.role === 'user' ? 'Requester' : agent.name}</span>
                          </div>
                          <p className="leading-relaxed text-base">{m.content}</p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white/10 p-6 rounded-3xl border border-white/5 flex items-center space-x-3 rounded-tl-none">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">Processing request...</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 bg-black/30 p-3 rounded-[1.5rem] border border-white/10 focus-within:ring-2 focus-within:ring-indigo-500/40 transition">
                    <input 
                      type="text" 
                      placeholder={`Brief ${agent.name}...`}
                      className="flex-grow bg-transparent px-5 py-3 text-sm focus:outline-none placeholder:text-gray-600"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button 
                      onClick={handleSend}
                      disabled={isTyping}
                      className="bg-indigo-600 p-3.5 rounded-2xl text-white hover:bg-indigo-500 transition disabled:opacity-50 shadow-lg shadow-indigo-600/20"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="animate-in fade-in duration-300">
                   <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 bg-white/5 p-8 rounded-3xl border border-white/10">
                      <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start text-4xl font-bold text-white mb-2">
                          {agent.rating} <Star className="w-8 h-8 ml-3 text-yellow-500 fill-current" />
                        </div>
                        <p className="text-gray-500 font-medium">Global consensus from {agent.reviewsCount} users</p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2">
                        {['Fast Deployment', 'Reliable', 'Great Support'].map(tag => (
                          <span key={tag} className="px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-bold">{tag}</span>
                        ))}
                      </div>
                      <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition shadow-xl shadow-indigo-600/10">Write Review</button>
                   </div>
                   <div className="space-y-6">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-white/10 transition group">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white shadow-xl shadow-indigo-500/20">
                                {String.fromCharCode(64 + i)}{String.fromCharCode(67 + i)}
                              </div>
                              <div>
                                <h4 className="font-bold text-lg text-white">Client {i}</h4>
                                <p className="text-xs text-indigo-400 font-bold tracking-widest uppercase">Validated in {agent.sector}</p>
                              </div>
                            </div>
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, idx) => (
                                <Star key={idx} className="w-4 h-4 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-400 leading-relaxed italic">"Integrating {agent.name} into our existing stack was seamless. The agent's ability to prioritize leads saved our sales team roughly 15 hours a week. Highly recommend the yearly plan for ROI."</p>
                        </div>
                      ))}
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Checkout */}
        <div>
          <div className="glass-panel rounded-[2rem] p-10 sticky top-24 border-indigo-500/20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-[50px] rounded-full -z-10 group-hover:bg-indigo-600/20 transition duration-700"></div>
            
            {purchaseStatus === 'success' ? (
              <div className="text-center py-12 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
                  <PartyPopper className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">Subscription Active!</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Congratulations. You now have full operational access to {agent.name}. Head to your dashboard to begin deployment.</p>
                <Link to="/dashboard" className="block w-full bg-green-600 py-4 rounded-2xl font-bold text-lg hover:bg-green-500 transition shadow-xl shadow-green-500/20">
                  Go to Dashboard
                </Link>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-heading font-bold mb-8">Deploy Infrastructure</h3>
                <div className="space-y-4 mb-10">
                  <label className="block relative group cursor-pointer">
                    <input type="radio" name="plan" className="peer sr-only" defaultChecked />
                    <div className="p-6 rounded-[1.5rem] border-2 border-white/5 peer-checked:border-indigo-500 peer-checked:bg-indigo-500/5 transition duration-300">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-lg text-white">Monthly Flex</span>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-white">${agent.pricing.monthly}</span>
                          <span className="text-xs text-gray-500">/mo</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">Cancel or upgrade anytime. Perfect for seasonal growth.</p>
                    </div>
                  </label>
                  <label className="block relative group cursor-pointer">
                    <input type="radio" name="plan" className="peer sr-only" />
                    <div className="p-6 rounded-[1.5rem] border-2 border-white/5 peer-checked:border-indigo-500 peer-checked:bg-indigo-500/5 transition duration-300">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className="font-bold text-lg text-white">Yearly Pro</span>
                          <span className="ml-3 px-2 py-1 bg-green-500/20 text-green-500 text-[10px] font-bold rounded-lg border border-green-500/20 tracking-tighter uppercase">Save 20%</span>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-white">${agent.pricing.yearly}</span>
                          <span className="text-xs text-gray-500">/yr</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">Unlimited scale. Dedicated priority queue processing.</p>
                    </div>
                  </label>
                </div>

                <button 
                  onClick={handlePurchase}
                  disabled={purchaseStatus === 'purchasing' || isOwned}
                  className={`w-full py-5 rounded-2xl font-bold text-lg transition shadow-2xl flex items-center justify-center gap-3 ${
                    isOwned 
                      ? 'bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/20'
                  }`}
                >
                  {purchaseStatus === 'purchasing' ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : isOwned ? (
                    'Already Subscribed'
                  ) : (
                    <>
                      <Zap className="w-5 h-5 fill-current" />
                      Instantiate Agent
                    </>
                  )}
                </button>

                <div className="mt-10 space-y-4">
                  <div className="flex items-center text-xs text-gray-400 group-hover:text-gray-300 transition">
                    <CheckCircle className="w-4 h-4 mr-3 text-indigo-500" />
                    Instant API Token Generation
                  </div>
                  <div className="flex items-center text-xs text-gray-400 group-hover:text-gray-300 transition">
                    <CheckCircle className="w-4 h-4 mr-3 text-indigo-500" />
                    Full Enterprise Compliance (GDPR/SOC2)
                  </div>
                  <div className="flex items-center text-xs text-gray-400 group-hover:text-gray-300 transition">
                    <CheckCircle className="w-4 h-4 mr-3 text-indigo-500" />
                    Dedicated Neural Resources
                  </div>
                </div>

                <div className="mt-10 pt-10 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400 overflow-hidden">
                       <img src={`https://ui-avatars.com/api/?name=${agent.creator}&background=6366f1&color=fff`} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Creator Agency</p>
                      <p className="text-sm font-bold text-indigo-400 hover:underline cursor-pointer transition">{agent.creator}</p>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition flex items-center justify-center text-gray-400 hover:text-white">
                    <User className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
