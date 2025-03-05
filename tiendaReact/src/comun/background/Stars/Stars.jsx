
import React from 'react';
import './Stars.css'; // Aquí definiremos los estilos para las estrellas

function Stars() {
  const starCount = 500; // Ajusta la cantidad de estrellas que desees
  const stars = Array.from({ length: starCount });
  
  return (
    <div className="stars">
      {stars.map((_, i) => {
        
        const style = {
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 5 + 's',
          animationDuration: 3 + Math.random() * 2 + 's'
        };
        return <div key={i} className="star" style={style}></div>;
      })}
    </div>
  );
}

export default React.memo(Stars);
