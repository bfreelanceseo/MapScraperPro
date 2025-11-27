import { BusinessLead } from '../types';

/**
 * Parses a Markdown table string into an array of BusinessLead objects.
 * Assumes the table has headers matching the expected keys or similar.
 */
export const parseMarkdownTable = (markdown: string): BusinessLead[] => {
  const lines = markdown.split('\n').filter(line => line.trim() !== '');
  const data: BusinessLead[] = [];
  
  // Find the header line (starts with |)
  let headerIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('|') && lines[i].includes('|')) {
      headerIndex = i;
      break;
    }
  }

  if (headerIndex === -1) return [];

  // Parse Headers
  const headers = lines[headerIndex]
    .split('|')
    .map(h => h.trim())
    .filter(h => h !== '');

  // Map headers to object keys
  const keyMap: { [index: number]: string } = {};
  headers.forEach((header, index) => {
    const lower = header.toLowerCase();
    if (lower.includes('name')) keyMap[index] = 'name';
    else if (lower.includes('address')) keyMap[index] = 'address';
    else if (lower.includes('rating')) keyMap[index] = 'rating';
    else if (lower.includes('review')) keyMap[index] = 'reviews';
    else if (lower.includes('web')) keyMap[index] = 'website';
    else if (lower.includes('phone')) keyMap[index] = 'phone';
    else keyMap[index] = header.toLowerCase().replace(/\s/g, '_');
  });

  // Skip the separator line (e.g., |---|---|)
  let dataStartIndex = headerIndex + 1;
  if (dataStartIndex < lines.length && lines[dataStartIndex].includes('---')) {
    dataStartIndex++;
  }

  // Parse Rows
  for (let i = dataStartIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith('|')) continue;

    const cells = line
      .split('|')
      .slice(1, -1) // Remove first and last empty elements from split
      .map(c => c.trim());

    if (cells.length > 0) {
      const row: any = { id: crypto.randomUUID() };
      let hasData = false;
      
      cells.forEach((cell, index) => {
        if (keyMap[index]) {
          row[keyMap[index]] = cell;
          hasData = true;
        }
      });

      if (hasData) {
        data.push(row as BusinessLead);
      }
    }
  }

  return data;
};

export const convertToCSV = (data: BusinessLead[]): string => {
  if (data.length === 0) return '';
  
  const headers = ['Name', 'Phone'];
  const keys = ['name', 'phone'];
  
  const csvRows = [headers.join(',')];
  
  data.forEach(row => {
    const values = keys.map(key => {
      const val = row[key] || '';
      // Escape quotes and wrap in quotes to handle commas in data
      const escaped = ('' + val).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  });
  
  return csvRows.join('\n');
};

/**
 * Prepares data for Excel export by selecting only relevant columns.
 */
export const prepareDataForExport = (data: BusinessLead[]): any[] => {
  return data.map(row => ({
    Name: row.name,
    Phone: row.phone
  }));
};