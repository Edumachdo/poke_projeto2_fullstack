import React, { useReducer } from "react";
import SearchContext from "./SearchContextObject";
import {
  initialState,
  searchReducer,
  SEARCH_ERROR,
  SEARCH_START,
  SEARCH_SUCCESS,
  SET_PAGE,
  CLEAR_SEARCH,
} from "./searchReducer";
import { getPokemon } from "../api";

export function SearchProvider({ children }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const searchPokemon = async (query) => {
    if (!query.trim()) {
      dispatch({
        type: SEARCH_ERROR,
        payload: "Termo de busca é obrigatório.",
      });
      return;
    }

    dispatch({ type: SEARCH_START });

    try {
      const { pokemons: results } = await getPokemon(query.trim());

      if (results.length === 0) {
        throw new Error("Nenhum Pokémon encontrado.");
      }

      // A paginação agora será feita no frontend com os resultados do backend
      const firstPage = results.slice(0, state.itemsPerPage);
      dispatch({
        type: SEARCH_SUCCESS,
        payload: {
          pokemonData: firstPage,
          allPokemonData: results,
          totalItems: results.length,
          currentPage: 1,
        },
      });
    } catch (error) {
      dispatch({ type: SEARCH_ERROR, payload: error.message });
    }
  };

  const clearError = () => {
    dispatch({ type: SEARCH_ERROR, payload: null });
  };

  const clearSearch = () => {
    dispatch({ type: CLEAR_SEARCH });
  };

  const setPage = (page) => {
    dispatch({ type: SET_PAGE, payload: { page } });
  };

  return (
    <SearchContext.Provider
      value={{ ...state, searchPokemon, clearError, setPage, clearSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
}
