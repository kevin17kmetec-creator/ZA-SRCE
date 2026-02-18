import React from 'react';
import { PROGRAMS } from '../constants';
import { Activity, Heart, Users, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Activity: <Activity className="h-8 w-8 text-white" />,
  Heart: <Heart className="h-8 w-8 text-white" />,
  Users: <Users className="h-8 w-8 text-white" />,
};

const Programs: React.FC = () => {
  return (
    <section id="programs" className="py-16 bg-stone-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-cardio-600 font-semibold tracking-wide uppercase">Kaj počnemo</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-trust-900 sm:text-4xl">
            Programi za vaše zdravje
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Naše poslanstvo uresničujemo skozi redne aktivnosti, ki so dostopne vsem članom in širši javnosti.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PROGRAMS.map((program, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col group"
            >
              <div className="p-8 flex-1">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-cardio-500 to-cardio-600 rounded-xl shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                  {iconMap[program.icon]}
                </div>
                <h3 className="text-xl font-bold text-trust-900 mb-3">{program.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {program.description}
                </p>
              </div>
              <div className="bg-stone-50 px-8 py-4 border-t border-stone-100 rounded-b-2xl">
                <a 
                  href="#contact" 
                  className="text-cardio-600 font-medium hover:text-cardio-700 inline-flex items-center cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {program.action} <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;