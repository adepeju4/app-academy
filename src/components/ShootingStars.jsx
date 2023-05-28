import React from 'react';
import './shootingStars.css'

function ShootingStars() {
  const shootingStars = [
    <div key={1} className="shootingWrapper">
      <span className="shooting-stars" key={1}></span>
      <span className="shooting-stars" key={2}></span>
      <span className="shooting-stars" key={3}></span>
      <span className="shooting-stars" key={4}></span>
      <span className="shooting-stars" key={5}></span>
      <span className="shooting-stars" key={6}></span>
      <span className="shooting-stars" key={7}></span>
      <span className="shooting-stars" key={8}></span>
      <span className="shooting-stars" key={9}></span>
    </div>,
  ];

  function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const count = 100;
  let result = '';
  for (let i = 0; i < count; i++) {
    result += `${randomNum(-50, 50)}vw ${randomNum(
      -50,
      50
    )}vh ${randomNum(0, 3)}px ${randomNum(0, 3)}px #fff,`;
  }

  const starBg = (
    <div
      className="stars"
      style={{ boxShadow: result.substring(0, result.length - 1) }}
    ></div>
  );

  return (
    <>
      {shootingStars}
      {starBg}
    </>
  );
}

export default ShootingStars;