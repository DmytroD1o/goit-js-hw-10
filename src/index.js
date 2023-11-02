import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const err = document.querySelector('.error');

select.classList.add('is-hidden');
catInfo.classList.remove('cat-info');
catInfo.classList.add('is-hidden');

fetchBreeds()
.then(breeds => {

    renderSelect(breeds)
    select.classList.remove('is-hidden');
    select.classList.add('breed-select');
    loader.classList.remove('loader')
    loader.classList.add('is-hidden')
}

)
.catch(error => {
    loader.classList.remove('loader')
    loader.classList.add('is-hidden')
    err.classList.add('error-no-hidden');
    err.classList.remove('error');
    select.classList.add('is-hidden');
catInfo.classList.remove('cat-info');
 catInfo.classList.add('is-hidden');
 console.log(error);
})
    


function renderSelect (breeds) {
    const markup = breeds.map(breed => { 
        return `<option value=${breed.id}>${breed.name}</option>`;
    }).join('');
    select.insertAdjacentHTML('beforeend', markup);
    
}



select.addEventListener('input', onClick); 

function onClick (e) {
    e.preventDefault();
    loader.classList.add('loader');
    loader.classList.remove('is-hidden');
    catInfo.classList.remove('cat-info');
     catInfo.classList.add('is-hidden');
    const cat = select.options[select.selectedIndex].value;
    fetchCatByBreed(cat).then(cat => {


        
     renderCat(cat)
     catInfo.classList.add('cat-info');
     catInfo.classList.remove('is-hidden');
     loader.classList.remove('loader');
     loader.classList.add('is-hidden');
        
    }).catch(error => {
      loader.classList.remove('loader')
      loader.classList.add('is-hidden')
        err.classList.add('error-no-hidden');
        err.classList.remove('error');
catInfo.classList.remove('cat-info');
     catInfo.classList.add('is-hidden');
        console.log(error)});

}

  
  function heroTemplate(breeds) {
    const temperament = breeds[0].breeds[0].temperament;
    const description =  breeds[0].breeds[0].description;
    const name = breeds[0].breeds[0].name;
    const url = breeds[0].url;
    return `
    <div class="cat-card">
        <div class="image-container">
          <img
            src="${url}"
            alt="cat-image"
            class="cat-image"
            width="300px"
            height="300px"
          />
        </div>
        <div class="cat-body">
          <h2 class="breed-name">${name}</h2>
          <p class="cat-descr">
            ${description} 
          </p>
          <p class="cat-temperament">
            <b>Temperament</b>: ${temperament} 
          </p>
        </div>
      </div>
    `;
  }
  
  function renderCat(cat) {
    const markup = heroTemplate(cat);
    catInfo.innerHTML = markup;
  }