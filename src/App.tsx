/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  Play, 
  CheckCircle, 
  Code, 
  LineChart, 
  Database, 
  Brain, 
  Languages, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Mail, 
  Phone, 
  Calendar,
  MessageCircle,
  ExternalLink,
  MapPin,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants & Types ---

const COLORS = {
  primary: '#493ee5',
  secondary: '#4f46d2',
  tertiary: '#006473',
  background: '#f8f9ff',
  surface: '#ffffff',
  text: '#001c37',
  textMuted: '#464555',
};

const COURSES = [
  {
    id: 'python',
    title: 'Advanced Python',
    icon: <Code className="w-6 h-6" />,
    color: 'bg-indigo-100 text-indigo-600',
    highlights: ['Variables and Data Types', 'Functions and Modules', 'Exception Handling', 'File I/O']
  },
  {
    id: 'viz',
    title: 'Data Visualization',
    icon: <LineChart className="w-6 h-6" />,
    color: 'bg-cyan-100 text-cyan-600',
    highlights: ['Matplotlib / Seaborn', 'Plotly / Dash', 'Data Storytelling', 'Powerbi / Tableau']
  },
  {
    id: 'sql',
    title: 'SQL',
    icon: <Database className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-600',
    highlights: ['MySql / Postgres', 'DDL / DML', 'Sub Queries', 'Joins', 'CTE']
  },
  {
    id: 'dl',
    title: 'Deep Learning',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-600',
    highlights: ['Neural Networks', 'CNN / RNN', 'Model Optimization', 'TensorFlow / PyTorch']
  },
  {
    id: 'nlp',
    title: 'NLP',
    icon: <Languages className="w-6 h-6" />,
    color: 'bg-teal-100 text-teal-600',
    highlights: ['Text Processing', 'Seq2Seq Models', 'Attention Mechanisms', 'Language Deployment']
  },
  {
    id: 'genai',
    title: 'GenAI',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'bg-pink-100 text-pink-600',
    highlights: ['GANs', 'VAEs', 'Transformers', 'LLM Integration']
  },
];

const TESTIMONIALS = [
  {
    name: 'Alex Johnson',
    role: 'Data Analyst at TechCorp',
    initials: 'AJ',
    videoThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQajbKH7Y_Mah4eX837HwMVLuZ3eZycDymgMSi_7tiuLG0OWMCnsyWfN2qiYY5bjYoCMk8hmHiV8z5KzFPLEt7U7zRUV3OslBt5oGRN_xFxdj4eLuE3YjkdCDxmFo88x9aXcvm47naREQqULiyqk2ceYEKqrUa2rp_v_C3jaJXHSAzKxikkqhs_UM-yWsUolINOx8YtUYZR2vJwLYLxUlXziWNff5zImjSa_MqHy9JTIdNRLzV4A4Swb8ZeUXd9pF-ZLOqnOzkDQ',
  },
  {
    name: 'Sarah Miller',
    role: 'Junior Data Scientist',
    initials: 'SM',
    videoThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz75cmG94N2LDHdhMA4aJj6NXPDpcp0fTsuZNh5YfGt9PSxbh4SprYSppbRpEEJWvMiW4_HQ-z3KklB1xT5AaKTAPojyOI427uJ3RPoiC5J5AiIObdniO80lHhZ3oK2WXx9mBmJo4bb5EBVnEG9R1xplP92YEzImCwLLY6DUH1buekDJjys2sNz_E0xYkvDoLpj8-g9KqUL0c8uYppwXxTd0RQyehZn3s4OJRcMAP-1fsu8TpGEhELVIgb_mMl2onn5ApJ17yGsA',
  },
];

const FAQS = [
  {
    q: "I am from a non-technical background. Can I join?",
    a: "Yes! Our 'Zero-to-Hero' module starts with the basics of logic and SQL. We've helped professionals from diverse backgrounds make successful career pivots."
  },
  {
    q: "Is this an online or offline course?",
    a: "This is a 100% Practical program. We offer both Offline and Online courses at our Nagpur center for maximum learning and hands-on experience."
  },
  {
    q: "What is the fee structure?",
    a: "We offer flexible EMI options with zero interest cost to students. We also offer attractive discounts for early enrollments."
  },
  {
    q: "How many students per batch are allowed?",
    a: "We maintain small batch sizes, far fewer than the market average, to ensure personalized attention and better learning outcomes."
  },
  {
    q: "Do you offer placement Guarantee?",
    a: "We offer 100% placement Assistance and many students are already placed. We do not offer FAKE PROMISES / GUARANTEES. Do not fall for market traps. The skills you learn with honesty will definitely land you a job."
  },
  {
    q: "Is there an age criteria to join?",
    a: "There is no age criteria. Anyone willing to put in the required efforts can join. The industry will offer suitable roles to anyone with the required skills."
  },
  {
    q: "What is the duration of the course?",
    a: "The average duration is 6 months, ensuring deep coverage of all modules from Python to advanced GenAI."
  }
];

const PARTNERS = [
  { name: 'Facebook', logo: 'https://lh3.googleusercontent.com/aida/ADBb0ujJSbNZicicXNX8LtKPHOh-XKDovIUfOLj42WB4XhqG9RymgVo86eYs_zP4Bqd0VjWLBTxvRBXekFoM8hzAw3HTHqYF0z7vfM9owNZ847pvab9iCtT3-SGUqNUQMe8nPWDvhT_wHu0UxHAaM2tTV9nWMCz7wwa8ej4_qU_dxDw236fNfxqELSqM7LWNCjDoYlalW376MTufVYwDkpM4MzKhbR5BrH17S86pVRSRsds9As6MBnFPsRRqVsDTSy2GMX1AC6BK5sY' },
  { name: 'Google', logo: 'https://lh3.googleusercontent.com/aida/ADBb0ugi3ZyzFeUKLTwkYrw8gvCSBPgqqgE3QofJ9-orsY81AOkU3glBDeMNdd456vb2UvKlsstPAJKfONS8klc3QrxN0dc6UidZpZ6-UUb78KRdcdujx8HHi3dLlNBZnrEIos0p5k_9fc55RicawMu7Yu1EhAd2WAwEjBJJKh5scWvflrQOq0fD8EzL-_y8uW6lHKApQNkTR3s2HE8nyGNT3AFJsJyJwWXIvOC2uUcklAlaD5RJ-MqXiNypts3vvkhPRZ48lwGfMLI8' },
  { name: 'STED', logo: 'https://lh3.googleusercontent.com/aida/ADBb0ujCw9pCVdJrrrb4MVjK8Q2vEsHx9qAy3KskUQI4JenZDI2LF2QOcuVPz2NjS_KX8vwVLevxNuOfwcnwUwBLj1tIMVTttTx9IxoJNwYCCJrWUkSiOrqoJmD-G4c8nN9o4xVFTJ8pMqTQFvC7c_ttYz1lA1wxbLskhT49MkJ_JfmkEtIMLbLaW0qPrhONN6tcGyTQQ8axLWXEcx7arY6j0Lt289uKL2S9oLStYgbYz60xQrgrW-zpQYOBUCDZZrYM2NlaS82j4oiM' },
  { name: 'Jain', logo: 'https://lh3.googleusercontent.com/aida/ADBb0ugEAkHXBMG7BXRIdvidIZheSNDgVBG0nBZ0fN-Zbi7EkWRZaU1avfJMGTwxiWa0LX-VW_EH6V9483xtraa6c8qe1iEmaVMUn9EIMccn2cfL-Cn2sDfvNTxQITUvh1afN52V58zc7NVcvL0Ak5-Sqp0tFYIacBgS7IbTEukY9SQXCQD5HEpdDaUsVOGy518-hmtxehX7mg-LFjqplPicewYKx_RfVC3GwTy_KeydxN733-1vIYfhws-CJlZCgdsV7CXx3oVvVoM' },
  { name: 'Delta', logo: 'https://lh3.googleusercontent.com/aida/ADBb0uhNGom-WsBo8IR-pQd5z4aC3Wq8VFaI1Vme92Pc-nB6uPTQlM6Q_4OLaEPN7QdRzHEaKYEpCOlDa3g9sG-yj5GEGsrS8DtUMc6BXiLUm1T7H9I8px2zohl1R3voPXGV5dW6vApuCbEsHH1c6bRIldrcYnAaysz9HO5tZFUm9-Hpqz0IQI5tekuT85xw5fcBXkOQFGUGz3WncS-QL_UjDOpT7C32xUfiRbZo_GExK62-NR5R9ux0kbAdwepJyFG8v2oB7T8Vh88N' },
  { name: 'Dehn', logo: 'https://lh3.googleusercontent.com/aida/ADBb0ugkM2jzNDOwpVHz4xzrLEoNxrY71H2q3hSO2hSEi6JhVEmXboXWUEltuSgVYCETo20wsp2ry6ibfChhvcltFMxKebN8Yzf2lGbI9H179111_ljN2tRU2AvnhGP6gTEHaCcyxARyuylzRZLW2TLaKCiBttPuIBQRAs-FrR5Ak4CYbFHMTSYKKk25dwC3t9KZqMayLf0MqwxDJ8USIsrBk5j_U5S-ZEUXBpcqCO1Sx2tGSLTiZCDoJnq9jgxEOqNdJfZPGCR8ucNV' },
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2">
            <img 
              src="https://lh3.googleusercontent.com/aida/ADBb0ugkhtTA8hC_eVuN5_A7r3OglQINtCasV24IyqgWuXWGOrBeLj5Lnwt8MmuEpMR3Qh26eEexBH-3rGJWkPGMhVWjbZo-nVlC5LksA1143I4xWHYSOKAorzopoP9mQ0njUR8SDxWz1-0GX-d0JpBBoThaZftZWjnAQLaxoNqKH8I12CRSmx2x0ymRGkBgSySW5j2Jk1STSG1bayOWbTIwzM1bcjoblQBlWtR6v7Qwhu86KEk7m9szNruPyHvOpADLgIuoHnp-OL5u" 
              alt="IPCS Global Logo" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </a>
          <div className="hidden lg:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Courses</a>
            <div className="flex items-center gap-2 group cursor-pointer">
              <span className="flex items-center gap-1 text-sm font-medium text-slate-600 group-hover:text-amber-500">
                <img src="https://lh3.googleusercontent.com/aida/ADBb0ujNIiOGMpXaL7TjUvhd7aBGKvtdm2voBYVdXBltjxxhCxSRfwwtMT_UQPUc18NotWbEXipaZn4v8RGvZYdTPiIMOb_sgfV_9gBYLt3jmvClNtIaM9wOBM8zaPAhM7igXsakv-NIJVIo2-AFZ2vApoBSyPBQyJf27PdDsOm6uTHlQBkbRzRSYiV8wHTNqkmHFhbQYuVwsYEAaHgEnQTxMrcSWR5NxYkDIN8CkiEdhuVETqsYC3Nc6go5I4w_Bx2a44MAMn4XDiQ" alt="Google" className="w-4 h-4" />
                <span className="font-bold">4.4</span>
              </span>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={`w-3 h-3 ${i === 5 ? 'fill-amber-500/40 text-amber-500/40' : 'fill-amber-500 text-amber-500'}`} />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-600">Reviews</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a 
            href="https://wa.me/919405212345" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#25D366] border border-[#25D366]/20 bg-[#25D366]/5 rounded-full hover:bg-[#25D366]/10 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp us
          </a>
          <a href="#contact-section" className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95 inline-block text-center">
            Contact us
          </a>
        </div>

        <button 
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <a href="#" className="text-lg font-medium text-slate-800">Courses</a>
              <a href="#" className="text-lg font-medium text-slate-800">Reviews</a>
              <div className="flex flex-col gap-4 pt-4 border-t border-slate-50">
                <a href="#" className="flex items-center justify-center gap-2 py-3 text-[#25D366] border border-[#25D366]/20 bg-[#25D366]/5 rounded-xl font-bold">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp us
                </a>
                <a href="#contact-section" className="bg-indigo-600 text-white py-4 rounded-xl font-bold block text-center">
                  Contact us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section 
      className="relative pt-32 pb-20 px-6 overflow-hidden"
      style={{
        backgroundImage: 'url("/input_file_1.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] -z-10" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 lg:order-1"
        >
          <div className="relative group rounded-3xl overflow-hidden shadow-2xl aspect-video bg-slate-900 border border-white/20">
            <video 
              src="/input_file_0.mp4" 
              className="w-full h-full object-cover"
              poster="https://lh3.googleusercontent.com/aida-public/AB6AXuCQajbKH7Y_Mah4eX837HwMVLuZ3eZycDymgMSi_7tiuLG0OWMCnsyWfN2qiYY5bjYoCMk8hmHiV8z5KzFPLEt7U7zRUV3OslBt5oGRN_xFxdj4eLuE3YjkdCDxmFo88x9aXcvm47naREQqULiyqk2ceYEKqrUa2rp_v_C3jaJXHSAzKxikkqhs_UM-yWsUolINOx8YtUYZR2vJwLYLxUlXziWNff5zImjSa_MqHy9JTIdNRLzV4A4Swb8ZeUXd9pF-ZLOqnOzkDQ"
              muted
              autoPlay
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex flex-col items-center justify-center gap-4 cursor-pointer">
              <div className="w-20 h-20 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
              <span className="text-white font-bold tracking-widest uppercase text-xs">Course Preview</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-1 lg:order-2 flex flex-col gap-8"
        >
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
            Best <span className="text-indigo-600">Data Science Course</span> in Nagpur.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
            Join the top-rated institute for Python training and Machine Learning. Master the art of data science with full-stack curriculum and 100% placement assistance.
          </p>
          <p className="text-sm font-bold text-indigo-600 tracking-wide uppercase">
            #1 Rated IT Training Institute in Nagpur
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <a href="#lead-form" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:translate-y-[-2px] transition-all active:scale-95 text-lg text-center inline-block">
              Start Learning Now
            </a>
            <button className="flex items-center gap-3 px-5 py-2 bg-white/60 backdrop-blur rounded-xl border border-slate-100 shadow-sm hover:bg-white/80 transition-all">
              <div className="p-1 bg-indigo-50 rounded-full">
                <CheckCircle className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm font-bold text-slate-800">Download 2025 Industry Curriculum</span>
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-700">4.9/5 (2,500+ Professionals Certified in Nagpur)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const GoldStandardSection = () => {
  return (
    <section className="py-16 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Why Data Science is the <span className="text-indigo-600">Gold Standard</span> in 2026.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              By mid 2027, 80% of business decisions are driven by Predictive AI. Companies in Nagpur and globally are no longer looking for &apos;coders&apos;—they are looking for <span className="font-bold text-slate-900">Decision Architects</span>.
            </p>
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex items-center justify-between">
              <span className="text-slate-700 font-medium italic">Starting packages for Data Science employees:</span>
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-3xl font-black text-indigo-600"
              >
                ₹8.5 LPA+
              </motion.div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                "100% Placement assistance",
                "Award Winning Institute by SILICON INDIA",
                "15000+ Trained Professional",
                "120+ Corporate Partners",
                "18+ Years of Legacy"
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                  {point}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-100 rounded-[40px] blur-2xl opacity-20 -z-10" />
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz75cmG94N2LDHdhMA4aJj6NXPDpcp0fTsuZNh5YfGt9PSxbh4SprYSppbRpEEJWvMiW4_HQ-z3KklB1xT5AaKTAPojyOI427uJ3RPoiC5J5AiIObdniO80lHhZ3oK2WXx9mBmJo4bb5EBVnEG9R1xplP92YEzImCwLLY6DUH1buekDJjys2sNz_E0xYkvDoLpj8-g9KqUL0c8uYppwXxTd0RQyehZn3s4OJRcMAP-1fsu8TpGEhELVIgb_mMl2onn5ApJ17yGsA" 
              alt="Data Science Training" 
              className="w-full rounded-[40px] shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-6 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600">It&apos;s wise to take a demo and then decide. Book your free demo now!</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
              >
                <span className="font-bold text-slate-800">{faq.q}</span>
                <ChevronRight className={`w-5 h-5 text-indigo-600 transition-transform ${openIndex === idx ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm md:text-base border-t border-slate-50 pt-4 bg-slate-50/50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LeadFormSection = () => {
  return (
    <section id="lead-form" className="py-16 px-6 bg-slate-50 border-y border-slate-200/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Let&apos;s Understand Your Need Better</h2>
          <p className="text-slate-600 text-lg">
            Connect with our admissions team to find the right program for your goals and take the first step towards your future in data science.
          </p>
        </div>

        <form className="grid gap-6 bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Primary Motivation</label>
            <select defaultValue="" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all">
              <option value="" disabled>Select your motivation</option>
              <option>Career Launch: I am looking for a comprehensive program with placement.</option>
              <option>Professional Growth: Upskilling to enhance career prospects.</option>
              <option>Personal Interest: Exploring Data Science out of curiosity.</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Institute &quot;Brand Name&quot; Importance</label>
            <select defaultValue="" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all">
              <option value="" disabled>Select your priority</option>
              <option>High Priority: I believe a recognized brand adds significant value to my resume and helps during interviews.</option>
              <option>Exploring Options: I&apos;m not yet sure how much the institute&apos;s brand will impact my future opportunities.</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">How did you discover IPCS Global Nagpur?</label>
            <select defaultValue="" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all">
              <option value="" disabled>Select an option</option>
              <option>Word of Mouth: It was recommended by a friend or colleague or relative.</option>
              <option>Online Search: I found it while searching on Google, Facebook, or Instagram.</option>
              <option>General Interest: I came across the link and wanted to learn more.</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
              <input 
                type="text" 
                placeholder="e.g. Alex Johnson"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
              <input 
                type="email" 
                placeholder="alex@example.com"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Contact Number</label>
            <input 
              type="tel" 
              placeholder="+91 (555) 000-0000"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 mt-2">
            <h4 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
               Our Recommendation: Start with a Free Demo
            </h4>
            <ul className="space-y-3">
              {[
                'Clear your doubts regarding the curriculum and industry trends.',
                'Provide a transparent look at our training methodology.',
                'Help you make an informed decision for your professional future.',
                'We offer value for your money and we never loot by overcharging.'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-center text-lg italic text-slate-600 py-4">
            &quot;At IPCS Global Nagpur, we value transparency. <span className="font-bold text-slate-900">No fake promises</span>, just real results.&quot;
          </p>

          <p className="text-center text-sm font-medium text-indigo-600 mb-2">
            Would you like to schedule your free demo session for this week? (Offline or Online)
          </p>

          <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.98]">
            Submit
            <Calendar className="w-5 h-5" />
          </button>
          
          <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            By clicking &quot;Submit&quot;, you agree to our Terms and Privacy Policy.
          </p>
        </form>
      </div>
    </section>
  );
};

const CourseSection = () => {
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-4">Comprehensively Designed Modules</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            From Python fundamentals to advanced Predictive AI, our modules are curated to make you job-ready in the competitive Data Science landscape.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {COURSES.map((course) => (
            <div 
              key={course.id}
              className={`relative overflow-hidden bg-slate-50 border border-slate-100 rounded-3xl p-6 transition-all duration-300 ${activeCourseId === course.id ? 'ring-2 ring-indigo-600 shadow-xl' : 'hover:shadow-lg'}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${course.color}`}>
                {course.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">{course.title}</h3>
              
              <button 
                onClick={() => setActiveCourseId(activeCourseId === course.id ? null : course.id)}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors mt-auto"
              >
                {activeCourseId === course.id ? 'Close' : 'Explore Now'}
                <ChevronRight className={`w-4 h-4 transition-transform ${activeCourseId === course.id ? 'rotate-90' : ''}`} />
              </button>

              <AnimatePresence>
                {activeCourseId === course.id && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 mt-6 border-t border-slate-200">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Highlights</p>
                      <ul className="space-y-2">
                        {course.highlights.map((h, i) => (
                          <li key={i} className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-indigo-500" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-16 px-6 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm md:text-base font-bold text-indigo-600 uppercase tracking-[0.3em]">We Don&apos;t Just Teach. We Place.</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-4">What Our Students Say</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Your journey ends with a job, not just a certificate. Receive an Internationally Recognized Certification valid in India and Middle East. We have dedicated and experienced TPO to help find suitable job and groom candidates.
          </p>
        </div>

        <div className="relative">
          <div className="flex animate-scroll-slow gap-8 py-4">
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
              <div 
                key={idx}
                className="group flex flex-col gap-6 min-w-[320px] md:min-w-[480px]"
              >
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-lg border border-slate-200 group-hover:shadow-xl transition-all cursor-pointer">
                  <img src={t.videoThumb} alt={`${t.name} Testimonial`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-indigo-600 fill-indigo-600" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-2">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scroll-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll-slow {
          animation: scroll-slow 40s linear infinite;
          width: fit-content;
        }
        .animate-scroll-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

const PartnersMarquee = () => {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Our graduates work at forward-thinking companies</p>
      </div>
      
      <div className="relative flex">
        <div className="flex animate-scroll whitespace-nowrap items-center gap-20 py-4">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <img 
              key={i} 
              src={p.logo} 
              alt={p.name} 
              className="h-14 md:h-18 w-auto object-contain transition-all cursor-pointer hover:scale-110" 
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          width: fit-content;
        }
      `}</style>
    </section>
  );
};

const TrustSection = () => {
  return (
    <section className="py-16 px-6 bg-indigo-100/30">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-indigo-600/5 rounded-[40px] rotate-3 -z-10 blur-xl" />
          <img 
            src="https://lh3.googleusercontent.com/aida/ADBb0ujfoDNh572JacovlChZHjVVvH3Drmz6wK_KvxmhWKtUDqQ5EyVSiYgUkDfwLrYGgC2Hjfq1Kt8WsKHGpHjjQPoJFCE2Lbk6JG96tfI9-KxVgQB7F2CUlhqd9g31IUKPlgpq_jiiwFOUsX6rkYBUFui6J8w4_k-6hiX7luA-1rJ7_oTOPhxZA55iWY2ZGLIKJy6KXJS49OlEurcecgtVaFNhupwtBkWwss0rkB9oU2-cFFVusEL1Bduwn-LIOUQ4GuYNI33cnVPS" 
            alt="TUV SUD Partner" 
            className="w-full max-w-xl rounded-[40px] shadow-2xl shadow-indigo-600/10"
          />
        </motion.div>

        <div>
          <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">Partnered with TÜV SÜD</h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Our collaboration ensures that your learning path meets international benchmarks for quality and technical excellence.
          </p>
          <ul className="grid gap-5">
            {[
              'Globally recognized certification',
              'Industry-standard curriculum',
              'Enhanced job prospects',
              'Technical excellence validation'
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-indigo-50 shadow-sm">
                <div className="p-2 bg-indigo-600 text-white rounded-xl">
                  <CheckCircle className="w-5 h-5 fill-white text-indigo-600" />
                </div>
                <span className="font-bold text-slate-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { label: 'Trained Professionals', value: '1.5M+' },
    { label: 'Placed Professionals', value: '25K+' },
    { label: 'Industrial Projects', value: '1200+' },
    { label: 'Global Presence', value: '50+' },
    { label: 'Corporate Partners', value: '120+' },
  ];

  return (
    <section className="py-16 px-6 bg-white relative overflow-hidden">
      {/* Dot Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#493ee5 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Proven results, global impact.</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Our curriculum is designed to maximize your learning outcomes, while equipping you with the practical skills needed to thrive in the modern data ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center group">
              <div className="text-4xl lg:text-5xl font-bold text-indigo-600 mb-3 group-hover:scale-110 transition-transform">{s.value}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-normal">
                {s.label.split(' ').map((word, i) => <div key={i}>{word}</div>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold tracking-tight">IPCS Global</h3>
            <p className="text-slate-400 max-w-xs leading-relaxed text-sm">
              Plot # 13A, 1st Floor, Shree Ramchandar Complex, Ashok Colony, Khamla - Pratap Nagar Road, Near Somalwar Nikalas High School, Nagpur - 440024, Maharashtra
            </p>
            <div className="flex gap-4">
              {[
                { name: 'Instagram', icon: <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-6 h-6 object-contain" />, url: 'https://www.instagram.com/accounts/login/?next=%2Fipcsnagpur%2F&source=omni_redirect' },
                { name: 'LinkedIn', icon: <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" className="w-6 h-6 object-contain" />, url: 'https://www.linkedin.com/company/ipcs-global?originalSubdomain=in' },
                { name: 'WhatsApp', icon: <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6 object-contain" />, url: 'https://api.whatsapp.com/send/?phone=919405212345&text&type=phone_number&app_absent=0' },
                { name: 'YouTube', icon: <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube" className="w-6 h-6 object-contain" />, url: 'https://www.youtube.com/@ipcsglobal' }
              ].map(s => (
                <a 
                  key={s.name} 
                  href={s.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl bg-white border border-white/10 flex items-center justify-center hover:bg-slate-100 transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div id="contact-section" className="space-y-6">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Get in Touch</h4>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:nagpur@ipcsglobal.com" className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-colors text-sm">
                    <Mail className="w-4 h-4" />
                    nagpur@ipcsglobal.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919405212345" className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-colors text-sm">
                    <Phone className="w-4 h-4" />
                    +91 94052 12345
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Legal</h4>
              <ul className="space-y-4">
                {['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Security'].map(l => (
                  <li key={l}>
                    <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-64 grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <iframe 
              src="https://maps.google.com/maps?q=IPCS%20Global%20Nagpur&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
            />
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 IPCS Global. All rights reserved. Built for high-growth enterprises.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Global Status</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#001c37] selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <Hero />
      <GoldStandardSection />
      <LeadFormSection />
      <CourseSection />
      <StatsSection />
      <FAQSection />
      <TestimonialsSection />
      <PartnersMarquee />
      <TrustSection />
      <Footer />
    </div>
  );
}
