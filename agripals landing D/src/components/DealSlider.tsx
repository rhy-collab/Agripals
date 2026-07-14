import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const deals = [
  {
    price: "75¢",
    title: "Agripals Oysters.",
    subtitle: "per pc."
  },
  {
    price: "$3.30",
    title: "PEI Mussels.",
    subtitle: "per lb."
  },
  {
    price: "$4.05",
    title: "Med Mussels.",
    subtitle: "per lb."
  }
];

export function DealSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % deals.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-3">
      <div className="relative h-[110px] sm:h-[120px] md:h-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <h1 className="text-[70px] sm:text-[80px] md:text-[120px] leading-[1] font-black tracking-tighter text-slate-900 mb-0 -ml-1 md:-ml-2">
              {deals[index].price}
            </h1>
            <p className="text-[24px] sm:text-[26px] md:text-[36px] font-medium tracking-tight text-slate-800 leading-[1.2] mt-1 md:mt-2">
              {deals[index].title} <span className="text-slate-500 font-normal text-[20px] md:text-[28px] ml-1">{deals[index].subtitle}</span>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex gap-2 mt-3">
        {deals.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-green-700' : 'w-2 bg-slate-200 hover:bg-slate-300'}`} 
            aria-label={`Show deal ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
