import { CircularProgress, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { FavoriteBorder, FavoriteRounded } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addToCart,
  addToFavourite,
  deleteFromFavourite,
  getFavourite,
  getProductDetails,
} from "../api";
import { openSnackbar } from "../Redux/reducers/snackbarSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState();
  const [selected, setSelected] = useState();
  const [favourite, setFavourite] = useState(false);
  const [favouriteLoading, setFavouriteLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const getProduct = async () => {
    setLoading(true);
    await getProductDetails(id)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const addFavourite = async () => {
    setFavouriteLoading(true);
    const token = localStorage.getItem("Krist-app-token");
    await addToFavourite(token, { productId: product?.id })
      .then(() => {
        setFavourite(true);
        setFavouriteLoading(false);
      })
      .catch((err) => {
        setFavouriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const removeFavourite = async () => {
    setFavouriteLoading(true);
    const token = localStorage.getItem("Krist-app-token");
    await deleteFromFavourite(token, { productId: product?._id })
      .then(() => {
        setFavourite(false);
        setFavouriteLoading(false);
      })
      .catch((err) => {
        setFavouriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const checkFavourite = async () => {
    setFavouriteLoading(true);
    const token = localStorage.getItem("Krist-app-token");
    await getFavourite(token, { productId: product?._id })
      .then((res) => {
        const isFavorite = res.data?.some(
          (favorite) => favorite._id === id
        );
        setFavourite(isFavorite);
        setFavouriteLoading(false);
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const addCart = async () => {
    setCartLoading(true);
    const token = localStorage.getItem("Krist-app-token");
    await addToCart(token, { productId: id, quantity: 1 })
      .then(() => {
        setCartLoading(false);
        navigate("/cart");
      })
      .catch((err) => {
        setCartLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  useEffect(() => {
    getProduct();
    checkFavourite();
  }, []);

  return (
    <div className="flex justify-center items-center h-full w-full">
      {loading ? (
        <CircularProgress sx={{ fontSize: "50px" }} />
      ) : (
        <div className="flex flex-wrap max-w-7xl w-full gap-8 p-4">
          <div className="flex flex-1 justify-center items-center">
            <img
              src={product?.img}
              alt={product?.title}
              className="h-96 rounded-lg md:h-[600px]"
            />
          </div>
          <div className="flex flex-1 flex-col gap-4 p-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{product?.title}</h1>
              <p className="text-lg text-gray-600">{product?.name}</p>
            </div>
            <Rating value={3.5} />
            <p className="text-gray-800 text-sm">{product?.desc}</p>
            <div>
              <h3 className="text-lg font-medium mb-5">Sizes:</h3>
              <div className="flex gap-4">
                {product?.sizes.map((item, index) => (
                  <button
                    key={index}
                    className={`border border-blue-500 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer ${
                      selected === item
                        ? "bg-blue-500 text-white"
                        : "text-blue-500"
                    }`}
                    onClick={() => setSelected(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-5 text-4xl font-medium text-primary my-5 justify-start">
          {product?.price?.mrp}
          <span className="text-md font-medium text-secondary line-through text-2xl text-gray-500">{product?.price?.org}</span>
          <span className="text-xs font-medium text-green-600">{product?.price?.off}% off</span>
        </div>
            <div className="flex gap-4 mt-4">
              <Button
                text="Add to Cart"
                full
                outlined
                isLoading={cartLoading}
                onClick={() => addCart()}
                buttonClasses="bg-white"
              />
              <Button text="Buy" full />
              <Button
                leftIcon={
                  favourite ? (
                    <FavoriteRounded
                      sx={{ fontSize: "22px", color: "red" ,width:"50px" }}
                    />
                  ) : (
                    <FavoriteBorder sx={{ fontSize: "22px" }} />
                  )
                }
                full
                outlined
                isLoading={favouriteLoading}
                onClick={() =>
                  favourite ? removeFavourite() : addFavourite()
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
