const API_KEY =
  'live_WMvtxePVKRXBjZsjxYFtFlOWqFz0gkyI0mBmoW9aNYlRdNtrxNB85pKa8M2IFrbP';

function fetchBreeds() {
  const URL = `https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`;
  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error('No data');
    }
    return response.json();
  });
}

export { fetchBreeds };
