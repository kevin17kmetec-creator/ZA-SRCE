import React from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { PageType } from '../types';

interface ObjaveVecerPageProps {
  onNavigate: (view: PageType) => void;
}

const ObjaveVecerPage: React.FC<ObjaveVecerPageProps> = ({ onNavigate }) => {
  const driveFolderId = "10E0eBlrvCtC8g8f8dt9wS6pZjMpxbXrj";
  
  // Using the embedded folder view which lists files
  const embedUrl = `https://drive.google.com/embeddedfolderview?id=${driveFolderId}#grid`;

  return (
    <div className="pt-20 bg-stone-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-trust-900 py-8 text-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <button 
            onClick={() => onNavigate('publikacije')}
            className="flex items-center text-gray-300 hover:text-white mb-4 transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Nazaj na Publikacije
          </button>
          <div className="flex items-center justify-between flex-wrap gap-4">
             <div className="flex items-center">
                <div className="bg-white/10 p-2 rounded-lg mr-4">
                    <BookOpen className="h-6 w-6 text-cardio-500" />
                </div>
                <div>
                   <h1 className="text-2xl font-bold tracking-tight">
                     Objave v Večeru
                   </h1>
                   <p className="text-gray-400 text-sm">
                     Arhiv prispevkov in prilog
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content - PDF Viewer / Drive Embed */}
      <div className="flex-grow bg-gray-100 relative">
        <div className="absolute inset-0 max-w-7xl mx-auto w-full h-full p-4">
            <div className="bg-white rounded-xl shadow-lg w-full h-full overflow-hidden flex flex-col border border-gray-200">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs text-gray-500 flex justify-between items-center">
                    <span>Pregledovalnik dokumentov</span>
                    <span>Arhiv</span>
                </div>
                <div className="flex-grow relative">
                    <iframe 
                        src={embedUrl}
                        className="absolute inset-0 w-full h-full border-0"
                        title="Dokumenti"
                        allow="autoplay"
                    ></iframe>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ObjaveVecerPage;