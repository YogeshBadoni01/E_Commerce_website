import React, { useEffect, useState } from "react";
import ProductCard from "../components/Card/ProductCard";
import { getFavourite } from "../api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../Redux/reducers/snackbarSlice";
import { CircularProgress } from "@mui/material";

const Favourite = () => {
  const [Loading, setLoading] = useState(false);
  const [favproducts, setFavProducts] = useState([]);
  const [Reload, setReload] = useState(false);

  const dispatch = useDispatch();

  const getFavourites = async () => {
    setLoading(true);
    const token = localStorage.getItem("Krist-app-token");
    await getFavourite(token)
      .then((res) => {
        setFavProducts(res.data);
        // console.log(res.data, "favo");
        setLoading(false);
        setReload(!Reload);
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <div className="p-5 pb-[200px] h-full overflow-y-scroll flex items-center flex-col gap-7 bg-theme-bg">
      {Loading ? (
        <CircularProgress />
      ) : (
        <div className="max-w-[1400px] px-4 flex flex-col gap-7">
          <div className="text-[28px] font-medium flex justify-between items-center mb-[50px]">
            Favourite Products
          </div>
          {/* <div className="flex flex-wrap gap-6 justify-center"> */}
          <div className="grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {favproducts.map((products, index) => (
              <React.Fragment key={index}>
                <ProductCard products={products} />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourite;
