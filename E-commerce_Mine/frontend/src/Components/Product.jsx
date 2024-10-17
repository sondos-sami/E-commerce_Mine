 /* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import 'bootstrap/dist/css/bootstrap.min.css';

export function Product() {
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortOption, setSortOption] = useState('latest');

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setFilteredProducts(data);
      });
  }, []);

  const selector = useSelector((state) => state.cart);
  console.log(selector);

  const filterProducts = () => {
    let filtered = [...product]; // Create a copy of the product array

    if (categoryFilter !== 'All') {
      filtered = filtered.filter((prod) => prod.category === categoryFilter);
    }

    if (sortOption === 'latest') {
      filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (sortOption === 'priceHighToLow') {
      filtered.sort((a, b) => b.old_price - a.old_price);
    } else if (sortOption === 'priceLowToHigh') {
      filtered.sort((a, b) => a.old_price - b.old_price);
    }

    setFilteredProducts(filtered);
  };

  // Updated useEffect to watch both categoryFilter and sortOption
  useEffect(() => {
    filterProducts();
  }, [categoryFilter, sortOption, product]);

  return (
    <>
      <div className="filter-controls d-flex justify-content-center align-items-center mb-4 mt-4">
        <div className="me-3">
          <label className="filter-label">Category:</label>
          <select
            className="form-select d-inline-block w-auto ms-2"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="men">Men&apos;s Clothing</option>
            <option value="women">Women&apos;s Clothing</option>
            <option value="kid">Kids</option>
          </select>
        </div>

        <div>
          <label className="filter-label">Sort By:</label>
          <select
            className="form-select d-inline-block w-auto ms-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          {filteredProducts.map((prod) => (
            <div key={prod.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <Card product={prod} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
