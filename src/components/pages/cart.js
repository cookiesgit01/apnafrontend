import React, { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import Footer from "../common/footer";
import Header from "../common/header";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Breadcumb from "../common/beadcumb";
// import { data1 } from "./data";
import "../../CSS/style.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
const Cart = () => {
  /* <!--Start all state section--> */
  const [increatecartID, setIncreamentCartID] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState("");
  const [apicall, setapicall] = useState(false);
  const [couponname, setcouponname] = useState("");
  const [cartdata, setCartData] = useState([]);
  const [coupondata, setcouponData] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [CouponDis, setCouponDis] = useState(0);
  const [Couponid, setCouponid] = useState(0);
  const [Couponmsg, setCouponmsg] = useState(false);
  const [Couponvalidmsg, setCouponvalidmsg] = useState(false);
  const [msg, setMsg] = useState(true);
  const [ProductPriceTotal, setProductPriceTotal] = useState(0);
  const [totalqty, settotalqty] = useState(false);
  // const [originalproductprice, setOriginalProductPrice] = useState(0);
  /* <!--End all state section--> */

  // var product1 = data1.product1;

  /* <!--Get token section--> */

  // const useridd = localStorage.getItem("userid");
  const token = localStorage.getItem("token");

  /* <!-- End this section--> */

  const currentdate = moment().format();

  /* <!----API Call--> */

  const incrementCount = (id, order_quantity, qty) => {
    let inc = order_quantity + 1;
    if (order_quantity !== qty) {
      axios
        .put(
          `${process.env.REACT_APP_BASEURL}/cart_update`,
          {
            cart_id: id,
            quantity: inc,
          },
          {
            headers: {
              user_token: token,
            },
          }
        )
        .then((response) => {
          // let data = response.data;
          settotalqty(true);

          CheckCoupon();
          setapicall(false);
          setIncreamentCartID(false);
        });
    } else {
      settotalqty(true);
      setIncreamentCartID(id);
    }
  };
  const decrementCount = (id, order_quantity) => {
    let dec;
    settotalqty(false);

    if (order_quantity > 1 || order_quantity !== 1) {
      dec = order_quantity - 1;
    } else {
      dec = order_quantity;
    }
    axios
      .put(
        `${process.env.REACT_APP_BASEURL}/cart_update`,
        {
          cart_id: id,
          quantity: dec,
        },
        {
          headers: {
            user_token: token,
          },
        }
      )
      .then((response) => {
        // let data = response.data;

        CheckCoupon();
        setapicall(false);
      });
  };

  // Cart Detail
  useEffect(() => {
    if (
      token === undefined ||
      token === "null" ||
      token === "" ||
      token === null
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
                user_token: `${token}`,
              },
            }
          )
          .then((response) => {
            let data = response.data;
            if (response.data.response === "cart_empty") {
              setMsg(false);
              setapicall(false);
            } else {
              let ProductTotal = 0;

              (data || []).map((cdata, i) => {
                return (
                  ProductTotal += cdata.order_quantity * Number(cdata.sale_price)
                )
              });
              setProductPriceTotal(ProductTotal);

              setCartData(data);
              setapicall(true);
            }
          });
      } catch (err) { }
    }
  }, [apicall, quantity, token]);
  // end Cart Detail

  const deleteCart = (id, user_id) => {
    axios
      .put(
        `${process.env.REACT_APP_BASEURL}/remove_product_from_cart`,
        {
          cart_id: id,
          user_id: "",
        },
        {
          headers: {
            user_token: `${token}`,
          },
        }
      )
      .then((response) => {
        // let data = response.data[0];
        CheckCoupon();
        setapicall(false);
      });
  };

  // Save For later
  const AddToWishList = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/add_product_wishlist`,
        {
          user_id: "",
          product_view_id: `${id}`,
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

  // payement
  const onProccedClick = () => {
    localStorage.setItem("coupon", CouponDis.toFixed(2));
    localStorage.setItem("couponid", Couponid);
    navigate("/checkout");
  };
  // end payment

  // coupon list
  let discountpercent;
  const func = (e) => {
    setapicall(true);
    if (e.target.value === "" || e.target.value === null) {
      setCouponmsg(true);
    } else {
      setCouponmsg(false);

      setcouponname(e.target.value);
      discountpercent = coupondata.filter(
        (item) =>
          item.code === e.target.value &&
          ProductPriceTotal >= item.minimum_amount
      );
    }
  };

  const CheckCoupon = () => {
    setapicall(true);
    discountpercent = coupondata.filter(
      (item) =>
        item.code === couponname && ProductPriceTotal >= item.minimum_amount
    );
    if (discountpercent.length !== 0) {
      let discntcoupn =
        Number(ProductPriceTotal * discountpercent[0].percentage) / 100;
      setCouponDis(discntcoupn);
      setCouponid(discountpercent[0].id);
    } else {
      setCouponDis(0);
    }
  };

  const handleClose = () => {
    setQuantity("")

    setShow(false);
  };
  // const handleShow = (e) => {
  //   setShow(true);
  // };
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/coupons_list`, {
        campaign_name: "",
        code: "",
        status: "",
      })
      .then((response) => {
        let data = response.data;
        const result = data.filter(
          (item) =>
            item.status === "active" &&
            moment(item.end_date).diff(currentdate, "day") >= 0
        );
        setcouponData(result);
      })
      .catch((error) => { });
  }, [apicall, currentdate]);
  const onCouponClick = () => {
    setapicall(true);
    setShow(true);
  };
  const OnApplyClick = () => {
    CheckCoupon();
    if (
      couponname === "" ||
      couponname === null ||
      discountpercent === "undefined" ||
      discountpercent.length === 0
    ) {
      setCouponvalidmsg(true);
      setCouponDis(0);
    } else {
      setCouponvalidmsg(false);
      setcouponname("");
      let discntcoupn =
        Number(ProductPriceTotal * discountpercent[0].percentage) / 100;
      setCouponDis(discntcoupn);
      setCouponid(discountpercent[0].id);
    }
  };
  // end coupon list

  // discount and shipping
  let ShippingCharge = 0.0;
  // end

  // copy coupon
  const onApplyButtonClick = (id) => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/coupon?coupon_id=${id}`)
      .then((response) => {
        let data = response.data[0];
        setcouponname(data.code);
        setShow(false);
      })
      .catch((error) => { });
  };
  // end copy coupon

  /*<----To go to the product details page---->*/
  const clickProduct = (productid, id) => {
    localStorage.setItem("proid", productid);
    localStorage.setItem("variantid", id);
    navigate("/product-detail");
  };
  let total_tax_with_qty = 0;
  let total_priceWithout_tax = 0;
  let qty = 0;
  return (
    <Fragment>
      <Header deleteCart={deleteCart} />
      <Breadcumb pageName={"Cart"} pageTitle={"Cart page"} pageHref={"/"} />
      {/* <!-- Cart Section Start --> */}
      <section className="cart-section section-b-space">
        <div className="container-fluid-lg p-0">
          <div className="row g-sm-5 g-3 ">
            <div className="col-xxl-9 ">
              <div className="cart-table container-fluid ">
                <div className="table-responsive-xl">
                  {msg === false ? (
                    <h2 className="text-dark text-center">
                      Add Product In Cart{" "}
                    </h2>
                  ) : (
                    <table className="table">
                      {(cartdata || []).map((cdata, i) => {
                        qty = cdata.order_quantity;

                        let countAllText =
                          Number(cdata.gst) +
                          Number(cdata.wholesale_sales_tax) +
                          Number(cdata.manufacturers_sales_tax) +
                          Number(cdata.retails_sales_tax) +
                          Number(cdata.value_added_tax);
                        let tax =
                          (Number(cdata.sale_price) * countAllText) / 100;

                        let Total_taxMultiply_qty = tax * cdata.order_quantity;
                        total_tax_with_qty += Number(Total_taxMultiply_qty);

                        let price_without_tax =
                          Number(cdata.product_price).toFixed(2) - tax;

                        let pricewithout_tax_with_qty = price_without_tax * qty;

                        total_priceWithout_tax += Number(
                          pricewithout_tax_with_qty
                        );
                        return (
                          <tbody >
                            <tr className="product-box-contain">
                              <td className="product-detail">
                                <div className="product border-0">
                                  {/* <Link
                                    to="/product-detail"
                                    className="product-image"
                                  > */}
                                  <img
                                    key={cdata.id}
                                    onClick={() => clickProduct()}
                                    src={cdata.all_images}
                                    className="img-fluid lazyload"
                                    alt=""
                                  />
                                  {/* </Link> */}
                                  <div className="product-detail">
                                    <ul>
                                      <li
                                        className="name"
                                        onClick={() => clickProduct()}
                                      >
                                        {/* <Link to="/product-detail"> */}
                                        {cdata.product_title_name}
                                        {/* </Link> */}
                                      </li>

                                      <li className="text-content">
                                        <span className="text-title">
                                          Sold By:{cdata.store_name}
                                        </span>
                                      </li>

                                      <li className="text-content">
                                        <span className="text-title">
                                          Quatity:{cdata.order_quantity}
                                        </span>
                                      </li>

                                      <li>
                                        <h5 className="text-content d-inline-block">
                                          Price:
                                        </h5>
                                        <span>{cdata.price}</span>
                                        <span className="text-content">
                                          {"₹" + cdata.mrp}
                                        </span>
                                      </li>

                                      <li>
                                        <h5 className="saving theme-color">
                                          {cdata.discount}
                                        </h5>
                                      </li>

                                      <li className="quantity-price-box">
                                        <div className="cart_qty">
                                          <div className="input-group">
                                            <button
                                              type="button"
                                              className="btn qty-left-minus"
                                              data-type="minus"
                                              data-field=""
                                            >
                                              <i className="fa-regular fa-minus"></i>
                                            </button>
                                            <input
                                              className="form-control input-number qty-input"
                                              type="text"
                                              name="quantity"
                                            />
                                            <button
                                              type="button"
                                              className="btn qty-right-plus"
                                              data-type="plus"
                                              data-field=""
                                            >
                                              <i className="fa-regular fa-plus"></i>
                                            </button>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </td>
                              <td className="price">
                                <h4 className="table-title text-content">
                                  Price
                                  <span className="theme-color mx-1">
                                    ({cdata.discount}% off)
                                  </span>
                                </h4>
                                <h5>
                                  <del className="text-content text-danger mx-2 mb-0">
                                    ₹{Number(cdata.mrp).toFixed(2)}
                                  </del>
                                  <b>
                                    {" "}
                                    ₹{Number(cdata.sale_price).toFixed(2)}{" "}
                                  </b>
                                </h5>
                                {/* <h6 className="theme-color">{cdata.discount}% off</h6> */}
                                <h6 className="theme-color">
                                  You Save:₹(
                                  {(
                                    (Number(cdata.mrp) * cdata.discount) /
                                    100
                                  ).toFixed(2)}
                                  )
                                </h6>
                              </td>
                              <td className="price">
                                <h6 className="">
                                  Gst:{Number(cdata.gst).toFixed(2)}%
                                </h6>
                                <h6 className="">
                                  Other:
                                  {Number(cdata.manufacturers_sales_tax) +
                                    Number(cdata.value_added_tax) +
                                    Number(cdata.retails_sales_tax) +
                                    Number(cdata.wholesale_sales_tax)}
                                  %
                                </h6>
                                <h6 className="">
                                  Total Tax:
                                  {(
                                    Number(cdata.gst) +
                                    Number(cdata.wholesale_sales_tax) +
                                    Number(cdata.manufacturers_sales_tax) +
                                    Number(cdata.retails_sales_tax) +
                                    Number(cdata.value_added_tax)
                                  ).toFixed(2)}
                                  %
                                </h6>
                              </td>

                              <td className="price">
                                <h4 className="table-title text-content">
                                  Price (Without Tax): ₹
                                  {price_without_tax.toFixed(2)}
                                </h4>

                                <h4 className="table-title text-content">
                                  Tax: ₹{tax.toFixed(2)}
                                </h4>
                              </td>
                              <td className="price">
                                <h4 className="table-title text-content">
                                  Sale Price: ₹
                                  {Number(cdata.sale_price).toFixed(2)}
                                </h4>
                              </td>

                              <td className="quantity">
                                <h4 className="table-title text-content">
                                  Qty
                                </h4>
                                <div className="quantity-price">
                                  <div className="cart_qty">
                                    <div className="input-group d-flex">
                                      <button
                                        type="button"
                                        className="btn qty-left-minus"
                                        data-type="minus"
                                        data-field=""
                                        onClick={() =>
                                          decrementCount(
                                            cdata.cart_id,
                                            cdata.order_quantity
                                          )
                                        }
                                      >
                                        <i className="fa-regular fa-minus"></i>
                                      </button>
                                      <input
                                        min={1}
                                        className="form-control input-number qty-input"
                                        type="number"
                                        name="quantity"
                                        value={cdata.order_quantity}
                                        onChange={func}
                                      />
                                      <button
                                        type="button"
                                        className="btn qty-right-plus"
                                        data-type="plus"
                                        data-field=""
                                        onClick={() =>
                                          incrementCount(
                                            cdata.cart_id,
                                            cdata.order_quantity,
                                            cdata.quantity
                                          )
                                        }
                                      >
                                        <i className="fa-regular fa-plus"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                {totalqty === true &&
                                  increatecartID === cdata.cart_id ? (
                                  <p
                                    className="mt-1 ms-2 text-danger"
                                    type="invalid"
                                  >
                                    Cannot add more then total qty
                                  </p>
                                ) : null}
                              </td>

                              <td className="subtotal">
                                <h4 className="table-title text-content">
                                  Total
                                </h4>
                                <h5>
                                  {(
                                    cdata.order_quantity *
                                    Number(cdata.sale_price)
                                  ).toFixed(2)}
                                </h5>
                              </td>

                              <td className="save-remove">
                                <h4 className="table-title text-content">
                                  Action
                                </h4>
                                <button
                                  className="save notifi-wishlist close_button btn px-0"
                                  onClick={() =>
                                    AddToWishList(cdata.id, cdata.user_id)
                                  }
                                >
                                  Save for later
                                </button>
                                <button
                                  type="button"
                                  className="remove close_button btn px-0"
                                  onClick={() =>
                                    deleteCart(cdata.cart_id, cdata.user_id)
                                  }
                                >
                                  remove
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </table>
                  )}
                </div>
              </div>
            </div>

            <div className="col-xxl-3">
              <div className="summery-box p-sticky">
                <div className="summery-header d-flex align-items-center justify-content-between">
                  <h3>Cart Total</h3>
                  <Button
                    className="btn-apply text-light btn-success"
                    onClick={() => onCouponClick()}
                  >
                    Add Coupon
                  </Button>
                </div>

                <div className="summery-contain">
                  <div className="coupon-cart">
                    <h6 className="text-content mb-2">Coupon Apply</h6>
                    <div className="mb-3  coupon-box input-group">
                      <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Enter Coupon Code Here..."
                        onChange={(e) => func(e)}
                        value={couponname}
                      />

                      <button
                        className="btn-apply"
                        onClick={() => OnApplyClick()}
                      >
                        Apply
                      </button>
                    </div>
                    {Couponmsg === true ? (
                      <span className="text text-danger">
                        Please Select a Coupon
                      </span>
                    ) : Couponvalidmsg === true ? (
                      <span className="text text-danger">
                        Please Select a Valid Coupon
                      </span>
                    ) : null}
                  </div>
                  <ul className="p-0">
                    <li>
                      <h4>Original Price</h4>

                      <h4 className="price">
                        ₹{total_priceWithout_tax.toFixed(2)}
                      </h4>
                    </li>
                    <li>
                      <h4>Total Tax</h4>

                      <h4 className="price">
                        ₹{total_tax_with_qty.toFixed(2)}
                      </h4>
                    </li>

                    <li>
                      <h4>Subtotal(Tax Included)</h4>

                      <h4 className="price">₹{ProductPriceTotal.toFixed(2)}</h4>
                    </li>

                    <li>
                      <h4>Coupon Discount</h4>
                      <h4 className="price">
                        (-) ₹{Number(CouponDis).toFixed(2)}
                      </h4>
                    </li>

                    <li className="align-items-start">
                      <h4>Shipping</h4>
                      <h4 className="price text-end">
                        ₹{ShippingCharge.toFixed(2)}
                      </h4>
                    </li>
                  </ul>
                </div>

                <ul className="summery-total">
                  <li className="list-total border-top-0">
                    <h4>Total (Rupees)</h4>
                    <h4 className="price theme-color">
                      ₹
                      {(
                        ProductPriceTotal -
                        Number(CouponDis) +
                        ShippingCharge
                      ).toFixed(2)}
                    </h4>
                  </li>
                </ul>

                <div className="button-group cart-button">
                  <ul className="p-0">
                    <li className="w-100">
                      <button
                        // to="/checkout"
                        className="btn btn-animation proceed-btn fw-bold w-100"
                        onClick={() => onProccedClick()}
                      >
                        Process To Checkout
                      </button>
                    </li>

                    <li>
                      <NavLink
                        to="/"
                        className="btn btn-light shopping-button text-dark w-100"
                      >
                        <i className="fa-solid fa-arrow-left-long me-3"></i>
                        Return To Shopping
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        show={show}
        onHide={() => handleClose()}
        dialogClassName="w-80"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton className="">
          <Modal.Title id="example-custom-modal-styling-title">
            Coupons
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          <ListGroup as="ol" numbered>
            {(coupondata || []).map((data, i) => {
              var diff = moment(data.end_date).diff(currentdate, "day");
              return data.status === "pending" ? null : (
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div key={i} className="ms-2 me-auto">
                    <div className="fw-bold">
                      {data.campaign_name} - ({data.code})
                    </div>
                    <span>
                      Minimum Amt:
                      <b>
                        <span className="text-success mx-1">
                          ₹{data.minimum_amount}
                        </span>
                      </b>
                    </span>
                    {ProductPriceTotal < data.minimum_amount ? (
                      <b>
                        {" "}
                        <span className="text-dark">
                          shop for{" "}
                          <span className="text-success">
                            ₹
                            {(data.minimum_amount - ProductPriceTotal).toFixed(
                              2
                            )}
                          </span>{" "}
                          more
                        </span>
                      </b>
                    ) : null}
                  </div>
                  <div>
                    <div className="d-flex">
                      <Badge bg="success" pill className="mx-2">
                        {data.percentage}%
                      </Badge>
                      <Badge
                        className="btn-apply"
                        onClick={(id) => onApplyButtonClick(data.id)}
                        bg={
                          ProductPriceTotal < data.minimum_amount
                            ? "secondary"
                            : "warning"
                        }
                        pill
                      >
                        {ProductPriceTotal < data.minimum_amount
                          ? "not applicable"
                          : "applicable"}
                      </Badge>
                    </div>
                    <div>
                      <b>
                        {" "}
                        <span className="text-danger">
                          Expire in {diff}days
                        </span>
                      </b>
                    </div>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer className=""></Modal.Footer>
      </Modal>
      {/* <!-- Cart Section End --> */}
      <Footer />
    </Fragment>
  );
};
export default Cart;
