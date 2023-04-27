import React, { Fragment } from "react";
import Logo from "../../Photos/media/1.718c1ec8.png";
import "../../CSS/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Accordion from "react-bootstrap/Accordion";
// import { CiBellOn } from "react-icons/ci";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import axios from "axios";
// import { List } from "react-feather";
const Header = (props) => {
  /* <!--Start all state section--> */
  const useridd = localStorage.getItem("userid");

  const [msg, setMsg] = useState(true);
  const [ProductPriceTotal, setProductPriceTotal] = useState(0);
  const [apicall, setapicall] = useState(false);
  const [categorydata, setCategoryData] = useState([]);
  const [pdata, setPdata] = useState([]);
  const navigate = useNavigate();
  let [searcherror, setsearcherror] = useState(false);
  const [click, setclick] = useState(false);
  const [search, setsearch] = useState([]);
  const [notification, setNotification] = useState([]);
  //  console.log(notification)
  /* <!--End all state section--> */

  /* <!--Function for all category show on top--> */

  const open_Category = () => {
    setclick(true);
    setProductPriceTotal()
  };
  /* <!--End this section--> */

  let cartup = localStorage.getItem("cartupdate");
  const token = localStorage.getItem("token");
  if (cartup === true) {
    setapicall(true);
  }

  /* <!--Show all category--Api Call--> */

  useEffect(() => {
    function getCategoryData() {
      try {
        axios
          .get(`${process.env.REACT_APP_BASEURL}/get_all_category`, {
            headers: {
              user_token: token,
              is_delete: 0,
            },
          })
          .then((response) => {
            let data = response.data;
            // if(response.data==undefined||response.data==""||response.data==null)
            // {
            setCategoryData(data);

            // }

            setapicall(false);
          });
      } catch (err) { }
    }

    getCategoryData();
  }, [apicall, token]);
  /* <!--End this section--> */

  /* <!--Function for map data and not show same data again--> */

  const result = categorydata.filter(
    (thing, index, self) =>
      index ===
      self.findIndex((t, x) => t.root_category_name === thing.root_category_name)
  );
  const level1category = categorydata.filter(
    (thing, index, self) =>
      index ===
      self.findIndex(
        (t, x) => t.down1_category_name === thing.down1_category_name
      )
  );

  const level2category = categorydata.filter(
    (thing, index, self) =>
      index ===
      self.findIndex(
        (t, x) => t.down2_category_name === thing.down2_category_name
      )
  );
  /* <!--End this section--> */

  /* <!--Function for search product--> */
  const searchProduct = (e) => {
    e.preventDefault();
    if (search.length === 0) {
      setsearcherror(true);
    } else {
      navigate(`/shop?search=${search}`);
    }
  };
  /* <!--End this section--> */

  /* <!--Get cart data--Api call--> */

  useEffect(() => {
    let key;
    if (
      token === undefined ||
      token === "true" ||
      token === "null" ||
      token === "" ||
      token === null ||
      token === true
    ) {
    } else {
      getCartData();
    }
    function getCartData() {
      try {
        axios
          .put(
            `${process.env.REACT_APP_BASEURL}/cart`,
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
            setPdata(data);
            let ProductTotal = 0;
            if (
              data.response === "cart_empty" ||
              data.response === "header error" ||
              data.error === "Please authenticate using a valid token"
            ) {
              setMsg(false);
            } else {
              // let key;
              (data || []).map((cdata, i) => {
                return (
                  key = cdata.id,
                  ProductTotal +=
                  cdata.quantity * Number(cdata.product_price) -
                  (cdata.product_price * cdata.discount) / 100 +
                  (Number(
                    cdata.product_price -
                    (cdata.product_price * cdata.discount) / 100
                  ) *
                    cdata.gst) /
                  100 +
                  (Number(
                    cdata.product_price -
                    (cdata.product_price * cdata.discount) / 100
                  ) *
                    cdata.cgst) /
                  100 +
                  (Number(
                    cdata.product_price -
                    (cdata.product_price * cdata.discount) / 100
                  ) *
                    cdata.sgst) /
                  100)
              });

              setMsg(true);
            }
          });
      } catch (err) { }
    }
  }, [cartup, props.addcart, props.deleteCart, props.getNotification, token]);
  /* <!--End this section--> */

  /* <!--Product delete from cart--Api call--> */

  const deleteCart = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_BASEURL}/remove_product_from_cart`,
        {
          cart_id: id,
          user_id: "",
        },
        {
          headers: {
            user_token: token,
          },
        }
      )
      .then((response) => {
        // let data = response.data;
        setapicall(true);
      });
  };

  /* <!--End this section--> */

  /* <!--Function for remove token on logout --> */

  const OnLogoutClick = () => {
    localStorage.clear();
  };
  /* <!--End this section--> */

  useEffect(() => {
    function getNotification() {
      try {
        axios
          .post(`${process.env.REACT_APP_BASEURL}/notification`, {
            actor_type: "user",
            actor_id: `${useridd}`,
          })
          .then((response) => {
            let data = response.data;

            setNotification(data);
            setapicall(false);
          });
      } catch (err) { }
    }
    getNotification();
  }, [apicall, useridd]);
  // console.log("iii-------------"+JSON.stringify(notification))
  /* <!--End all api call section--> */

  /* <!--End all api call section--> */

  /* <!--Start body of header section--> */
  // console.log("PDATAA"+pdata.length)

  return (
    <Fragment>
      {/* <!--Search bar section start--> */}

      <header className="header-2">
        <div className="top-nav top-header sticky-header sticky-header-3">
          <div className="container-fluid-lg">
            <div className="row">
              <div className="col-12">
                <div className="navbar-top">
                  <NavLink to="/" className="web-logo nav-logo">
                    <img src={Logo} className="img-fluid lazyload" alt="" />
                  </NavLink>

                  {/* <div className="search-full">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa-regular fa-magnifying-glass"></i>
                      </span>
                      <input
                        onChange={(e)=>{setsearch(e.target.value)}}
                        type="text"
                        className="form-control search-type"
                        placeholder="Search here.."
                        value={search}
                      />
                      <span className="input-group-text close-search">
                        <i className="fa-regular fa-magnifying-glass"></i>
                      </span>
                    </div>
                  </div> */}

                  <div className="middle-box">
                    <form onSubmit={searchProduct}>
                      <div className="center-box">
                        <div className="searchbar-box order-xl-1 d-none d-xl-block">
                          <input
                            required
                            onChange={(e) => {
                              setsearch(e.target.value);
                              setsearcherror(false);
                            }}
                            type="search"
                            className="form-control"
                            // id="formSearchInputBox"
                            name="formSearchInputBox"
                            placeholder="search for product, delivered to your door..."
                            value={search}
                            onKeyPress={(event) => {
                              if (event.key === "Enter") {
                                searchProduct(event);
                              }
                            }}
                          />
                          <button
                            className="btn search-button"
                            onClick={searchProduct}
                          >
                            <i className="fa-regular fa-magnifying-glass"></i>
                          </button>
                        </div>
                        {/* <div className="location-box-2">
                          <button
                          className="btn location-button"
                          data-bs-toggle="modal"
                          data-bs-target="#locationModal"
                          >
                          <i className="fa-regular fa-location-dot"></i>
                          <span className="locat-name">Your Location</span>
                          <i className="fa-solid fa-angle-down"></i>
                          </button>
                        </div> */}
                      </div>
                      {searcherror === true ? (
                        <small className="text-danger">
                          please fill the feild
                        </small>
                      ) : null}
                    </form>
                  </div>
                  <div className="right-nav">
                    <div className="nav-number"></div>

                    {/* <NavLink
                      to="/login"
                      className="btn theme-bg-color ms-3 fire-button"
                    > */}

                    {token === undefined ||
                      token === "true" ||
                      token === "null" ||
                      token === "" ||
                      token === null ||
                      token === true ? (
                      <Link to="/login">
                        <span>Login </span>
                      </Link>
                    ) : (
                      <Link to="/login" onClick={OnLogoutClick}>
                        <span>Login Out</span>
                      </Link>
                    )}
                    {/* </NavLink> */}
                  </div>
                  <div className="right-nav">
                    <div className="nav-number"></div>

                    <Link to="/sellersignup">
                      <span className="text-primary">Become A Seller</span>
                    </Link>

                    {/* </NavLink> */}
                  </div>
                  <div className="right-nav">
                    <div className="nav-number"></div>

                    {/* <NavLink
                      to=""
                      className="btn theme-bg-color ms-3 fire-button"
                    > */}
                    {/* <Link to=""><span>Location</span></Link>
                      <i className="fa-solid fa-angle-down"></i> */}
                    {/* </NavLink> */}
                  </div>
                  <div className="rightside-menu">
                    <div className="option-list">
                      <ul className="m-0" id="ul_o">
                        <li key={1}>
                          <Link
                            to="/"
                            className="header-icon user-icon search-icon"
                          >
                            <i className="fa-regular fa-cart-shopping icon_color"></i>
                          </Link>
                        </li>
                        <li key={2}>
                          <Link
                            to="/"
                            className="header-icon search-box search-icon"
                          >
                            <i className="fa-regular fa-magnifying-glass"></i>
                          </Link>
                        </li>
                        {/* <li className="onhover-dropdown">
                          <div
                            className="header-icon bag-icon"
                            onClick={() => navigate("/")}
                          >
                            {notification.length === 0 ||
                            notification.length === "" ||
                            notification.length===undefined||
                            notification.length === "0" ? null : (
                              <small className="badge-number">
                                {notification.length}
                              </small>
                            )}
                            <CiBellOn className="icon_color" />
                          </div>
                          {notification.map((mssg) => {
                            return (
                              <div className="onhover-div">
                                <h6>{mssg.message}</h6> 
                              </div>
                            );
                          })}
                        </li> */}
                        <li className="onhover-dropdown">
                          <Link
                            to="/wishlist"
                            className="header-icon swap-icon"
                            key={3}
                          >
                            <i className="fa-regular fa-heart icon_color"></i>
                          </Link>
                        </li>

                        {/* cart view */}
                        <li className="onhover-dropdown" key={4}>
                          <div
                            className="header-icon bag-icon"
                            onClick={() => navigate("/cart")}
                          >
                            {window.location.pathname === "/shop" ||
                              pdata.length === 0 ||
                              pdata.length === "" ||
                              pdata.length === undefined ||
                              pdata === "cart_empty" ? null : (
                              <small className="badge-number">
                                {pdata.length}
                              </small>
                            )}
                            <i className="fa-regular fa-cart-shopping icon_color"></i>
                          </div>
                          <div className="onhover-div">
                            <ul
                              className="cart-list "
                              style={{ flexDirection: "column" }}
                            >
                              {msg === false ? (
                                <h4 className="text-dark text-center">
                                  Empty cart{" "}
                                </h4>
                              ) : (
                                (pdata || []).map((data, i) => {
                                  return (
                                    <li key={i}>
                                      <div className="drop-cart ">
                                        {/* <Link to="/" className="drop-image"> */}
                                        <img
                                          src={data.all_images}
                                          className="lazyload h-50 w-50"
                                          alt=""
                                          name="image"
                                        />
                                        {/* </Link> */}

                                        <div className="drop-contain">
                                          {/* <Link to="/"> */}
                                          <h5>{data.product_title_name}</h5>
                                          {/* </Link> */}
                                          <h6>
                                            <span className="im=block">
                                              {data.quantity}x
                                            </span>{" "}
                                            <span>
                                              ₹
                                              {(
                                                Number(data.product_price) -
                                                (data.product_price *
                                                  data.discount) /
                                                100 +
                                                (Number(
                                                  data.product_price -
                                                  (data.product_price *
                                                    data.discount) /
                                                  100
                                                ) *
                                                  data.gst) /
                                                100 +
                                                (Number(
                                                  data.product_price -
                                                  (data.product_price *
                                                    data.discount) /
                                                  100
                                                ) *
                                                  data.cgst) /
                                                100 +
                                                (Number(
                                                  data.product_price -
                                                  (data.product_price *
                                                    data.discount) /
                                                  100
                                                ) *
                                                  data.sgst) /
                                                100
                                              ).toFixed(2)}
                                            </span>
                                            {/* <span>{data.sale_price}</span> */}
                                          </h6>
                                          <button
                                            className="close-button"
                                            onClick={() =>
                                              deleteCart(
                                                data.cart_id,
                                                data.user_id
                                              )
                                            }
                                          >
                                            <i className="fa-solid fa-xmark"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                  );
                                })
                              )}
                            </ul>
                            <div className="price-box">
                              <h5>Price :</h5>
                              <h4 className="theme-color fw-bold">
                                ₹{ProductPriceTotal.toFixed(2)}
                              </h4>
                            </div>
                            <div className="button-group">
                              <NavLink
                                to="/cart"
                                className="btn btn-sm cart-button"
                              >
                                View Cart
                              </NavLink>
                              <NavLink
                                to="/checkout"
                                className="btn btn-sm cart-button theme-bg-color text-white"
                              >
                                Checkout
                              </NavLink>
                            </div>
                          </div>
                        </li>
                        {/* end cart view */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* category */}
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="main-nav">
                <div className="header-nav-left">
                  <button
                    className="dropdown-category dropdown-category-2"
                    onClick={() => open_Category()}
                  >
                    <i className="fa-sharp fa-solid fa-bars pe-2 mt-1"></i>
                    <span>All Categories</span>
                  </button>

                  <div
                    className={
                      click === true
                        ? "category-dropdown"
                        : "category-dropdown d-none"
                    }
                  >
                    <div className="category-title">
                      <h5>Categories</h5>
                      <button
                        type="button"
                        className="btn p-0 close-button text-content"
                        aria-expanded={false}
                      >
                        <i
                          className="fa-solid fa-xmark"
                          onClick={() => setclick(false)}
                        ></i>
                      </button>
                    </div>
                    <Accordion>
                      {(result || []).map((catdata, i) => {
                        return (
                          <>
                            <Accordion.Item >
                              {/* <Accordion.Header onClick={(e) => {
                              setsearch(e.target.value);
                            }}>
                              
                                
                              </Accordion.Header> */}
                              <Dropdown
                                key={i}
                                as={ButtonGroup}
                                className={"category_dropdown_box"}
                              >
                                <Button
                                  variant="light"
                                  className={"category_dropdown_name"}
                                  onClick={() => {
                                    navigate(
                                      `/shop?category=` + catdata.root_id
                                    );
                                  }}
                                  value={catdata.root_id}
                                >
                                  {catdata.root_category_name}
                                </Button>

                                <Dropdown.Toggle
                                  split
                                  variant="light"
                                  id="dropdown-split-basic"
                                  drop={"end"}
                                  title={`Drop end`}
                                  className={"category_dropdown_btn"}
                                />

                                <Dropdown.Menu>
                                  <div className="onhover-category-box">
                                    {(level1category || []).map((data, i) => {
                                      return catdata.root_category_name ===
                                        data.root_category_name &&
                                        data.down1_category_name !== null ? (
                                        <div className="list-1" key={i}>
                                          <div className="category-title-box">
                                            <div value={data.down1_id}>
                                              <h5
                                                onClick={() => {
                                                  navigate(
                                                    `/shop?category=` +
                                                    catdata.down1_id
                                                  );
                                                }}
                                                value={data.down1_id}
                                                className={
                                                  "searchsub_category searchsub_category_box"
                                                }
                                              >
                                                {data.down1_category_name}
                                              </h5>
                                            </div>
                                          </div>
                                          <ul className="p-0">
                                            {(level2category || []).map(
                                              (data1, i) => {

                                                return data.down1_category_name ===
                                                  data1.down1_category_name &&
                                                  data.down2_category_name !==
                                                  null ? (
                                                  <li
                                                    key={i}
                                                    onClick={() => {
                                                      navigate(
                                                        `/shop?category=` +
                                                        catdata.down2_id
                                                      );
                                                    }}
                                                    value={data1.down2_id}
                                                    className={
                                                      "searchsub_category w-100 py-2"
                                                    }
                                                  >
                                                    {data1.down2_category_name}
                                                    <ul>
                                                      {(categorydata || []).map(
                                                        (data2, i) => {
                                                          return data1.down2_category_name ===
                                                            data2.down2_category_name &&
                                                            data.down3_category_name !==
                                                            null ? (
                                                            <li
                                                              key={i}
                                                              onClick={() => {
                                                                navigate(
                                                                  `/shop?category=` +
                                                                  catdata.down3_id
                                                                );
                                                              }}
                                                              value={
                                                                data2.down3_id
                                                              }
                                                              className={
                                                                "w-100  searchsub_category px-2 py-1"
                                                              }
                                                            >
                                                              {
                                                                data2.down3_category_name
                                                              }
                                                            </li>
                                                          ) : null;
                                                        }
                                                      )}
                                                    </ul>
                                                  </li>
                                                ) : null;
                                              }
                                            )}
                                          </ul>
                                        </div>
                                      ) : null;
                                    })}
                                  </div>
                                </Dropdown.Menu>
                              </Dropdown>
                              <Accordion.Body>
                                <div className="onhover-category-box">
                                  {(level1category || []).map((data, i) => {
                                    return catdata.root_category_name ===
                                      data.root_category_name &&
                                      data.down1_category_name !== null ? (
                                      <div className="list-1" >
                                        <div className="category-title-box">
                                          <div>
                                            <h5 key={i}>{data.down1_category_name}</h5>
                                          </div>
                                        </div>
                                        <ul className="p-0">
                                          {(level2category || []).map(
                                            (data1, i) => {
                                              return data.down1_category_name ===
                                                data1.down1_category_name &&
                                                data.down2_category_name !==
                                                null ? (
                                                <li
                                                  className="w-100"
                                                  key={i}
                                                >
                                                  {data1.down2_category_name}
                                                  <ul>
                                                    {(categorydata || []).map(
                                                      (data2, i) => {
                                                        return data1.down2_category_name ===
                                                          data2.down2_category_name &&
                                                          data.down3_category_name !==
                                                          null ? (
                                                          <li
                                                            className="w-100"
                                                            key={i}
                                                          >
                                                            {
                                                              data2.down3_category_name
                                                            }
                                                          </li>
                                                        ) : null;
                                                      }
                                                    )}
                                                  </ul>
                                                </li>
                                              ) : null;
                                            }
                                          )}
                                        </ul>
                                      </div>
                                    ) : null;
                                  })}
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          </>
                        );
                      })}
                    </Accordion>
                  </div>
                </div>

                <div className="main-nav navbar navbar-expand-xl navbar-light navbar-sticky">
                  <div
                    className="offcanvas offcanvas-collapse order-xl-2"
                    id="primaryMenu"
                  >
                    <div className="offcanvas-header navbar-shadow">
                      <h5>Menu</h5>
                      <button
                        className="btn-close lead"
                        type="button"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="offcanvas-body">
                      <ul className="navbar-nav">
                        <li className="nav-item dropdown dropdown-mega" key={1}>
                          <Link
                            className="nav-link dropdown-toggle  ps-xl-2 ps-0"
                            to="/"
                          // data-bs-toggle="dropdown"
                          >
                            Home
                          </Link>

                          {/* <div className="dropdown-menu dropdown-menu-2 dropdown-image dropdown-menu-left">
                            <div className="dropdown-column">
                              <Link to="/" className="dropdown-item">
                                <img
                                  src="../public/theme/1.jpg"
                                  className="img-fluid"
                                  alt=""
                                />
                                <span>Kartshop</span>
                              </Link>

                              <Link to="/" className="dropdown-item">
                                <img
                                  src="../public/theme/2.jpg"
                                  className="img-fluid"
                                  alt=""
                                />
                                <span>Sweetshop</span>
                              </Link>

                              <Link to="/" className="dropdown-item">
                                {" "}
                                <img
                                  src="../public/theme/3.jpg"
                                  className="img-fluid"
                                  alt=""
                                />
                                <span>Organic</span>
                              </Link>

                              <Link to="/" className="dropdown-item">
                                <img
                                  src="../public/theme/4.jpg"
                                  className="img-fluid"
                                  alt=""
                                />
                                <span>Supershop</span>
                              </Link>

                              <Link to="/" className="dropdown-item">
                                <img
                                  src="../public/theme/5.jpg"
                                  className="img-fluid"
                                  alt=""
                                />
                                <span>Slicktech</span>
                              </Link>
                            </div>
                          </div> */}
                        </li>

                        <li className="nav-item dropdown" key={2}>
                          <NavLink
                            to="/shop"
                            className="nav-link dropdown-toggle"
                          >
                            Shop
                          </NavLink>

                          {/* <ul className="dropdown-menu ps-4">
                            <li>
                              <Link to="/" className="dropdown-item">
                                Shop Category Slider
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="dropdown-item">
                                Shop Category Sidebar
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="dropdown-item">
                                Shop Banner
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="dropdown-item">
                                Shop Left Sidebar
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="dropdown-item">
                                Shop List
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="dropdown-item">
                                Shop Right Sidebar
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="dropdown-item">
                                Shop Top Filter
                              </Link>
                            </li>
                          </ul> */}
                        </li>
                        {/* 
                        <li className="nav-item dropdown">
                          <NavLink
                            to="/product-detail"
                            className="nav-link dropdown-toggle"
                          >
                            Product
                          </NavLink>

                          <ul className="dropdown-menu ps-4">
                            <li>
                              <Link to="/" className="dropdown-item">
                                Product 4 Image
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="dropdown-item">
                                Product Bottom Thumbnail
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="dropdown-item">
                                Product Left Thumbnail
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="dropdown-item">
                                Product Left
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="dropdown-item">
                                Product Right Thumbnail
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="dropdown-item">
                                Product Slider
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="dropdown-item">
                                Product Sticky
                              </Link>
                            </li>
                          </ul>
                        </li> */}

                        {/* <li className="nav-item dropdown dropdown-mega">
                          <Link
                            to="/"
                            className="nav-link dropdown-toggle icon ps-xl-2 ps-0"
                            data-bs-toggle="dropdown"
                          >
                            Mega Menu
                          </Link>

                          <div className="dropdown-menu dropdown-menu-2 row g-3">
                            <div className="dropdown-column col-xl-3">
                              <h5 className="dropdown-header">
                                Daily Vegetables
                              </h5>
                              <Link to="/" className="dropdown-item">
                                Beans & Brinjals
                              </Link>

                              <Link to="/" className="dropdown-item">
                                Broccoli & Cauliflower
                              </Link>

                              <Link to="/" className="dropdown-item">
                                Chilies, Garlic
                              </Link>

                              <Link to="/" className="dropdown-item">
                                Vegetables & Salads
                              </Link>

                              <Link to="/" className="dropdown-item">
                                Gourd, Cucumber
                              </Link>

                              <Link to="/" className="dropdown-item">
                                Herbs & Sprouts
                              </Link>

                              <Link to="/" className="dropdown-item">
                                Lettuce & Leafy
                              </Link>
                            </div>

                            <div className="dropdown-column col-xl-3">
                              <h5 className="dropdown-header">Baby Tender</h5>
                              <Link to="/" className="dropdown-item">
                                Beans & Brinjals
                              </Link>

                              <Link to="/" className="dropdown-item">
                                Broccoli & Cauliflower
                              </Link>

                              <Link to="/" className="dropdown-item">
                                Chilies, Garlic
                              </Link>

                              <Link to="/" className="dropdown-item">
                                Vegetables & Salads
                              </Link>

                              <Link to="/" className="dropdown-item">
                                Gourd, Cucumber
                              </Link>

                              <Link to="/" className="dropdown-item">
                                Potatoes & Tomatoes
                              </Link>

                              <Link to="/" className="dropdown-item">
                                Peas & Corn
                              </Link>
                            </div>

                            <div className="dropdown-column col-xl-3">
                              <h5 className="dropdown-header">
                                Exotic Vegetables
                              </h5>
                              <Link to="/" className="dropdown-item">
                                Asparagus & Artichokes
                              </Link>

                              <Link to="/" className="dropdown-item">
                                Avocados & Peppers
                              </Link>

                              <Link to="/" className="dropdown-item">
                                Broccoli & Zucchini
                              </Link>

                              <Link to="/" className="dropdown-item">
                                Celery, Fennel & Leeks
                              </Link>

                              <Link to="/" className="dropdown-item">
                                Chilies & Lime
                              </Link>
                            </div>

                            <div className="dropdown-column dropdown-column-img col-3"></div>
                          </div>
                        </li> */}

                        <li className="nav-item dropdown" key={3}>
                          <Link
                            to="/"
                            className="nav-link dropdown-toggle icon"
                            data-bs-toggle="dropdown"
                          >
                            Blog
                          </Link>
                          <ul className="dropdown-menu ps-4">
                            <li key={1}>
                              <NavLink
                                to="/blog_list"
                                className="dropdown-item"
                              >
                                Blog List
                              </NavLink>
                            </li>
                            {/* <li>
                              <NavLink
                                to="/blog_detail"
                                className="dropdown-item"
                              >
                                {" "}
                                Blog Detail
                              </NavLink>
                            </li> */}
                          </ul>
                        </li>

                        <li className="nav-item dropdown" key={4}>
                          <Link
                            to="/"
                            className="nav-link dropdown-toggle icon "
                            data-bs-toggle="dropdown"
                          >
                            Pages
                          </Link>
                          <ul className="dropdown-menu ps-4">
                            {/* <li>
                              <Link to="/" className="dropdown-item">
                                404
                              </Link>
                            </li> */}
                            <li key={1}>
                              <Link className="dropdown-item" to="/aboutus">
                                About Us
                              </Link>
                            </li>
                            <li key={2}>
                              <Link
                                className="dropdown-item"
                                to={
                                  token === undefined ||
                                    token === "true" ||
                                    token === "null" ||
                                    token === "" ||
                                    token === null ||
                                    token === true
                                    ? "/login"
                                    : "/cart"
                                }
                              >
                                Cart
                              </Link>
                            </li>
                            <li key={3}>
                              <Link
                                to={
                                  token === undefined ||
                                    token === "true" ||
                                    token === "null" ||
                                    token === "" ||
                                    token === null ||
                                    token === true
                                    ? "/login"
                                    : "/your_account"
                                }
                                className="dropdown-item"
                              >
                                Your Account
                              </Link>
                            </li>
                            {/* <li>
                              <Link to=
                              {useridd === undefined ||
                                useridd === "null" ||
                                useridd === "" ||
                                useridd === null ? "/login":
                              "/your_orders" }className="dropdown-item">
                                Your Order
                              </Link>
                            </li> */}
                            <li key={4}>
                              <Link
                                className="dropdown-item"
                                to={
                                  token === undefined ||
                                    token === "true" ||
                                    token === "null" ||
                                    token === "" ||
                                    token === null ||
                                    token === true
                                    ? "/login"
                                    : "/checkout"
                                }
                              >
                                Checkout
                              </Link>
                            </li>
                            {/* <li>
                              <Link to="/" className="dropdown-item">
                                Coming Soon
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="dropdown-item">
                                Compare
                              </Link>
                            </li> */}
                            {/* <li>
                              <Link className="dropdown-item" to="/faq">
                                Faq
                              </Link>
                            </li> */}
                            {/* <li>
                              <Link to="/" className="dropdown-item">
                                Order Success
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="dropdown-item">
                                Order Tracking
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/otp_verification"
                                className="dropdown-item"
                              >
                                OTP
                              </Link>
                            </li>
                            <li>
                              <Link to="/" className="dropdown-item">
                                Search
                              </Link>
                            </li> */}
                            <li key={5}>
                              <Link to="/" className="dropdown-item">
                                User Dashboard
                              </Link>
                            </li>
                            <li key={6}>
                              <Link
                                to={
                                  token === undefined ||
                                    token === "true" ||
                                    token === "null" ||
                                    token === "" ||
                                    token === null ||
                                    token === true
                                    ? "/login"
                                    : "/wishlist"
                                }
                                className="dropdown-item"
                              >
                                Wishlist
                              </Link>
                            </li>
                          </ul>
                        </li>

                        <li className="nav-item" key={5}>
                          <Link className="nav-link nav-link-2" to="/contactus">
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="right-nav">
                  <div className="nav-number">
                    {/* <img
                      src="../public/icon/music.png"
                      className="img-fluid lazyload"
                      alt=""
                    /> */}
                    <span>(123) 456 7890</span>
                  </div>
                  {/* <a
                    href="#"
                    className="btn theme-bg-color ms-3 fire-button"
                    data-bs-toggle="modal"
                    data-bs-target="#deal-box"
                  >
                    <div className="fire">
                                            <img src="../public/icon/hot-sale.png" className="img-fluid" />
                                        </div> 
                    <span>Hot Deals</span>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end category */}
      </header>

      {/* <!--End search bar section start--> */}

      <div className="mobile-menu d-md-none d-block mobile-cart">
        <ul className="p-0">
          <li className="mobile-category" onClick={open_Category} key={1}>
            <Link to="">
              <BiCategory />
              <span>Category</span>
            </Link>
          </li>
          <li className="active" key={2}>
            <Link to="/">
              <AiOutlineHome className="" />
              <span>Home</span>
            </Link>
          </li>
          <li key={3}>
            <Link to="" className="search-box">
              <AiOutlineSearch />
              <span>Search</span>
            </Link>
          </li>

          <li key={4}>
            <Link to="/wishlist" className="notifi-wishlist">
              <AiOutlineHeart />
              <span>My Wish</span>
            </Link>
          </li>

          <li key={5}>
            <Link to="/cart">
              <AiOutlineShoppingCart />
              <span>Cart</span>
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};


export default Header;
