import React from 'react';
import { Grid, Card, CardActionArea, Typography } from '@mui/material';

import './Home.css';
import themeGifsStatic from '../../config/themeGifsStatic';
import themeGifs from '../../config/themeGifs';
import { Link } from 'react-router-dom';

const themes = [
  { name: "Explorar", key: "explorar",link:"/exp" },
  { name: "Varitas", key: "varitas" ,link:"/exp/varitas"},
  { name: "Pociones", key: "pociones",link:"/exp/pociones" },
  { name: "Quidditch", key: "quidditch",link:"/exp/quidditch" },
  { name: "Animales Mitologicos", key: "pets",link:"/exp/animales" },
  { name: "Tomos Encantados", key: "tomos",link:"/exp/tomos" },
  { name: "Reliquias Legendarias", key: "reliquias",link:"/exp/reliquias" },
  { name: "Sortilegios Weasly", key: "sortilegios",link:"/exp/sortilegios" },
  { name: "Destinos Túristicos", key: "trip" ,link:"/exp/viajes"},
];

const Home = () => {
  return (
    <div className="home-container">
      <Grid container spacing={2} className="home-grid">
        {themes.map((theme, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} component={Link} to={theme.link} sx={{ textDecoration: "none" }}>
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
