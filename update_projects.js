import fs from 'fs';

let c = fs.readFileSync('components/ProjektiPage.tsx', 'utf8');

c = c.replace(
  '<span className="font-semibold text-cardio-700">Nosilec:</span> prim. Marko BOMBEK, dr. med., spec. int. med.',
  '<span className="font-semibold text-cardio-700">Nosilec:</span> Tilen Majer, študent medicine- štipendist Fundacije'
);

c = c.replace(
  '<span className="font-semibold text-cardio-700">Nosilec:</span> prof. dr. Jernej ZAVRŠNIK, dr. med., spec. ped., prim.',
  '<span className="font-semibold text-cardio-700">Nosilec:</span> Izr. prof. dr prim. Jernej ZAVRŠNIK, dr. med., spec. ped.'
);

c = c.replace(
  '<h3 className="text-lg font-bold text-trust-900 mb-2">Projekt možganskožilne bolezni</h3>',
  '<h3 className="text-lg font-bold text-trust-900 mb-2">Projekt možganskožilne bolezni</h3>\n                  <p className="text-gray-600">\n                    <span className="font-semibold text-cardio-700">Nosilec:</span> Aleš Kodela, dr. med. spec. nev.\n                  </p>'
);

c = c.replace(
  '<span className="font-semibold text-cardio-700">Nosilka:</span> Ljudmila ŠTEGER, inž. kem. tehnol.',
  '<span className="font-semibold text-cardio-700">Nosilka:</span> Bojana Zornik, dipl. m.s'
);

c = c.replace(
  '<h3 className="text-lg font-bold text-trust-900 mb-2">Informacijsko publicistična dejavnost</h3>',
  '<h3 className="text-lg font-bold text-trust-900 mb-2">Informacijsko publicistična dejavnost</h3>\n                  <p className="text-gray-600">\n                    <span className="font-semibold text-cardio-700">Nosilec:</span> Kornelija Golob, novinarka in urednica.\n                  </p>'
);

fs.writeFileSync('components/ProjektiPage.tsx', c);
