import React from 'react';
import InsertionForm from '../components/InsertionForm';
import { Container, Typography, Paper, Box } from '@mui/material';

function InsertionPage() {
  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={4}>
        <Paper elevation={3} style={{ padding: '2rem' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Inserir Novo Pokémon
          </Typography>
          <InsertionForm />
        </Paper>
      </Box>
    </Container>
  );
}

export default InsertionPage;
