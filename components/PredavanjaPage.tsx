import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Loader2, User, BookOpen } from 'lucide-react';
import { PageType, Lecture } from '../types';
import { getCombinedLectures } from '../services/lectureService';

interface PredavanjaPageProps {
  onNavigate: (view: PageType) => void;
}

const PredavanjaPage: React.FC<PredavanjaPageProps> = ({ onNavigate }) => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<'Maribor' | 'Ljubljana'>('Maribor');

  useEffect(() => {
    const loadLectures = async () => {
      setLoading(true);
      try {
        const data = await getCombinedLectures(selectedCity);
        setLectures(data);
      } catch (error) {
        console.error('Failed to load lectures:', error);
      } finally {
        setLoading(false);
      }
    };
    loadLectures();
  }, [selectedCity]);

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#6b2121] py-12 text-white border-b-4 border-cardio-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl mb-4">
            Predavanja
          </h1>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Preverite, kje in kdaj bomo izvajali strokovna predavanja.
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        
        {/* City Toggle Buttons */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setSelectedCity('Maribor')}
            className={`px-6 py-3 rounded-full font-bold transition-all shadow-md ${
              selectedCity === 'Maribor' 
                ? 'bg-[#6b2121] text-white' 
                : 'bg-white text-gray-700 hover:bg-stone-100'
            }`}
          >
            Predavanja v Mariboru
          </button>
          <button
            onClick={() => setSelectedCity('Ljubljana')}
            className={`px-6 py-3 rounded-full font-bold transition-all shadow-md ${
              selectedCity === 'Ljubljana' 
                ? 'bg-[#6b2121] text-white' 
                : 'bg-white text-gray-700 hover:bg-stone-100'
            }`}
          >
            Predavanja v Ljubljani
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-cardio-600 animate-spin" />
          </div>
        ) : lectures.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-stone-100 px-6 py-12 text-center text-gray-500">
            Trenutno ni razpisanih predavanj.
          </div>
        ) : (
          <>
            {/* Große Bildschirme: Tabelle mit festen Spaltenbreiten – alle Spalten sichtbar, kein seitliches Scrollen */}
            <div className="hidden xl:block bg-white rounded-2xl shadow-lg overflow-hidden border border-stone-100">
              <table className="w-full table-fixed divide-y divide-gray-200">
                <colgroup>
                  <col className="w-[9.5rem]" />
                  <col className="w-[6.5rem]" />
                  <col className="w-[15%]" />
                  <col />
                  <col className="w-[13%]" />
                  <col className="w-[14%]" />
                </colgroup>
                <thead className="bg-gray-50">
                  <tr>
                    {['Datum', 'Ura', 'Lokacija', 'Tema / Naslov', 'Predavatelj', 'Komentar'].map((naslov) => (
                      <th
                        key={naslov}
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      >
                        {naslov}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lectures.map((item, index) => (
                    <tr key={index} className="align-top hover:bg-stone-50 transition-colors">
                      <td className="px-4 py-5">
                        <div className="flex items-center text-sm font-semibold text-gray-900 whitespace-nowrap">
                          <Calendar className="h-4 w-4 mr-2 flex-shrink-0 text-cardio-600" />
                          {item.date}
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-center text-sm text-gray-600 whitespace-nowrap">
                          <Clock className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
                          {item.time}
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-start text-sm text-gray-600 break-words">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                          <span className="min-w-0">{item.location}</span>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line break-words">
                          {item.topic || '-'}
                        </p>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-start text-sm text-gray-600 break-words">
                          <User className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                          <span className="min-w-0">{item.lecturer || '-'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <p className="text-sm text-cardio-600 italic whitespace-pre-line break-words">
                          {item.comment}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Kleinere Bildschirme: jede Vorlesung als Karte, damit nichts gequetscht wird */}
            <div className="xl:hidden space-y-4">
              {lectures.map((item, index) => (
                <article key={index} className="bg-white rounded-2xl shadow-md border border-stone-100 overflow-hidden">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 bg-stone-50 border-b border-stone-100 px-5 py-3 text-sm">
                    <span className="flex items-center font-semibold text-gray-900">
                      <Calendar className="h-4 w-4 mr-2 text-cardio-600" />
                      {item.date}
                    </span>
                    <span className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      {item.time}
                    </span>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    <div className="flex items-start">
                      <BookOpen className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-cardio-600" />
                      <p className="text-gray-800 leading-relaxed whitespace-pre-line break-words">{item.topic || '-'}</p>
                    </div>
                    <div className="flex items-start text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                      <span className="break-words">{item.location}</span>
                    </div>
                    {item.lecturer && (
                      <div className="flex items-start text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                        <span className="break-words">{item.lecturer}</span>
                      </div>
                    )}
                    {item.comment && (
                      <p className="text-sm text-cardio-600 italic whitespace-pre-line break-words border-t border-stone-100 pt-3">
                        {item.comment}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
        
        <div className="mt-8 bg-cardio-50 border-l-4 border-cardio-500 p-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-cardio-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-cardio-800 font-medium">
                Predavanja so odprta za javnost.
              </p>
              <p className="text-sm text-cardio-700 mt-1">
                Urnik in lokacija se lahko spremenita. Za najnovejše informacije spremljajte našo spletno stran.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredavanjaPage;
