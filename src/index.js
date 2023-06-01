import { fetchBreeds } from './cat-api';
fetchBreeds()
  .then(data => fillSelectData(data))
  .catch(error => console.error(error));

function fillSelectData(data) {
  const select = document.querySelector('.breed-select');
  data.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    select.appendChild(option);
  });

  return data;
}
