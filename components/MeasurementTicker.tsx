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
    <div className="fixed top-20 left-64 w-[calc(100%-16rem)] z-30 bg-white/95 backdrop-blur-sm text-gray-800 overflow-hidden h-12 flex items-center shadow-sm border-b border-cardio-100">
      {/* Container for the sliding content */}
      <div className="flex animate-marquee-seamless hover:[animation-play-state:paused] w-max will-change-transform">
        {/* Render content twice for seamless loop */}
        {renderContent()}
        {renderContent()}
        {/* Render a third time just in case the screen is extremely wide, though 2 usually suffices for -50% logic if content > screen width */}
        {renderContent()}
        {renderContent()}
      </div>
    </div>
  );
};

export default MeasurementTicker;
