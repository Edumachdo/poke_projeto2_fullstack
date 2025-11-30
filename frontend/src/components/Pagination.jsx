import React from "react";
import { Box, Button, Typography } from "@mui/material";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
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
        variant="contained"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Anterior
      </Button>
      <Typography variant="body2">
        Página {currentPage} de {totalPages}
      </Typography>
      <Button
        variant="contained"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Próximo
      </Button>
    </Box>
  );
}

export default Pagination;
