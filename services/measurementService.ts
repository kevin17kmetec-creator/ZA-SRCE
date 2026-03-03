import Papa from 'papaparse';
import { Measurement } from '../types';
import { MEASUREMENTS as STATIC_MEASUREMENTS } from '../constants';

const MEASUREMENTS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/18qxZe-tBsfro4piom_iYK-yYZgVWsGq5GZ7Q2VdX44I/gviz/tq?tqx=out:csv&sheet=Meritve';

export const fetchMeasurementsFromSheet = async (): Promise<Measurement[]> => {
  try {
    const response = await fetch(MEASUREMENTS_SHEET_URL);
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
            console.error('Could not find header row in measurements CSV');
            resolve([]);
            return;
          }

          const headers = rows[headerRowIndex].map(h => h.trim());
          const dataRows = rows.slice(headerRowIndex + 1);

          const dateIdx = headers.findIndex(h => h.toLowerCase().includes('datum'));
          const timeIdx = headers.findIndex(h => h.toLowerCase().includes('ura'));
          const locationIdx = headers.findIndex(h => h.toLowerCase().includes('lokacija'));
          const typeIdx = headers.findIndex(h => h.toLowerCase().includes('vrsta meritve'));
          const commentIdx = headers.findIndex(h => h.toLowerCase().includes('komentar'));

          const measurements: Measurement[] = dataRows
            .filter(row => row[dateIdx] && row[timeIdx] && row[locationIdx])
            .map(row => ({
              date: row[dateIdx],
              time: row[timeIdx],
              location: row[locationIdx],
              type: row[typeIdx] || '',
              comment: row[commentIdx] || ''
            }));

          resolve(measurements);
        },
        error: (error: Error) => {
          console.error('Error parsing measurements CSV:', error);
          resolve(STATIC_MEASUREMENTS);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching measurements from sheet:', error);
    return STATIC_MEASUREMENTS;
  }
};

export const getCombinedMeasurements = async (): Promise<Measurement[]> => {
  const sheetMeasurements = await fetchMeasurementsFromSheet();
  if (sheetMeasurements.length > 0) {
    return sheetMeasurements;
  }
  return STATIC_MEASUREMENTS;
};
