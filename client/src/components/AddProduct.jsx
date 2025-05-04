import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { AddNewProduct, ProductLength } from "../api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../Redux/reducers/snackbarSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [Loading,setLoading] =useState(false)
  const [Product,setProducts] =useState([])
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [Data, setData] = useState({
    title: "",
    name: "",
    desc: "",
    img: "",
    price: {
      org: 0,
      mrp: 0,
      off: 0,
    },
    sizes: [],
    category: [],
  });
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

  const [formData, setFormData] = useState([]);

  const TotalProduct = async() => {
    const token = localStorage.getItem("Krist-app-token")

      
    
      await ProductLength(token)
      .then(res => {
          setLoading(true);
          console.log(res,"this is response")
          setProducts(res)
        })
        .catch(err =>{
          console.log(err,"this is err")
        })

        setLoading(false)
  
  }
  useEffect(() => {
    TotalProduct()
  },[Loading]);
  
  

  const handleChanges = (e) => {
    const { name, value, type, files } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
      price:
        name in prevData.price
          ? { ...prevData.price, [name]: value }
          : prevData.price,
    }));

    console.log(Data, "try");
  };

  const handleSizeChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value);
    
    setData((prevData) => ({
      ...prevData,
      sizes: selectedOptions,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectCategory =  Array.from(e.target.selectedOptions).map( 
      (opt) => opt.value);

      // console.log(selectCategory,"selectCategory")

    setData((prevData) => ({
      ...prevData,
      category: selectCategory}))
  }

  const handleSubmit = async () => {
    // e.preventDefault()
    
    const { title, name, desc, img, price, sizes, category } = Data;

    const token = localStorage.getItem("Krist-app-token");
    
    if (!title || !name || !desc || !img || !price.org || !price.mrp || !price.off || !sizes || !category) {
      alert("please fill all requried field")
      dispatch(
        openSnackbar({
          message: "All fields are required!",
          severity: "error",
        })
      );
      return;
    }
    // console.log(Data,"data")

    await AddNewProduct(token, {
      title: Data.title,
      name: Data.name,
      desc: Data.desc,
      img: Data.img.name,
      org: Data.price.org,
      mrp: Data.price.mrp,
      off: Data.price.off,
      sizes: Data.sizes,
      category: Data.category,
    })
      .then(() => {
        setButtonLoading(true);
        setButtonDisabled(true);
        dispatch(
          openSnackbar({
            message: "Product added successfully!",
            severity: "success",
          })
        );
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      })
      // .finally(() => {
        setButtonLoading(false);
        setButtonDisabled(false);
      // });
  };

  return (
    <div className="w-full ">
      {/* Product Details  */}
      <h2 className="mt-20 text-2xl text-left mb-10">AddProducts</h2>

      {/* temp */}
        <h1>{Product.data}</h1>
      {/* temp */}
      <div className="mt-3 p-5 flex justify-between w-full">
        <div className="text-lg flex items-center flex-col justify-center">
          <span>🅿️</span>
          <h5>total Product</h5>
        </div>

        <div className="text-lg flex items-center flex-col">
          <div className="relative cursor-pointer">
            <div className="absolute Cycle "></div>
          </div>
          <span className="">🅿️</span>
          <h5>total Product</h5>
        </div>
        <div className="text-lg flex items-center flex-col">
          <div className="relative cursor-pointer">
            <div className="absolute Cycle "></div>
          </div>
          <span className="">🅿️</span>
          <h5>total Product</h5>
        </div>
        <div className="text-lg flex items-center flex-col">
          <div className="relative cursor-pointer">
            <div className="absolute Cycle "></div>
          </div>
          <span className="">🅿️</span>
          <h5>total Product</h5>
        </div>
      </div>

      {/* Add the product from */}
      <div className="mt-20 ">
        <h2 className="mt-20 text-2xl text-left mb-10">Add New Product</h2>

        <div className="max-w-[800px] mb-10">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <TextInput
              label="Title"
              placeholder="Product Title"
              value={Data.title}
              name="title"
              handelChange={(e) => handleChanges(e)}
            />
            <TextInput
              label="Name"
              placeholder="Product Name"
              value={Data.name}
              name="name"
              handelChange={(e) => handleChanges(e)}
            />
            <TextInput
              label="Description"
              placeholder="Description"
              value={Data.desc}
              name="desc"
              handelChange={(e) => handleChanges(e)}
            />
            {/* <TextInput label="Image" placeholder="Image" value={Data.img}  name={Data.img} handelChange={e=>handleChanges(e)} type="" /> */}

            {/* <input type="image" src="" alt="" placeholder="Image" value="xyz" /> */}
            {/* <input type="file" src="" alt="Submit" width="48" height="48"></input> */}

            <div className=" ">
              <label htmlFor="img" className="mb-0 text-[14px]">
                Images
              </label>
              <div className="rounded-lg border-[0.5px] border-gray-500 px-4 py-2">
                <input
                  type="file"
                  onChange={handleChanges}
                  className="file-input border-none w-full"
                  accept=".jpg,.png"
                  // value={Data.img}
                  name="img"
                  // placeholder="accept only jpg and png"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 ">
  {/* Column 1: Pricing Details */}
  <div className="flex flex-col justify-around">
    <TextInput
      label="Original Price"
      placeholder="Product Original Price"
      value={Data.price.org}
      name="org"
      handelChange={(e) => {
        handleChanges(e);
      }}
    />
    <TextInput
      label="Market Price"
      placeholder="Product Market Price"
      value={Data.price.mrp}
      name="mrp"
      handelChange={(e) => handleChanges(e)}
    />
    <TextInput
      label="% Off"
      placeholder="Discount Percentage"
      value={Data.price.off}
      name="off"
      handelChange={(e) => handleChanges(e)}
    />
  </div>

  {/* Column 2: Sizes */}
  <div className="flex flex-col justify-between">
    <label htmlFor="sizes" className="mb-0 text-[14px]">
      Sizes
    </label>
    <div className="rounded-lg border-[0.5px] border-gray-500 px-4 py-2">
      <select
        name="sizes"
        id="sizes"
        multiple
        onChange={handleSizeChange}
        className="w-full "
      >
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
      </select>
    </div>

<div className="mt-4">
  <label htmlFor="category" className="mb-0 text-[14px]">Category</label>
  <div className="rounded-lg border-[0.5px] border-gray-500 px-4 py-2">
    <select
      name="category"
      id="category"
      multiple
      onChange={handleCategoryChange}
      className="w-full "
      >
      <option value="Women">Women</option>
      <option value="Men">Men</option>
      <option value="Kids">Kids</option>
      <option value="Bags">Bags</option>
      <option value="Accessories">Accessories</option>
    </select>
  </div>
</div>
        </div>
      </div>
            <Button
              text="Add Product ➕"
              isLoading={buttonLoading}
              isDisabled={buttonDisabled}
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct