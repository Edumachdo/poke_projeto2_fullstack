import React from "react";
import { typeWeaknesses } from '../contexts/typeWeaknesses';
import { Chip, Stack, Typography } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WaterIcon from "@mui/icons-material/Water";
import GrassIcon from "@mui/icons-material/Grass";
import BoltIcon from "@mui/icons-material/Bolt";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import TerrainIcon from "@mui/icons-material/Terrain";
import PsychologyIcon from "@mui/icons-material/Psychology";
import BugReportIcon from "@mui/icons-material/BugReport";
import LandscapeIcon from "@mui/icons-material/Landscape";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PetsIcon from "@mui/icons-material/Pets";
import BuildIcon from "@mui/icons-material/Build";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlightIcon from "@mui/icons-material/Flight";
import ScienceIcon from "@mui/icons-material/Science";

const typeIcons = {
  normal: HelpIcon,
  fire: LocalFireDepartmentIcon,
  water: WaterIcon,
  grass: GrassIcon,
  electric: BoltIcon,
  ice: AcUnitIcon,
  fighting: null,
  poison: ScienceIcon,
  ground: TerrainIcon,
  flying: FlightIcon,
  psychic: PsychologyIcon,
  bug: BugReportIcon,
  rock: LandscapeIcon,
  ghost: DarkModeIcon,
  dragon: PetsIcon,
  dark: DarkModeIcon,
  steel: BuildIcon,
  fairy: FavoriteIcon,
};



function PokemonWeaknesses({ weaknesses }) {
  return (
    <>
      <Typography variant="h6" className="pokemon-section-title">
        Fraquezas:
      </Typography>
      <Stack direction="row" spacing={1} className="pokemon-weaknesses">
        {weaknesses.map((weakness) => {
          const IconComponent = typeIcons[weakness] || HelpIcon;
          return (
            <Chip
              key={weakness}
              icon={IconComponent ? <IconComponent /> : null}
              label={weakness}
              color="secondary"
              variant="outlined"
              className="pokemon-weakness-chip"
            />
          );
        })}
      </Stack>
    </>
  );
}

export default PokemonWeaknesses;
