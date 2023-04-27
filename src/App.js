import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./home";
import Cart from "./components/pages/cart";
import Checkout from "./components/pages/checkout";
import Forgot from "./components/pages/forgot";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import Shop from "./components/pages/shop";
import Aboutus from "./components/pages/aboutus";
import Contactus from "./components/pages/contactus";
import Faq from "./components/pages/faq";
import Termcondition from "./components/pages/term_condition";
import ProductDetail from "./components/pages/product-detail";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Wishlist from "./components/pages/wishlist";
import Tracking from "./components/pages/order_tracking";
import Orders from "./components/pages/your_orders";
import Account from "./components/pages/your_account";
import BlogList from "./components/pages/blog_list";
import BlogDetail from "./components/pages/blog_detail";
import Otp from "./components/pages/otp_verification";
import Careers from "./components/pages/careers";
import AuthWrapper from "./components/authwrapper";
import SellerSignUp from "./components/pages/sellersignup";
// import Benners from "./components/common/banners";
// import Header from "./components/common/header";

function App() {
  const [userLogged, setUserLogged] = useState(localStorage.getItem("token"));

  useEffect(() => {
    localStorage.setItem("token", userLogged);
  }, [userLogged]);

  const logIn = () => setUserLogged(true);
  const logOut = () => setUserLogged(false);

  return (
    <BrowserRouter key={25}>
      <Routes key={1}>
        <Route path="/" element={<Home />} key={2} />
        <Route path="/login" element={<Login logIn={logIn} />} key={3} />
        {/* <Route path="/login" element={<Login />} /> */}

        <Route path="/shop" element={<Shop />} key={4} />
        <Route path="/signup" element={<Signup />} key={5} />
        <Route path="/forgot" element={<Forgot />} key={6} />
        <Route path="/sellersignup" element={<SellerSignUp />} key={7} />

        <Route element={<AuthWrapper />} key={8}>
          <Route path="/product-detail" element={<ProductDetail />} key={9} />
          <Route path="/cart" element={<Cart />} key={10} />
          <Route path="/checkout" element={<Checkout />} key={11} />
          <Route path="/aboutus" element={<Aboutus />} key={12} />
          <Route path="/contactus" element={<Contactus />} key={13} />
          <Route path="/faq" element={<Faq />} key={14} />
          <Route path="/term_condition" element={<Termcondition />} key={15} />
          <Route path="/careers" element={<Careers />} key={16} />
          <Route path="/wishlist" element={<Wishlist />} key={17} />
          <Route path="/order_tracking" element={<Tracking />} key={18} />
          <Route path="/your_orders" element={<Orders />} key={19} />
          <Route path="/your_account" element={<Account />} key={20} />
          <Route path="/blog_list" element={<BlogList />} key={21} />
          <Route path="/blog_detail" element={<BlogDetail />} key={22} />
          <Route path="/otp_verification" element={<Otp />} key={23} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
