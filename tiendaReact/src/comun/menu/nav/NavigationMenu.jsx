import React from "react";
import { Box, Button } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Pets from "@mui/icons-material/Pets";
import LuggageIcon from '@mui/icons-material/Luggage';
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import "./NavigationMenu.css";

const NavigationMenu = () => {
  return (
    <Box className="container-fluid nav-menu">
    
      <Button color="inherit" className="nav-button" startIcon={<AutoAwesomeIcon />}>
        Varitas 
      </Button>
      <Button color="inherit" className="nav-button" startIcon={<LocalDrinkIcon />}>
        Pociones
      </Button>
      <Button color="inherit" className="nav-button" startIcon={<SportsSoccerIcon  />}>
      Quidditch
      </Button>
      <Button color="inherit" className="nav-button" startIcon={<Pets/>}>
      Animales Mitologicos
      </Button>
      <Button color="inherit" className="nav-button" startIcon={<MenuBookIcon />}>
        Tomos Encantados
      </Button>
      <Button color="inherit" className="nav-button" startIcon={<MilitaryTechIcon />}>
        Reliquias Legendarias
      </Button>
      <Button color="inherit" className="nav-button" startIcon={<EmojiEmotionsIcon />}>
        Sortilegios Weasly
      </Button>
      <Button color="inherit" className="nav-button" startIcon={<LuggageIcon />}>
        Destinos Turísticos
      </Button>
    </Box>
  );
};

export default NavigationMenu;
