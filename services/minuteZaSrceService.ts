import Papa from 'papaparse';

const MINUTE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1Wa6EsUMFHBm5NuiS8yn4zL4GUSlLbswh/export?format=csv';

export interface MinuteItem {
  title: string;
  subtitle: string;
  link: string;
}

export const fetchMinuteZaSrceFromSheet = async (): Promise<MinuteItem[]> => {
  try {
    const response = await fetch(MINUTE_SHEET_URL);
    const csvText = await response.text();

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: false,
        skipEmptyLines: true,
        complete: (results) => {
          // Skip header row
          const rows = (results.data as string[][]).slice(1);
          
          const items: MinuteItem[] = rows.map((row) => {
            const title = row[0] ? row[0].trim() : '';
            const subtitle = row[1] ? row[1].trim() : '';
            const link = row[2] ? row[2].trim() : '';

            return {
              title,
              subtitle,
              link
            };
          }).filter(item => item.title || item.subtitle || item.link);

          // Reverse the order so higher rows (bottom of sheet) come first
          resolve(items.reverse());
        },
        error: (error: Error) => {
          console.error('Error parsing Minute za srce CSV:', error);
          resolve([]);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching Minute za srce from sheet:', error);
    return [];
  }
};
