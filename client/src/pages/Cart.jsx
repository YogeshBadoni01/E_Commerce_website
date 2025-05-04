import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import {
  addToCart,
  deleteFromCart,
  getAllProducts,
  getCart,
  placeOrder,
} from "../api";
import { openSnackbar } from "../Redux/reducers/snackbarSlice";
import { DeleteOutline, Try } from "@mui/icons-material";


const Cart = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    emaillAddress: "",
    phoneNumber: "",
    completeAddress: "",
  });


  const getProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("Krist-app-token");
    try {
      const res = await getCart(token);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err.message);
      dispatch(openSnackbar({ message: err.message, severity: "error" }));
    } finally {
      setLoading(false);
    }
  };

  const addCart = async (id) => {
    const token = localStorage.getItem("Krist-app-token");
    try {
      await addToCart(token, { productId: id, quantity: 1 });
      setReload((prev) => !prev); // Toggle reload state
    } catch (err) {
      dispatch(openSnackbar({ message: err.message, severity: "error" }));
    } 
  };

  
  const removeCart = async (id, quantity, type) => {
    const token = localStorage.getItem("Krist-app-token");
    let qnt = quantity > 0 ? 1 : null;
    if (type === "full") qnt = null;
    try {
      await deleteFromCart(token, { productId: id, quantity: qnt });
      setReload((prev) => !prev); // Toggle reload state
    } catch (err) {
      dispatch(openSnackbar({ message: err.message, severity: "error" }));
    }
  };


  const calculateSubtotal = () => {
    return products.reduce(
      (total, item) => total + item.quantity * item?.products?.price?.org,
      0
    );
  };
  // console.log(calculateSubtotal())

  const convertAddressToString = (addressObj) => {
    return `
    ${addressObj.firstName}
    ${addressObj.lastName}
    ${addressObj.completeAddress}
    ${addressObj.phoneNumber}
    ${addressObj.emaillAddress}
    
    `;
  };

  const placeOrders = async () => {
    console.log("hello yogi test");
    setButtonLoad(true);
    try {
      const isDeliveryDetailsFilled =
        deliveryDetails.firstName &&
        deliveryDetails.lastName &&
        deliveryDetails.completeAddress &&
        deliveryDetails.phoneNumber &&
        deliveryDetails.emaillAddress;

      // console.log(isDeliveryDetailsFilled,"placeorder")
      if (!isDeliveryDetailsFilled) {
        dispatch(
          openSnackbar({
            message: "Please fill all required filled",
            severity: "error",
          })
        );
        return;
      }

      const token = localStorage.getItem("Krist-app-token");
      // console.log(token,"placeorder")
      const totalAmount = calculateSubtotal().toFixed(2);
      // console.log(totalAmount,"placeorder")
      const orderDetials = {
        products,
        address: convertAddressToString(deliveryDetails),
        totalAmount,
      };
      console.log(orderDetials,"placeorder")

       await placeOrder(token, orderDetials);
      console.log( orderDetials, "placeorder");

      dispatch(
        openSnackbar({
          message: "Successsfully order placed",
          severity: "success",
        })
      );
      setButtonLoad(false);
      setReload(!reload);
    } catch (err) {
      dispatch(
        openSnackbar({ message: "failed to place order", severity: "error" })
      );
      setButtonLoad(false);
    }
  };


  useEffect(() => {
    let isMounted = true; 
    if (isMounted) {
      getProducts();
    }
    return () => {
      isMounted = false; 
    };
  }, [reload]);
  return (
    <div className="px-5 md:py-[30px] pb-[200px] h-screen flex items-center flex-col gap-[30px] py-3 ">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="w-full max-w-[1400px] flex flex-col px-8 py-4 gap-7 items-center text-[22px]">
          <div className="text-[28px] font-medium justify-between items-center">Your Shopping Cart</div>
          {products.length === 0 ? (
            <>Cart is empty</>
          ) : (
            <div className="flex gap-8 w-full p-3 lg:flex-row flex-col">
              <div className=" flex-1  gap-3 flex-12 flex flex-col  ">
                <div className="flex ">
                  <div className="flex font-semibold text-lg ">
                    Product
                  </div>
                  <div className=" flex w-full justify-end gap-10">
                    <div className="font-semibold text-lg " >Price</div>
                    <div className="font-semibold text-lg" >Quantity</div>
                    <div className="font-semibold text-lg max-md:hidden" >Subtotal</div>
                  </div>
                </div>
                {products?.map((item, index) => (
                  <div className="flex text-base items-center gap-[30px] shadow-sm mb-3 overflow-x-scroll" key={index}>
                    {/* {console.log(item?.products?.img, "item")} */}
                    <div className="flex-1 mr-auto">
                      <div className="flex gap-4 flex-col sm:flex-row">
                        <img className="w-[54px] h-[64px] sm:h-[80px]" alt={products?.title} src={item?.products?.img} />
                        <div>
                          <div className={`text-theme-primary`}>{item?.products?.title}</div>
                          <div className="text-sm font-normal text-theme-primary overflow-hidden text-ellipsis whitespace-nowrap max-md:hidden">{item?.products?.name}</div>
                          <div className="text-base font-medium">Size: Xl</div>
                        </div>
                      </div>
                    </div>
                    <div>{item?.products?.price?.org}</div>

                    <div>
                      <div className="flex gap-3 items-center border border-solid border-theme-text-secondary rounded-lg px-1 py-3">
                        <div className="flex-1 cursor-pointer" onClick={() => {
                            removeCart(item?.products?._id, item?.quantity - 1);
                          }}>
                          -
                        </div>
                        <div>{item?.quantity}</div>
                        <div className="flex-1 cursor-pointer" 
                          onClick={() => addCart(item?.products?._id)}>
                          +
                        </div>
                      </div>
                    </div>
                    <div className="max-md:hidden">
                      {(item?.products?.price?.org * item?.quantity).toFixed(2)}
                    </div>
                    {}
                    <DeleteOutline  sx={{ color: "red", cursor: "pointer" }} onClick={() => {
                        removeCart( item?.products?._id, item?.quantity - 1,"full");
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex-1 flex flex-col gap-3 flex-08">
                <div className=" text-[22px] font-semibold flex gap-[6px] flex-col">SubTotal : {calculateSubtotal().toFixed(2)}</div>
                <div className="text-lg font-medium flex gap-[6px] flex-col">
                  {" "}
                  Delivery Details:
                  <div>
                    <div  className="flex gap-[6px]">
                      <TextInput 
                        small
                        placeholder="First Name"
                        value={deliveryDetails.firstName}
                        handelChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            firstName: e.target.value,
                          })
                        }
                      />
                      <TextInput
                        small
                        placeholder="Last Name"
                        value={deliveryDetails.lastName}
                        handelChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <TextInput
                      small
                      placeholder="Email Address"
                      value={deliveryDetails.emaillAddress}
                      handelChange={(e) =>
                        setDeliveryDetails({
                          ...deliveryDetails,
                          emaillAddress: e.target.value,
                        })
                      }
                    />
                    <TextInput
                      small
                      placeholder="Phone no. +91XXXXXXXX"
                      value={deliveryDetails.phoneNumber}
                      handelChange={(e) =>
                        setDeliveryDetails({
                          ...deliveryDetails,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                    <TextInput
                      small
                      textArea
                      placeholder="Delivery Address"
                      rows={5}
                      value={deliveryDetails.address}
                      handelChange={(e) =>
                        setDeliveryDetails({
                          ...deliveryDetails,
                          completeAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="text-lg font-medium flex gap-[6px] flex-col">
                  {" "}
                  Card Details:
                  <div>
                    <TextInput small placeholder="Card Number" />
                    <div style={{ display: "flex", gap: "6px" }}>
                      <TextInput small placeholder="Expiry Details" />
                      <TextInput small placeholder="CVV" />
                    </div>
                    <TextInput small placeholder="Card Holder Name" />
                  </div>
                </div>
                <Button
                  text="Placeorder"
                  small
                  isLoading={buttonLoad}
                  isdisabled={buttonLoad}
                  onClick={placeOrders}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
