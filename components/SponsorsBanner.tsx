import React, { useState, useEffect } from 'react';
import { fetchSponsorsFromSheet } from '../services/sponsorService';
import { motion } from 'motion/react';

const SponsorsBanner: React.FC = () => {
  const [sponsors, setSponsors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSponsorsFromSheet();
        setSponsors(data);
      } catch (error) {
        console.error('Failed to load sponsors:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading || sponsors.length === 0) return null;

  return (
    <section className="bg-stone-50 py-12 border-t border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h2 className="text-2xl font-bold text-trust-900 uppercase tracking-wider text-stone-600">
          Naši sponzorji
        </h2>
      </div>
      <div className="relative w-full flex items-center">
        {/* Left/Right Fading gradient mask */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-stone-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-stone-50 to-transparent z-10 pointer-events-none" />
        
        <motion.div
           className="flex flex-nowrap"
           animate={{ x: ["0%", "-50%"] }}
           transition={{ 
             repeat: Infinity,
             ease: "linear",
             duration: sponsors.length * 8 
           }}
           style={{ width: "max-content" }}
        >
          {/* We render two identical blocks to ensure a smooth -50% translation */}
          {[1, 2].map((group) => (
            <div key={group} className="flex flex-nowrap flex-shrink-0">
              {sponsors.map((src, index) => (
                <div key={index} className="flex-shrink-0 w-40 h-24 mx-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                  <img 
                    src={src}
                    alt={`Sponsor ${index}`}
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsBanner;
