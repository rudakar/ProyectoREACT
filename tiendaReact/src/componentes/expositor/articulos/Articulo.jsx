import React, { useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Rating, Tooltip, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './Articulo.css';
import { useCart } from '../../../service/CartContext';

const Articulo = ({ article }) => {
  const { addToCart, removeFromCart } = useCart();
  const [animate, setAnimate] = useState(false);

  const triggerAnimation = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  };

  const handleAdd = () => {
    addToCart(article);
    triggerAnimation();
  };

  const handleRemove = () => {
    removeFromCart(article.id);
    triggerAnimation();
  };

  return (
    <Tooltip 
      title={article.content} 
      placement="bottom" 
      arrow
      classes={{
        tooltip: 'magical-tooltip',
        arrow: 'magical-tooltip-arrow'
      }}
    >
      <Card className={`articulo-card ${animate ? 'animate' : ''}`}>
        <CardMedia
          component="img"
          className="articulo-media"
          image={article.image} 
          alt={article.title}
        />
        <Box className="card-details">
          <CardContent>
            <Typography gutterBottom variant="h5" className="articulo-title">
              {article.title}
            </Typography>
            <Rating name="read-only" value={article.rating} precision={0.5} readOnly />
            <Typography variant="h6" className="articulo-price">
              {article.price}€
            </Typography>
          </CardContent>
          <CardActions>           
            <IconButton onClick={handleRemove} color="primary">
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={handleAdd} color="primary">
              <AddIcon />
            </IconButton>
          </CardActions>
        </Box>
      </Card>
    </Tooltip>
  );
};

export default Articulo;
