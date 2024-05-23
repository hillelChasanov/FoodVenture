// הוספת מסעדה חדשה למערכת ושמירה של המסעדה במעגר נתונים localStorage
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Style/AddingRestaurant.css";

// ניהול נתוני הטופס של הוספת מסעדה
const AddRestaurantPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [additionalImages, setAdditionalImages] = useState([]);
    const [price, setPrice] = useState('');
    const [city, setCity] = useState('');
    const [foodType, setFoodType] = useState('');
    const navigate = useNavigate();


    const handleAddRestaurant = () => {
            // פונקציה שבודקת שהמשתמש מילא את כול השדות ואם לא לא מאפשרת לו להתקדם
        if (!name || !description || !rating || !mainImage || !price || !city || !foodType || additionalImages.length < 3) {
            alert('נא למלא את כל השדות הנדרשים ולהכניס שלוש תמונות נוספות.');
            return;
        }
    
        // האוביקט מכיל את כול הנתונים שהכנסנו לתוך המשתנה
        const newRestaurant = {
            id: Date.now(),
            name,
            description,
            rating,
            images: [mainImage, ...additionalImages],
            price,
            city,
            foodType
        };

        // אחסון המסעדה החדשה שהכנסנו בlocalStorage
        const storedRestaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
        storedRestaurants.push(newRestaurant);//הוספת המסעדה למערך
        localStorage.setItem('restaurants', JSON.stringify(storedRestaurants));//שמירת המערך המעודכן ב local

        navigate('/');
    };

    // מעדכן את התמונות החדשות
    const handleAdditionalImageChange = (e, index) => {
        const newImages = [...additionalImages];
        newImages[index] = e.target.value;
        setAdditionalImages(newImages);
    };

    // יצירת עוד מקום להכנסת תמונות
    const handleAddAdditionalImageField = () => {
        if (additionalImages.length < 3) {
            setAdditionalImages([...additionalImages, '']);
        } else {
            alert('ניתן להכניס עד שלוש תמונות נוספות בלבד.');
        }
    };

    return (
        <div className="adding-restaurant-container">
            <h1>הוסף מסעדה חדשה</h1>
            <div className="a">
                <div className="form-group">
                    <input type="text" placeholder="שם המסעדה" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <textarea placeholder="תיאור" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="number" placeholder="דירוג" value={rating} onChange={(e) => setRating(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="מחיר" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="עיר" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="סוג אוכל" value={foodType} onChange={(e) => setFoodType(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="תמונה ראשית" value={mainImage} onChange={(e) => setMainImage(e.target.value)} />
                </div>
                <div className="form-group">
                    {/* יצירת מערך להוספת הקטע של הדפס תמונות  */}
                    {additionalImages.map((image, index) => (
                        <div key={index} className="additional-image-group">
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => handleAdditionalImageChange(e, index)}
                                placeholder={`תמונה נוספת ${index + 1}`}
                            />
                        </div>
                    ))}
                    {additionalImages.length < 3 && (
                        <button onClick={handleAddAdditionalImageField}>הוסף תמונה נוספת</button>
                    )}
                </div>
                <button onClick={handleAddRestaurant}>הוסף מסעדה</button>
            </div>
        </div>
    );
};

export default AddRestaurantPage;
