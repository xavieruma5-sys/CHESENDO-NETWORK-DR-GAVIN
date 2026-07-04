import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  ExternalLink, 
  Copy, 
  Check, 
  Plus, 
  Search, 
  Video, 
  Globe, 
  Sparkles, 
  Share2, 
  Trash2, 
  Lock, 
  Wallet, 
  Calendar, 
  TrendingUp, 
  Coins, 
  BookOpen,
  Info,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Bell,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types & Data
import { Advertisement, AdCategory } from './types';
import { companyCEOProfile, preseededAds, categoriesList } from './data';
import { getYouTubeEmbedUrl, formatDate, isValidUrl } from './utils';

export default function App() {
  // State for Advertisements (persisted via localStorage)
  const [ads, setAds] = useState<Advertisement[]>(() => {
    const saved = localStorage.getItem('chesendo_ads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error reading saved ads", e);
      }
    }
    return preseededAds;
  });

  // Save ads to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('chesendo_ads', JSON.stringify(ads));
  }, [ads]);

  // UI States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isPublisherOpen, setIsPublisherOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showJoelExplanation, setShowJoelExplanation] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // USDT Simulation States
  const [simAmount, setSimAmount] = useState('100');
  const [simDestination, setSimDestination] = useState('Europe');
  const [simulated, setSimulated] = useState(false);

  // Knew Project AI Mentor Chat States
  const [mentorQuestion, setMentorQuestion] = useState<string>('');
  const [mentorAnswer, setMentorAnswer] = useState<string>('Welcome! I am the official Knew Project AI Mentor. Select one of the quick questions below to see how I help users understand blockchain technology, USDT global transfers, and marketing strategies in real time.');
  const [isMentorTyping, setIsMentorTyping] = useState<boolean>(false);

  // New Ad Form State
  const [newAd, setNewAd] = useState({
    title: '',
    category: 'General' as AdCategory,
    message: '',
    videoUrl: '',
    authorName: '',
    contactMethod: 'whatsapp' as 'whatsapp' | 'telegram' | 'phone' | 'email',
    contactValue: '',
  });

  // Jamaican Local Time state
  const [jamTime, setJamTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'America/Jamaica',
        hour: '2-digit' as const,
        minute: '2-digit' as const,
        second: '2-digit' as const,
        hour12: true
      };
      setJamTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Show a temporary banner notification
  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Handle Partner link copy
  const handleCopyLink = () => {
    const partnerLink = "https://member.knewproject.net/register/?Username=KP6609504";
    navigator.clipboard.writeText(partnerLink);
    setCopiedLink(true);
    triggerNotification("📋 Official Registration Link copied to clipboard!");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Handle Ask Mentor question simulator
  const handleAskMentor = (q: string, ans: string) => {
    setMentorQuestion(q);
    setIsMentorTyping(true);
    setMentorAnswer('');
    
    setTimeout(() => {
      setMentorAnswer(ans);
      setIsMentorTyping(false);
      triggerNotification("🤖 Knew Project AI Mentor answered your inquiry!");
    }, 1200);
  };

  // Handle submit new advertisement
  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newAd.title.trim() || !newAd.message.trim() || !newAd.authorName.trim() || !newAd.contactValue.trim()) {
      triggerNotification("⚠️ Please fill in all required fields.");
      return;
    }

    const created: Advertisement = {
      id: `ad-${Date.now()}`,
      title: newAd.title,
      category: newAd.category,
      message: newAd.message,
      videoUrl: newAd.videoUrl.trim() || undefined,
      authorName: newAd.authorName,
      contactMethod: newAd.contactMethod,
      contactValue: newAd.contactValue.trim(),
      createdAt: new Date().toISOString(),
      isPreseeded: false
    };

    setAds([created, ...ads]);
    setIsPublisherOpen(false);
    
    // Reset form
    setNewAd({
      title: '',
      category: 'General',
      message: '',
      videoUrl: '',
      authorName: '',
      contactMethod: 'whatsapp',
      contactValue: '',
    });

    triggerNotification("🚀 Advertisement successfully published to the live stream!");
  };

  // Delete custom ad
  const handleDeleteAd = (id: string) => {
    setAds(ads.filter(ad => ad.id !== id));
    triggerNotification("🗑️ Advertisement removed successfully.");
  };

  // Filter & Search logic
  const filteredAds = ads.filter(ad => {
    const matchesCategory = selectedCategory === 'All' || ad.category === selectedCategory;
    const matchesSearch = 
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#060a12] text-gray-100 font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Background Ambience Lines */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500 rounded-full filter blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Floating Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 bg-gray-900 border-2 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)] px-6 py-4 rounded-xl text-emerald-400 font-medium"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Rail */}
      <header className="relative z-10 border-b border-gray-800 bg-[#090d16]/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-black text-xl shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                C
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-emerald-400 to-cyan-400 rounded-lg blur opacity-30 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white font-display flex items-center gap-1.5">
                CHESENDO <span className="text-emerald-400">NETWORK</span>
              </h1>
              <p className="text-[10px] text-gray-400 tracking-wider uppercase font-mono">Global Marketing & Blockchain Partner</p>
            </div>
          </div>

          {/* Slogan & Metadata */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 font-mono text-xs">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              Westmoreland, Jamaica
            </span>
            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <ClockIcon className="w-3.5 h-3.5" />
              Jamaica Time: {jamTime || "Loading..."}
            </span>
          </div>

        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Row 1: Executive C.E.O Card & Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Mission statement */}
          <div className="lg:col-span-2 space-y-6 flex flex-col justify-between bg-gradient-to-br from-gray-950 to-[#0e1424] border border-gray-800 p-6 sm:p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 rounded-full blur-2xl" />
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Our Core Mandate
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white font-display leading-tight sm:text-4xl">
                Bridging Global Business with <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Next-Gen Blockchain Technology</span>
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                What we do is allow individuals and enterprises to fully understand what business advertising, products, and services are available, how to use them, or how to become part of that business. We remove geographic hurdles and financial bottlenecks.
              </p>
            </div>

            {/* Core Values / Bullet Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-800/80 mt-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Coins className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">USDT Liquidity Systems</h4>
                  <p className="text-xs text-gray-400">Enabling fast cross-border payments in seconds on the blockchain.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Universal Ad Syndication</h4>
                  <p className="text-xs text-gray-400">Publish and advertise video messages globally to active markets.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Founder & CEO profile card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-gray-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-3xl" />
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center text-white font-bold text-lg font-display">
                    GE
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display tracking-tight">{companyCEOProfile.name}</h3>
                  <p className="text-xs text-emerald-400 font-mono tracking-wider uppercase">{companyCEOProfile.title}</p>
                  <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 shrink-0" /> {companyCEOProfile.address}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm bg-gray-950/60 p-4 rounded-xl border border-gray-800/60">
                <div className="flex justify-between py-1.5 border-b border-gray-800/40 text-xs">
                  <span className="text-gray-400">Services:</span>
                  <span className="text-white font-medium">Advertising & Marketing</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-800/40 text-xs">
                  <span className="text-gray-400">Specialty:</span>
                  <span className="text-cyan-400 font-mono font-medium">Cryptography & Cryptocurrencies</span>
                </div>
                <div className="flex justify-between py-1.5 text-xs">
                  <span className="text-gray-400">Firm Name:</span>
                  <span className="text-white font-medium">Chesendo Network</span>
                </div>
              </div>
            </div>

            {/* Direct Contacts Grid */}
            <div className="mt-6 space-y-2">
              <h4 className="text-xs font-mono font-semibold text-gray-400 tracking-wider uppercase mb-2">Connect Directly:</h4>
              <div className="grid grid-cols-2 gap-2">
                <a 
                  href="https://wa.me/18762376194" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500 hover:text-black border border-emerald-500/20 text-emerald-400 py-2.5 px-3 rounded-lg text-xs font-medium transition-all duration-300"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
                <a 
                  href="https://t.me/Drgnba1mba1" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-cyan-500/10 hover:bg-cyan-500 hover:text-black border border-cyan-500/20 text-cyan-400 py-2.5 px-3 rounded-lg text-xs font-medium transition-all duration-300"
                >
                  <Send className="w-3.5 h-3.5" />
                  Telegram
                </a>
                <a 
                  href="tel:+18762376194"
                  className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 col-span-2"
                >
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  Call: +1 (876) 237-6194
                </a>
              </div>
            </div>

          </div>

        </section>

        {/* Row 2: Understanding Technology, Blockchain, Joel Biblical Wisdom Accordion */}
        <section className="bg-gradient-to-br from-gray-950 to-slate-950 border border-gray-800 rounded-2xl p-6 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-1">
                <BookOpen className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-display">Calculated Mathematical Engineer Structure (Year 2026)</h3>
                <p className="text-gray-300 text-sm leading-relaxed max-w-4xl">
                  "Understanding the latest technology, blockchain, cryptocurrencies, and cryptography knowledge is key. The year 2026 mathematical structures verify that a portion of the knowledge inside the Book of Joel (Bible) is already fulfilled."
                </p>
              </div>
            </div>

            <button 
              onClick={() => setShowJoelExplanation(!showJoelExplanation)}
              className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 px-4 py-2.5 rounded-xl shrink-0 transition-all cursor-pointer"
            >
              <span>{showJoelExplanation ? 'Collapse Analysis' : 'Expand Theological Study'}</span>
              {showJoelExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <AnimatePresence>
            {showJoelExplanation && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-6 mt-6 border-t border-gray-800/80 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
                  
                  <div className="bg-gray-900/40 p-4 rounded-xl border border-gray-800/50 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono font-semibold text-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      JOEL 2:28 FULFILLMENT & DIGITAL STREAMS
                    </div>
                    <p className="leading-relaxed text-xs">
                      In the Book of Joel, it is foretold that the spirit of knowledge and vision will be poured out globally, breaking the barriers of age, class, and nation. In the year 2026, we see this literal outpouring manifest as decentralized mathematical systems. 
                    </p>
                    <p className="leading-relaxed text-xs text-gray-400">
                      The blockchain ledger is mathematically absolute and global, allowing any person anywhere to participate instantly. Cryptography provides the keys to lock, protect, and restore wealth from centralized inflation, representing the biblical concept of full restoration.
                    </p>
                  </div>

                  <div className="bg-gray-900/40 p-4 rounded-xl border border-gray-800/50 space-y-3">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono font-semibold text-xs">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      2026 MATHEMATICAL ENGINEER LOGIC
                    </div>
                    <p className="leading-relaxed text-xs">
                      As calculated engineering structures progress, we align cryptographic principles to serve humanity. By eliminating cross-border friction via USDT and decentralized smart contracts, we bypass corrupted financial middlemen.
                    </p>
                    <p className="leading-relaxed text-xs text-gray-400">
                      "I will restore to you the years that the swarming locust has eaten..." (Joel 2:25). Cryptocurrency solves hyper-inflation, remittance theft, and long delays. This mathematical breakthrough delivers true financial restoration, allowing global citizens to secure the fruit of their labor in seconds.
                    </p>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Row 3: Prominent Partner Showcase (Replaces 'Join Now' box) */}
        <section className="relative overflow-hidden bg-gradient-to-r from-emerald-950/40 via-gray-900/90 to-cyan-950/40 border-2 border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.08)]">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left side text info */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-mono font-semibold tracking-wider uppercase">
                <Coins className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                JOIN THE KNEW PROJECT TODAY
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display leading-tight">
                Secure Your Position in a Global Worldwide Digital Payments Network
              </h3>
              
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Become part of a growing worldwide digital network using blockchain technology and <span className="text-emerald-400 font-semibold font-mono">USDT transactions</span> for fast global payments and unmatched advertising opportunities. Start your journey today by registering through our official partner link below.
              </p>

              <div className="bg-gray-950/70 p-4 rounded-xl border border-gray-800 text-sm space-y-3">
                <p className="text-xs text-gray-400 leading-normal">
                  <span className="text-emerald-400 font-semibold">Gavin Edwards Statement:</span> "Email me or WhatsApp me to find out more about my link under the knew project and why I believe it will solve many problems by using USDT in any part of the world—sending and getting money in seconds on the blockchain."
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-mono text-cyan-400">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" /> Fast Remittance
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" /> Decentralized Security
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" /> Worldwide Reach
                  </span>
                </div>
              </div>
            </div>

            {/* Right side interactive CTA register card */}
            <div className="lg:col-span-5 bg-gray-950/80 border border-gray-800 p-5 rounded-xl space-y-4">
              <div className="text-center pb-3 border-b border-gray-800">
                <span className="text-xs text-gray-400 font-mono tracking-wider uppercase block">OFFICIAL REGISTER PORTAL</span>
                <span className="text-white font-bold font-display text-base">Chesendo Network Partner Node</span>
              </div>

              {/* Direct Partner link showcase */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-mono">Official Link:</label>
                <div className="flex items-center bg-gray-900 border border-gray-800 rounded-lg p-2.5 overflow-hidden">
                  <span className="text-xs text-emerald-400 font-mono truncate select-all flex-1">
                    https://member.knewproject.net/register/?Username=KP6609504
                  </span>
                  <button 
                    onClick={handleCopyLink}
                    className="p-1.5 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition cursor-pointer"
                    title="Copy Link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Huge Action Button */}
              <div className="space-y-2.5 pt-2">
                <a 
                  href="https://member.knewproject.net/register/?Username=KP6609504"
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black py-3.5 px-4 rounded-xl font-bold font-display shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] hover:scale-[1.01] transition-all duration-300"
                >
                  <span>REGISTER NOW</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a 
                    href="https://wa.me/18762376194?text=Hello%20Gavin%2C%20I%20want%20to%20know%20more%20about%20the%20Knew%20Project%20and%20USDT%20blockchain%20payments!"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 py-2.5 rounded-lg text-xs font-semibold font-mono transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Ask on WhatsApp
                  </a>
                  <a 
                    href="mailto:chesendonetwork@gmail.com?subject=Knew%20Project%20Inquiry"
                    className="flex items-center justify-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 py-2.5 rounded-lg text-xs font-semibold font-mono transition"
                  >
                    <Mail className="w-4 h-4" />
                    Inquire via Email
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Block: USDT Global Transaction Simulator */}
          <div className="border-t border-gray-800/80 mt-8 pt-6">
            <h4 className="text-sm font-semibold text-white font-display flex items-center gap-2 mb-3">
              <Coins className="w-4 h-4 text-emerald-400" />
              USDT Instant Blockchain Settlement Simulator
            </h4>
            <p className="text-xs text-gray-400 max-w-3xl mb-4">
              Try our live transaction simulation. Put in any amount of USDT to witness how the global ledger bypasses international delays, bank hours, and high wire charges.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-950/40 p-4 rounded-xl border border-gray-800">
              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-400 font-mono">Transfer Amount (USDT):</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={simAmount}
                    onChange={(e) => {
                      setSimAmount(e.target.value);
                      setSimulated(false);
                    }}
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg py-2 pl-3 pr-14 text-sm font-mono text-emerald-400 focus:outline-none focus:border-emerald-500" 
                    placeholder="100"
                  />
                  <span className="absolute right-3 top-2 text-xs font-semibold font-mono text-gray-500">USDT</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-400 font-mono">Destination:</label>
                <select 
                  value={simDestination}
                  onChange={(e) => {
                    setSimDestination(e.target.value);
                    setSimulated(false);
                  }}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg py-2 px-3 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Europe">Europe (UK, Germany, France)</option>
                  <option value="Asia">Asia (Japan, India, Singapore)</option>
                  <option value="North America">North America (USA, Canada)</option>
                  <option value="Africa">Africa (Nigeria, Kenya, South Africa)</option>
                  <option value="South America">South America (Brazil, Argentina)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button 
                  onClick={() => setSimulated(true)}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-2 rounded-lg text-xs font-bold font-mono shadow-md hover:shadow-emerald-500/20 transition cursor-pointer"
                >
                  Simulate Transfer
                </button>
              </div>

              <div className="md:col-span-1 flex items-center justify-center p-2 rounded-lg bg-[#0c1221] border border-gray-800">
                {simulated ? (
                  <div className="text-center">
                    <span className="text-[10px] text-emerald-400 font-mono uppercase font-semibold animate-pulse block">● SUCCESSFUL</span>
                    <span className="text-xs text-white font-mono">Receipt: <span className="text-emerald-400 font-semibold">3 Seconds</span></span>
                    <span className="text-[10px] text-gray-400 block font-mono">Network Fee: ~1 USDT</span>
                  </div>
                ) : (
                  <span className="text-xs text-gray-400 font-mono italic">Awaiting Simulation</span>
                )}
              </div>
            </div>
          </div>

        </section>

        {/* Row 3.5: Knew Project AI Mentor Hub */}
        <section id="ai-mentor-hub" className="relative overflow-hidden bg-gradient-to-br from-indigo-950/30 via-[#0a0f20] to-cyan-950/30 border-2 border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.06)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left side: Announcement text & details */}
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-xs font-mono font-semibold tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  KNEW PROJECT AI MENTOR IS LIVE
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display leading-tight">
                  Unleash the Power of our Interactive AI Mentor
                </h3>
                
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  The official <span className="text-cyan-400 font-semibold font-display">AI Mentor of Knew Project</span> is now live and fully accessible to everyone as a powerful marketing and educational tool! We encourage everyone to start using it creatively to boost reach, create curiosity, and educate prospects worldwide.
                </p>

                {/* What to use it for check list */}
                <div className="space-y-2.5 bg-gray-950/60 p-4 sm:p-5 rounded-xl border border-gray-800/80">
                  <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Video className="w-4 h-4 text-cyan-400" /> Use It For Creative Marketing:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /> Facebook Posts & Engagement
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /> Instagram Reels & Stories
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /> TikTok Content & Videos
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /> YouTube Shorts
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /> Live Demonstrations
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /> Answering Prospects' Questions
                    </li>
                  </ul>
                  
                  <p className="text-[11px] text-gray-400 mt-3 leading-normal border-t border-gray-800/60 pt-2.5 italic">
                    💡 <span className="text-gray-300 font-medium">Curiosity drives interaction:</span> Record yourself interacting with the AI Mentor, asking questions, showing how it works, and sharing the experience with your audience.
                  </p>
                </div>
              </div>

              {/* Direct Link External Button */}
              <div className="pt-4 space-y-3">
                <a 
                  href="https://kp-ai-mentor.vercel.app/"
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black font-bold font-display py-3.5 px-6 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all cursor-pointer"
                >
                  <span>LAUNCH OFFICIAL AI MENTOR</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
                <p className="text-[10px] text-gray-500 font-mono">
                  Official URL: <a href="https://kp-ai-mentor.vercel.app/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">kp-ai-mentor.vercel.app</a>
                </p>
              </div>
            </div>

            {/* Right side: Interactive Chat simulator mockup */}
            <div className="lg:col-span-5 bg-gray-950/90 border border-gray-800/80 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg">
              
              {/* Simulator Header */}
              <div className="bg-gray-900/80 px-4 py-3.5 border-b border-gray-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="absolute -inset-0.5 bg-emerald-400 rounded-full blur opacity-40 animate-ping" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">AI Mentor Live Simulator</span>
                    <span className="text-[10px] text-cyan-400 font-mono uppercase">Interactive Demo Mode</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-gray-500 bg-gray-950 px-2 py-0.5 rounded border border-gray-850">
                  v2.06
                </span>
              </div>

              {/* Chat Window */}
              <div className="p-4 sm:p-5 flex-1 min-h-[190px] flex flex-col justify-end space-y-4">
                
                {/* User input (if active) */}
                {mentorQuestion && (
                  <div className="flex justify-end">
                    <div className="bg-cyan-950/60 border border-cyan-500/20 text-cyan-300 rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] text-xs font-medium">
                      {mentorQuestion}
                    </div>
                  </div>
                )}

                {/* AI response bubble */}
                <div className="flex justify-start">
                  <div className="bg-gray-900 border border-gray-800 text-gray-200 rounded-2xl rounded-tl-none px-4 py-3 max-w-[90%] text-xs leading-relaxed relative">
                    {isMentorTyping ? (
                      <div className="flex items-center gap-1.5 py-1 px-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    ) : (
                      <p className="whitespace-pre-line">{mentorAnswer}</p>
                    )}
                  </div>
                </div>

              </div>

              {/* Quick Select Prompts */}
              <div className="bg-gray-900/60 p-4 border-t border-gray-800/80 space-y-2">
                <span className="text-[10px] text-gray-400 font-mono uppercase font-bold block mb-1.5">
                  Select a question to test the AI Mentor:
                </span>
                
                <div className="grid grid-cols-1 gap-1.5">
                  <button 
                    onClick={() => handleAskMentor(
                      "How can I use this AI Mentor to create content on social media?",
                      "You can record your screen or take short screen-record clips showing how you interact with me! Ask me interesting questions, capture the dynamic responses, and post them as Reels, TikToks, Shorts, or Facebook posts.\n\nCreating interaction creates massive curiosity and gets your prospects excited to find out: 'What is Knew Project?'"
                    )}
                    disabled={isMentorTyping}
                    className="w-full text-left text-[11px] text-gray-300 hover:text-white bg-gray-950 hover:bg-gray-800/50 border border-gray-850 hover:border-cyan-500/30 px-3 py-2 rounded-lg transition cursor-pointer font-medium disabled:opacity-50 truncate"
                  >
                    👉 How can I use this AI Mentor to create content?
                  </button>

                  <button 
                    onClick={() => handleAskMentor(
                      "Why is blockchain technology and USDT key to this project?",
                      "Traditional international bank transfers are slow, expensive, and subject to high delays or middleman fees. By utilizing USDT on high-performance blockchain ledgers, anyone can send and get money globally in seconds!\n\nThis solves international payment problems securely and transparently, no matter where you are in the world."
                    )}
                    disabled={isMentorTyping}
                    className="w-full text-left text-[11px] text-gray-300 hover:text-white bg-gray-950 hover:bg-gray-800/50 border border-gray-850 hover:border-cyan-500/30 px-3 py-2 rounded-lg transition cursor-pointer font-medium disabled:opacity-50 truncate"
                  >
                    👉 Why is blockchain technology & USDT key to this project?
                  </button>

                  <button 
                    onClick={() => handleAskMentor(
                      "What is C.E.O Gavin Edwards' view on the Book of Joel?",
                      "Founder and C.E.O Gavin Edwards believes that under the calculated mathematical structures of 2026, portion of the biblical Book of Joel (which details global outpouring of knowledge and absolute restoration) is already being fulfilled.\n\nDecentralized ledgers, secure cryptography, and instant global peer-to-peer currencies are our modern systems for establishing financial restoration."
                    )}
                    disabled={isMentorTyping}
                    className="w-full text-left text-[11px] text-gray-300 hover:text-white bg-gray-950 hover:bg-gray-800/50 border border-gray-850 hover:border-cyan-500/30 px-3 py-2 rounded-lg transition cursor-pointer font-medium disabled:opacity-50 truncate"
                  >
                    👉 What is C.E.O Gavin Edwards' view on the Book of Joel?
                  </button>

                  <button 
                    onClick={() => handleAskMentor(
                      "How do I join Knew Project worldwide?",
                      "Joining is very fast and simple! You can register through our official referral link:\n\nhttps://member.knewproject.net/register/?Username=KP6609504\n\nBecome part of our worldwide digital network using USDT transactions for rapid growth."
                    )}
                    disabled={isMentorTyping}
                    className="w-full text-left text-[11px] text-gray-300 hover:text-white bg-gray-950 hover:bg-gray-800/50 border border-gray-850 hover:border-cyan-500/30 px-3 py-2 rounded-lg transition cursor-pointer font-medium disabled:opacity-50 truncate"
                  >
                    👉 How do I join Knew Project worldwide?
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Row 4: THE LIVE INTERACTIVE BUSINESS ADVERTISING BOARD */}
        <section className="space-y-6">
          
          {/* Section Header with dynamic controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-white font-display tracking-tight flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-emerald-400" />
                Chesendo Interactive Business Ads Board
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Advertise any business, post video commercials, or recruit digital partners.</p>
            </div>

            <button 
              onClick={() => setIsPublisherOpen(!isPublisherOpen)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 hover:from-emerald-500/20 hover:to-cyan-500/20 border border-emerald-500/30 text-emerald-400 py-2.5 px-4 rounded-xl text-xs font-bold font-mono transition cursor-pointer"
            >
              {isPublisherOpen ? (
                <>Close Publisher Form</>
              ) : (
                <>
                  <Plus className="w-4 h-4 shrink-0" />
                  Publish Your Own Ad Now
                </>
              )}
            </button>
          </div>

          {/* New Ad Publisher Form Panel */}
          <AnimatePresence>
            {isPublisherOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-900/90 border-2 border-cyan-500/30 rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Plus className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white font-display">Create & Launch Business Advertisement</h3>
                </div>

                <form onSubmit={handleCreateAd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Column fields */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-300 font-mono font-medium">Business / Campaign Title <span className="text-red-500">*</span></label>
                      <input 
                        type="text"
                        required
                        value={newAd.title}
                        onChange={(e) => setNewAd({...newAd, title: e.target.value})}
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                        placeholder="e.g. Westmoreland Premium Coffee Exports"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-gray-300 font-mono font-medium">Industry Category</label>
                        <select 
                          value={newAd.category}
                          onChange={(e) => setNewAd({...newAd, category: e.target.value as AdCategory})}
                          className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2 px-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                        >
                          {categoriesList.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs text-gray-300 font-mono font-medium">Publisher / Author <span className="text-red-500">*</span></label>
                        <input 
                          type="text"
                          required
                          value={newAd.authorName}
                          onChange={(e) => setNewAd({...newAd, authorName: e.target.value})}
                          className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                          placeholder="Your Name"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-300 font-mono font-medium">YouTube Video URL <span className="text-gray-500">(Optional)</span></label>
                      <div className="relative">
                        <input 
                          type="url"
                          value={newAd.videoUrl}
                          onChange={(e) => setNewAd({...newAd, videoUrl: e.target.value})}
                          className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                          placeholder="https://www.youtube.com/watch?v=..."
                        />
                        <Video className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                      </div>
                      <p className="text-[10px] text-gray-400">Pasting a valid YouTube link generates a responsive commercial player automatically!</p>
                    </div>
                  </div>

                  {/* Right Column fields */}
                  <div className="space-y-4 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-300 font-mono font-medium">Ad Message & Promotional Details <span className="text-red-500">*</span></label>
                      <textarea 
                        required
                        rows={4}
                        value={newAd.message}
                        onChange={(e) => setNewAd({...newAd, message: e.target.value})}
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-500 resize-none"
                        placeholder="Write details about what services are available, products offered, pricing, and how clients can get started with you..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-gray-300 font-mono font-medium">Contact Method</label>
                        <select 
                          value={newAd.contactMethod}
                          onChange={(e) => setNewAd({...newAd, contactMethod: e.target.value as any})}
                          className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2 px-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                        >
                          <option value="whatsapp">WhatsApp Chat</option>
                          <option value="telegram">Telegram Account</option>
                          <option value="phone">Direct Call</option>
                          <option value="email">Direct Email</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs text-gray-300 font-mono font-medium">Contact Detail <span className="text-red-500">*</span></label>
                        <input 
                          type="text"
                          required
                          value={newAd.contactValue}
                          onChange={(e) => setNewAd({...newAd, contactValue: e.target.value})}
                          className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                          placeholder="e.g. +18762376194 or username"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                      <button 
                        type="button"
                        onClick={() => setIsPublisherOpen(false)}
                        className="px-4 py-2 border border-gray-800 hover:bg-gray-800 text-gray-300 rounded-lg text-xs font-medium cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-lg text-xs font-bold font-mono shadow-md cursor-pointer"
                      >
                        Publish Live Ad
                      </button>
                    </div>

                  </div>

                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search, Filter, Reset Actions */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-900/40 p-4 rounded-xl border border-gray-800/80">
            
            {/* Search input */}
            <div className="w-full md:w-96 relative">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ads, campaigns, or author name..."
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 placeholder-gray-500"
              />
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
            </div>

            {/* Category selection bar */}
            <div className="w-full overflow-x-auto flex items-center gap-2 pb-1 md:pb-0 scrollbar-none">
              <span className="text-xs text-gray-500 font-mono shrink-0 mr-1 hidden sm:inline">Category:</span>
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`text-xs px-3.5 py-1.5 rounded-full border transition shrink-0 cursor-pointer font-medium ${selectedCategory === 'All' ? 'bg-emerald-500 text-black border-emerald-500 font-semibold' : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-white'}`}
              >
                All Ads
              </button>
              {categoriesList.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3.5 py-1.5 rounded-full border transition shrink-0 cursor-pointer font-medium ${selectedCategory === cat ? 'bg-emerald-500 text-black border-emerald-500 font-semibold' : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

          {/* Advertisements Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredAds.length > 0 ? (
                filteredAds.map((ad, idx) => {
                  const isYouTube = ad.videoUrl ? getYouTubeEmbedUrl(ad.videoUrl) : null;
                  return (
                    <motion.div 
                      key={ad.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, delay: idx * 0.05 }}
                      className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-gray-700 p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group shadow-md"
                    >
                      {/* Top ribbon info */}
                      <div className="flex items-center justify-between gap-2 border-b border-gray-850 pb-3 mb-4 text-xs font-mono">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          ad.category === 'Cryptocurrency' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          ad.category === 'Technology' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                          ad.category === 'Marketing' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                          'bg-gray-800 text-gray-300 border-gray-700'
                        }`}>
                          {ad.category}
                        </span>

                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(ad.createdAt)}
                          </span>

                          {/* Delete action for custom ads */}
                          {!ad.isPreseeded && (
                            <button 
                              onClick={() => handleDeleteAd(ad.id)}
                              className="text-gray-500 hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition cursor-pointer"
                              title="Delete Advertisement"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Video Player or Placeholder */}
                      <div className="mb-4">
                        {isYouTube ? (
                          <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-gray-800 shadow-inner">
                            <iframe 
                              src={isYouTube}
                              title={ad.title}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        ) : (
                          <div className="h-28 w-full bg-gradient-to-r from-gray-950 to-gray-900 border border-gray-850 rounded-xl flex flex-col justify-center px-4 relative overflow-hidden">
                            <div className="absolute right-[-10%] top-[-10%] w-20 h-20 bg-emerald-500/5 rounded-full blur-xl" />
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                                📢
                              </div>
                              <div>
                                <span className="text-[10px] text-gray-500 uppercase font-mono block">Business Announcement</span>
                                <span className="text-xs text-gray-300">Message Published by {ad.authorName}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Main Message Content */}
                      <div className="space-y-2.5 mb-5 flex-1">
                        <h4 className="text-base font-bold text-white leading-tight font-display hover:text-emerald-400 transition">
                          {ad.title}
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                          {ad.message}
                        </p>
                      </div>

                      {/* Footer: Publisher & Call-to-action Contact button */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-850 text-xs mt-auto">
                        <div className="font-mono text-gray-400">
                          <span>Publisher: </span>
                          <span className="text-white font-medium">{ad.authorName}</span>
                        </div>

                        {/* Direct Contact Button */}
                        <a 
                          href={
                            ad.contactMethod === 'whatsapp' ? `https://wa.me/${ad.contactValue.replace(/[^0-9]/g, '')}?text=Hello%20${ad.authorName}%2C%20I%20saw%20your%20ad%20%22${encodeURIComponent(ad.title)}%22%20on%20Chesendo%20Network!` :
                            ad.contactMethod === 'telegram' ? `https://t.me/${ad.contactValue.replace('@', '')}` :
                            ad.contactMethod === 'email' ? `mailto:${ad.contactValue}?subject=Inquiry:%20${encodeURIComponent(ad.title)}` :
                            `tel:${ad.contactValue}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-1.5 bg-gray-800 hover:bg-emerald-500 hover:text-black text-emerald-400 py-2 px-4 rounded-xl font-bold font-mono transition duration-300 border border-gray-700/60 hover:border-emerald-400/20"
                        >
                          {ad.contactMethod === 'whatsapp' && <MessageCircle className="w-3.5 h-3.5" />}
                          {ad.contactMethod === 'telegram' && <Send className="w-3.5 h-3.5" />}
                          {ad.contactMethod === 'email' && <Mail className="w-3.5 h-3.5" />}
                          {ad.contactMethod === 'phone' && <Phone className="w-3.5 h-3.5" />}
                          
                          <span>Inquire via {ad.contactMethod.toUpperCase()}</span>
                        </a>
                      </div>

                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-1 lg:col-span-2 bg-gray-900/20 border border-dashed border-gray-800 py-16 text-center rounded-2xl">
                  <span className="text-4xl block mb-2">🔍</span>
                  <p className="text-sm text-gray-400">No advertisements matched your search filters.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="mt-3 text-xs text-emerald-400 underline font-mono cursor-pointer"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>

        </section>

      </main>

      {/* Footer Branding Info */}
      <footer className="border-t border-gray-900 bg-gray-950 py-10 relative z-10 text-xs text-gray-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-gray-400 font-bold font-display text-sm tracking-wide">Chesendo Network</span>
          </div>
          
          <p className="max-w-xl mx-auto text-[11px] text-gray-500 leading-normal">
            Gavin Edwards, Owner and Founder C.E.O. Westmoreland, Jamaica. Under calculated mathematical structures of the year 2026. Bringing universal digital payments and global advertisement streams to light.
          </p>

          <p className="text-[10px]">
            &copy; 2026 Chesendo Network. All Rights Reserved. Powered by Blockchain Ledgers & Cryptographic Systems.
          </p>
        </div>
      </footer>

    </div>
  );
}

// Simple Clock Icon replacement
function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
