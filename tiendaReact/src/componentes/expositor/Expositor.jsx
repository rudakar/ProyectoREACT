import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import './Expositor.css';
import { useParams } from 'react-router-dom';
import Filtro from './filtro/Filtro';
import Articulos from './articulos/Articulos';
import { useDatabase } from '../../service/firebaseDatabase';


const Expositor = (props) => {
  const { category } = useParams();
  const currentCategory = category || props.category || 'explorar';

  // Estado unificado de filtros
  const [filters, setFilters] = useState({
    query: '',
    categories: [],
    rating: null,
    priceRange: [0, 1300],
  });
  // Estado para la opción de ordenamiento
  const [orderOption, setOrderOption] = useState('');
  // Estado para guardar todos los artículos desde Firebase (cargado solo una vez)
  const [allArticles, setAllArticles] = useState([]);
  // Estado para los artículos filtrados que se mostrarán
  const [articles, setArticles] = useState([]);

  // Hook para acceder a la base de datos
  const db = useDatabase();

  // Efecto para obtener los artículos desde Firebase solo la primera vez
  useEffect(() => {
    async function fetchArticles() {
      try {
        const snapshot = await db.getRequest('articles');
        console.log(snapshot);
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data);
          // Suponiendo que Firebase devuelve un objeto con claves de artículo,
          // transformamos los datos en un array de artículos.
          const articlesArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setAllArticles(articlesArray);
          
        } else {
          setAllArticles([]);
        }
        
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }
    fetchArticles();
  }, [db]);

  // Efecto para filtrar y ordenar los artículos a partir de allArticles
  useEffect(() => {
    let filteredArticles = [...allArticles];

    // Filtrar por categoría: si currentCategory es 'explorar', mostramos todos
    if (currentCategory !== 'explorar') {
      filteredArticles = filteredArticles.filter(
        (article) => article.category === currentCategory
      );
    }

    // Filtro de búsqueda (query)
    if (filters.query) {
      filteredArticles = filteredArticles.filter((article) =>
        article.title.toLowerCase().includes(filters.query.toLowerCase())
      );
    }

    // Filtro de categorías (si se han seleccionado)
    if (filters.categories && filters.categories.length > 0) {
      filteredArticles = filteredArticles.filter((article) =>
        filters.categories.includes(article.category)
      );
    }

    // Filtro de rating
    if (filters.rating != null) {
      filteredArticles = filteredArticles.filter(
        (article) => Number(article.rating) >= Number(filters.rating)
      );
    }

    // Filtro por rango de precio
    if (filters.priceRange && filters.priceRange.length === 2) {
      filteredArticles = filteredArticles.filter(
        (article) =>
          Number(article.price) >= filters.priceRange[0] &&
          Number(article.price) <= filters.priceRange[1]
      );
    }

    // Ordenar según orderOption
    if (orderOption) {
      switch (orderOption) {
        case 'categoryAsc':
          filteredArticles.sort((a, b) => a.category.localeCompare(b.category));
          break;
        case 'categoryDesc':
          filteredArticles.sort((a, b) => b.category.localeCompare(a.category));
          break;
        case 'ratingAsc':
          filteredArticles.sort((a, b) => a.rating - b.rating);
          break;
        case 'ratingDesc':
          filteredArticles.sort((a, b) => b.rating - a.rating);
          break;
        case 'priceAsc':
          filteredArticles.sort((a, b) => a.price - b.price);
          break;
        case 'priceDesc':
          filteredArticles.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
    }

    setArticles(filteredArticles);
  }, [currentCategory, filters, orderOption, allArticles]);

  // Método unificado para actualizar filtros
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Método para cambiar el orden
  const handleOrderChange = (value) => {
    setOrderOption(value);
  };

  return (
    <Box className="expositor-container">
      <Typography variant="h4" className="expositor-title" noWrap>
        {currentCategory === 'explorar'
          ? 'Explorar Todos los Artículos'
          : `Categoría: ${currentCategory}`}
      </Typography>
      <Box className="filtro-container">
        <Filtro
          filters={filters}
          onFilterChange={handleFilterChange}
          orderOption={orderOption}
          onOrderChange={handleOrderChange}
          showCategoryFilters={currentCategory === 'explorar'}
        />
      </Box>
      <Articulos articles={articles} filter={filters.query} />
    </Box>
  );
};

export default Expositor;
