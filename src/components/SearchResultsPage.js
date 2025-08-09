import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from './ProductList';

const SearchResultsPage = ({ products, isAuthenticated, requestLogin }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('term')?.toLowerCase() || '';

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  if (filteredProducts.length === 0) {
    return (
      <div className="search-results-container">
        <h2>Search Results for "{searchTerm}"</h2>
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <h2>Search Results for "{searchTerm}"</h2>
      <ProductList
        products={filteredProducts}
        isAuthenticated={isAuthenticated}
        requestLogin={requestLogin}
      />
    </div>
  );
};

export default SearchResultsPage;
