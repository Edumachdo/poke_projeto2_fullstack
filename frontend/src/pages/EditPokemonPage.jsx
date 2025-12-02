import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getPokemonById } from "../api";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import EditPokemonForm from "../components/EditPokemonForm";
import ErrorMessage from "../components/ErrorMessage";

function EditPokemonPage() {
  const { id } = useParams();
  const location = useLocation();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // If navigation provided the pokemon object in state, use it and avoid an API call
        if (location && location.state && location.state.pokemon) {
          setPokemonData(location.state.pokemon);
        } else {
          const foundPokemon = await getPokemonById(id);
          if (foundPokemon) {
            setPokemonData(foundPokemon);
          } else {
            setError("Pokémon não encontrado.");
          }
        }
      } catch (err) {
        setError("Falha ao carregar dados do Pokémon. Tente novamente.");
        console.error("Error fetching Pokémon for edit:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box mt={4} mb={4} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Box mt={4} mb={4}>
          <ErrorMessage message={error} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={4}>
        <Paper elevation={3} style={{ padding: "2rem" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Editar Pokémon
          </Typography>
          {pokemonData && <EditPokemonForm initialData={pokemonData} />}
        </Paper>
      </Box>
    </Container>
  );
}

export default EditPokemonPage;
