
import { ThemeProvider } from "styled-components"; // Retained for theme logic
import { lightTheme } from "./utils/Themes.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import { useState } from "react";
import Authendication from "./pages/Authendication.jsx";
import Favourite from "./pages/Favbourite.jsx";
import Cart from "./pages/Cart.jsx";
import ShopListing from "./pages/ShopListing.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import { useSelector } from "react-redux";
import ToastMessage from "./components/ToastMessage.jsx";
import Contact from "./pages/Contact.jsx";
import Deshboard from "./pages/Deshboard.jsx";



function App() {
  
  const { currentUser } = useSelector((state) => state.user);
  const { open, message, serverity } = useSelector((state) => state.user);

  const [openAuth, setOpenAuth] = useState(false);

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <div
          className={`w-full h-screen flex flex-col transition-all duration-200`}
          style={{
            background: lightTheme.bg,
            color: lightTheme.text_primary,
          }}
        >
          <Navbar
            openAuth={openAuth}
            setOpenAuth={setOpenAuth}
            currentUser={currentUser}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ShopListing />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shop/:id" element={<ProductDetails />} />
            <Route path="/favourites" element={<Favourite />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/deshboard" element={<Deshboard  currentUsers={currentUser}/> } />
          </Routes>
          {openAuth && (
            <Authendication
              openAuth={openAuth}
              setOpenAuth={setOpenAuth}
            />
          )}
          {open && (
            <ToastMessage
              open={open}
              message={message}
              serverity={serverity}
            />
          )}
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
