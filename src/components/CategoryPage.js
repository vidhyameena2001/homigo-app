import React from 'react';
import ProductList from './ProductList';
import { useParams } from 'react-router-dom';

const CategoryPage = ({ products, isAuthenticated, requestLogin }) => {
  const { name } = useParams();
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === name.toLowerCase()
  );

  return (
    <>
    <div className="category-section1">
      <h2>{name}</h2>
    </div>
    <div className="category-section">
      <ProductList
        products={filteredProducts}
        isAuthenticated={isAuthenticated}
        requestLogin={requestLogin}
      />
    </div>
  </>

  );
};

export default CategoryPage;