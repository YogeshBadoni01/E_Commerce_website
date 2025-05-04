import React, { useId, useState, useEffect } from "react";
import ProductCard from "../components/Card/ProductCard";
import { Slider } from "@mui/material";
import { filter } from "../utils/data";
import { getAllProducts } from "../api";
import Button from "../components/Button";
import AddProduct from "../components/AddProduct";


const ShopListing = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState(["S", "M", "L", "XL", "XXL"]);
  const [selectedCategories, setSelectedCategories] = useState([
    "Men",
    "Women",
    "Kids",
    "Bags",
    "Accessories",
    "Casual Wear",
    "Formal Wear",
    "Winter Wear",
    "Ethnic Wear",
  ]);

  const id = useId();

  const getFilteredProductsData = async() => {
    setLoading(true);
     await getAllProducts(
      `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}${
        selectedSizes.length > 0 ? `&sizes=${selectedSizes.join(",")}` : ""
      }${
        selectedCategories.length > 0
          ? `&categories=${selectedCategories.join(",")}`
          : ""
      }`
    )
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getFilteredProductsData();
  }, [priceRange, selectedSizes, selectedCategories]);

  return (
    <div className="flex flex-col md:flex-row md:gap-8 p-5 h-screen bg-gray-50">


      {/* Filters Section */}
      <div className="md:w-1/4 w-full bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-xl font-semibold mb-4">Filters</h1>
        {filter.map((filters) => (
          <div key={filters.value} className="mb-6">
            <h4 className="text-lg font-medium mb-2">{filters.name}</h4>
            {filters.value === "price" ? (
              <Slider
                aria-label="Price"
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                marks={[
                  { value: 0, label: "$0" },
                  { value: 1000, label: "$1000" },
                ]}
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue)}
              />
            ) : filters.value === "size" ? (
              <div className="flex flex-wrap gap-2">
                {filters.items.map((item) => (
                  <div
                    key={item}
                    className={`cursor-pointer border rounded-md px-2 py-1 ${
                      selectedSizes.includes(item)
                        ? "bg-blue-100 text-blue-600 border-blue-600"
                        : "bg-gray-100 text-gray-600 border-gray-400"
                    }`}
                    onClick={() =>
                      setSelectedSizes((prev) =>
                        prev.includes(item)
                          ? prev.filter((size) => size !== item)
                          : [...prev, item]
                      )
                    }
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : filters.value === "category" ? (
              <div className="flex flex-wrap gap-2">
                {filters.items.map((item) => (
                  <div
                    key={item}
                    className={`cursor-pointer border rounded-md px-2 py-1 ${
                      selectedCategories.includes(item)
                        ? "bg-blue-100 text-blue-600 border-blue-600"
                        : "bg-gray-100 text-gray-600 border-gray-400"
                    }`}
                    onClick={() =>
                      setSelectedCategories((prev) =>
                        prev.includes(item)
                          ? prev.filter((cat) => cat !== item)
                          : [...prev, item]
                      )
                    }
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        <div className=" flex justify-center items-center ">

        <Button text ="Add product" onClick={()=>{<AddProduct/>}} rightIcon="➕"></Button>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1 bg-white shadow-lg rounded-lg p-4 overflow-auto">
        <h3 className="text-xl font-semibold mb-4">Products</h3>
        <div className="grid   sm:grid-cols-2 xl:grid-cols-3 min-[1440px]:grid-cols-4 grid-cols-1  gap-x-6 gap-y-10">
          {console.log(products,"ShopListing")}
          {products.map((products) => (
            <ProductCard key={products._id} products={products} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopListing;
