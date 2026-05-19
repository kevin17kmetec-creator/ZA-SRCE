import Papa from 'papaparse';
import { Lecture } from '../types';

// URL do tabele Predavanja
const LECTURES_SHEET_URL = 'https://docs.google.com/spreadsheets/d/18qxZe-tBsfro4piom_iYK-yYZgVWsGq5GZ7Q2VdX44I/gviz/tq?tqx=out:csv&sheet=Predavanja';

const STATIC_LECTURES: Lecture[] = []; // Privzeti statični podatki zaenkrat

export const fetchLecturesFromSheet = async (): Promise<Lecture[]> => {
  if (LECTURES_SHEET_URL.includes('TUKAJ_BO_VASA_POVEZAVA_DO_TABELE')) {
     return STATIC_LECTURES;
  }

  try {
    const response = await fetch(LECTURES_SHEET_URL);
    const csvText = await response.text();

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: false, // Find headers manually for robustness
        skipEmptyLines: true,
        complete: (results) => {
          const rows = results.data as string[][];
          
          // Find the header row index (looking for 'Datum' and 'Lokacija')
          const headerRowIndex = rows.findIndex(row => 
            row.some(cell => cell && cell.toString().toLowerCase().includes('datum')) && 
            row.some(cell => cell && cell.toString().toLowerCase().includes('lokacija'))
          );

          if (headerRowIndex === -1) {
            console.error('Could not find header row in lectures CSV');
            resolve([]);
            return;
          }

          const headers = rows[headerRowIndex].map(h => h.trim());
          const dataRows = rows.slice(headerRowIndex + 1);

          const dateIdx = headers.findIndex(h => h.toLowerCase().includes('datum'));
          const timeIdx = headers.findIndex(h => h.toLowerCase().includes('ura'));
          const locationIdx = headers.findIndex(h => h.toLowerCase().includes('lokacija'));
          const topicIdx = headers.findIndex(h => h.toLowerCase().includes('tema') || h.toLowerCase().includes('naslov') || h.toLowerCase().includes('predavanje'));
          const lecturerIdx = headers.findIndex(h => h.toLowerCase().includes('predavatelj'));
          const commentIdx = headers.findIndex(h => h.toLowerCase().includes('komentar'));

          const lectures: Lecture[] = dataRows
            .filter(row => row[dateIdx] && row[timeIdx] && row[locationIdx])
            .map(row => ({
              date: row[dateIdx],
              time: row[timeIdx],
              location: row[locationIdx],
              topic: topicIdx !== -1 && row[topicIdx] ? row[topicIdx] : '',
              lecturer: lecturerIdx !== -1 && row[lecturerIdx] ? row[lecturerIdx] : '',
              comment: commentIdx !== -1 && row[commentIdx] ? row[commentIdx] : ''
            }));

          resolve(lectures);
        },
        error: (error: Error) => {
          console.error('Error parsing lectures CSV:', error);
          resolve(STATIC_LECTURES);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching lectures from sheet:', error);
    return STATIC_LECTURES;
  }
};

export const getCombinedLectures = async (): Promise<Lecture[]> => {
  const sheetLectures = await fetchLecturesFromSheet();
  if (sheetLectures.length > 0) {
    return sheetLectures;
  }
  return STATIC_LECTURES;
};
