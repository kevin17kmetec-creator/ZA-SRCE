import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Loader2 } from 'lucide-react';
import { PageType, Measurement } from '../types';
import { getCombinedMeasurements } from '../services/measurementService';

interface UrnikMeritevPageProps {
  onNavigate: (view: PageType) => void;
}

const UrnikMeritevPage: React.FC<UrnikMeritevPageProps> = ({ onNavigate }) => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMeasurements = async () => {
      try {
        const data = await getCombinedMeasurements();
        setMeasurements(data);
      } catch (error) {
        console.error('Failed to load measurements:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMeasurements();
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#4a0404] py-12 text-white border-b-4 border-cardio-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
            Urnik meritev
          </h1>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Preverite, kje in kdaj bomo izvajali preventivne meritve v vaši bližini.
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-cardio-600 animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-stone-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Datum
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ura
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lokacija
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vrsta meritve
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Komentar
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {measurements.map((item, index) => (
                    <tr key={index} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <Calendar className="h-4 w-4 mr-2 text-cardio-600" />
                          {item.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          {item.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {item.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-cardio-600 italic">
                        {item.comment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
                Na meritve, prosimo, pridite tešč ali vsaj dve uri po lahkem obroku!
              </p>
              <p className="text-sm text-cardio-700 mt-1">
                Urnik se lahko spremeni. Za najnovejše informacije spremljajte našo spletno stran ali nas kontaktirajte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrnikMeritevPage;
