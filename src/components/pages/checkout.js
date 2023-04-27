import React, { Fragment, useEffect, useState } from "react";
import Footer from "../common/footer";
import Header from "../common/header";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Breadcumb from "../common/beadcumb";
// import { data2 } from "./data";
import Accordion from "react-bootstrap/Accordion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import SweetAlert from "sweetalert-react";
// import "sweetalert/dist/sweetalert.css";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const Checkout = (props) => {
  let total_tax_with_qty = 0;
  let total_priceWithout_tax = 0;
  const [increatecartID, setIncreamentCartID] = useState(false);

  const [ProductAlert, setProductAlert] = useState(false);
  const [originalproductprice, setOriginalProductPrice] = useState(0);
  // const[pAlert,setPalert]=useState(false);
  const navigate = useNavigate();
  // var product1 = data1.product1;
  // const useridd = localStorage.getItem("userid");

  const [currentTab, setCurrentTab] = useState(0);
  let currentdate = moment().format();
  const [apicall, setapicall] = useState(false);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [udata, setUdata] = useState([]);

  // const [navtab, setnavtab] = useState(false);
  const [cartdata, setCartData] = useState([]);
  // const [quantity, setQuantity] = useState([]);
  const [DeliveryMethod, setDeliveryMethod] = useState("");
  const [userdata, setuserdata] = useState([]);
  // const [DeliveyTab, setDeliveyTab] = useState("");
  const [ordervalidation, setordervalidation] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [totalqty, settotalqty] = useState(false);
  const [validation, setValidation] = useState(false);
  const [ProductPriceTotal, setProductPriceTotal] = useState(0);
  const [SalePricee, setSalePricee] = useState(0);
  console.log(SalePricee)
  const [TotalTax, setTotalTax] = useState(0);
  const [orderadd, setorderadd] = useState({
    status: "placed",
    total_quantity: "",
    ref_no: "12345678",
    shipping_charges: "0",
    payment_mode: "",
    delivery_date: "2022-12-15",
    invoice_date: currentdate,
    order_date: currentdate,
    total_amount: "",
    total_gst: "",
    total_cgst: "",
    total_sgst: "",
    taxable_value: "",
    discount_coupon: "0",
    vendor_id: "",
    order_product: [],
  });
  const handleClose = () => {
    setShow(false);
    setapicall(true);
  };
  const handleShow = () => {
    setValidated(false);
    setShow(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let form = event.currentTarget;
    // const name = event.target.value;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      // eslint-disable-next-line no-undef
      axios
        .post(`${process.env.REACT_APP_BASEURL}/user_register`, udata, {
          headers: {
            user_token: token,
          },
        })
        .then((response) => {
          if (response.data.message === "updated user profile") {
            setShow(false);
            setapicall(true);
            setValidated(false);
            localStorage.setItem("first_name", udata.first_name);
          }
        })
        .catch((error) => { });
    }
  };
  const OnchangeFistname = (e, first_name) => {
    setUdata({
      ...udata,
      [e.target.name]: e.target.value,
    });
  };
  // AHH ADDRESS MODAL FUNCTION AND API
  // const [show, setShow] = useState(false);
  // const handleClose = () => {
  //   setShow(false);
  //   setapicall(true);
  // };
  // const handleShow = () => {
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_BASEURL}/user_details`,
  //       { user_id: "" },
  //       {
  //         headers: {
  //           user_token: token,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       let data = response.data[0];
  //       setuserdata(data);
  //       setUdata(data);
  //       setapicall(false);
  //     })
  //     .catch((error) => {});
  //   setValidated(false);
  //   setShow(true);
  // };

  // ADD ADDRESS MODAL AND API END
  // discount and shipping
  let ShippingCharge = 0.0;
  let CouponDis = localStorage.getItem("coupon");
  let CouponId = localStorage.getItem("couponid");
  // end discount and shipping
  const token = localStorage.getItem("token");
  // var address = data2.address;
  const func = (e) => {
    setDeliveryMethod(e.target.value);
    setordervalidation(false);
  };
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
          setapicall(true);
          settotalqty(false);
          setIncreamentCartID(false);

        });
    } else {
      settotalqty(true);
      setIncreamentCartID(id)
    }
  };

  const decrementCount = (id, order_quantity) => {
    let dec;
    if (order_quantity > 1 || order_quantity !== 1) {
      dec = order_quantity - 1;
    } else {
      dec = order_quantity;
    }
    settotalqty(false);

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
        setapicall(true);
        // let data = response.data;
        // setQuantity((quantity = quantity - 1));
      });
  };
  // single order add
  useEffect(() => {
    setorderadd((orderadd) => {
      return { ...orderadd, order_product: cartdata };
    });
  }, [apicall, cartdata]);
  // end single order add

  // add and remove
  useEffect(() => {
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
          // let TotalTaxableValue = 0;

          let data = response.data;
          if (response.data.response === "cart_empty") {
            setValidation(false);
          } else {
            let ProductTotal = 0;

            let Totalcgst = 0;
            let Totalsgst = 0;

            let Saleprice = 0;

            (data || []).map((cdata, i) => {

              let countAllText =
                Number(cdata.gst) +
                Number(cdata.wholesale_sales_tax) +
                Number(cdata.manufacturers_sales_tax) +
                Number(cdata.retails_sales_tax) +
                Number(cdata.value_added_tax);

              let tax = (Number(cdata.sale_price) * countAllText) / 100;

              let qty = cdata.order_quantity;

              let price_without_tax =
                Number(cdata.product_price).toFixed(2) - tax;

              let pricewithout_tax_with_qty = price_without_tax * qty;

              total_priceWithout_tax += Number(pricewithout_tax_with_qty);

              let Total_taxMultiply_qty = tax * qty;

              total_tax_with_qty += Number(Total_taxMultiply_qty);

              // original price without tax
              // originalProductPrice +=
              //   cdata.product_price * cdata.order_quantity;

              // end original price
              // totalprice
              ProductTotal += cdata.order_quantity * Number(cdata.sale_price);
              // end totalprice
              if (cdata.gst === null) {
                cdata.gst = "0";
              }

              // gst
              // Totalgst = total_tax_with_qty;
              // end gst
              // cgst
              // Totalcgst = total_tax_with_qty / 2;
              // // end cgst

              // // sgst
              // Totalsgst = total_tax_with_qty / 2;
              // // end sgst
              // console.log(
              //   "total sgst=" + Totalsgst + " total cgst=" + Totalcgst
              // );
              // totaltax

              // end totaltax

              // totaltaxable value
              let TotalTaxableValue = 0;
              TotalTaxableValue += cdata.sale_price;
              // end totaltaxable value

              // saleprice
              Saleprice = Number(cdata.sale_price).toFixed(2);
              // end saleprice
            });

            Totalcgst = total_tax_with_qty / 2;
            // end cgst

            // sgst
            Totalsgst = total_tax_with_qty / 2;
            // end sgst
            // console.log("total sgst=" + Totalsgst + " total cgst=" + Totalcgst);
            setorderadd({
              ...orderadd,
              total_amount: ProductTotal - CouponDis + ShippingCharge,
              total_gst: total_tax_with_qty,
              total_cgst: Totalcgst,
              total_sgst: Totalsgst,
              taxable_value: total_priceWithout_tax,
              discount_coupon_value: CouponDis,
              discount_coupon: CouponId,
              vendor_id: data[0].vendor_id,
              payment_mode: DeliveryMethod,
              order_product: cartdata,
            });
            setOriginalProductPrice(total_priceWithout_tax);
            setSalePricee(Saleprice);
            setProductPriceTotal(ProductTotal);
            setTotalTax(total_tax_with_qty);
            setCartData(data);
            setapicall(false);
            setValidation(true);
          }
        });
    } catch (err) { }
  }, [apicall, DeliveryMethod]);
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
            user_token: token,
          },
        }
      )
      .then((response) => {
        // let data = response.data[0];
        setapicall(true);
      });
  };
  // end add remove cart
  // Save For later
  const SaveForLater = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/add_product_wishlist`,
        {
          user_id: "",
          product_view_id: `${id}`,
        },
        {
          headers: {
            user_token: token,
          },
        }
      )
      .then((response) => {
        // let data = response.data;
        // setData(response.data);
        setapicall(true);
      });
  };
  //   End save For Later

  // delivery address
  const DeliveryClick = () => {
    setCurrentTab((prev) => prev + 1);
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/user_details`,
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
        let data = response.data[0];
        setuserdata(data);
        setapicall(true)
        setUdata(data);
        //       setCurrentTab(data)
        // console.log("oooo----------"+JSON.stringify(data))

        // navigate('/your_account')
        // return response;
      })
      .catch((error) => { });
  };

  // end delivery address


  // payment
  const returnButton = () => {
    setCurrentTab((prev) => prev - 1);
    setordervalidation(false);
  };
  const getPaymentData = () => {

    if (
      userdata.address === "" ||
      userdata.address2 === "" ||
      userdata.address === null ||
      userdata.address2 === null ||
      userdata.address === undefined ||
      userdata.address2 === undefined
    ) {
      setordervalidation(true);
      setShow(true)
      setapicall(true);


    } else {
      setShow(false)
      setordervalidation(false)

      setCurrentTab((prev) => prev + 1);
      setapicall(true);
      setorderadd({
        ...orderadd,
        total_quantity: cartdata.length,
        delivery_date: "2023-01-15",
        invoice_date: currentdate,
        order_date: currentdate,
      });


    }
  };
  // end payment
  const onOrderAdd = () => {
    if (DeliveryMethod === "") {
      setordervalidation("deliverymethod");
    } else {
      setSpinner("spinner");
      axios
        .post(`${process.env.REACT_APP_BASEURL}/orders`, orderadd, {
          headers: {
            user_token: token,
          },
        })
        .then((response) => {
          if (response.data.order === "order_count_0") {
            setProductAlert(true);
          } else if (response.data.message === "Send mail Succesfully") {
            setSpinner(false);
            setordervalidation("");

            localStorage.setItem("orderid", response.data.order_id);
            // localStorage.setItem("vendorid", response.data.vendor_id);

            setProductAlert(false);

            navigate("/your_orders");
          }

          // else
          // {
          //   alert("hellloooooooo")
          //   navigate("/your_orders");
          //   // console.log("huuuuuuuuu-----"+ProductAlert)
          // }

          // return response;
        })
        .catch((error) => { });
      setProductAlert(false);
    }
  };
  // end order add

  // sweetalert
  const closeProductAlert = (e) => {
    setProductAlert(false);
    setSpinner(false);
  };

  // end sweetalert

  var total = 0;
  var sub_total = 0;
  var total_tax = 0;
  let qty = 0;

  console.log(total, sub_total, total_tax, qty)
  return (
    <Fragment>
      <Header />
      <Breadcumb pageName={"Cart"} pageTitle={"Cart page"} pageHref={"/"} />
      {/* <!-- Checkout section Start --> */}
      <section className="checkout-section section-b-space">
        <div className="container-fluid-lg">
          <div className="row g-sm-4 g-3 checkout-section">
            <Tab.Container activeKey={currentTab} id="controlled-tab-example">
              <Row>
                <div className="col-xxl-3 col-lg-4">
                  <Nav className="flex-column custom-navtab">
                    <div className="row my-md-0 my-4 mx-0">
                      <div className="col-6 col-md-12 my-2">
                        <Nav.Item>
                          <Nav.Link
                            eventKey={0}
                            disabled={currentTab !== 0}
                            to=""
                          >
                            <li className="nav-link" role="presentation">
                              <div
                                className="nav-item"
                                id="shopping-cart"
                                data-bs-toggle="tab"
                                data-bs-target="#s-cart"
                                role="tab"
                              >
                                <div className="nav-item-box">
                                  <div>
                                    <span>STEP 1</span>
                                    <h4>Shopping Cart</h4>
                                  </div>
                                  <lord-icon
                                    target=".nav-item"
                                    src="https://cdn.lordicon.com/ggihhudh.json"
                                    trigger="loop-on-hover"
                                    colors="primary:#121331,secondary:#646e78,tertiary:#0baf9a"
                                    className="lord-icon"
                                  ></lord-icon>
                                </div>
                              </div>
                            </li>
                          </Nav.Link>
                        </Nav.Item>
                      </div>

                      <div className="col-6 col-md-12 my-2">
                        <Nav.Item>
                          <Nav.Link
                            eventKey={1}
                            disabled={currentTab !== 1}
                            to=""
                          >
                            <li className="nav-link" role="presentation">
                              <div
                                onClick={() => DeliveryClick()}
                                className="nav-item"
                                id="delivery-address"
                                data-bs-toggle="tab"
                                data-bs-target="#d-address"
                                role="tab"
                              >
                                <div className="nav-item-box">
                                  <div>
                                    <span>STEP 2</span>
                                    <h4>Delivery Address</h4>
                                  </div>
                                  <lord-icon
                                    target=".nav-item"
                                    src="https://cdn.lordicon.com/oaflahpk.json"
                                    trigger="loop-on-hover"
                                    colors="primary:#0baf9a"
                                    className="lord-icon"
                                  ></lord-icon>
                                </div>
                              </div>
                            </li>
                          </Nav.Link>
                        </Nav.Item>
                      </div>

                      <div className="col-6 col-md-12 my-2">
                        <Nav.Item>
                          <Nav.Link
                            eventKey={2}
                            disabled={currentTab !== 2}
                            to=""
                          >
                            <li className="nav-link" role="presentation">
                              <div
                                className="nav-item"
                                id="payment-option"
                                data-bs-toggle="tab"
                                data-bs-target="#p-options"
                                role="tab"
                                onClick={() => getPaymentData()}
                              >
                                <div className="nav-item-box">
                                  <div>
                                    <span>STEP 3</span>
                                    <h4>Payment Options</h4>
                                  </div>
                                  <lord-icon
                                    target=".nav-item"
                                    src="https://cdn.lordicon.com/qmcsqnle.json"
                                    trigger="loop-on-hover"
                                    colors="primary:#0baf9a,secondary:#0baf9a"
                                    className="lord-icon"
                                  ></lord-icon>
                                </div>
                              </div>
                            </li>
                          </Nav.Link>
                        </Nav.Item>
                      </div>
                    </div>
                  </Nav>
                </div>
                {/* Tabssss */}
                <div className="col-xxl-9 col-lg-8">
                  <Tab.Content>
                    {/* Shopping Cart */}
                    <Tab.Pane eventKey="0">
                      <h2 className="tab-title">Shopping Cart</h2>
                      <div className="cart-table p-0">
                        <div className="table-responsive">
                          <table className="table">
                            {validation === false ? (
                              <h4 className="text-center">
                                Add Poduct In Shopping Cart
                              </h4>
                            ) : cartdata ? (
                              (cartdata || []).map((cdata, i) => {
                                let countAllText =
                                  Number(cdata.gst) +
                                  Number(cdata.wholesale_sales_tax) +
                                  Number(cdata.manufacturers_sales_tax) +
                                  Number(cdata.retails_sales_tax) +
                                  Number(cdata.value_added_tax);
                                qty = cdata.order_quantity;

                                let tax =
                                  (Number(cdata.sale_price) * countAllText) /
                                  100;

                                let price_without_tax =
                                  Number(cdata.product_price).toFixed(2) - tax;

                                return (
                                  <tbody >
                                    <tr key={cdata.id} className="product-box-contain">
                                      <td className="product-detail">
                                        <div className="product border-0">
                                          <Link
                                            to="/"
                                            className="product-image"
                                          >
                                            <img
                                              src={cdata.all_images}
                                              className="img-fluid lazyload"
                                              alt={cdata.product_title_name}
                                            />
                                          </Link>
                                          <div className="product-detail">
                                            <ul>
                                              <li className="name">
                                                <Link to="/">
                                                  {cdata.product_title_name}
                                                </Link>
                                              </li>

                                              <li className="text-content">
                                                <span className="text-title">
                                                  Sold By:{cdata.store_name}
                                                </span>
                                              </li>

                                              <li className="text-content">
                                                <span className="text-title">
                                                  Quatity:
                                                  {cdata.order_quantity}
                                                </span>
                                              </li>

                                              <li>
                                                <h5 className="text-content d-inline-block">
                                                  Price:
                                                </h5>
                                                <span>
                                                  {cdata.product_price}
                                                </span>
                                                <span className="text-content">
                                                  {"₹" + cdata.mrp}
                                                </span>
                                              </li>

                                              <li>
                                                <h5 className="saving theme-color">
                                                  ₹{cdata.discount}
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
                                                      value={1}
                                                    // onChange={func}
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
                                          Price ₹
                                          <b>
                                            {Number(cdata.sale_price).toFixed(
                                              2
                                            )}{" "}
                                          </b>
                                        </h4>
                                        <h5>
                                          <span
                                            className={
                                              cdata.discount === "0"
                                                ? "text-content text-danger mx-2 mb-0"
                                                : "text-content text-danger mx-2 mb-0 text-decoration-line-through"
                                            }
                                          >
                                            ₹{Number(cdata.mrp).toFixed(2)}
                                          </span>
                                          <b>
                                            <span className="theme-color mx-1">
                                              {cdata.discount === "0"
                                                ? null
                                                : "(" +
                                                cdata.discount +
                                                "% off)"}
                                            </span>{" "}
                                          </b>
                                        </h5>
                                        <h6 className="theme-color">
                                          You Save:₹(
                                          {(
                                            (Number(cdata.mrp) *
                                              cdata.discount) /
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
                                          {Number(
                                            cdata.manufacturers_sales_tax
                                          ) +
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
                                            Number(
                                              cdata.manufacturers_sales_tax
                                            ) +
                                            Number(cdata.retails_sales_tax) +
                                            Number(cdata.value_added_tax)
                                          ).toFixed(2)}
                                          %
                                        </h6>
                                      </td>

                                      <td className="price">
                                        <h4 className="table-title text-content">
                                          Price (without tax): ₹
                                          {price_without_tax.toFixed(2)}
                                        </h4>
                                        {cdata.sgst === null
                                          ? (cdata.sgst = "0")
                                          : cdata.sgst === cdata.sgst}
                                        {cdata.cgst === null
                                          ? (cdata.cgst = "0")
                                          : cdata.cgst === cdata.cgst}

                                        <h4 className="table-title text-content">
                                          Tax: ₹
                                          {(
                                            (Number(cdata.sale_price) *
                                              (Number(cdata.gst) +
                                                Number(
                                                  cdata.wholesale_sales_tax
                                                ) +
                                                Number(
                                                  cdata.manufacturers_sales_tax
                                                ) +
                                                Number(
                                                  cdata.retails_sales_tax
                                                ) +
                                                Number(
                                                  cdata.value_added_tax
                                                ))) /
                                            100
                                          ).toFixed(2)}
                                        </h4>
                                      </td>
                                      {/* <td className="price">
                                        <h4 className="table-title text-content">
                                          Sale Price: ₹
                                          {Number(cdata.sale_price).toFixed(2)}
                                        </h4>
                                      </td> */}

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
                                                className="form-control input-number qty-input mx-2"
                                                type="text"
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
                                        {totalqty === true && increatecartID === cdata.cart_id ? (
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
                                            SaveForLater(
                                              cdata.id,
                                              cdata.user_id
                                            )
                                          }
                                        >
                                          Save for later
                                        </button>
                                        <button
                                          type="button"
                                          className="remove close_button btn"
                                          onClick={() =>
                                            deleteCart(
                                              cdata.cart_id,
                                              cdata.user_id
                                            )
                                          }
                                        >
                                          remove
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                );
                              })
                            ) : null}
                          </table>
                        </div>
                      </div>

                      <div className="button-group">
                        <ul className="button-group-list">
                          <li>
                            <Link to="/">
                              <button
                                className="btn btn-light shopping-button text-dark"
                                onClick={() => DeliveryClick()}
                              >
                                <i className="fa-solid fa-arrow-left-long me-3"></i>
                                Continue Shopping
                              </button>
                            </Link>
                          </li>

                          <li>
                            {validation === false ? (
                              <button
                                className="btn btn-animation proceed-btn"
                                disabled
                              >
                                {" "}
                                Continue Delivery Address
                              </button>
                            ) : (
                              <button
                                className="btn btn-animation proceed-btn"
                                disabled={currentTab === 2}
                                onClick={() => DeliveryClick()}
                              >
                                Continue Delivery Address
                              </button>
                            )}

                            {/* <button eventKey={"second"}
                              className="btn btn-animation proceed-btn"
                              onClick={() => {
                                setDeliveyTab("second");
                              }}
                            >
                              Continue Delivery Address
                            </button> */}
                          </li>
                        </ul>
                      </div>
                    </Tab.Pane>

                    {/* End Shopping Cart */}

                    {/* Delivery Address*/}
                    <Tab.Pane eventKey={"1"}>
                      <div className="d-flex align-items-center mb-3">
                        <h2 className="tab-title mb-0">Delivery Address</h2>
                        {/* <button
                          className="btn btn-animation btn-sm fw-bold ms-auto"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#add-address"
                        >
                          <i className="fa-solid fa-plus d-block d-sm-none m-0"></i>
                          <span className="d-none d-sm-block">+ Add New</span>
                        </button> */}
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="">
                            <div className="delivery-address-box">
                              <div>
                                {/* <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="jack"
                                    id="flexRadioDefault1"
                                  />
                                </div> */}

                                <div className="label">
                                  <label>Home</label>
                                </div>
                                <ul

                                  className="delivery-address-detail"
                                >
                                  <li key={userdata.id}>
                                    <h4 className="fw-500">
                                      {userdata.first_name} {userdata.last_name}
                                    </h4>
                                  </li>
                                  <li>
                                    <p className="text-content">
                                      <span className="text-title text-break">
                                        Address:{udata.address}
                                      </span>
                                    </p>
                                  </li>
                                  {/* <li>
                                        <h6 className="text-content">
                                          <span className="text-title">
                                            Pin Code :{address.pincode}
                                          </span>
                                        </h6>
                                      </li> */}
                                  <li>
                                    <h6 className="text-content mb-0">
                                      <span className="text-title">
                                        Phone :{userdata.phone_no}
                                      </span>
                                    </h6>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div key={userdata.id} className="">
                            <div className="delivery-address-box">
                              <div>
                                {/* <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="jack"
                                    id="flexRadioDefault1"
                                  />
                                </div> */}

                                <div className="label">
                                  <label>Office</label>
                                </div>
                                <ul

                                  className="delivery-address-detail"
                                >
                                  <li key={userdata.id}>
                                    <h4 className="fw-500">
                                      {userdata.first_name} {userdata.last_name}
                                    </h4>
                                  </li>
                                  <li>
                                    <p className="text-content">
                                      <span className="text-title text-break">
                                        Address:{udata.address2}
                                      </span>
                                    </p>
                                  </li>
                                  {/* <li>
                                        <h6 className="text-content">
                                          <span className="text-title">
                                            Pin Code :{address.pincode}
                                          </span>
                                        </h6>
                                      </li> */}
                                  <li>
                                    <h6 className="text-content mb-0">
                                      <span className="text-title">
                                        Phone :{userdata.phone_no}
                                      </span>
                                    </h6>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Modal size="lg" show={show} onHide={handleClose}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                          <Modal.Header closeButton>
                            <Modal.Title>Edit Profile</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="row p-md-3 m-0">
                              <div className="col-6">
                                <Form.Group
                                  className="mb-3 aos_input"
                                  controlId="validationCustom01"
                                >
                                  <Form.Label>First Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    value={udata.first_name}
                                    name={"first_name"}
                                    onChange={OnchangeFistname}
                                    required
                                    maxLength={15}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {" "}
                                    Please Enter Your First Name
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </div>
                              <div className="col-6">
                                <Form.Group
                                  className="mb-3 aos_input"
                                  controlId="validationCustom01"
                                >
                                  <Form.Label>Last Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    value={udata.last_name}
                                    name={"last_name"}
                                    onChange={OnchangeFistname}
                                    required
                                    maxLength={15}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {" "}
                                    Please Enter Your Last Name
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </div>
                              <div className="col-md-6">
                                <Form.Group
                                  className="mb-3 aos_input"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>Email Address</Form.Label>
                                  <Form.Control
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                    value={udata.email}
                                    name={"email"}
                                  // onChange={OnchangeFistname}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    Please Enter valid Email
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </div>

                              <div className="col-md-6">
                                <Form.Group
                                  className="mb-3 aos_input"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>Mobile</Form.Label>
                                  <Form.Control
                                    type="tel"
                                    placeholder="Mobile"
                                    value={udata.phone_no}
                                    name={"phone_no"}
                                    onChange={OnchangeFistname}
                                    required
                                    maxLength={10}
                                    minLength={10}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {" "}
                                    Please Enter Your Phone Number
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </div>

                              <div className="col-12">
                                <Form.Group
                                  className="mb-3 aos_input"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>Add Address</Form.Label>
                                  <Form.Control
                                    type="location"
                                    placeholder="Add Address"
                                    value={udata.address}
                                    name={"address"}
                                    onChange={OnchangeFistname}
                                    maxLength="100"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {" "}
                                    Please Enter Address
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </div>
                              <div className="col-12">
                                <Form.Group
                                  className="mb-3 aos_input"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>Add Address2</Form.Label>
                                  <Form.Control
                                    type="location"
                                    placeholder="Add Address2"
                                    value={udata.address2}
                                    name={"address2"}
                                    onChange={OnchangeFistname}
                                    maxLength="100"
                                  />
                                </Form.Group>
                              </div>

                              <div className="col-4">
                                <Form.Label className="inputlabelheading" column sm="12">
                                  Gender
                                </Form.Label>
                                <Form.Select
                                  aria-label="Product Type"
                                  className="adminselectbox"
                                  required
                                  value={udata.gender}
                                  name={"gender"}
                                  onChange={OnchangeFistname}
                                >
                                  <option value={""} onChange={func}>
                                    Gender
                                  </option>
                                  <option value="Male" onChange={func}>
                                    Male
                                  </option>
                                  <option value="Female" onChange={func}>
                                    Female
                                  </option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" className="h6">
                                  Please select gender
                                </Form.Control.Feedback>
                              </div>
                              <div className="col-4">
                                <Form.Group className="mx-3" controlId="validationCustom11">
                                  <Form.Label className="inputlabelheading" column sm="12">
                                    Date of Birth
                                  </Form.Label>
                                  <Col sm="12">
                                    <Form.Control
                                      max={currentdate}
                                      name={"date_of_birth"}
                                      type={"date"}
                                      value={udata.date_of_birth}
                                      onChange={OnchangeFistname}
                                      required
                                      placeholder="Product Quantity"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Please choose date of birth
                                    </Form.Control.Feedback>
                                  </Col>
                                </Form.Group>
                              </div>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <button
                              type="button"
                              className="button main_outline_button btn btn-animation "
                              onClick={handleClose}
                            >
                              Cancel
                            </button>
                            <button
                              className="button main_button btn theme-bg-color ms-3 fire-button"
                              // onClick={handleSubmit}
                              type="submit"
                            >
                              Update
                            </button>
                          </Modal.Footer>
                        </Form>
                      </Modal>

                      <div className="button-group">
                        <ul className="button-group-list">
                          <li>
                            <button
                              className="btn btn-light shopping-button backward-btn text-dark"
                              disabled={currentTab === 0}
                              onClick={() => returnButton()}
                            >
                              <i className="fa-solid fa-arrow-left-long ms-0"></i>
                              Return To Shopping Cart
                            </button>
                          </li>

                          <li>
                            {udata.address === "" && udata.address2 === "" ? <div className="text-center my-4 text-danger">
                              <h3>
                                {"Please Add Address To Place An Order"}
                              </h3>
                              <button
                                className="btn btn-success"
                                onClick={handleShow}
                              >
                                Your Account
                              </button>
                            </div> : <button
                              className="btn btn-animation proceed-btn"
                              disabled={currentTab === 3}

                              onClick={() => getPaymentData()}
                            >
                              Continue Payment Option
                            </button>}
                            {/* {show === true ? (
                              <div className="text-center my-4 text-danger">
                                <h3>
                                  {"Please Add Address To Place An Order"}
                                </h3>
                                <button
                                  className="btn btn-animation proceed-btn"
                                  onClick={() => navigate("/your_account")}
                                >
                                  Your Account
                                </button>
                              </div>
                            ) : (
                              <button
                                className="btn btn-animation proceed-btn"
                                disabled={currentTab === 3}
                                
                                onClick={() => getPaymentData()}
                              >
                                Continue Payment Option
                              </button>
                            )} */}
                          </li>
                        </ul>
                      </div>
                    </Tab.Pane>
                    {/* End Delivery Address*/}

                    {/* Delivery Option*/}
                    {/* <Tab.Pane eventKey="third">
                      <h2 className="tab-title">Delivery Option</h2>
                      <div className="row g-4">
                        <div className="col-12">
                          <div className="delivery-option">
                            <div className="row g-4">
                              <div className="col-xxl-4 col-sm-6">
                                <div className="delivery-category">
                                  <div className="shipment-detail">
                                    <div className="form-check custom-form-check">
                                      <input
                                        required
                                        className="form-check-input mt-0"
                                        type="radio"
                                        value="choice1"
                                        onChange={func}
                                        name="button"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="standard"
                                      >
                                        Standard Delivery Option
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-xxl-4 col-sm-6">
                                <div className="delivery-items">
                                  <div>
                                    <h5 className="items text-content">
                                      <span>3 Items</span> @ ₹693.48
                                    </h5>
                                    <h5 className="charge text-content">
                                      Delivery Charge ₹28.12
                                      <button
                                        type="button"
                                        className="btn p-0"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Extra Charge"
                                      >
                                        <i className="fa-solid fa-circle-exclamation"></i>
                                      </button>
                                    </h5>
                                  </div>
                                </div>
                              </div>

                              <div className="col-xxl-4 col-md-12">
                                <div className="select-option">
                                  <div className="form-floating theme-form-floating">
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                    >
                                      <option value="1">
                                        TOMORROW 10:00 PM - 6:00 PM
                                      </option>
                                      <option value="2">
                                        Tuesday 11:00 AM - 6:45 PM
                                      </option>
                                      <option value="3">
                                        Wednesday 10:30 AM - 8:00 PM
                                      </option>
                                    </select>
                                    <label>Select Timing</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="delivery-option">
                            <div className="row g-4">
                              <div className="col-xxl-4 col-sm-6">
                                <div className="delivery-category">
                                  <div className="shipment-detail">
                                    <div className="form-check custom-form-check">
                                      <input
                                        required
                                        className="form-check-input mt-0"
                                        type="radio"
                                        value="choice2"
                                        onChange={func}
                                        name="button"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="sameDay"
                                      >
                                        Same Day Delivery Option
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-xxl-4 col-sm-6">
                                <div className="delivery-items">
                                  <div>
                                    <h5 className="items text-content">
                                      <span>3 Items</span> @ ₹693.48
                                    </h5>
                                    <h5 className="charge text-content">
                                      Delivery Charge ₹32.15
                                      <button
                                        type="button"
                                        className="btn p-0"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Extra Charge"
                                      >
                                        <i className="fa-solid fa-circle-exclamation"></i>
                                      </button>
                                    </h5>
                                  </div>
                                </div>
                              </div>

                              <div className="col-xxl-4 col-md-12">
                                <div className="select-option">
                                  <div className="form-floating theme-form-floating">
                                    <select
                                      className="form-select theme-form-select"
                                      aria-label="Default select example"
                                    >
                                      <option value="1">
                                        TOMORROW 10:00 PM - 6:00 PM
                                      </option>
                                      <option value="2">
                                        Tuesday 11:00 AM - 6:45 PM
                                      </option>
                                      <option value="3">
                                        Wednesday 10:30 AM - 8:00 PM
                                      </option>
                                    </select>
                                    <label>Select Timing</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="delivery-option">
                            <div className="row g-4">
                              <div className="col-xxl-4 col-sm-6">
                                <div className="delivery-category">
                                  <div className="shipment-detail">
                                    <div className="form-check mb-0 custom-form-check">
                                      <input
                                        className="form-check-input mt-0"
                                        type="radio"
                                        onChange={func}
                                        value="choice3"
                                        name="button"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="future"
                                      >
                                        Future Delivery Option
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-xxl-4 col-sm-6">
                                <div className="delivery-items">
                                  <div>
                                    <h5 className="items text-content">
                                      <span>3 Items</span> @ ₹693.48
                                    </h5>
                                    <h5 className="charge text-content">
                                      Delivery Charge ₹34.67
                                      <button
                                        type="button"
                                        className="btn p-0"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Extra Charge"
                                      >
                                        <i className="fa-solid fa-circle-exclamation"></i>
                                      </button>
                                    </h5>
                                  </div>
                                </div>
                              </div>

                              <div className="col-xxl-4 col-md-12">
                                <form className="form-floating theme-form-floating date-box">
                                  <input type="date" className="form-control" />
                                  <label>Select Date</label>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="button-group">
                        <ul className="button-group-list">
                          {/* <li>
                            <button className="btn btn-light shopping-button backward-btn text-dark">
                              <i className="fa-solid fa-arrow-left-long ms-0"></i>
                              Return To Delivery Address
                            </button>
                          </li> 

                          <li>
                            <button className="btn btn-animation proceed-btn">
                              Continue Payment Option
                            </button>
                          </li>
                        </ul>
                      </div>
                    </Tab.Pane> */}
                    {/* End Delivery Option*/}

                    {/* Payment Option */}
                    <Tab.Pane eventKey="2">
                      <h2 className="tab-title">Payment Option</h2>
                      <div className="row g-sm-4 g-2">
                        <div className="col-xxl-4 col-lg-12 col-md-5 order-xxl-2 order-lg-1 order-md-2">
                          <div className="summery-box">
                            <div className="summery-header bg-white">
                              <h3>Order Summery</h3>
                              {/* <button to="./cart">Edit Cart</button> */}
                            </div>

                            <ul className="summery-contain bg-white custom-height">
                              {(cartdata || []).map((data, i) => {
                                return (
                                  <>
                                    <li key={i} className="mx-3">
                                      <h4>
                                        {Number(data.sale_price).toFixed(2)}{" "}
                                        <span>X {data.order_quantity}</span>
                                      </h4>
                                      <h4 className="price">
                                        ₹
                                        {(
                                          data.order_quantity *
                                          Number(data.sale_price)
                                        ).toFixed(2)}
                                      </h4>
                                    </li>
                                  </>
                                );
                              })}
                            </ul>

                            <ul className="summery-total bg-white">
                              <li className="mx-3">
                                <h4>Original Price</h4>{" "}
                                <h4 className="price">
                                  ₹{Number(originalproductprice).toFixed(2)}{" "}
                                </h4>
                              </li>
                              <li className="mx-3">
                                <h4>Tax</h4>
                                <h4 className="price text-danger">
                                  ₹{TotalTax.toFixed(2)}
                                </h4>
                              </li>
                              <li className="mx-3">
                                <h4>Subtotal(Tax included)</h4>
                                <h4 className="price">
                                  ₹{ProductPriceTotal.toFixed(2)}
                                </h4>
                              </li>

                              <li className="mx-3">
                                <h4>Shipping</h4>
                                <h4 className="price">₹{ShippingCharge}</h4>
                              </li>

                              <li className="mx-3">
                                <h4>Coupon/Code</h4>
                                <h4 className="price">₹{CouponDis}</h4>
                              </li>

                              <li className="list-total mx-3">
                                <h4>Total (Rupees)</h4>
                                <h4 className="price">
                                  ₹
                                  {(
                                    ProductPriceTotal -
                                    CouponDis +
                                    ShippingCharge
                                  ).toFixed(2)}
                                </h4>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="col-xxl-8 col-lg-12 col-md-7 order-xxl-1 order-lg-2 order-md-1">
                          <div
                            className="accordion accordion-flush custom-accordion"
                            id="accordionFlushExample"
                          >
                            <div className="accordion-item">
                              <Accordion>
                                <Accordion.Item eventKey="2">
                                  <Accordion.Header>
                                    <div className="custom-form-check form-check mb-0">
                                      <label
                                        className="form-check-label"
                                        htmlFor="credit"
                                      >
                                        <input
                                          className="form-check-input mt-0"
                                          type="radio"
                                          value="card"
                                          onChange={(e) => func(e)}
                                          name="payment"
                                        />
                                        Credit or Debit Card
                                      </label>
                                    </div>{" "}
                                  </Accordion.Header>
                                  {/* <Accordion.Body>
                                    <div
                                      id="flush-collapseOne"
                                      className="accordion-collapse collapse show"
                                      data-bs-parent="#accordionFlushExample"
                                    >
                                      <div className="accordion-body">
                                        <div className="row g-2">
                                          <div className="col-12">
                                            <div className="payment-method">
                                              <div className="form-floating mb-lg-3 mb-2 theme-form-floating">
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  id="credit2"
                                                  placeholder="Enter Credit & Debit Card Number"
                                                />
                                                <label htmlFor="credit2">
                                                  Enter Credit & Debit Card
                                                  Number
                                                </label>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="col-xxl-4">
                                            <div className="form-floating mb-lg-3 mb-2 theme-form-floating">
                                              <input
                                                type="text"
                                                className="form-control"
                                                id="expiry"
                                                placeholder="Enter Expiry Date"
                                              />
                                              <label htmlFor="expiry">
                                                Expiry Date
                                              </label>
                                            </div>
                                          </div>

                                          <div className="col-xxl-4">
                                            <div className="form-floating mb-lg-3 mb-2 theme-form-floating">
                                              <input
                                                type="text"
                                                className="form-control"
                                                id="cvv"
                                                placeholder="Enter CVV Number"
                                              />
                                              <label htmlFor="cvv">
                                                CVV Number
                                              </label>
                                            </div>
                                          </div>

                                          <div className="col-xxl-4">
                                            <div className="form-floating mb-lg-3 mb-2 theme-form-floating">
                                              <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                placeholder="Enter Password"
                                              />
                                              <label htmlFor="password">
                                                Password
                                              </label>
                                            </div>
                                          </div>

                                          <div className="button-group mt-0">
                                            <ul>
                                              <li>
                                                <button className="btn btn-light shopping-button">
                                                  Cancel
                                                </button>
                                              </li>

                                              <li>
                                                <button className="btn btn-animation">
                                                  Use This Card
                                                </button>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Accordion.Body> */}
                                </Accordion.Item>
                              </Accordion>
                            </div>

                            <div className="accordion-item">
                              <Accordion>
                                <Accordion.Item eventKey="2">
                                  <Accordion.Header>
                                    {" "}
                                    <div className="custom-form-check form-check mb-0">
                                      <label
                                        className="form-check-label"
                                        htmlFor="banking"
                                      >
                                        <input
                                          className="form-check-input mt-0"
                                          type="radio"
                                          value="netbanking"
                                          name="payment"
                                          onChange={(e) => func(e)}
                                        />
                                        Net Banking
                                      </label>
                                    </div>
                                  </Accordion.Header>
                                  {/* <Accordion.Body>
                                    <div className="accordion-body">
                                      <h5 className="text-uppercase mb-4">
                                        Select Your Bank
                                      </h5>
                                      <div className="row g-2">
                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              value="choice1"
                                              onChange={func}
                                              name="button"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="bank1"
                                            >
                                              Industrial & Commercial Bank
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              onChange={func}
                                              value="choice2"
                                              name="button"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="bank2"
                                            >
                                              Agricultural Bank
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              value="choice3"
                                              name="button"
                                              onChange={func}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="bank3"
                                            >
                                              Bank of America
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              value="choice4"
                                              onChange={func}
                                              name="button"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="bank4"
                                            >
                                              Construction Bank Corp.
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              value="choice5"
                                              name="button"
                                              onChange={func}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="bank5"
                                            >
                                              HSBC Holdings
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              value="choice6"
                                              name="button"
                                              onChange={func}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="bank6"
                                            >
                                              JPMorgan Chase & Co.
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-12">
                                          <div className="select-option">
                                            <div className="form-floating theme-form-floating">
                                              <select
                                                className="form-select theme-form-select"
                                                aria-label="Default select example"
                                              >
                                                <option value="hsbc">
                                                  HSBC Holdings
                                                </option>
                                                <option value="loyds">
                                                  Lloyds Banking Group
                                                </option>
                                                <option value="natwest">
                                                  Nat West Group
                                                </option>
                                                <option value="Barclays">
                                                  Barclays
                                                </option>
                                                <option value="other">
                                                  Others Bank
                                                </option>
                                              </select>
                                              <label>Select Other Bank</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Accordion.Body> */}
                                </Accordion.Item>
                              </Accordion>
                            </div>

                            <div className="accordion-item">
                              <Accordion>
                                <Accordion.Item eventKey="2">
                                  <Accordion.Header>
                                    <div className="custom-form-check form-check mb-0">
                                      <label
                                        className="form-check-label"
                                        htmlFor="wallet"
                                      >
                                        <input
                                          className="form-check-input mt-0"
                                          type="radio"
                                          value="wallet"
                                          onChange={(e) => func(e)}
                                          name="payment"
                                        />
                                        My Wallet
                                      </label>
                                    </div>
                                  </Accordion.Header>
                                  {/* <Accordion.Body>
                                    <div className="accordion-body">
                                      <h5 className="text-uppercase mb-4">
                                        Select Your Wallet
                                      </h5>
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <label
                                              className="form-check-label"
                                              htmlFor="amazon"
                                            >
                                              <input
                                                className="form-check-input mt-0"
                                                type="radio"
                                                value="choice10"
                                                onChange={func}
                                                name="button"
                                              />
                                              Amazon Pay
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              onChange={func}
                                              value="choice11"
                                              name="button"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="gpay"
                                            >
                                              Google Pay
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              value="choice12"
                                              onChange={func}
                                              name="button"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="airtel"
                                            >
                                              Airtel Money
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              value="choice12"
                                              onChange={func}
                                              name="button"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="paytm"
                                            >
                                              Paytm Pay
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              value="choice13"
                                              onChange={func}
                                              name="button"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="jio"
                                            >
                                              JIO Money
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              value="choice14"
                                              onChange={func}
                                              name="button"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="free"
                                            >
                                              Freecharge
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Accordion.Body> */}
                                </Accordion.Item>
                              </Accordion>
                            </div>

                            <div className="accordion-item">
                              <Accordion>
                                <Accordion.Item eventKey="2">
                                  <Accordion.Header>
                                    <div className="custom-form-check form-check mb-0">
                                      <label
                                        className="form-check-label"
                                        htmlFor="cash"
                                      >
                                        <input
                                          className="form-check-input mt-0"
                                          type="radio"
                                          value="cod"
                                          onChange={(e) => func(e)}
                                          name="payment"
                                        />
                                        Cash On Delivery
                                      </label>
                                    </div>
                                  </Accordion.Header>
                                  <Accordion.Body>
                                    <div className="accordion-body">
                                      <h5 className="cod-review">
                                        Pay digitally with SMS Pay Link. Cash
                                        may not be accepted in COVID restricted
                                        areas. <Link to="/">Know more.</Link>
                                      </h5>
                                    </div>
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Accordion>
                            </div>
                            {ordervalidation === "deliverymethod" ? (
                              <p className="text-danger h6">
                                Please Select Payment Method To Place An Order
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="button-group">
                        <ul className="button-group-list">
                          <li>
                            <button
                              className="btn btn-light shopping-button backward-btn text-dark"
                              disabled={currentTab === 0}
                              onClick={() => returnButton()}
                            >
                              <i className="fa-solid fa-arrow-left-long ms-0"></i>
                              Return To Delivery Option
                            </button>
                            {/* <button className="btn btn-light shopping-button backward-btn text-dark">
                              <i className="fa-solid fa-arrow-left-long ms-0"></i>
                              Return To Delivery Option
                            </button> */}
                          </li>

                          <li>
                            {/* <button
                              onClick={() => onOrderAdd()}
                              className="btn btn-animation"
                              
                            >Done</button> */}
                            {spinner === "spinner" ? (
                              <button
                                onClick={() => onOrderAdd()}
                                className="btn btn-animation"
                              >
                                <Spinner animation="border" role="status">
                                  <span className="visually-hidden">Done</span>
                                </Spinner>
                              </button>
                            ) : (
                              <button
                                onClick={() => onOrderAdd()}
                                className="btn btn-animation"
                              >
                                Done
                              </button>
                            )}
                          </li>
                        </ul>
                      </div>
                    </Tab.Pane>
                    {/* End Payment Option */}
                  </Tab.Content>
                </div>
              </Row>
            </Tab.Container>
          </div>
        </div>
      </section>
      {/* <!-- Checkout section End --> */}
      <SweetAlert
        show={ProductAlert}
        title={"order not placed try again"}
        text={"order not placed"}
        onConfirm={() => closeProductAlert()}
      />
      {/* ADD ADDRESS MODAL */}
      {/* <Modal size="lg" show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row p-md-3 m-0">
              <div className="col-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom01"
                >
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={udata.first_name}
                    name={"first_name"}
                    onChange={OnchangeFistname}
                    required
                    maxLength={15}
                  />
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Please Enter Your First Name
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom01"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={udata.last_name}
                    name={"last_name"}
                    onChange={OnchangeFistname}
                    required
                    maxLength={15}
                  />
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Please Enter Your Last Name
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    required
                    value={udata.email}
                    name={"email"}
                    // onChange={OnchangeFistname}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter valid Email
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
           
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Mobile"
                    value={udata.phone_no}
                    name={"phone_no"}
                    onChange={OnchangeFistname}
                    required
                    maxLength={10}
                    minLength={10}
                  />
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Please Enter Your Phone Number
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-12">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Add Address</Form.Label>
                  <Form.Control
                    type="location"
                    placeholder="Add Address"
                    value={udata.address}
                    name={"address"}
                    onChange={OnchangeFistname}
                    maxLength="100"
                  />
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Please Enter Address
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-12">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Add Address2</Form.Label>
                  <Form.Control
                    type="location"
                    placeholder="Add Address2"
                    value={udata.address2}
                    name={"address2"}
                    onChange={OnchangeFistname}
                    maxLength="100"
                  />
                </Form.Group>
              </div>

              <div className="col-4">
                <Form.Label className="inputlabelheading" column sm="12">
                  Gender
                </Form.Label>
                <Form.Select
                  aria-label="Product Type"
                  className="adminselectbox"
                  required
                  value={udata.gender}
                  name={"gender"}
                  onChange={OnchangeFistname}
                >
                  <option value={""} onChange={func}>
                    Gender
                  </option>
                  <option value="Male" onChange={func}>
                    Male
                  </option>
                  <option value="Female" onChange={func}>
                    Female
                  </option>
                </Form.Select>
                <Form.Control.Feedback type="invalid" className="h6">
                  Please select gender
                </Form.Control.Feedback>
              </div>
              <div className="col-4">
                <Form.Group className="mx-3" controlId="validationCustom11">
                  <Form.Label className="inputlabelheading" column sm="12">
                    Date of Birth
                  </Form.Label>
                  <Col sm="12">
                    <Form.Control
                      max={currentdate}
                      name={"date_of_birth"}
                      type={"date"}
                      value={udata.date_of_birth}
                      onChange={OnchangeFistname}
                      required
                      placeholder="Product Quantity"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose date of birth
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="button main_outline_button btn btn-animation "
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="button main_button btn theme-bg-color ms-3 fire-button"
              // onClick={handleSubmit}
              type="submit"
            >
              Update
            </button>
          </Modal.Footer>
        </Form>
      </Modal> */}
      <Footer />
    </Fragment>
  );
};
export default Checkout;
