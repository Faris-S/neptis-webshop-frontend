export async function apiFetch(url, options = {}) {
  const opts = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  };
  const res = await fetch(url, opts);
  if (!res.ok) {
    throw new Error('API error');
  }
  return res.json();
}
