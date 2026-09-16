export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (typeof codespaceName === 'string' && codespaceName.trim().length > 0) {
    return `https://${codespaceName.trim()}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function buildApiUrl(resource) {
  return `${getApiBaseUrl()}/api/${resource}/`;
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && payload.data && Array.isArray(payload.data.items)) {
    return payload.data.items;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
}
