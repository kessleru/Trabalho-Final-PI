export const API_URL = 'https://pokeapi.co/api/v2';

export const TYPE_COLORS = {
  normal: '#a8a878',
  fire: '#f08030',
  water: '#6890f0',
  electric: '#f8d030',
  grass: '#78c850',
  ice: '#98d8d8',
  fighting: '#c03028',
  poison: '#a040a0',
  ground: '#e0c068',
  flying: '#a890f0',
  psychic: '#f85888',
  bug: '#a8b820',
  rock: '#b8a038',
  ghost: '#705898',
  dragon: '#7038f8',
  dark: '#705848',
  steel: '#b8b8d0',
  fairy: '#ee99ac',
};

//Realiza uma requisição HTTP GET simples e retorna o resultado em formato JSON.
async function get(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Falha na requisição');
  }
  return res.json();
}


//"https://pokeapi.co/api/v2/pokemon/25/" -> 25

function extractIdFromUrl(url) {
  const partes = url.split('/').filter(Boolean);
  const ultimoElemento = partes[partes.length - 1];
  return parseInt(ultimoElemento, 10);
}

export async function fetchPokemonList(limit = 20, offset = 0) {
  return get(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
}

export async function fetchPokemon(nameOrId) {
  return get(`${API_URL}/pokemon/${nameOrId}`);
}

export async function fetchPokemonByType(type) {
  const data = await get(`${API_URL}/type/${type}`);
  return data.pokemon
    .map(({ pokemon }) => {
      const id = extractIdFromUrl(pokemon.url);
      return { name: pokemon.name, id };
    })
    .filter((p) => p.id <= 898); // Apenas Pokémon da geração clássica/principal
}

export async function fetchPokemonSpecies(id) {
  const data = await get(`${API_URL}/pokemon-species/${id}`);
  // Procura a descrição em português brasileiro, senão usa em inglês
  const genus = data.genera.find((g) => g.language.name === 'pt-BR')
    || data.genera.find((g) => g.language.name === 'en');
  return genus ? genus.genus : '';
}

