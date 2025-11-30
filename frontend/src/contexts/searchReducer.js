export const initialState = {
  loading: false,
  pokemonData: [], // Dados da página atual
  error: null,
  allPokemonData: [], // Todos os dados filtrados para paginação
  currentPage: 1, // Página atual
  itemsPerPage: 10, // Itens por página
  totalItems: 0, // Total de itens filtrados
};

export const SEARCH_START = "SEARCH_START";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_ERROR = "SEARCH_ERROR";
export const SET_PAGE = "SET_PAGE";
export const CLEAR_SEARCH = "CLEAR_SEARCH";

export function searchReducer(state, action) {
  switch (action.type) {
    case SEARCH_START:
      return { ...state, loading: true, error: null, pokemonData: [] };
    case SEARCH_SUCCESS:
      if (Array.isArray(action.payload)) {
        // Para busca por ID ou casos simples
        return {
          ...state,
          loading: false,
          pokemonData: action.payload,
          allPokemonData: action.payload,
          totalItems: action.payload.length,
          currentPage: 1,
          error: null,
        };
      } else {
        // Para busca por substring com paginação
        return {
          ...state,
          loading: false,
          pokemonData: action.payload.pokemonData,
          allPokemonData: action.payload.allPokemonData,
          totalItems: action.payload.totalItems,
          currentPage: action.payload.currentPage,
          error: null,
        };
      }
    case SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        pokemonData: [],
        error: action.payload,
      };
    case SET_PAGE: {
      const { page } = action.payload;
      const startIndex = (page - 1) * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;
      const pageData = state.allPokemonData.slice(startIndex, endIndex);
      return {
        ...state,
        currentPage: page,
        pokemonData: pageData,
      };
    }
    case CLEAR_SEARCH:
      return { ...initialState };
    default:
      return state;
  }
}
