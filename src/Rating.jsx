import React from 'react';
import './Rating.css';
import './fonts/RedHatDisplay-Bold.ttf';

function Rating({ rating, onRatingChange, uniqueKey }) {
const ratingStyle = {
  width: '100%',
    margin: '10px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}
const inputStyle = {
    width: '100%',
    borderRadius: '3px',
    outline: 'none',
  };


  return (
    <div key ={uniqueKey} style ={ratingStyle}>
        <div style={inputStyle}>
      <input
        type="range"
        class="slider"
        min="0"
        max="10"
        value={rating}
        onChange={(e) => onRatingChange(parseInt(e.target.value, 10))}
        style={{width: '100%'}}
      />
       </div>
      <p class='ratingText'>{rating} von 10</p>
    </div>
  );
}

export default Rating;