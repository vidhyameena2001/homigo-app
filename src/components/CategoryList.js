import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = ({ categories }) => {
  return (
    <div className="category-section"> {/* Background section wrapper */}
      <div className="category-list">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/category/${encodeURIComponent(category.category)}`}
            className="category-item"
          >
            {category.image && (
              <img
                src={category.image}
                alt={category.category}
                className="category-image"
              />
            )}
            <div className="category-text">{category.category}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
