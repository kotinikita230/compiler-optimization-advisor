const API_BASE_URL = 'http://localhost:8000';

export const analyzeCode = async (code, language) => {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code, language }),
  });
  if (!response.ok) throw new Error('Analysis failed');
  return response.json();
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Upload failed');
  return response.json();
};

export const getSupportedLanguages = async () => {
  const response = await fetch(`${API_BASE_URL}/languages`);
  return response.json();
};

export const getOptimizationGuide = async () => {
  const response = await fetch(`${API_BASE_URL}/docs-optimization`);
  return response.json();
};
