import React, { useState, useEffect } from 'react';
import Header from '../utils/Images/Header.png';
import { category } from '../utils/data';
import ProductiCategoryCard from '../components/Card/ProductiCategoryCard';
import ProductCard from '../components/Card/ProductCard';
import { getAllProducts } from '../api';
import { CircularProgress } from '@mui/material';

const Home = () => {
  const [Loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    await getAllProducts().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="px-[30px] py-[20px] md:px-3 bg-gray-100 min-h-screen overflow-y-scroll flex flex-col items-center gap-8">
      
      {/* Header Section */}
      <div className="w-full max-w-[1400px] flex flex-col items-center px-4 py-8">
        <img src={Header} alt="Header" className="w-full max-w-[1200px] h-[700px] object-cover" />
      </div>

      {/* Shop by Category Section */}
      <div className="w-full max-w-[1400px] flex flex-col px-4 py-8 gap-7">
        <div className="text-2xl font-medium text-center">Shop By Category</div>
        <div className="flex flex-wrap justify-center gap-6">
          {category.map((cat, index) => (
            <ProductiCategoryCard key={index} category={cat} />
          ))}
        </div>
      </div>

      {/* Best Deals Section */}
      <div className="w-full max-w-[1400px] flex flex-col px-4 py-8 gap-7">
        <div className="text-2xl font-medium text-center">Our Best Deals</div>
        {Loading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          // <div className="flex flex-wrap justify-center gap-6 flex-row">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 justify-center">
            {products.map((product, index) => {
              // while(product.length< 5){

                if (product?.price?.off > 19) {
                  return <ProductCard key={index} products={product} />;
                }
              // }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;