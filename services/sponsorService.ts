import Papa from 'papaparse';

const SPONSORS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1NBdMi2vwuBwgvpbEZK0oxw2NxMYwbhr_/export?format=csv';

const convertDriveLinkToDirectLink = (url: string): string | null => {
  if (!url) return null;
  const idRegex = /[-\w]{25,}/;
  const match = url.match(idRegex);
  if (match && match[0]) {
    // Standard direct link format for Google Drive images
    return `https://lh3.googleusercontent.com/d/${match[0]}`;
  }
  return url;
};

export const fetchSponsorsFromSheet = async (): Promise<string[]> => {
  try {
    const response = await fetch(SPONSORS_SHEET_URL);
    const csvText = await response.text();

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: false,
        skipEmptyLines: true,
        complete: (results) => {
          // Skip header row
          const rows = (results.data as string[][]).slice(1);
          
          const images = rows
            .map((row) => row[0] ? row[0].trim() : '')
            .filter((url) => url !== '')
            .map((url) => convertDriveLinkToDirectLink(url) || '')
            .filter((url) => url !== '');

          resolve(images);
        },
        error: (error: Error) => {
          console.error('Error parsing sponsors CSV:', error);
          resolve([]);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching sponsors from sheet:', error);
    return [];
  }
};
