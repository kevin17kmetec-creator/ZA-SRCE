import Papa from 'papaparse';

const GALLERY_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1-omuD7mmerr68gXtMhyPQx4aQdaT4Tpa/export?format=csv';

export interface GalleryImage {
  src: string;
  caption: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  images: GalleryImage[];
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

export const fetchGalleryFromSheet = async (): Promise<GalleryAlbum[]> => {
  try {
    const response = await fetch(GALLERY_SHEET_URL);
    const csvText = await response.text();

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: false,
        skipEmptyLines: true,
        complete: (results) => {
          const rows = (results.data as string[][]).slice(1); // skip header row
          
          const albumsMap = new Map<string, GalleryAlbum>();

          rows.forEach(row => {
            const albumTitle = row[0] ? row[0].trim() : 'Ostalo';
            const imageCaption = row[1] ? row[1].trim() : '';
            const imageLink = row[2] ? row[2].trim() : '';

            if (!imageLink) return;

            const src = convertDriveLinkToDirectLink(imageLink);
            if (!src) return;

            const image: GalleryImage = {
              src,
              caption: imageCaption
            };

            if (albumsMap.has(albumTitle)) {
              albumsMap.get(albumTitle)!.images.push(image);
            } else {
              albumsMap.set(albumTitle, {
                id: albumTitle.replace(/\s+/g, '-').toLowerCase(),
                title: albumTitle,
                images: [image]
              });
            }
          });

          // Convert map to array
          const albums = Array.from(albumsMap.values());
          resolve(albums);
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
