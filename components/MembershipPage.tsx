
import React, { useState } from 'react';
import { Download, CheckCircle, Users, Heart, ArrowRight, Loader2, FileText, Briefcase, MapPin, Calendar, Phone, Mail, Gift } from 'lucide-react';
import { PageType } from '../types';

interface MembershipPageProps {
  onNavigate?: (view: PageType, sectionId?: string) => void;
}

const MembershipPage: React.FC<MembershipPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    address: '',
    occupation: '',
    employmentStatus: '', // Maps to "Zaposlen"
    email: '',
    phone: '',
    agreed: false
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreed) {
      alert("Prosimo, potrdite strinjanje z obdelavo osebnih podatkov.");
      return;
    }

    setFormStatus('submitting');

    // Simulate API call
    setTimeout(() => {
      console.log("Form Data Submitted:", formData);
      // Here you would typically integrate EmailJS or Formspree
      setFormStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  return (
    <div className="pt-20 bg-stone-50 min-h-screen">
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
            Postanite član društva
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Izkazite nam zaupanje – včlanite se ali obnovite in podaljšajte članstvo.
            Podprite naša prizadevanja za zdrava srca!
          </p>
          
          {/* Button for Benefits */}
          {onNavigate && (
            <button
              onClick={() => onNavigate('ugodnosti')}
              className="inline-flex items-center px-8 py-3 bg-white text-[#4a0404] rounded-full font-bold shadow-lg hover:bg-stone-50 hover:scale-105 transition-all cursor-pointer ring-4 ring-white/20"
            >
              <Gift className="w-5 h-5 mr-2" />
              Kaj prinaša članstvo v društvu?
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 -mt-16 relative z-10">
          {/* Individual Membership */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-8 border-cardio-500 transform transition-transform hover:-translate-y-1">
            <div className="p-8 text-center">
              <div className="inline-flex justify-center items-center p-3 bg-red-50 rounded-full mb-4">
                <Users className="h-8 w-8 text-cardio-600" />
              </div>
              <h3 className="text-2xl font-bold text-trust-900 mb-2">Posamezniki</h3>
              <p className="text-gray-500 mb-6">Letna članarina za leto 2024</p>
              <div className="flex justify-center items-baseline mb-6">
                <span className="text-5xl font-extrabold text-trust-900">15,00 €</span>
                <span className="text-gray-500 ml-2">/ leto</span>
              </div>
              <ul className="text-left space-y-4 mb-8 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Brezplačne meritve (tlak, sladkor, holesterol)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Revija "Za srce"
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Popusti pri izletih in vadbah
                </li>
              </ul>
            </div>
          </div>

          {/* Family Membership */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-8 border-trust-800 transform transition-transform hover:-translate-y-1">
            <div className="p-8 text-center">
              <div className="inline-flex justify-center items-center p-3 bg-blue-50 rounded-full mb-4">
                <Users className="h-8 w-8 text-trust-800" />
              </div>
              <h3 className="text-2xl font-bold text-trust-900 mb-2">Družinska članarina</h3>
              <p className="text-gray-500 mb-6">Za 2 do 4 člane istega gospodinjstva</p>
              <div className="flex justify-center items-baseline mb-6">
                <span className="text-5xl font-extrabold text-trust-900">20,00 €</span>
                <span className="text-gray-500 ml-2">/ leto</span>
              </div>
              <p className="text-sm text-gray-500 mb-6 px-4">
                Člansko izkaznico prejme vsak član družine posebej.
              </p>
              <ul className="text-left space-y-4 mb-8 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Vse ugodnosti za vse družinske člane
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Skupno prejemanje revije
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Form and Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          
          {/* Instructions */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 h-fit">
            <h2 className="text-2xl font-bold text-trust-900 mb-6">Postopek včlanitve</h2>
            
            <div className="space-y-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cardio-100 text-cardio-600 font-bold text-lg">1</div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Izpolnite pristopno izjavo</h3>
                  <p className="mt-1 text-gray-600">
                    Najhitrejši način je izpolnitev{' '}
                    <a 
                      href="#digital-form" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('digital-form');
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="text-cardio-600 hover:text-cardio-800 font-medium underline cursor-pointer"
                    >
                      digitalnega obrazca
                    </a>{' '}
                    spodaj. Pošiljanje je varno in hitro.
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Alternativno lahko obrazec natisnete in pošljete po pošti:
                  </p>
                  <a 
                    href="http://www.zasrce-mb.si/obrazec-pristopnaizjava.doc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-2 text-sm font-medium text-cardio-600 hover:text-cardio-700"
                  >
                    <Download className="mr-1 h-4 w-4" />
                    Prenesi pristopno izjavo (DOC)
                  </a>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cardio-100 text-cardio-600 font-bold text-lg">2</div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Plačilo članarine</h3>
                  <p className="mt-1 text-gray-600">
                    Po prejemu vaše izjave vam bomo po pošti poslali položnico za plačilo letne članarine.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cardio-100 text-cardio-600 font-bold text-lg">3</div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Članska izkaznica</h3>
                  <p className="mt-1 text-gray-600">
                    Po opravljenem plačilu prejmete člansko izkaznico na vaš domači naslov, s katero uveljavljate ugodnosti v Mariboru in okolici.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form / Success Message */}
          <div id="digital-form" className="bg-white rounded-2xl shadow-lg border border-stone-200 p-8 scroll-mt-32">
            {formStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-trust-900 mb-4">Hvala za zaupanje!</h3>
                <p className="text-lg text-gray-600 mb-8">
                  Vaša pristopna izjava je bila uspešno poslana. Na vaš naslov bomo v najkrajšem možnem času poslali položnico za članarino.
                </p>
                <button
                  onClick={() => {
                    setFormData({
                      name: '',
                      birthDate: '',
                      address: '',
                      occupation: '',
                      employmentStatus: '',
                      email: '',
                      phone: '',
                      agreed: false
                    });
                    setFormStatus('idle');
                  }}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-cardio-700 bg-cardio-50 hover:bg-cardio-100 transition-colors"
                >
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Nazaj na obrazec
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center mb-6">
                   <div className="p-2 bg-cardio-50 rounded-lg mr-3">
                      <FileText className="h-6 w-6 text-cardio-600" />
                   </div>
                   <h3 className="text-2xl font-bold text-trust-900">Digitalna pristopna izjava</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Osebni Podatki */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">Osebni Podatki</h4>
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Ime in Priimek</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cardio-500 focus:border-cardio-500 sm:text-sm p-3 border bg-gray-50"
                        placeholder="Janez Novak"
                      />
                    </div>

                    <div>
                      <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">Datum in leto rojstva</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="birthDate"
                          id="birthDate"
                          required
                          value={formData.birthDate}
                          onChange={handleInputChange}
                          className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-cardio-500 focus:border-cardio-500 sm:text-sm p-3 border bg-gray-50"
                          placeholder="01.01.1960"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Naslov bivanja</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-cardio-500 focus:border-cardio-500 sm:text-sm p-3 border bg-gray-50"
                          placeholder="Slovenska ulica 1, 2000 Maribor"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">Status</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">Poklic</label>
                         <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Briefcase className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="occupation"
                              id="occupation"
                              value={formData.occupation}
                              onChange={handleInputChange}
                              className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-cardio-500 focus:border-cardio-500 sm:text-sm p-3 border bg-gray-50"
                              placeholder="Upokojenec"
                            />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700 mb-1">Zaposlen (kje)</label>
                        <input
                          type="text"
                          name="employmentStatus"
                          id="employmentStatus"
                          value={formData.employmentStatus}
                          onChange={handleInputChange}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cardio-500 focus:border-cardio-500 sm:text-sm p-3 border bg-gray-50"
                          placeholder="Naziv podjetja ali 'ne'"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Kontakt */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">Kontakt</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-pošta</label>
                         <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-cardio-500 focus:border-cardio-500 sm:text-sm p-3 border bg-gray-50"
                              placeholder="janez@example.com"
                            />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon / GSM</label>
                         <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              id="phone"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-cardio-500 focus:border-cardio-500 sm:text-sm p-3 border bg-gray-50"
                              placeholder="041 123 456"
                            />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Legal & Confirm */}
                  <div className="pt-4 space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-xs text-gray-600 leading-relaxed text-justify">
                      <span className="font-bold">IZJAVA:</span> Podpisani izjavljam, da dovoljujem organom in funkcionarjem društva uporabljati in obdelovati moje osebne podatke, navedene v pristopni izjavi, za potrebe delovanja društva. Društvo za zdravje srca in ožilja za Maribor in Podravje izjavlja, da bo pridobljene osebne podatke, skladno z Zakonom o varstvu osebnih podatkov, uporabljalo izključno za namen, za katerega so bili pridobljeni.
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="agreed"
                          name="agreed"
                          type="checkbox"
                          required
                          checked={formData.agreed}
                          onChange={handleCheckboxChange}
                          className="focus:ring-cardio-500 h-4 w-4 text-cardio-600 border-gray-300 rounded cursor-pointer"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="agreed" className="font-medium text-gray-700 cursor-pointer">
                          Strinjam se z obdelavo osebnih podatkov.
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-full shadow-lg text-base font-bold text-white bg-cardio-600 hover:bg-cardio-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cardio-500 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                          Pošiljanje...
                        </>
                      ) : (
                        <>
                          Pošlji pristopno izjavo
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                    <p className="text-xs text-gray-400 mt-4 text-center">
                      S klikom potrjujete resničnost vnesenih podatkov.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
