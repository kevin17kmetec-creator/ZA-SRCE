import React from 'react';
import { ArrowLeft, FileText, Download } from 'lucide-react';
import { PageType } from '../types';

interface CenikPageProps {
  onNavigate: (view: PageType) => void;
}

const CenikPage: React.FC<CenikPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-trust-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => onNavigate('dejavnost')}
            className="flex items-center text-gray-300 hover:text-white mb-6 transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Nazaj na Dejavnost
          </button>
          <div className="flex items-center mb-4">
             <div className="bg-white/10 p-3 rounded-full mr-4">
                <FileText className="h-10 w-10 text-cardio-500" />
             </div>
             <div>
               <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                 Cenik storitev
               </h1>
               <p className="text-gray-400 text-sm mt-1">Velja od 01.04.2023</p>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100 p-8">
          
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-trust-900 uppercase tracking-wide">
              Društvo za zdravje srca in ožilja za Maribor in Podravje
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Ministrstvo za zdravje Republike Slovenije je podelilo društvu status humanitarne organizacije, ki deluje v javnem interesu na področju zdravstvene preventive.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider w-1/2">
                    Storitev
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-sm font-bold text-trust-900 uppercase tracking-wider bg-cardio-50 border-b-2 border-cardio-200">
                    Cena ČLANI (EUR)
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">
                    Cena NEČLANI (EUR)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {/* Row 1 */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1. KRVNI TLAK</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-cardio-600 bg-cardio-50/30">brezplačno</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">brezplačno</td>
                </tr>
                {/* Row 2 */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2. KRVNI SLADKOR</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-cardio-600 bg-cardio-50/30">2,50 EUR</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">3,00 EUR</td>
                </tr>
                {/* Row 3 */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3. HOLESTEROL</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-cardio-600 bg-cardio-50/30">3,50 EUR</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">4,00 EUR</td>
                </tr>
                {/* Row 4 */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4. TRIGLICERIDI</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-cardio-600 bg-cardio-50/30">3,50 EUR</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">4,00 EUR</td>
                </tr>
                {/* Row 5 */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">5. Sladkor + holesterol</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-cardio-600 bg-cardio-50/30">5,00 EUR</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">6,00 EUR</td>
                </tr>
                {/* Row 6 */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">6. Sladkor + trigliceridi</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-cardio-600 bg-cardio-50/30">5,00 EUR</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">6,00 EUR</td>
                </tr>
                {/* Row 7 */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">7. Holesterol + trigliceridi</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-cardio-600 bg-cardio-50/30">6,00 EUR</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">8,00 EUR</td>
                </tr>
                {/* Row 8 */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">8. Sladkor + holesterol + triglic.</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-cardio-600 bg-cardio-50/30">8,00 EUR</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">10,00 EUR</td>
                </tr>
                {/* Row 9 */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">9. EKG monitor</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-cardio-600 bg-cardio-50/30">2,00 EUR</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">4,00 EUR</td>
                </tr>
                {/* Row 10 */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">10. Sladkor, holest., trigli, EKG</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-cardio-600 bg-cardio-50/30">9,00 EUR</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">14,00 EUR</td>
                </tr>
                {/* Row 11 */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">11. Gleženjski indeks</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-cardio-600 bg-cardio-50/30">7,00 EUR</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">10,00 EUR</td>
                </tr>
                {/* Row 12 */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">12. Posvet s kardiologom</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-cardio-600 bg-cardio-50/30">10,00 EUR</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">15,00 EUR</td>
                </tr>
                {/* Row 13 */}
                <tr className="bg-gray-50">
                  <td colSpan={3} className="px-6 py-3 text-sm font-bold text-gray-800 uppercase tracking-wider">
                    13. TPO, defibrilator
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                   <td className="px-6 py-2 text-sm text-gray-600 pl-10">- Posamezno</td>
                   <td className="px-6 py-2 text-sm text-center font-bold text-cardio-600 bg-cardio-50/30">20,00 EUR</td>
                   <td className="px-6 py-2 text-sm text-center text-gray-700">30,00 EUR</td>
                </tr>
                 <tr className="hover:bg-gray-50 transition-colors">
                   <td className="px-6 py-2 text-sm text-gray-600 pl-10">- Društva</td>
                   <td className="px-6 py-2 text-sm text-center font-bold text-cardio-600 bg-cardio-50/30">440,00 EUR</td>
                   <td className="px-6 py-2 text-sm text-center text-gray-700">440,00 EUR</td>
                </tr>
                 <tr className="hover:bg-gray-50 transition-colors">
                   <td className="px-6 py-2 text-sm text-gray-600 pl-10">- Družbe, s.p.</td>
                   <td className="px-6 py-2 text-sm text-center font-bold text-cardio-600 bg-cardio-50/30">500,00 EUR</td>
                   <td className="px-6 py-2 text-sm text-center text-gray-700">500,00 EUR</td>
                </tr>

                {/* Row 14 */}
                 <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">14. Zdravstveno svetovanje</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-cardio-600 bg-cardio-50/30">brezplačno</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">brezplačno</td>
                </tr>

              </tbody>
            </table>
          </div>
          
          <div className="mt-8 text-center border-t border-gray-100 pt-8">
             <div className="max-w-md mx-auto">
               <p className="font-bold text-trust-900 mb-4">Predsednik društva: dr. Mirko Bombek spec.med</p>
               <p className="text-sm text-gray-500 mb-1">2000 MARIBOR, Pobreška cesta 8</p>
               <p className="text-sm text-gray-500 mb-1">Telefon: 02 228 22 63 | E-naslov: tajnistvo@zasrce-mb.si</p>
               <p className="text-sm font-semibold text-cardio-600 mt-4 uppercase">Življenje podaljšujmo tako, da si ga ne skrajšujmo!</p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CenikPage;