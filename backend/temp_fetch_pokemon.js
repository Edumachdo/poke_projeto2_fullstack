// temp_fetch_pokemon.js
const https = require('https';

// Helper to perform HTTPS GET requests
const fetch = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Failed to fetch ${url} with status ${res.statusCode}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

async function fetchAllPokemon() {
  const allPokemonData = [];
  console.error("Fetching Pokémon 1 to 151... This may take a moment.");

  for (let id = 1; id <= 151; id++) {
    try {
      const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      
      const formattedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        data: {
          types: pokemon.types.map(typeInfo => ({
            type: {
              name: typeInfo.type.name
            }
          }))
        }
      };
      
      allPokemonData.push(formattedPokemon);
      console.error(`Fetched ${pokemon.name} (#${pokemon.id})`);

    } catch (error) {
      console.error(`Failed to fetch Pokémon with ID ${id}:`, error.message);
    }
  }

  // Output the final array as a JSON string
  console.log(JSON.stringify(allPokemonData, null, 2));
}

fetchAllPokemon();
