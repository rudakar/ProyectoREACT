import React from 'react';
import { 
  Box, 
  TextField, 
  Autocomplete, 
  Rating, 
  Slider, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  InputAdornment,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Filtro.css';

const availableCategories = ['varitas', 'pociones', 'quidditch', 'escobas', 'tomos', 'reliquias', 'sortilegios'];

const orderOptions = [
  { value: 'ratingAsc', label: 'Rating Ascendente' },
  { value: 'ratingDesc', label: 'Rating Descendente' },
  { value: 'priceAsc', label: 'Precio Ascendente' },
  { value: 'priceDesc', label: 'Precio Descendente' },
];

const Filtro = ({
  filters,
  onFilterChange,
  orderOption,
  onOrderChange,
  showCategoryFilters
}) => {
  return (
    <Accordion className="filtro-outer">
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" className="filtro-outer-title">
          Filtros y Búsqueda
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box className="filtro-full-container">
          {/* Sección de Búsqueda y Orden */}
          <Accordion className="filtro-inner">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" className="filtro-inner-title">
            Buscar
            </Typography>
          </AccordionSummary>
            <AccordionDetails>
                <Box className="busqueda-container">
                    <TextField
                    label="Buscar Artículos"
                    variant="outlined"
                    value={filters.query}
                    onChange={(e) => onFilterChange('query', e.target.value)}
                    fullWidth
                    className="filtro-textfield"
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                        ),
                    }}
                    />
                    <Box className="orden-container">
                    <FormControl variant="outlined" className="order-formcontrol">
                        <InputLabel id="order-select-label">Ordenar Por</InputLabel>
                        <Select
                        labelId="order-select-label"
                        label="Ordenar Por"
                        value={orderOption}
                        onChange={(e) => onOrderChange(e.target.value)}
                        >
                        {orderOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    </Box>
                </Box>
            </AccordionDetails>
          </Accordion>
          <Divider className="filtro-divider" />

          {/* Sub-Accordion para Filtros adicionales */}
          <Accordion defaultExpanded={false} className="filtro-inner">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" className="filtro-inner-title">
                Filtros
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box className="filtro-grid">
                {showCategoryFilters && (
                  <Autocomplete
                    multiple
                    freeSolo
                    options={availableCategories}
                    value={filters.categories}
                    onChange={(event, newValue) => onFilterChange('categories', newValue)}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" label="Categorías" placeholder="Seleccionar" />
                    )}
                    className="filtro-autocomplete"
                  />
                )}
                <Box className="filtro-item">
                  <Typography variant="subtitle1" className="filtro-item-title">
                    Rating
                  </Typography>
                  <Rating
                    name="rating-filter"
                    value={filters.rating}
                    precision={0.5}
                    onChange={(e, newValue) => onFilterChange('rating', newValue)}
                  />
                </Box>
                <Box className="filtro-item">
                  <Typography variant="subtitle1" className="filtro-item-title">
                    Precio
                  </Typography>
                  <Slider
                    value={filters.priceRange}
                    onChange={(e, newValue) => onFilterChange('priceRange', newValue)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1300}
                  />
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Filtro;
