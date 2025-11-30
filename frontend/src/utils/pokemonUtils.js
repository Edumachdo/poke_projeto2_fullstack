export const getPokemonSpriteUrl = (pokemonId) => {
  if (!pokemonId) {
    return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'; // Placeholder ou imagem de erro
  }
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
};