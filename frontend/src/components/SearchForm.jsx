import React, { useState } from "react";
import { TextField, Button, Box, Paper } from "@mui/material";
import { useSearch } from "../contexts/useSearch";

function SearchForm() {
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState("");
  const { searchPokemon, clearSearch, allPokemonData, error: searchError } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setInputError("Por favor, insira um termo de busca.");
      return;
    }
    setInputError("");
    searchPokemon(input);
  };

  const handleClear = () => {
    clearSearch();
    setInput("");
    setInputError("");
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (inputError) {
      setInputError("");
    }
  };
  
  const isSearchActive = allPokemonData.length > 0 || searchError;

  return (
    <Paper className="search-form-paper" sx={{ p: 1, flexGrow: 1 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          label="Buscar por nome ou ID"
          variant="outlined"
          value={input}
          onChange={handleInputChange}
          error={!!inputError}
          helperText={inputError}
          fullWidth
          size="small"
        />
        <Button type="submit" variant="contained" color="primary">
          Buscar
        </Button>
        {isSearchActive && (
          <Button variant="outlined" color="secondary" onClick={handleClear}>
            Limpar
          </Button>
        )}
      </Box>
    </Paper>
  );
}

export default SearchForm;
