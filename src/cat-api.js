const BASE_URL = 'https://api.thecatapi.com/v1';
// const API_KEY = 'live_bnsSSVhH4AzBCstbCbvxZSAjiyYAWGrmn56hFFAyTgPnG1kXxAraME39vErSSqoe';
const API_KEY = `?api_key=live_bnsSSVhH4AzBCstbCbvxZSAjiyYAWGrmn56hFFAyTgPnG1kXxAraME39vErSSqoe`;
const options = {
    headers: {
        'x-api_key': API_KEY,
    }
   
};

export function fetchBreeds() {
    const END_POINT = '/breeds';
    const url = BASE_URL + END_POINT + API_KEY;

  
    return fetch(url).then(response => {
        if(!response.ok) {
            throw new Error(response.status);
        }

       return response.json()})
};


export function fetchCatByBreed(breedId) {
    const END_POINT = '/images/search';
    const PARAMS = `&breed_ids=${breedId}`;
    const url = BASE_URL + END_POINT + API_KEY + PARAMS;
    return fetch(url).then(response => {
        if(!response.ok) {
            throw new Error(response.status);
        }

       return response.json()})
};

