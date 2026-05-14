import Papa from 'papaparse';

const PUB_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1567hj4eoson2Uz4EK8c1SGMad4TTfyRu_x4hQWrXUTc/export?format=csv';

export interface Publication {
  title: string;
  subtitle: string;
  buttonText: string;
  link: string;
}

export const fetchPublicationsFromSheet = async (): Promise<Publication[]> => {
  try {
    const response = await fetch(PUB_SHEET_URL);
    const csvText = await response.text();

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: false,
        skipEmptyLines: true,
        complete: (results) => {
          // Skip header row
          const rows = (results.data as string[][]).slice(1);
          
          const publications = rows
            .filter(row => row[0] && row[0].trim()) // Filter rows without a title
            .map((row) => ({
              title: row[0].trim(),
              subtitle: row[1] ? row[1].trim() : "",
              buttonText: row[2] ? row[2].trim() : "Preberi več",
              link: row[3] ? row[3].trim() : ""
            }));

          resolve(publications);
        },
        error: (error: Error) => {
          console.error('Error parsing publications CSV:', error);
          resolve([]);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching publications from sheet:', error);
    return [];
  }
};
