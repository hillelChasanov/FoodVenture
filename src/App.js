import './Style/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './Components/frontPage';
import RestaurantManagement from './Components/RestaurantManagement';
import AddingRestaurant from './Components/AddingRestaurant';
import RestaurantPage from './Components/RestaurantPage';
import Top from './Components/Top';
import Input from './Components/input';


function App() {
  return (
    <Router>
            <Top/>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/restaurant-page/:id" element={<RestaurantPage />} />
        <Route path="/adding-restaurant" element={<AddingRestaurant />} />
        <Route path="/restaurant-management" element={<RestaurantManagement />} />
      </Routes>
    </Router>
  );
}

export default App;

