const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonName = document.querySelector('.pokemon__name');
const pokemonImage = document.querySelector('.pokemon__image');

const input = document.querySelector('.input__search');
const form = document.querySelector('.form');

const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');


const fetchPokemon = async (pokemon) => {

    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

    if (apiResponse.status === 200) {
        const data = await apiResponse.json();
        return data;
    }

}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(input.value);
    input.value = "";
})

const renderPokemon = async (pokemon) => {

    pokemonNumber.innerHTML = '%';
    pokemonName.innerHTML = 'Loading ...';

    const data = await fetchPokemon(pokemon);

    if (data) {        
        pokemonNumber.innerHTML = data['id'];
        pokemonName.innerHTML = data['name'];
        pokemonImage.style.display = 'block';
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    } else {
        pokemonImage.style.display = 'none';
        pokemonNumber.innerHTML = 'Not Found';
        pokemonName.innerHTML = 'Not Found';
    }

}

btnNext.addEventListener("click", ()=>{

    pokemonNumber.textContent++;
    renderPokemon(pokemonNumber.textContent);

})

btnPrev.addEventListener("click", ()=>{
    if(pokemonNumber.textContent > 1) {
        pokemonNumber.textContent--;
        renderPokemon(pokemonNumber.textContent);
    } 
})