import React from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Activity } from 'lucide-react';
import { PageType } from '../types';

interface KoledarVadbPageProps {
  onNavigate: (view: PageType) => void;
}

const KoledarVadbPage: React.FC<KoledarVadbPageProps> = ({ onNavigate }) => {
  const exercises = [
    {
      day: 'Ponedeljek',
      time: '18:00 - 19:00',
      location: 'Telovadnica OŠ Tabor I',
      type: 'Vadba za zdravo srce',
      instructor: 'Marko Novak, prof. šp. vzg.',
    },
    {
      day: 'Sreda',
      time: '17:30 - 18:30',
      location: 'Dvorana Lukna',
      type: 'Nordijska hoja',
      instructor: 'Ana Kovač, vaditeljica',
    },
    {
      day: 'Petek',
      time: '09:00 - 10:00',
      location: 'Mestni park (pri paviljonu)',
      type: 'Jutranja gimnastika',
      instructor: 'Petra Zupan, fizioterapevtka',
    },
  ];

  return (
    <div className="pt-20 bg-stone-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#4a0404] py-12 text-white border-b-4 border-cardio-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
            Koledar vadb
          </h1>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Pridružite se nam na rednih vadbah za krepitev srca in ožilja.
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-stone-100 hover:shadow-lg transition-shadow">
              <div className="bg-cardio-50 p-4 border-b border-cardio-100 flex justify-between items-center">
                <h3 className="font-bold text-cardio-800 text-lg">{item.day}</h3>
                <Activity className="h-5 w-5 text-cardio-600" />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Ura</p>
                    <p className="text-gray-900">{item.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Lokacija</p>
                    <p className="text-gray-900">{item.location}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-cardio-100 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <span className="text-cardio-600 text-xs font-bold">i</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Vrsta vadbe</p>
                    <p className="text-gray-900 font-semibold">{item.type}</p>
                    <p className="text-sm text-gray-500 mt-1">Vodja: {item.instructor}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
          <h3 className="text-lg font-medium text-green-800 mb-2">Pomembno obvestilo</h3>
          <p className="text-green-700">
            Za udeležbo na vadbah je priporočljiva udobna športna oprema in plastenka vode. 
            V primeru slabega vremena se vadbe na prostem lahko prestavijo ali odpovejo.
            Za več informacij nas kontaktirajte.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KoledarVadbPage;
