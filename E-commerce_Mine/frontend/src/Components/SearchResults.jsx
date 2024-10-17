
import { useLocation } from "react-router-dom";
import Card from "./Card"; 

 export const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:3004/Products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        filterProducts(data);
      });
  }, []);

  const query = new URLSearchParams(location.search).get("query") || "";

  const filterProducts = (data) => {
    if (query) {
      const lowercasedQuery = query.toLowerCase();
      const filtered = data.filter(prod =>
        prod.title.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(data);
    }
  };

  useEffect(() => {
    filterProducts(products);
  }, [query, products]);

  return (
    <div className="container mt-4">
      <h2>Search Results for: "{query}"</h2>
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <div key={prod.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <Card product={prod} />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

