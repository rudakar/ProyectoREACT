import React from 'react';
import { Grid } from '@mui/material';
import Articulo from './Articulo';

const Articulos = ({ articles, filter }) => {
  // Filtramos los artículos en función del filtro (busqueda por título)
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Grid container spacing={4} >
      {filteredArticles.map(article => (
        <Grid item xs={12} sm={6} md={4} key={article.id}>
          <Articulo article={article} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Articulos;
