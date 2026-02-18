
import React from 'react';
import { MapPin, Phone, Mail, Clock, Printer } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const ContactMap: React.FC = () => {
  return (
    <section id="contact" className="bg-stone-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Side: Form and Info */}
            <div className="p-8 sm:p-12 lg:p-16">
              <h2 className="text-3xl font-extrabold text-trust-900 mb-8">Stopite v stik z nami</h2>
              
              {/* Contact Form - Now at the top */}
              <form className="grid grid-cols-1 gap-y-6 mb-12" onSubmit={(e) => {
                  e.preventDefault();
                  // In a real app, this would send an email via backend
                  window.location.href = `mailto:${CONTACT_INFO.email}?subject=Sporočilo s spletne strani`;
                }}>
                <div>
                  <label htmlFor="full-name" className="sr-only">Ime in Priimek</label>
                  <input
                    type="text"
                    name="full-name"
                    id="full-name"
                    autoComplete="name"
                    required
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-400 focus:ring-cardio-500 focus:border-cardio-500 border-gray-200 rounded-lg bg-stone-50"
                    placeholder="Ime in Priimek"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-400 focus:ring-cardio-500 focus:border-cardio-500 border-gray-200 rounded-lg bg-stone-50"
                    placeholder="Email naslov"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Sporočilo</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-400 focus:ring-cardio-500 focus:border-cardio-500 border-gray-200 rounded-lg bg-stone-50"
                    placeholder="Vaše sporočilo..."
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-bold text-white bg-cardio-600 hover:bg-cardio-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cardio-500 transition-colors"
                  >
                    Pošlji sporočilo (Email)
                  </button>
                </div>
              </form>

              {/* Society Contact Info - Now at the bottom */}
              <div className="space-y-6 pt-10 border-t border-stone-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <MapPin className="h-6 w-6 text-cardio-600" />
                  </div>
                  <div className="ml-4 text-base text-gray-600">
                    <p className="font-medium text-trust-900">Naslov</p>
                    <p>{CONTACT_INFO.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Phone className="h-6 w-6 text-cardio-600" />
                  </div>
                  <div className="ml-4 text-base text-gray-600">
                    <p className="font-medium text-trust-900">Telefon</p>
                    <p>{CONTACT_INFO.phone}</p>
                    {CONTACT_INFO.fax && <p className="text-sm text-gray-500 mt-1">Fax: {CONTACT_INFO.fax}</p>}
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Mail className="h-6 w-6 text-cardio-600" />
                  </div>
                  <div className="ml-4 text-base text-gray-600">
                    <p className="font-medium text-trust-900">E-pošta</p>
                    <p>{CONTACT_INFO.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Clock className="h-6 w-6 text-cardio-600" />
                  </div>
                  <div className="ml-4 text-base text-gray-600">
                    <p className="font-medium text-trust-900">Uradne ure</p>
                    <p>{CONTACT_INFO.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embed Google Map */}
            <div className="relative w-full h-96 lg:h-auto min-h-[400px] bg-gray-100">
               <iframe 
                 src="https://maps.google.com/maps?q=Pobre%C5%A1ka%20cesta%208,%202000%20Maribor&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                 width="100%" 
                 height="100%" 
                 style={{border:0}} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 title="Lokacija Društva"
                 referrerPolicy="no-referrer-when-downgrade"
                 className="absolute inset-0"
               ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
