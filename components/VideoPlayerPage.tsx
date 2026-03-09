import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { PageType } from '../types';

interface VideoPlayerPageProps {
  onNavigate: (view: PageType) => void;
  videoUrl?: string;
  title?: string;
}

const VideoPlayerPage: React.FC<VideoPlayerPageProps> = ({ onNavigate, videoUrl, title }) => {
  // Default values if none provided
  const defaultUrl = "https://365.rtvslo.si/arhiv/omizje/174860854?s=embed";
  const defaultTitle = "Omizje: 20 let Društva za zdravje srca in ožilja za Maribor in Podravje";

  const currentUrl = videoUrl ? `${videoUrl}${videoUrl.includes('?') ? '&' : '?'}s=embed` : defaultUrl;
  const currentTitle = title || defaultTitle;

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#4a0404] py-8 text-white border-b-4 border-cardio-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => onNavigate('minute-za-srce')}
            className="flex items-center text-gray-300 hover:text-white transition-colors mb-4 group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Nazaj na Minute za srce
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200">
          <div className="p-4 md:p-6 border-b border-stone-100 bg-stone-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-lg md:text-xl font-bold text-trust-900">{currentTitle}</h2>
            <a 
              href={videoUrl || "https://365.rtvslo.si/arhiv/omizje/174860854"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cardio-600 hover:text-cardio-700 flex items-center text-xs md:text-sm font-medium"
            >
              Odpri v RTV 365 <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
          
          <div className="relative w-full bg-black overflow-hidden h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px]">
            <iframe 
              src={currentUrl}
              className="absolute top-0 left-0 w-full border-0"
              style={{ height: 'calc(100% + 80px)' }}
              allowFullScreen
              title={currentTitle}
              allow="autoplay; fullscreen; picture-in-picture"
              scrolling="no"
            ></iframe>
          </div>
          
          <div className="p-4 md:p-6 bg-stone-50 text-stone-600 text-xs md:text-sm italic">
            Vir: RTV Slovenija, TV Maribor
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
