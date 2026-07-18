import { DealSlider } from './components/DealSlider';
import { Features } from './components/Features';
import { Leaf, Beef, Apple, Fish } from 'lucide-react';
import React, { useState } from 'react';

export default function App() {
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber) {
      alert(`Thanks! We'll text today's deals to ${mobileNumber} shortly.`);
      setMobileNumber("");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-green-200">
      
      {/* Main container - full width */}
      <div className="w-full max-w-7xl mx-auto bg-white min-h-screen shadow-sm sm:border-x sm:border-slate-100 flex flex-col relative">
        
        {/* First Page Viewport Container */}
        <div className="flex flex-col h-[100dvh] max-h-[100dvh] w-full">
          {/* Full Height Hero Container */}
          <div className="flex flex-col flex-1 relative z-10 overflow-hidden min-h-0">
            {/* Abstract Background Graphic */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <Beef 
                className="absolute top-[15%] -right-[190px] w-[340px] h-[340px] text-slate-100/60 -rotate-12" 
                strokeWidth={1}
              />
              <Fish 
                className="absolute top-[28%] right-[110px] w-[110px] h-[110px] text-slate-100/60 rotate-[15deg]" 
                strokeWidth={1.2}
              />
              <Apple 
                className="absolute top-[86%] right-[35%] w-[110px] h-[110px] text-slate-100/60 -rotate-[15deg]" 
                strokeWidth={1.5}
              />
            </div>

            {/* Header */}
            <header className="flex items-center justify-between px-6 sm:px-12 md:px-20 lg:px-24 py-6 md:py-10 relative z-10">
              <div className="flex items-center gap-2 text-green-700">
                <Leaf className="w-7 h-7 md:w-8 md:h-8" />
                <span className="font-bold text-2xl md:text-3xl tracking-tight">Agripals</span>
              </div>
              <a
                href="https://forms.gle/AqFsSnandRwdAaYe9"
                className="text-sm md:text-base font-semibold text-slate-500 hover:text-green-700 transition-colors"
              >
                Wholesaler
              </a>
            </header>

            {/* Main Content (Pushed to bottom) */}
            <main className="px-6 sm:px-12 md:px-20 lg:px-24 flex-1 flex flex-col justify-end pb-4 md:pb-12 relative z-10">
              
              <DealSlider />

              <div className="mt-1 mb-4 md:mt-4 md:mb-8">
                <h2 className="text-[26px] md:text-[40px] tracking-tight leading-[1.2]">
                  <span className="font-extrabold text-green-700 underline decoration-green-300 underline-offset-4">Fresher.</span>{' '}
                  <span className="font-extrabold text-green-700 underline decoration-green-300 underline-offset-4">Cheaper.</span>{' '}
                  <br className="hidden md:block" />
                  <span className="font-medium text-slate-700">No Middleman.</span>
                </h2>
              </div>

            </main>
          </div>

          {/* CTA Form */}
          <div className="w-full bg-white px-6 sm:px-12 md:px-20 lg:px-24 py-6 md:py-8 border-t border-slate-200 z-10 shrink-0">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-stretch md:items-end gap-4 max-w-3xl">
              <input 
                type="tel" 
                placeholder="e.g. 555-123-4567" 
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="flex-1 px-0 py-2 text-lg md:text-xl focus:outline-none placeholder:text-slate-400 font-medium bg-transparent border-b-2 border-slate-200 focus:border-slate-900 transition-colors rounded-none min-w-0"
                required
              />
              <button 
                type="submit"
                className="bg-slate-900 hover:bg-black text-white font-bold tracking-wide text-base md:text-lg px-8 py-3 md:py-4 transition-colors shadow-sm active:scale-[0.99] rounded-none whitespace-nowrap"
              >
                TEXT US
              </button>
            </form>
            <p className="text-[13px] md:text-sm text-slate-500 mt-4 md:mt-5 font-medium max-w-3xl">
              Text our sales team for today's wholesale deals.
            </p>
          </div>
        </div>

        <div className="h-2 bg-slate-50 w-full shrink-0" />

        {/* Features Section */}
        <Features />

        <footer className="px-6 py-12 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Agripals. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
