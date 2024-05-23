import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Restaurants from '../db/Database.jsx'; 
import '../Style/frontPage.css';
import Input from './input';

const FrontPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    //לקיחת המידע על המסעדות מהlocal  או לקיחה מה db 
    useEffect(() => {
        let storedRestaurants = JSON.parse(localStorage.getItem('restaurants'));
        if (!storedRestaurants || storedRestaurants.length === 0) {
            storedRestaurants = Restaurants;
            localStorage.setItem('restaurants', JSON.stringify(storedRestaurants));
        }
        setFilteredRestaurants(storedRestaurants);
    }, []);

    //מראה אתכול המסעדות שקימות  ובמקרה של חיפוש עיר אז מראה את המסעדה שבעיר שתאומות למה שמחפשים
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        const storedRestaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
        if (searchTerm === '') {
            setFilteredRestaurants(storedRestaurants);
        } else {
            const filtered = storedRestaurants.filter(restaurant =>
                restaurant.city.toLowerCase().startsWith(searchTerm.toLowerCase())
            );
            setFilteredRestaurants(filtered);
        }
    };

    return (
        <div>
            <div className="search-container">
                <Input
                    onSearch={handleSearch}
                    type="text"
                    className="search-bar"
                    placeholder="חפש לפי עיר"
                />
            </div>
            <div className="restaurant-list">
                {filteredRestaurants.map(restaurant => (
                    <Link to={`/restaurant-page/${restaurant.id}`} key={restaurant.id}>
                        <div className="r-card">
                            <h2>{restaurant.name}</h2>
                            <img src={restaurant.images[0]} alt={restaurant.name} />
                            <p>{restaurant.city}</p>
                            <p>{restaurant.price} ש"ח</p>
                            <p>{restaurant.foodType}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FrontPage;
