import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { useState } from "react"; // Import useState for managing search input
import 'font-awesome/css/font-awesome.min.css';

export function Navbar() {
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const navigate = useNavigate(); // Use navigate for redirection

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (searchTerm.trim()) { // Check if the search term is not empty
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`); // Redirect to search results page
      setSearchTerm(''); // Clear the input after submission
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token'); 
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/home">My Store</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarText" 
          aria-controls="navbarText" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/product">Products</Link>
            </li>
            <li className="nav-item">
              {localStorage.getItem('auth-token') ? (
                <button 
                  className="nav-link " 
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <Link className="nav-link" to="/login">
                  Log in <i className="fas fa-user"></i>
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/cart">
                Cart <i className="fa-solid fa-cart-shopping fa-xl"></i>
              </Link>
            </li>
          </ul>

          {/* Search Form */}
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
