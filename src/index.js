import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

import Notiflix from 'notiflix';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
const { select, catInfo, loader, error } = refs;

const slimSelect = new SlimSelect({
  select: '.breed-select',
});

// select.style.display = 'none';
error.classList.add('hidden');

fetchBreeds()
  .then(breeds => fillSelect(breeds))
  .catch(onError);

function fillSelect(breeds) {
  const options = breeds.map(({ id, name }) => ({
    text: name,
    value: id,
  }));

  slimSelect.setData(options);
  catInfo.classList.add('hidden');
}

// function fillSelect(breeds) {
//   select.innerHTML = '';

//   loader.style.display = 'none';
//   const catsMarkup = createCatsMarkup(breeds);
//   select.insertAdjacentHTML('beforeend', catsMarkup);

//   // select.style.display = 'block';
// }
// function createCatsMarkup(data) {
//   return data
//     .map(({ id, name }) => {
//       return ` <option value="${id}">${name}</option>`;
//     })
//     .join('');
// }

function onError(err) {
  loader.style.display = 'none';
  Notiflix.Notify.failure(error.textContent);
  console.log('not found');
}
// ----------------------------------------------------------
let isFirstLoade = true;
select.addEventListener('change', e => {
  if (isFirstLoade) {
    return (isFirstLoade = false);
  }
  catInfo.innerHTML = '';
  loader.style.display = 'block';

  const breedId = select.value;

  fetchCatByBreed(breedId)
    .then(cats => {
      loader.style.display = 'none';

      const catMarkup = createCatMarkup(cats);
      catInfo.insertAdjacentHTML('beforeend', catMarkup);
      catInfo.classList.remove('hidden');
    })
    .catch(onError);
});

function createCatMarkup(cats) {
  return cats
    .map(cat => {
      return `
        <img class="img" src="${cat.url}" width="360" />
            <h1 class="title">${cat.breeds[0].name}</h1>
            <p class="desc">${cat.breeds[0].description}</p>
            <p class="temper"><b>Temperament: </b>${cat.breeds[0].temperament}</p>
        `;
    })
    .join('');
}
