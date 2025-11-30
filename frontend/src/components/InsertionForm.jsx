import React, { useState } from "react";
import { createPokemon } from "../api";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { typeWeaknesses } from "../contexts/typeWeaknesses";
import { useNavigate } from "react-router-dom";

const pokemonTypes = Object.keys(typeWeaknesses);

const translateError = (rawError) => {
  if (typeof rawError !== "string") {
    return "Ocorreu um erro inesperado. Tente novamente.";
  }

  if (
    rawError.includes("already exists") ||
    rawError.includes("Duplicate entry")
  ) {
    return "Já existe um Pokémon com este ID na lista.";
  }
  if (rawError.includes("Cast to Number failed")) {
    return "O ID deve ser um número válido.";
  }
  if (rawError.includes("is not allowed to be empty")) {
    return "O nome é um campo obrigatório.";
  }
  if (rawError.includes("Network Error")) {
    return "Erro de conexão. Verifique sua internet e tente novamente.";
  }
  if (rawError.includes("Database error")) {
    return "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.";
  }

  return "Não foi possível inserir o Pokémon. Verifique os dados e tente novamente.";
};

function InsertionForm() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [type1, setType1] = useState("");
  const [hasSecondType, setHasSecondType] = useState(false);
  const [type2, setType2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const typesArray = [{ type: { name: type1.toLowerCase() } }];
      if (hasSecondType && type2) {
        if (type1 === type2) {
          setError("O segundo tipo não pode ser igual ao primeiro.");
          setLoading(false);
          return;
        }
        typesArray.push({ type: { name: type2.toLowerCase() } });
      }

      const pokemonData = {
        id: parseInt(id, 10),
        name: name.toLowerCase(),
        data: { types: typesArray },
      };

      await createPokemon(pokemonData);
      setSuccess(`Pokémon "${name}" inserido com sucesso!`);

      setTimeout(() => {
        navigate(`/?refreshed=${new Date().getTime()}`);
      }, 1500);
    } catch (err) {
      const rawErrorMessage = err.response?.data?.error || err.message;
      const friendlyMessage = translateError(rawErrorMessage);
      setError(friendlyMessage);
      setLoading(false); // On error, stop loading so the user can act.
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ position: "relative" }}>
        {/* Loading Overlay */}
        {loading && !success && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: 1,
              zIndex: 10,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* Form Fields */}
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="ID"
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            disabled={loading}
          />
          <TextField
            label="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
          <FormControl fullWidth required disabled={loading}>
            <InputLabel>Tipo 1</InputLabel>
            <Select
              value={type1}
              label="Tipo 1"
              onChange={(e) => setType1(e.target.value)}
              sx={{ textAlign: "left" }}
            >
              {pokemonTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={hasSecondType}
                onChange={(e) => setHasSecondType(e.target.checked)}
              />
            }
            label="Adicionar segundo tipo?"
            disabled={loading}
          />
          {hasSecondType && (
            <FormControl fullWidth disabled={loading}>
              <InputLabel>Tipo 2</InputLabel>
              <Select
                value={type2}
                label="Tipo 2"
                onChange={(e) => setType2(e.target.value)}
                sx={{ textAlign: "left" }}
              >
                {pokemonTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Messages */}
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">{success}</Typography>}

          {/* Buttons */}
          <Box display="flex" gap={2} mt={2}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ flexGrow: 1 }}
            >
              Inserir Pokémon
            </Button>
            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={handleCancel}
              sx={{ flexGrow: 1 }}
              disabled={loading}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
}

export default InsertionForm;
