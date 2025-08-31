const API_BASE = 'https://staging-ws.di.no/ws/json/addressHelper/v-2/NO/';
const API_KEY = '905679e0-2da7-4be1-94a2-23646d8d3488';

export const validateStreetName = async (address: string) => {
  const response = await fetch(
    `${API_BASE}streetSearch/${encodeURIComponent(address)}?apiKey=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};

export const validateStreetNumber = async (
  streetIds: number[],
  streetNumber: number | null
) => {
  const response = await fetch(
    `${API_BASE}streetNumberSearch/${encodeURIComponent(
      streetIds.join(',')
    )}/?apiKey=${API_KEY}&streetNumber=${streetNumber}`
  );
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};
