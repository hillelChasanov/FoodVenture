//הדיף אחראי על הצגת דף של מסעדה, הוא טוען את הנתונים מהלוכאל ומטפל בניוט של השקופיות של התמונות
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Style/RestaurantPage.css';

const RestaurantPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [slideIndex, setSlideIndex] = useState(1);

  //טעינת הפרטים של המסעדה שהלוקח רואה
  useEffect(() => {
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    const foundRestaurant = storedRestaurants.find(r => r.id === parseInt(id));
    setRestaurant(foundRestaurant);
  }, [id]);

  //כאשר המסעדה או אינדקס השקופית משתנים, אנו מראים את השקופית הנוכחית
  useEffect(() => {
    if (restaurant && restaurant.images) {
      showSlides(slideIndex);
    }
  }, [slideIndex, restaurant]);

  //משנה את השקופית בהתאם ללחיצה על החיצים
  const plusSlides = (n) => {
    setSlideIndex(prevIndex => (prevIndex + n + restaurant.images.length - 1) % restaurant.images.length + 1);
  };

 // משנה את השקופית כאשר המשתמש לוחץ על אחת מהנקודות שמתחת למצגת
  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  // מציג את השקופית המתאימה ומעדכן את הנקודות המייצגות את השקופיות.
  const showSlides = (n) => {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slides[n - 1]) slides[n - 1].style.display = "block";
    if (dots[n - 1]) dots[n - 1].className += " active";
  };

  // הפונקציה מקבלת את המחיר ומציגה אותו באמצעות סימוני דולרים לפי היקר של המחיר
  const renderPrice = (price) => {
    let dollarSymbols = '';
    let boldDollars = 0;
    let greyDollars = 5;

    if (price <= 100) {
      boldDollars = 1;
      greyDollars = 4;
    } else if (price <= 200) {
      boldDollars = 2;
      greyDollars = 3;
    } else if (price <= 300) {
      boldDollars = 3;
      greyDollars = 2;
    } else if (price <= 400) {
      boldDollars = 4;
      greyDollars = 1;
    } else {
      boldDollars = 5;
      greyDollars = 0;
    }

    for (let i = 0; i < boldDollars; i++) {
      dollarSymbols += '<span class="bold-dollar">$</span>';
    }
    for (let i = 0; i < greyDollars; i++) {
      dollarSymbols += '<span class="grey-dollar">$</span>';
    }

    return <div dangerouslySetInnerHTML={{ __html: dollarSymbols }} />;
  };


  if (!restaurant) return <div className="container">טוען...</div>;

  return (
    <div className="container card">
      <div className="main-image-container">
        <img src={restaurant.images[0]} alt={restaurant.name} className="main-image" />
        <h1 className="container-heading">{restaurant.name}</h1>
      </div>
      <div className="info-container">
        <p className="container-description">{restaurant.description}</p>
        <p className="container-rating">Rating: {restaurant.rating}</p>
        {renderPrice(restaurant.price)}
      </div>
      <div className="slideshow-container">
        {restaurant.images && restaurant.images.map((image, index) => (
          <div className="mySlides" key={index} style={{ display: index === slideIndex - 1 ? 'block' : 'none' }}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
        <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
        <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
      </div>
      <div className="dots-container">
        {restaurant.images && restaurant.images.map((_, index) => (
          <span key={index} className={`dot ${index === slideIndex - 1 ? 'active' : ''}`} onClick={() => currentSlide(index + 1)}></span>
        ))}
      </div>
    </div>
  );
};

export default RestaurantPage;
