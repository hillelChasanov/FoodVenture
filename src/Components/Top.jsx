import React from 'react';
import { Link } from 'react-router-dom';
import "../Style/Top.css";

const Top = () => {
  return (
    <div className="top-container">
      <div className="logo-container">
        <h1 className="logo">FoodVenture</h1>
      </div>
      <nav className="top-nav">
        <ul>
          <li><Link to="/adding-restaurant">הוספת מסעדות</Link></li>
          <li><Link to="/">דף הבית</Link></li>
          <li><Link to="/restaurant-management">ניהול</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Top;


