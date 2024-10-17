
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './Components/Navbar';
import { Home } from './Components/Home';
import { Product } from './Components/Product';
import { ProductDetails } from './Components/ProductDetails';
import { Cart } from './Components/Cart';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { SignupLogin } from './Pages/SignupLogin';
import { SearchResults } from './Components/SearchResults';
import './App.css';
 
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={<SignupLogin/>} /> 
        <Route path="/search" element={<SearchResults />} />
        <Route path="/signup-login" element={<SignupLogin />} />
      </Routes>
    </div>
  );
}

export default App;
