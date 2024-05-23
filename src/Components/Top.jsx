import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faCog } from '@fortawesome/free-solid-svg-icons';
import "../Style/Top.css";

const Top = () => {
  return (
    <div className="top-container">
      <div className="logo-container">
        <h1 className="logo">FoodVenture</h1>
      </div>
      <nav className="top-nav">
        <ul>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} /> דף הבית
            </Link>
          </li>
          <li>
            <Link to="/adding-restaurant">
              <FontAwesomeIcon icon={faPlus} /> הוספת מסעדות
            </Link>
          </li>
          <li>
            <Link to="/restaurant-management">
              <FontAwesomeIcon icon={faCog} /> ניהול
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Top;
