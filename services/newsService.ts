import Papa from 'papaparse';
import { NewsArticle } from '../types';
import { LATEST_NEWS } from '../constants';

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/18qxZe-tBsfro4piom_iYK-yYZgVWsGq5GZ7Q2VdX44I/export?format=csv';

interface SheetRow {
  Avtor: string;
  Naslov: string;
  Vsebina: string;
  Kategorija: string;
  Datum: string;
  Slike: string;
}

const convertDriveLinkToDirectLink = (url: string): string | null => {
  if (!url) return null;
  
  // Extract ID from various Google Drive URL formats
  const idRegex = /[-\w]{25,}/;
  const match = url.match(idRegex);
  
  if (match && match[0]) {
    return `https://lh3.googleusercontent.com/d/${match[0]}`;
  }
  
  return url; // Return original if not a drive link (e.g. unsplash)
};

export const fetchNewsFromSheet = async (): Promise<NewsArticle[]> => {
  try {
    const response = await fetch(SHEET_CSV_URL);
    const csvText = await response.text();

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: false, // We'll find the header manually
        skipEmptyLines: true,
        complete: (results) => {
          const rows = results.data as string[][];
          
          // Find the header row index (looking for 'Naslov' and 'Vsebina')
          const headerRowIndex = rows.findIndex(row => 
            row.some(cell => cell && cell.toString().toLowerCase().includes('naslov')) && 
            row.some(cell => cell && cell.toString().toLowerCase().includes('vsebina'))
          );

          if (headerRowIndex === -1) {
            console.error('Could not find header row in CSV');
            resolve([]);
            return;
          }

          const headers = rows[headerRowIndex].map(h => h.trim());
          // Reverse the data rows so the last entry in the sheet (newest) comes first
          const dataRows = rows.slice(headerRowIndex + 1).reverse();

          const titleIdx = headers.findIndex(h => h.toLowerCase() === 'naslov');
          const contentIdx = headers.findIndex(h => h.toLowerCase() === 'vsebina');
          const categoryIdx = headers.findIndex(h => h.toLowerCase() === 'kategorija');
          const dateIdx = headers.findIndex(h => h.toLowerCase() === 'datum');
          // We assume images start from column G (index 6) to K (index 10)
          // But let's be dynamic based on the 'Slike' header if possible, or fixed indices if headers are missing for G-K
          const slikeHeaderIdx = headers.findIndex(h => h.toLowerCase() === 'slike');
          
          // If 'Slike' header exists, we start looking from there. Otherwise default to index 5 (F) or 6 (G).
          // The user said images start at G (index 6).
          // Let's look at a range of columns for images.
          
          const newArticles: NewsArticle[] = dataRows
            .filter(row => row.length > 1 && row[titleIdx]) // Filter empty rows or rows without title
            .map((row, index) => {
              // Map category to valid types, default to 'Novice'
              let category: NewsArticle['category'] = 'Novice';
              const rawCategory = row[categoryIdx]?.trim();
              
              if (rawCategory) {
                // Capitalize first letter, keep the rest as is
                category = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);
              }

              // Extract images from columns G (6) to K (10)
              // Also check column F (5) if it has data
              const potentialImageCols = [5, 6, 7, 8, 9, 10]; 
              const images: string[] = [];

              potentialImageCols.forEach(colIdx => {
                if (row[colIdx] && row[colIdx].trim()) {
                  const directLink = convertDriveLinkToDirectLink(row[colIdx].trim());
                  if (directLink) {
                    images.push(directLink);
                  }
                }
              });

              // Default image if none found
              const mainImage = images.length > 0 
                ? images[0] 
                : 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

              return {
                id: 1000 + index, // Start IDs from 1000 to avoid collision
                title: row[titleIdx] || 'Brez naslova',
                summary: row[contentIdx] || '',
                date: row[dateIdx] || new Date().toLocaleDateString('sl-SI'),
                category: category,
                image: mainImage,
                images: images
              };
            });

          resolve(newArticles);
        },
        error: (error: Error) => {
          console.error('Error parsing CSV:', error);
          resolve([]);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching news from sheet:', error);
    return [];
  }
};

export const getCombinedNews = async (): Promise<NewsArticle[]> => {
  const sheetNews = await fetchNewsFromSheet();
  // Combine sheet news with static news
  // Sheet news come first (assuming they are newer or prioritized)
  return [...sheetNews, ...LATEST_NEWS];
};
