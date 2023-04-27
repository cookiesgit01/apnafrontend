import React, { useState, useEffect } from "react";
import Header from "../common/header";
import Breadcumb from "../common/beadcumb";
import Footer from "../common/footer";
import ProductBox from "../common/product-box";
import data from "./data";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Wishlist(all_images) {
  // const useridd = localStorage.getItem("userid");
  const token = localStorage.getItem("token");
  const [msg, setMsg] = useState(true);

  const [apicall, setapicall] = useState(false);
  const [wishlist, setWishList] = useState([]);
  // console.log("WHISHLISTDATA")
  // console.log(wishlist)

  const [wishlistocart, setwishlistocart] = useState("");
  const navigate = useNavigate();

  var product = data.product;
  // const func = () => {};
  useEffect(() => {
    if (
      token === undefined ||
      token === "null" ||
      token === "" ||
      token === null
    ) {
    } else {
      getWishList();
    }
    function getWishList() {
      try {
        axios
          .post(
            `${process.env.REACT_APP_BASEURL}/wishlist`,
            {
              user_id: "",
            },
            {
              headers: {
                user_token: token,
              },
            }
          )
          .then((response) => {
            let data = response.data;

            if (
              response.data.message === "empty" ||
              response.data.response === "header error" ||
              response.data.error === "Please authenticate using a valid token"
            ) {
              setMsg(false);
            } else {
              setWishList(data);
              setapicall(false);
            }
          });
      } catch (err) { }
    }
  }, [apicall, token]);

  const AddToCart = (id, saleprice, productMRF, wishlistid, count) => {
    let cnt = 1;
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/add_to_cart`,
        {
          user_id: "",
          product_view_id: `${wishlistid}`,
          price: `${saleprice}`,
          discount: `${productMRF}`,
          quantity: count === 0 ? cnt : count,
          is_active: 1,
        },
        {
          headers: {
            user_token: `${token}`,
          },
        }
      )
      .then((response) => {
        // let data = response.data;
        setapicall(true);
        localStorage.setItem("cartupdate", true);
      });
  };
  // wlist = window.location.pathname;

  const AddToWishList = (id, wishlistt, wishlistid) => {
    axios
      .put(
        `${process.env.REACT_APP_BASEURL}/remove_product_from_wishlist`,
        {
          // product_id: `${wishlistid}`,
          id: wishlistid,
        },
        {
          headers: {
            user_token: `${token}`,
          },
        }
      )

      .then((response) => {
        // let data = response.data;
        setapicall(true);
      });
  };
  const clickProduct = (productid) => {
    localStorage.setItem("proid", productid);
    navigate("/product-detail");
    setwishlistocart("")
  };
  return (
    <React.Fragment>
      <Header />
      <Breadcumb pageName={"Wishlist"} pageTitle={"Wishlist"} pageHref={"/"} />

      <div className="container-fluid-lg my-5">
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="all"
            role="tabpanel"
            aria-labelledby="all-tab"
          >
            {msg === false ? (
              <h2 className="text-dark text-center">
                Add Product In wishlist{" "}
              </h2>
            ) :
              <div className="row w-100">
                {(wishlist || []).map((wlist, i) => {
                  // {console.log("-------------------"+wlist.quantity)}

                  // console.log("---" + JSON.stringify(wishlist));
                  return (
                    <div
                      className="col-xxl-2 col-lg-3 col-md-4 col-6 wow fadeInUp"
                    >

                      <ProductBox
                        key={i}

                        image={product.all_images}
                        name={wlist.product_title_name}
                        productPrice={wlist.product_price}
                        quantity={wlist.quantity}
                        productMRF={wlist.sale_price}
                        productid={wlist.product_id}
                        saleprice={wlist.sale_price}
                        wishlistid={wlist.id}
                        rating={wlist.rating}
                        discount={wlist.discount}
                        special_offer={wlist.special_offer}
                        clickProduct={clickProduct}
                        AddToWishList={AddToWishList}
                        AddToCart={AddToCart}
                        wishlistocart={wishlistocart}
                        allimages={wlist.all_images}
                        avgRatings={wlist.avgRatings}
                        is_featured={wlist.is_featured}
                        is_special_offer={wlist.is_special_offer}

                      />
                    </div>
                  );
                })}
              </div>}
          </div>
        </div>
      </div>

      <div
        className="modal location-modal fade theme-modal"
        id="locationModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Choose your Delivery Location
              </h5>
              <p className="mt-1 text-content">
                Enter your address and we will specify the offer for your area.
              </p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="location-list">
                <div className="search-input">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search Your Area"
                    onChange={undefined}
                  />
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>

                <div className="disabled-box">
                  <h6>Select a Location</h6>
                </div>

                {/* <ul className="location-select custom-height">
                  <li>
                    <Link to="#">
                      <h6>Alabama</h6>
                      <span>Min: $130</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="#">
                      <h6>Arizona</h6>
                      <span>Min: $150</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="#">
                      <h6>California</h6>
                      <span>Min: $110</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="#">
                      <h6>Colorado</h6>
                      <span>Min: $140</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="#">
                      <h6>Florida</h6>
                      <span>Min: $160</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="#">
                      <h6>Georgia</h6>
                      <span>Min: $120</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="#">
                      <h6>Kansas</h6>
                      <span>Min: $170</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="#">
                      <h6>Minnesota</h6>
                      <span>Min: $120</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="#">
                      <h6>New York</h6>
                      <span>Min: $110</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="#">
                      <h6>Washington</h6>
                      <span>Min: $130</span>
                    </Link>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade theme-modal deal-modal"
        id="deal-box"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h5 className="modal-title w-100" id="deal_today">
                  Deal Today
                </h5>
                <p className="mt-1 text-content">Recommended deals for you.</p>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="deal-offer-box">
                <ul className="deal-offer-list">
                  <li className="list-1">
                    <div className="deal-offer-contain">
                      <Link to="/shop-left-sidebar.html" className="deal-image">
                        <img
                          src="../assets/images/vegetable/product/10.png"
                          className="blur-up lazyload"
                          alt=""
                        />
                      </Link>

                      <Link
                        to="/shop-left-sidebar.html"
                        className="deal-contain"
                      >
                        <h5>Blended Instant Coffee 50 g Buy 1 Get 1 Free</h5>
                        <h6>
                          $52.57 <del>57.62</del> <span>500 G</span>
                        </h6>
                      </Link>
                    </div>
                  </li>

                  <li className="list-2">
                    <div className="deal-offer-contain">
                      <Link to="/shop-left-sidebar.html" className="deal-image">
                        <img
                          src="../assets/images/vegetable/product/11.png"
                          className="blur-up lazyload"
                          alt=""
                        />
                      </Link>

                      <Link
                        to="/shop-left-sidebar.html"
                        className="deal-contain"
                      >
                        <h5>Blended Instant Coffee 50 g Buy 1 Get 1 Free</h5>
                        <h6>
                          $52.57 <del>57.62</del> <span>500 G</span>
                        </h6>
                      </Link>
                    </div>
                  </li>

                  <li className="list-3">
                    <div className="deal-offer-contain">
                      <Link to="/shop-left-sidebar.html" className="deal-image">
                        <img
                          src="../assets/images/vegetable/product/12.png"
                          className="blur-up lazyload"
                          alt=""
                        />
                      </Link>

                      <Link
                        to="/shop-left-sidebar.html"
                        className="deal-contain"
                      >
                        <h5>Blended Instant Coffee 50 g Buy 1 Get 1 Free</h5>
                        <h6>
                          $52.57 <del>57.62</del> <span>500 G</span>
                        </h6>
                      </Link>
                    </div>
                  </li>

                  <li className="list-1">
                    <div className="deal-offer-contain">
                      <Link to="/shop-left-sidebar.html" className="deal-image">
                        <img
                          src="../assets/images/vegetable/product/13.png"
                          className="blur-up lazyload"
                          alt=""
                        />
                      </Link>

                      <Link
                        to="/shop-left-sidebar.html"
                        className="deal-contain"
                      >
                        <h5>Blended Instant Coffee 50 g Buy 1 Get 1 Free</h5>
                        <h6>
                          $52.57 <del>57.62</del> <span>500 G</span>
                        </h6>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="theme-option">
        <div className="setting-box">
          <button className="btn setting-button">
            <i className="fa-solid fa-gear"></i>
          </button>

          <div className="theme-setting-2">
            <div className="theme-box">
              <ul>
                <li>
                  <div className="setting-name">
                    <h4>Color</h4>
                  </div>
                  <div className="theme-setting-button color-picker">
                    <form className="form-control">
                      <label htmlFor="colorPick" className="form-label mb-0">
                        Theme Color
                      </label>
                      <input
                        type="color"
                        className="form-control form-control-color"
                        id="colorPick"
                        value="#0da487"
                        title="Choose your color"
                        onChange={func}
                      />
                    </form>
                  </div>
                </li>

                <li>
                  <div className="setting-name">
                    <h4>Dark</h4>
                  </div>
                  <div className="theme-setting-button">
                    <button className="btn btn-2 outline" id="darkButton">
                      Dark
                    </button>
                    <button className="btn btn-2 unline" id="lightButton">
                      Light
                    </button>
                  </div>
                </li>

                <li>
                  <div className="setting-name">
                    <h4>RTL</h4>
                  </div>
                  <div className="theme-setting-button rtl">
                    <button className="btn btn-2 rtl-unline">LTR</button>
                    <button className="btn btn-2 rtl-outline">RTL</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="back-to-top">
          <Link id="back-to-top" to="#">
            <i className="fas fa-chevron-up"></i>
          </Link>
        </div>
      </div> */}
      <Footer />
    </React.Fragment>
  );
}

export default Wishlist;
