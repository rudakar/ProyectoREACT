import React from 'react';
import { Grid, Card, CardActionArea, Typography } from '@mui/material';

import './Home.css';
import themeGifsStatic from '../../config/themeGifsStatic';
import themeGifs from '../../config/themeGifs';

const themes = [
  { name: "Explorar", key: "explorar" },
  { name: "Varitas", key: "varitas" },
  { name: "Pociones", key: "pociones" },
  { name: "Quidditch", key: "quidditch" },
  { name: "Animales Mitologicos", key: "pets" },
  { name: "Tomos Encantados", key: "tomos" },
  { name: "Reliquias Legendarias", key: "reliquias" },
  { name: "Sortilegios Weasly", key: "sortilegios" },
  { name: "Destinos Túristicos", key: "trip" },
];

const Home = () => {
  return (
    <div className="home-container">
      <Grid container spacing={2} className="home-grid">
        {themes.map((theme, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="theme-card">
              <CardActionArea 
                className="card-action"
                style={{
                  '--static-bg': `url(${themeGifsStatic[theme.key]})`,
                  '--animated-bg': `url(${themeGifs[theme.key]})`
                }}
              >
                <div className="card-overlay">
                  <Typography variant="h4" className="card-title">
                    {theme.name}
                  </Typography>
                </div>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
