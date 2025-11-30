import React, { useState, useEffect } from 'react';
import { updatePokemon } from '../api';
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
} from '@mui/material';
import { typeWeaknesses } from '../contexts/typeWeaknesses';
import { useNavigate } from 'react-router-dom';

const pokemonTypes = Object.keys(typeWeaknesses);

function EditPokemonForm({ initialData }) {
  const [id, setId] = useState(initialData.id || '');
  const [name, setName] = useState(initialData.name || '');
  const [type1, setType1] = useState('');
  const [hasSecondType, setHasSecondType] = useState(false);
  const [type2, setType2] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setId(initialData.id);
      setName(initialData.name);
      if (initialData.types && initialData.types.length > 0) {
        setType1(initialData.types[0].type.name);
        if (initialData.types.length > 1) {
          setHasSecondType(true);
          setType2(initialData.types[1].type.name);
        } else {
          setHasSecondType(false);
          setType2('');
        }
      }
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const typesArray = [{ type: { name: type1.toLowerCase() } }];
      if (hasSecondType && type2) {
        typesArray.push({ type: { name: type2.toLowerCase() } });
      }

      const pokemonData = {
        id: parseInt(id, 10),
        name: name.toLowerCase(),
        data: { types: typesArray },
      };
      await updatePokemon(id, pokemonData);
      setSuccess(`Pokémon "${name}" atualizado com sucesso!`);
      // Optionally navigate back to list or details page
      navigate('/');
    } catch (err) {
      setError('Falha ao atualizar Pokémon. Verifique os dados.');
      
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="ID"
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          disabled // ID should not be editable
        />
        <TextField
          label="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <FormControl fullWidth required>
          <InputLabel>Tipo 1</InputLabel>
          <Select
            value={type1}
            label="Tipo 1"
            onChange={(e) => setType1(e.target.value)}
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
        />
        {hasSecondType && (
          <FormControl fullWidth>
            <InputLabel>Tipo 2</InputLabel>
            <Select
              value={type2}
              label="Tipo 2"
              onChange={(e) => setType2(e.target.value)}
            >
              {pokemonTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
        <Box display="flex" gap={2} mt={2}>
          <Button type="submit" variant="contained" disabled={loading} sx={{ flexGrow: 1 }}>
            {loading ? <CircularProgress size={24} /> : 'Atualizar Pokémon'}
          </Button>
          <Button type="button" variant="contained" color="error" onClick={handleCancel} sx={{ flexGrow: 1 }}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default EditPokemonForm;
