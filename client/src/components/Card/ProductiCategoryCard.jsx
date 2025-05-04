import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-64 flex flex-col gap-4 transition-all duration-300 cursor-pointer md:w-44"
      onClick={() => navigate(`/shop?category=${category}`)}
    >
      <div
        className="flex flex-col items-center justify-center relative rounded-md transition-all duration-300 group"
      >
        <img
          src={category.img}
          alt={category.name}
          className="h-80 w-full object-cover rounded-md transition-opacity duration-300 group-hover:opacity-80 md:h-60"
        />
        <div
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-5/6 flex gap-3 z-10 text-gray-800"
        >
          <button
            className=" text-blue-600 py-3 px-5 bg-white rounded-lg font-medium  transition-all duration-300 md:py-2 md:px-3"
          >
            {category.name}
          </button>
        </div>
        <div
          className="absolute top-2 right-2 text-white text-xs font-semibold bg-green-500 px-2 py-1 rounded-md md:text-[10px]"
        >
          {category.off}
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryCard;
