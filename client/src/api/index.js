import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const UserSignUp = async (data) => await API.post("/user/signup", data);
export const UserSignIn = async (data) => await API.post("/user/signin", data);

//Products
// export const getAllProducts = async (filter) =>
//   await API.get(`/products?${filter}`);

export const getAllProducts = async (filter) =>
  await API.get(`/products?${filter}`)

export const getProductDetails = async (id) => await API.get(`/products/${id}`);

export const AddNewProduct = async(token,data) => {
  await API.post(`/products/add/`,data,{
    headers: {Authorization: `Bearer ${token}`},
  })
}

export const ProductLength = async(token) => await API.get(`/products`,{headers:{Authorization:`Bearer ${token}`}});

//Cart

// export const getCart = async (token) =>
//   await API.get("/user/cart", {
//     headers: { Authorization: `Bearer ${token}` },
//   });

export const getCart = async (token) =>
  await API.get("/user/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });

// export const getCart = async (token) =>
//   await API.get("/user/cart/", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
  
export const  addToCart = async (token, data) =>
  await API.post(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// export const deleteFromCart = async (token, data) =>
//   await API.patch(`/user/cart/`, data, {
//     headers: { Authorization: `Bearer ${token}`},
//   });

export const deleteFromCart = async (token, data) =>
  await API.patch(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

//Favorites

export const getFavourite = async (token) =>
  await API.get(`/user/favourite`, {
    headers: { Authorization: `Bearer ${token}`},
  });

// export const addToFavorite = async (token, data) =>
//   await API.post(`/user/favorite/`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

export const addToFavourite = async (token, data) =>
  await API.post(`/user/favourite`, data, {
    headers: { Authorization: `Bearer ${token}`},
  });

export const deleteFromFavourite = async (token, data) =>
  await API.patch(`/user/favourite`, data, {
    headers: { Authorization: `Bearer ${token}`},
  });

//Orders

export const placeOrder = async (token, data) =>
  await API.post(`/user/order`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrders = async (token) =>
  await API.get(`/user/order`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const ContactUs = async (data) => {
  await API.patch('/user/Contact',data )
}