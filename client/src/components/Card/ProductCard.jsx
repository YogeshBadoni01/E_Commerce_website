import { CircularProgress, Fab, Rating } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { AddShoppingCartOutlined, FavoriteBorder, FavoriteRounded } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { addToCart, addToFavourite, deleteFromFavourite, getFavourite } from '../../api';
import { openSnackbar } from '../../Redux/reducers/snackbarSlice';
import { useDispatch } from 'react-redux';

const ProductCard = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const addFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("Krist-app-token");
    try {
      await addToFavourite(token, { productId: products?._id });
      setFavorite(true);
    } catch (err) {
      dispatch(openSnackbar({ message: err.message, severity: "error" }));
    } finally {
      setFavoriteLoading(false);
    }
  };

  const removeFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("Krist-app-token");
    try {
      await deleteFromFavourite(token, { productId: products?._id });
      console.log("card removeFavourite")
      setFavorite(false);
    } catch (err) {
      dispatch(openSnackbar({ message: err.message, severity: "error" }));
    } finally {
      setFavoriteLoading(false);
    }
  };

  const checkFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("Krist-app-token");
    try {
      const res = await getFavourite(token, { productId: products?._id });
      const isFavorite = res.data?.some(favourite => favourite._id === products._id);
      setFavorite(isFavorite);
    } catch (err) {
      dispatch(openSnackbar({ message: err.message, severity: "error" }));
    } finally {
      setFavoriteLoading(false);
    }
  };

  const addCart = async () => {
    const token = localStorage.getItem("Krist-app-token");
    try {
      await addToCart(token, { productId: products?._id, quantity: 1 });
      navigate("/cart");
    } catch (err) {
      dispatch(openSnackbar({ message: err.message, severity: "error" }));
    }
  };

  useEffect(() => {
    checkFavorite();
  }, []);

  return (
    <div className="card">

    <div className="md:w-64 w-full flex flex-col gap-4 transition-all duration-300 cursor-pointer card-content group">
      <div className="relative flex flex-col items-center rounded-md hover:bg-primary transition-all duration-300 ">
        <img
          src={products?.img}
          alt={products?.title}
          className="h-80 w-full object-cover rounded-md transition-all duration-300 md:h-60 hover:opacity-80 object-[top]"
        />
        <div className="absolute z-10 bottom-5 top-3 right-3 hidden  flex-col gap-3 group-hover:flex ">
          <button
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center"
            onClick={() => (favorite ? removeFavorite() : addFavourite())}
          >
            {favoriteLoading ? (
              <CircularProgress sx={{ fontSize: "20px" }} />
            ) : favorite ? (
              <FavoriteRounded sx={{ fontSize: "20px", color: "red" }} />
            ) : (
              <FavoriteBorder sx={{ fontSize: "20px" }} />
            )}
          </button>
          <button
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center"
            onClick={() => addCart(products?._id)}
          >
            <AddShoppingCartOutlined sx={{ color: "inherit", fontSize: "20px" }} />
          </button>
        </div>
        <div className="absolute z-10 bottom-2 left-2 px-2 py-1 rounded-md bg-white flex items-center opacity-90">
          <Rating value={3.5} sx={{ fontSize: "14px" }} />
        </div>
      </div>
      <div
        className="flex flex-col gap-2 px-2 cursor-pointer"
        onClick={() => navigate(`/shop/${products?._id}`)}
      >
        <h2 className="text-lg font-bold text-primary">{products?.title}</h2>
        <p className="text-base font-normal text-primary truncate">{products?.desc}</p>
        <div className="flex items-center gap-2 text-lg font-medium text-primary">
          {products?.price?.mrp}
          <span className="text-sm font-medium text-secondary line-through">{products?.price?.org}</span>
          <span className="text-xs font-medium text-green-600">{products?.price?.off}% off</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductCard;
