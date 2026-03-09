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

const isGoogleDocLink = (text: string): boolean => {
  if (!text) return false;
  return text.includes('docs.google.com/document/d/');
};

const fetchGoogleDocContent = async (url: string): Promise<string> => {
  const docIdRegex = /\/document\/d\/([-\w]{25,})/;
  const match = url.match(docIdRegex);
  if (!match || !match[1]) return url;

  const docId = match[1];
  // We try to fetch the text version of the document
  const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`;
  
  try {
    const response = await fetch(exportUrl);
    if (response.ok) {
      const text = await response.text();
      // Basic cleanup of the text if needed
      return text.trim();
    }
    
    // If direct fetch fails (CORS), we might have to just return the link or a message
    console.warn('Direct fetch of Google Doc failed, likely CORS. Status:', response.status);
  } catch (e) {
    console.error("Error fetching Google Doc content:", e);
  }
  
  return `Vsebina je na voljo na povezavi: ${url}`;
};

export const fetchNewsFromSheet = async (): Promise<NewsArticle[]> => {
  try {
    const response = await fetch(SHEET_CSV_URL);
    const csvText = await response.text();

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: false, // We'll find the header manually
        skipEmptyLines: true,
        complete: async (results) => {
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
          
          const newArticlesPromises = dataRows
            .filter(row => row.length > 1 && row[titleIdx]) // Filter empty rows or rows without title
            .map(async (row, index) => {
              // Map category to valid types, default to 'Novice'
              let category: NewsArticle['category'] = 'Novice';
              const rawCategory = row[categoryIdx]?.trim();
              
              if (rawCategory) {
                category = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);
              }

              // Extract images
              const heroColIdx = 5;
              const galleryColIndices = [6, 7, 8, 9, 10];
              
              let heroImage = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
              const galleryImages: string[] = [];

              if (row[heroColIdx] && row[heroColIdx].trim()) {
                const directLink = convertDriveLinkToDirectLink(row[heroColIdx].trim());
                if (directLink) heroImage = directLink;
              }

              galleryColIndices.forEach(colIdx => {
                if (row[colIdx] && row[colIdx].trim()) {
                  const directLink = convertDriveLinkToDirectLink(row[colIdx].trim());
                  if (directLink) galleryImages.push(directLink);
                }
              });

              const allImages = [heroImage, ...galleryImages];

              // Handle Google Doc content
              let content = row[contentIdx] || '';
              if (isGoogleDocLink(content)) {
                content = await fetchGoogleDocContent(content.trim());
              }

              return {
                id: 1000 + index,
                title: row[titleIdx] || 'Brez naslova',
                summary: content.length > 200 ? content.substring(0, 200) + '...' : content,
                content: content,
                date: row[dateIdx] || new Date().toLocaleDateString('sl-SI'),
                category: category,
                image: heroImage,
                images: allImages
              };
            });

          const newArticles = await Promise.all(newArticlesPromises);
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
