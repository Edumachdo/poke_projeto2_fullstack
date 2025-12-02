import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllPokemon, deletePokemon } from "../api";
import { useAuth } from "../auth/useAuth";
import { useSearch } from "../contexts/useSearch";
import SearchForm from "../components/SearchForm";
import Pagination from "../components/Pagination"; // Import the new Pagination component
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Chip,
  Stack,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ErrorMessage from "../components/ErrorMessage";
import { getPokemonSpriteUrl } from "../utils/pokemonUtils";
import { typeColors } from "../utils/typeColors";
import "../App.css";

function PokemonListPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const {
    pokemonData,
    loading: searchLoading,
    error: searchError,
  } = useSearch();

  const fetchPokemon = useCallback(
    async (page) => {
      if (!auth.isAuthenticated) {
        setInitialLoading(false);
        return;
      }
      try {
        setInitialLoading(true);
        const data = await getAllPokemon(page, 30);
        setPokemonList(data.pokemons);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } catch (err) {
        if (err.message.includes("401") || err.message.includes("403")) {
          auth.logout();
        } else {
          setError("Failed to fetch Pokémon. Please try again later.");
        }
      } finally {
        setInitialLoading(false);
      }
    },
    [auth]
  );

  useEffect(() => {
    // Read page from URL query params if available, otherwise use 1
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page")) || 1;
    setCurrentPage(page);
    fetchPokemon(page);
  }, [fetchPokemon, location.search]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Update URL to reflect the current page
    navigate(`/?page=${newPage}`);
  };

  const handleAddPokemonClick = () => {
    navigate("/insert");
  };

  const handleDeletePokemon = async (pokemonId) => {
    try {
      await deletePokemon(pokemonId);
      // Refetch the current page to show the updated list
      await fetchPokemon(currentPage);
    } catch (err) {
      console.error("Failed to delete Pokémon:", err);
      setError("Failed to delete Pokémon. Please try again later.");
    }
  };

  const handleEditPokemon = (pokemonId) => {
    navigate(`/edit/${pokemonId}`);
  };

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  const displayList = pokemonData.length > 0 ? pokemonData : pokemonList;

  if (initialLoading || searchLoading) {
    return (
      <div className="container">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <h1>Pokémon List</h1>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            onClick={handleAddPokemonClick}
            variant="contained"
            color="primary"
          >
            Novo Pokémon
          </Button>
          <Button onClick={handleLogout} variant="contained" color="error">
            Logout
          </Button>
        </Box>
      </Box>
      <SearchForm />

      {(error || searchError) && (
        <Box sx={{ my: 2 }}>
          <ErrorMessage message={error || searchError} />
        </Box>
      )}

      {displayList.length === 0 && !searchLoading && !error && !searchError ? (
        <p>No Pokémon found. Add some!</p>
      ) : (
        <>
          <TableContainer component={Paper} className="pokemon-table-container">
            <Table
              stickyHeader
              aria-label="pokemon table"
              className="pokemon-table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Icone</TableCell>
                  <TableCell>Dex_id</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Tipagem</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayList.map((pokemon) => (
                  <TableRow key={pokemon.id}>
                    <TableCell className="pokemon-icon">
                      <Avatar
                        src={getPokemonSpriteUrl(pokemon.id)}
                        alt={pokemon.name}
                      />
                    </TableCell>
                    <TableCell>{pokemon.id}</TableCell>
                    <TableCell>{pokemon.name}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {pokemon.types?.map((typeInfo) => (
                          <Chip
                            key={typeInfo.type.name}
                            label={typeInfo.type.name}
                            style={{
                              backgroundColor:
                                typeColors[typeInfo.type.name.toLowerCase()],
                              color: "white",
                              fontWeight: "bold",
                              border: `1px solid ${
                                typeColors[typeInfo.type.name.toLowerCase()] ||
                                "#000"
                              }`,
                            }}
                          />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1} sx={{ whiteSpace: "nowrap" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() =>
                            navigate(`/edit/${pokemon.id}`, {
                              state: { pokemon },
                            })
                          }
                        >
                          Editar
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeletePokemon(pokemon.id)}
                        >
                          Deletar
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default PokemonListPage;
