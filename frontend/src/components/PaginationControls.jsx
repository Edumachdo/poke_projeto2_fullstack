import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSearch } from "../contexts/useSearch";

// Componente para controles de paginação da busca de Pokémons
function PaginationControls() {
  const { currentPage, itemsPerPage, totalItems, setPage } = useSearch();

  // Não mostrar controles se há apenas uma página
  if (totalItems <= itemsPerPage) return null;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 2,
        gap: 2,
      }}
    >
      <Button
        variant="outlined"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Anterior
      </Button>
      <Typography variant="body2">
        Página {currentPage} de {totalPages} ({startItem}-{endItem} de{" "}
        {totalItems})
      </Typography>
      <Button
        variant="outlined"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Próximo
      </Button>
    </Box>
  );
}

export default PaginationControls;
