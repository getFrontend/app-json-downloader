export interface JsonFetchResult {
  data: string;
  error?: string;
}

export const fetchJson = async (url: string): Promise<JsonFetchResult> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    const formattedJson = JSON.stringify(json, null, 2);
    return { data: formattedJson };
  } catch (error) {
    return {
      data: '',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const saveFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}; 