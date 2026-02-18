
import React from 'react';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { LATEST_NEWS } from '../constants';
import { PageType } from '../types';

interface NewsPageProps {
  onNavigate: (view: PageType) => void;
}

const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 bg-stone-50 min-h-screen flex flex-col">
      {/* Header - Standardized with Logo and Brand Red */}
      <div className="bg-[#4a0404] py-16 text-white border-b-4 border-cardio-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4">
             <img 
               src="https://lh3.googleusercontent.com/d/1mazUXuPKrHZMBIF3As1wQEU6E7OV2rAz" 
               alt="Logotip Društva za zdravje srca" 
               className="h-32 w-auto mx-auto object-contain drop-shadow-lg"
               referrerPolicy="no-referrer"
             />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            Novice in Dogodki
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Bodite na tekočem z našimi aktivnostmi, meritvami in preventivnimi programi.
          </p>
        </div>
      </div>

      {/* Breadcrumb / Back Navigation */}
      <div className="bg-white border-b border-stone-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center text-gray-600 hover:text-cardio-600 transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Nazaj na prvo stran
          </button>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {LATEST_NEWS.map((item) => (
            <article 
              key={item.id} 
              className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100 group"
            >
              <div className="flex-shrink-0 relative overflow-hidden">
                <img 
                  className="h-56 w-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                  src={item.image} 
                  alt={item.title} 
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-cardio-700 shadow-md backdrop-blur-sm border border-red-50">
                    <Tag className="h-3 w-3 mr-1" />
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <Calendar className="flex-shrink-0 mr-2 h-4 w-4" />
                    <p>{item.date}</p>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-trust-900 leading-tight mb-4 group-hover:text-cardio-600 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed mb-6">
                    {item.summary}
                  </p>
                </div>
                <div className="pt-6 border-t border-stone-50">
                   <div className="text-cardio-600 font-bold flex items-center group-hover:translate-x-1 transition-transform">
                     Preberi celotno novico <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                   </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state or more news hint */}
        <div className="mt-16 text-center">
          <div className="inline-block p-12 bg-stone-100/50 rounded-3xl border-2 border-dashed border-stone-200">
             <p className="text-gray-500 font-medium">Za arhiv starejših novic nas kontaktirajte v tajništvu.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
