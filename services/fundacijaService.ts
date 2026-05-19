import Papa from 'papaparse';

const FUNDACIJA_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1hlgkxrvN6aeni4zSQCw5WXQrPgVyrt-DwBdBHMbIVGk/export?format=csv';

export interface FundacijaItem {
  mainText: string;
  quoteText: string;
  quoteAuthor: string;
  images: string[];
}

const convertDriveLinkToDirectLink = (url: string): string | null => {
  if (!url) return null;
  const idRegex = /[-\w]{25,}/;
  const match = url.match(idRegex);
  if (match && match[0]) {
    return `https://drive.google.com/uc?export=view&id=${match[0]}`;
  }
  return url;
};

export const fetchFundacijaFromSheet = async (): Promise<FundacijaItem[]> => {
  try {
    const response = await fetch(FUNDACIJA_SHEET_URL);
    const csvText = await response.text();

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: false,
        skipEmptyLines: true,
        complete: (results) => {
          // Skip header row
          const rows = (results.data as string[][]).slice(1);
          
          const items: FundacijaItem[] = rows.map((row) => {
            const mainText = row[0] ? row[0].trim() : '';
            const quoteText = row[1] ? row[1].trim() : '';
            const quoteAuthor = row[2] ? row[2].trim() : '';
            
            const rawImages = [row[3], row[4], row[5], row[6], row[7]];
            const images = rawImages
                .filter(img => img && img.trim() !== '')
                .map(img => convertDriveLinkToDirectLink(img.trim()) || '')
                .filter(img => img !== '');

            return {
              mainText,
              quoteText,
              quoteAuthor,
              images
            };
          }).filter(item => item.mainText || (item.quoteText && item.quoteAuthor) || item.images.length > 0);

          resolve(items);
        },
        error: (error: Error) => {
          console.error('Error parsing fundacija CSV:', error);
          resolve([]);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching fundacija from sheet:', error);
    return [];
  }
};
