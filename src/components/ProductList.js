import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, isAuthenticated, requestLogin }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isAuthenticated={isAuthenticated}
          requestLogin={requestLogin}
        />
      ))}
    </div>
  );
};

export default ProductList;