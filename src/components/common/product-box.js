import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const ProductBox = ({
  id,
  name,
  productMRF,
  productid,
  discount,
  brand,
  quantity,
  category,
  saleprice,
  wishlistt,
  wishlistid,
  clickProduct,
  AddToWishList,
  AddToCart,
  allimages,
  cart,
  is_featured,
  is_special_offer,
  avgRatings,
}) => {
  // const useridd = localStorage.getItem("userid");
  const token = localStorage.getItem("token");
  const [totalqty, settotalqty] = useState(false);
  let [count, setCount] = useState(1);
  const navigate = useNavigate();
  const func = (e) => { };

  let ratingbox = [1, 2, 3, 4, 5];
  let ratingg = Number(avgRatings);

  /* <!--Start body of product box--> */

  /*<-----Increment Functionality----> */
  function incrementCount() {
    if (quantity === count || quantity < count) {
      settotalqty(true);
    } else {
      count = count + 1;
      setCount(count);
      settotalqty(false);
    }
  }
  /*<-----Decrement Functionality----> */
  const decrementCount = () => {
    if (count > 1) {
      setCount((count) => count - 1);
    }
          settotalqty(false);

  };
  return (
    <div className="product-box-4 p-0 mt-3 product_box overflow-hidden">
      <div
        className="product-image"
      // style={{
      //   backgroundImage: `url(${
      //     allimages
      //       ? allimages
      //       : "https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
      //   })`,
      // }}
      >
        <div className="ribbon_div">
          {/* {special_offer == 0 || special_offer == "" ? null : (
            <span className="special_offer mb-1">{special_offer}%</span>
          )} */}
          {discount === 0 ||
            discount === "" ||
            discount === null ||
            discount === "0" ? null : (
            <span className="discount_ribbon mb-1">{discount}%</span>
          )}
        </div>
        <div className="ribbon_div mt-4">
          {is_featured === 0 ||
            is_featured === "" ||
            is_featured === null ||
            is_featured === "0" ? null : (
            <span className="is_featured_ribbon mb-1">{"F"}</span>
          )}
        </div>
        <div className="ribbon_div mt-5">
          {is_special_offer === 0 ||
            is_special_offer === "" ||
            is_special_offer === null ||
            is_special_offer === "0" ? null : (
            <span className="is_special_offer_ribbon mb-1">{"S"}</span>
          )}
        </div>
        <div className="label-flex">
          {window.location.pathname === "/wishlist" ? (
            <button
              className="btn p-0 wishlist btn-wishlist notifi-wishlist"
              onClick={() => AddToWishList(id, wishlistt, wishlistid)}
            >
              &times;
            </button>
          ) : (
            <button className="btn p-0 wishlist btn-wishlist notifi-wishlist">
              {wishlistt > 0 ? (
                <i
                  className="fa-regular fa-heart"
                  style={{ color: "red" }}
                  onClick={() => AddToWishList(id, wishlistt, wishlistid)}
                ></i>
              ) : (
                <i
                  className="fa-regular fa-heart"
                  style={{ color: "" }}
                  onClick={() => AddToWishList(id, wishlistt, wishlistid)}
                ></i>
              )}
            </button>
          )}
        </div>

        <a href="" onClick={() => clickProduct(productid, id)}>
          <img
            src={
              allimages
                ? allimages
                : "https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
            }
            className="mt-5 "
            alt=""
          />
        </a>
      </div>
      <div className="product-detail px-3 py-2 d-flex flex-column overflow-hidden rounded">
        {ratingg === null || ratingg === undefined || ratingg == "" || ratingg === "undefined" || ratingg === "null" ? (
          ""
        ) : (
          <ul className="rating p-0 m-0 mb-2">
            {(ratingbox || []).map((rat, i) => {
              return ratingg - rat >= 0 ? (
                <li color="#ffb321" key={i}>
                  <FaStar
                    icon="star"
                    className="feather fill"
                    fill={"#ffb321"}
                  />
                </li>
              ) : ratingg - rat < 0 && ratingg - rat > -1 ? (
                <li color="#ffb321">
                  <FaStarHalfAlt
                    icon="star"
                    className="feather"
                    fill={"#ffb321"}
                  />
                </li>
              ) : ratingg - rat <= -1 ? (
                <li color="#ffb321">
                  <FaRegStar
                    icon="star"
                    className="feather "
                    fill={"#ffb321"}
                  />
                </li>
              ) : null;
            })}
          </ul>
        )}

        <div className="m-0 mb-2" onClick={() => clickProduct(productid)}>
          <h5 className="name m-0">
            <Link to="">{name}</Link>
          </h5>
          <h5 className="name m-0">{category}</h5>

          <h5 className="name m-0">{brand}</h5>
        </div>
        {window.location.pathname === "/banners" || quantity < 1 ? (
          <p className="text-danger">Out Of Stock !</p>
        ) : (
          ""
        )}

        <h5 className="price theme-color m-0 mb-2">
          {"₹" + saleprice.toFixed(2)}{" "}
          <del className="text-muted small">{"₹" + productMRF.toFixed(2)}</del>
        </h5>

        <div className="price-qty d-flex justify-content-between m-0">
          {window.location.pathname === "/wishlist" ? (
           ""
          ) : (
            <div className="counter-number d-md-block d-none">
              <div className="counter">
                <div
                  className="qty-left-minus"
                  onClick={() => decrementCount()}
                  data-type="minus"
                  data-field=""
                >
                  <i className="fa-regular fa-minus"></i>
                </div>
                <input
                  className="form-control input-number qty-input"
                  type="text"
                  name="quantity"
                  value={count}
                  min={1}
                  onChange={func}
                />

                <div
                  className="qty-right-plus"
                  onClick={() => incrementCount()}
                  data-type="plus"
                  data-field=""
                >
                  <i className="fa-regular fa-plus"></i>
                </div>
              </div>
            </div>
          )}

          {window.location.pathname === "/wishlist" ? (
            ""
          ) : cart === null ||
            token === "null" ||
            !token ||
            token === "true" ? (
            <>
              {quantity < 0 ? (
                ""
              ) : (
                <button
                  className="buy-button buy-button-2 btn btn-cart"
                  onClick={() =>
                    AddToCart(id, saleprice, productMRF, wishlistid, count)
                  }
                >
                  <i className="fa-regular fa-cart-shopping"></i>
                </button>
              )}
            </>
          ) : cart !== null ||
            cart !== undefined ||
            cart !== "undefined" ||
            token !== "null" ||
            token !== "true" ? (
            <button
              className="btn text-light btn-warning"
              onClick={() => navigate("/cart")}
            >
              {"Buy"}
            </button>
          ) : null}
        </div>
      </div>
      {totalqty === true ? (
        <p className="mt-1 ms-2 text-danger" type="invalid">
          Cannot add more then total qty
        </p>
      ) : null}
    </div>
  );
};
/* <!--End product box section--> */

export default ProductBox;
