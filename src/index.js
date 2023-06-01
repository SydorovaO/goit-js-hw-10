import { fetchBreeds, fetchCatByBreed } from './cat-api';
const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
};
const { select, catInfo } = refs;

fetchBreeds().then(fillSelectData).catch(onError);

function fillSelectData(data) {
  data.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    select.appendChild(option);
  });

  return data;
}

function onError(err) {
  console.log('not found');
}

select.addEventListener('change', () => {
  //   const breedId = select.value;
  //   console.log(breedId);
  fetchCatByBreed().then(renderCatCard).catch(onError);
});

function renderCatCard({ id, name }) {
  console.log(name);
}

// function addCatDesc(catData) {
//   catInfo.innerHTML = '';

//   const catImage = document.createElement('img');
//   catImage.src = catData.url;
//   catInfo.appendChild(catImage);

//   const breedName = document.createElement('p');
//   breedName.textContent = `Breed: ${catData.breeds[0].name}`;
//   catInfo.appendChild(breedName);

//   const description = document.createElement('p');
//   description.textContent = `Description: ${catData.breeds[0].description}`;
//   catInfo.appendChild(description);

//   const temperament = document.createElement('p');
//   temperament.textContent = `Temperament: ${catData.breeds[0].temperament}`;
//   catInfo.appendChild(temperament);
// }
