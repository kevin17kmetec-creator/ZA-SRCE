import Papa from 'papaparse';

const GALLERY_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1aXcE-X2NpNrA1j8n4UcUqtj_Kh8Vtd8fUb9tAyuTB1M/export?format=csv';

export interface GalleryImage {
  src: string;
  caption: string;
}

const convertDriveLinkToDirectLink = (url: string): string | null => {
  if (!url) return null;
  
  // Extract ID from various Google Drive URL formats
  const idRegex = /[-\w]{25,}/;
  const match = url.match(idRegex);
  
  if (match && match[0]) {
    return `https://lh3.googleusercontent.com/d/${match[0]}`;
  }
  
  return url;
};

export const fetchGalleryFromSheet = async (): Promise<GalleryImage[]> => {
  try {
    const response = await fetch(GALLERY_SHEET_URL);
    const csvText = await response.text();

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: false,
        skipEmptyLines: true,
        complete: (results) => {
          const rows = (results.data as string[][]).slice(1); // skip header row
          
          // Assuming Column A is the image link and Column B (index 1) is the caption
          // If no caption, we can use a generic one or empty
          const images = rows
            .filter(row => row[0] && row[0].trim()) // Filter rows without a link
            .map((row) => {
              const src = convertDriveLinkToDirectLink(row[0].trim());
              const caption = row[1] ? row[1].trim() : "";
              
              return {
                src: src || "",
                caption: caption
              };
            })
            .filter(img => img.src !== "");

          resolve(images);
        },
        error: (error: Error) => {
          console.error('Error parsing gallery CSV:', error);
          resolve([]);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching gallery from sheet:', error);
    return [];
  }
};
