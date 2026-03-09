import React, { useState, useEffect } from 'react';
import { getCombinedMeasurements } from '../services/measurementService';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Measurement } from '../types';

const MeasurementTicker: React.FC = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);

  useEffect(() => {
    const loadMeasurements = async () => {
      const data = await getCombinedMeasurements();
      setMeasurements(data);
    };
    loadMeasurements();
  }, []);

  if (measurements.length === 0) return null;

  // We duplicate the content to ensure seamless looping
  const renderContent = () => (
    <div className="flex items-center space-x-16 px-8 flex-shrink-0">
      {measurements.map((m, i) => (
        <div key={i} className="flex items-center space-x-3 text-sm font-medium whitespace-nowrap">
          <div className="flex items-center text-cardio-700">
            <Calendar className="w-4 h-4 mr-1.5" />
            <span className="text-gray-800 font-semibold">{m.date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1.5 text-cardio-400" />
            <span>{m.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-1.5 text-cardio-400" />
            <span className="text-gray-700">{m.location}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed top-16 md:top-20 left-0 md:left-64 right-0 z-[60] bg-white backdrop-blur-md text-gray-800 overflow-hidden h-10 md:h-12 flex items-center shadow-md border-b border-cardio-100 touch-pan-y">
      {/* Container for the sliding content */}
      <div 
        className="flex animate-marquee-seamless hover:[animation-play-state:paused] active:[animation-play-state:paused] w-max will-change-transform"
        style={{ 
          animationDuration: '80s',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        {/* Render content twice for seamless loop */}
        {renderContent()}
        {renderContent()}
      </div>
    </div>
  );
};

export default MeasurementTicker;
