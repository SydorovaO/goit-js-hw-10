import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
const { select, catInfo, loader, error } = refs;

select.style.display = 'none';
error.classList.add('hidden');

fetchBreeds()
  .then(breeds => fillSelect(breeds))
  .catch(onError);

function fillSelect(breeds) {
  select.innerHTML = '';

  loader.style.display = 'none';
  const catsMarkup = createCatsMarkup(breeds);
  select.insertAdjacentHTML('beforeend', catsMarkup);

  select.style.display = 'block';
}

function createCatsMarkup(data) {
  return data
    .map(({ id, name }) => {
      return ` <option value="${id}">${name}</option>`;
    })
    .join('');
}

function onError(err) {
  loader.style.display = 'none';
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
  console.log('not found');
}
// ----------------------------------------------------------
select.addEventListener('change', e => {
  catInfo.innerHTML = '';
  loader.style.display = 'block';
  const breedId = select.value;

  fetchCatByBreed(breedId)
    .then(cats => {
      loader.style.display = 'none';

      const catMarkup = createCatMarkup(cats);
      catInfo.insertAdjacentHTML('beforeend', catMarkup);
    })
    .catch(onError);
});

function createCatMarkup(cats) {
  return cats
    .map(cat => {
      return `
        <img src="${cat.url}" width="360" />
            <h1>${cat.breeds[0].name}</h1>
            <p>${cat.breeds[0].description}</p>
            <p><b>Temperament: </b>${cat.breeds[0].temperament}</p>
        `;
    })
    .join('');
}
