import React from 'react';
import { LATEST_NEWS } from '../constants';
import { Calendar, Tag } from 'lucide-react';

const News: React.FC = () => {
  return (
    <section id="news" className="py-16 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-trust-900">Aktualno</h2>
            <p className="mt-2 text-lg text-gray-500">Zadnje novice in dogodki društva.</p>
          </div>
          <a href="#news" className="hidden md:block text-cardio-600 font-medium hover:text-cardio-700 whitespace-nowrap">
            Arhiv novic &rarr;
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {LATEST_NEWS.map((item) => (
            <article key={item.id} className="flex flex-col bg-stone-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-stone-100">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={item.image} alt={item.title} />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center text-sm font-medium text-cardio-600 mb-3">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>{item.category}</span>
                  </div>
                  <a href="#" className="block mt-2" onClick={(e) => e.preventDefault()}>
                    <p className="text-xl font-semibold text-trust-900 hover:text-cardio-600 transition-colors">{item.title}</p>
                    <p className="mt-3 text-base text-gray-500 line-clamp-3">{item.summary}</p>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
                    <p>{item.date}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
           <a href="#news" className="text-cardio-600 font-medium hover:text-cardio-700">
            Arhiv novic &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};

export default News;