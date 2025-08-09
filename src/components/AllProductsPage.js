import React from 'react';
import ProductList from './ProductList';

const AllProductsPage = ({ products, isAuthenticated, requestLogin }) => {
  return (
    <div className="category-section">
      <h2>All Services</h2>
      <ProductList
        products={products}
        isAuthenticated={isAuthenticated}
        requestLogin={requestLogin}
      />
    </div>
  );
};

export default AllProductsPage;