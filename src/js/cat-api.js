const API_KEY =
  'live_WMvtxePVKRXBjZsjxYFtFlOWqFz0gkyI0mBmoW9aNYlRdNtrxNB85pKa8M2IFrbP';
const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('No data');
      }
      return response.json();
    })
    .catch(error => {
      Notiflix.Notify.failure(error.textContent);
    });
}
function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('No data');
      }
      return response.json();
    })
    .catch(error => {
      Notiflix.Notify.failure(error.textContent);
    });
}

export { fetchBreeds, fetchCatByBreed };
