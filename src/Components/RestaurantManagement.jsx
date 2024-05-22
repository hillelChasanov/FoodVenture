import React, { useState, useEffect } from 'react';
import "../Style/RestaurantManagement.css";

// רכיב לניהול מסעדות
const RestaurantManagement = () => {
  // הגדרת משתני state לאחסון המידע של המסעדות ולמידע הזמני בזמן עריכה
  const [restaurants, setRestaurants] = useState([]);
  const [temporaryRestaurants, setTemporaryRestaurants] = useState([]);

  // useEffect כדי לטעון את המסעדות מה-localStorage כאשר הרכיב נטען לראשונה
  useEffect(() => {
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    setRestaurants(storedRestaurants);
    setTemporaryRestaurants(storedRestaurants);
  }, []);

  // פונקציה לעדכון המידע הזמני של מסעדה כאשר יש שינוי בשדה קלט מסוים
  const handleInputChange = (id, field, value) => {
    const updatedTemporaryRestaurants = temporaryRestaurants.map((restaurant) =>
      restaurant.id === id ? { ...restaurant, [field]: value } : restaurant
    );
    setTemporaryRestaurants(updatedTemporaryRestaurants);
  };

  // פונקציה לעדכון המידע הקבוע של מסעדה ושמירתו ב-localStorage
  const updateRestaurant = (id) => {
    const updatedRestaurant = temporaryRestaurants.find((restaurant) => restaurant.id === id);
    const updatedRestaurants = restaurants.map((restaurant) =>
      restaurant.id === id ? updatedRestaurant : restaurant
    );
    setRestaurants(updatedRestaurants);
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
  };

  // פונקציה למחיקת מסעדה מהרשימה ושמירת השינויים ב-localStorage
  const deleteRestaurant = (id) => {
    const updatedRestaurants = restaurants.filter((restaurant) => restaurant.id !== id);
    const updatedTemporaryRestaurants = temporaryRestaurants.filter((restaurant) => restaurant.id !== id);
    setRestaurants(updatedRestaurants);
    setTemporaryRestaurants(updatedTemporaryRestaurants);
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
  };

  return (
    <div className="manage-restaurants">
      {temporaryRestaurants.map((restaurant) => (
        <div className="restaurant-container" key={restaurant.id}>
          <input
            type="text"
            value={restaurant.name}
            placeholder="שם המסעדה"
            onChange={(e) => handleInputChange(restaurant.id, 'name', e.target.value)}
          />
          <input
            type="text"
            value={restaurant.city}
            placeholder="עיר"
            onChange={(e) => handleInputChange(restaurant.id, 'city', e.target.value)}
          />
          <input
            type="number"
            value={restaurant.price}
            placeholder="מחיר"
            onChange={(e) => handleInputChange(restaurant.id, 'price', e.target.value)}
          />
          <input
            type="text"
            value={restaurant.main_image}
            placeholder="תמונה ראשית"
            onChange={(e) => handleInputChange(restaurant.id, 'main_image', e.target.value)}
          />
          <input
            type="text"
            value={restaurant.foodType}
            placeholder="סוג מטבח"
            onChange={(e) => handleInputChange(restaurant.id, 'foodType', e.target.value)}
          />
          <textarea
            value={restaurant.description}
            placeholder="תיאור המסעדה"
            onChange={(e) => handleInputChange(restaurant.id, 'description', e.target.value)}
          ></textarea>
          <input
            type="number"
            value={restaurant.rating}
            placeholder="דירוג"
            step="0.1"
            onChange={(e) => handleInputChange(restaurant.id, 'rating', e.target.value)}
          />
          <div className="button-group">
            <button onClick={() => updateRestaurant(restaurant.id)}>עדכן</button>
            <button onClick={() => deleteRestaurant(restaurant.id)}>מחק</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantManagement;
