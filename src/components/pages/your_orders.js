import React from "react";
import Header from "../common/header";
import Breadcumb from "../common/beadcumb";
import Footer from "../common/footer";
import Profile from "../../Photos/user.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
// import { AiOutlineFileText } from "react-icons/ai";
import { BsTelephoneFill, BsFillEnvelopeFill } from "react-icons/bs";
import moment from "moment";
// import { useNavigate } from "react-router-dom";
function Orders() {
  // const navigate = useNavigate();
  let totalorder = 0;
  console.log(totalorder)
  let orderid = localStorage.getItem("orderid");
  // let userid = localStorage.getItem("userid");
  const token = localStorage.getItem("token");
  const [apicall, setApicall] = useState([]);
  const [order, setOrder] = useState([]);
  const [productorder, setproductOrder] = useState([]);
  // const [amt, setAmt] = useState("");
  const [user, setUser] = useState([]);
  // const [searchdataa, setsearchDataa] = useState({
  //   status: "",
  //   created_on: "",
  // });

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/order_deteils`,
        {
          id: `${orderid}`,
        },
        {
          headers: {
            user_token: token,
          },
        }
      )
      .then((response) => {
        // let data = response.data;

        setOrder(response.data);
        setproductOrder(response.data.product_types);
        UserData();
        setApicall(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [apicall]);
  const UserData = () => {
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
        let data = response.data;
        setUser(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  var total = 0;
  var sub_total = 0;
  var total_tax = 0;
  let qty = 0;
  let total_tax_with_qty = 0;
  let total_priceWithout_tax = 0;
  console.log(total, total_tax)
  return (
    <React.Fragment>
      <Header />
      <Breadcumb
        pageName={"Orders Detail"}
        pageTitle={"Your Order"}
        pageHref={"/"}
      />

      <section className="cart-section section-b-space">
        {/* <div className="container-fluid-lg">
          <div className="row g-sm-4 g-3">
            <div className="col-xxl-9 col-lg-8">
              <div className="cart-table order-table">
                <div className="table-responsive">
                  <table className="table mb-0">
                    <tbody>
                      <tr>
                        <td className="product-detail">
                          <div className="product border-0">
                            <a
                              href="product.left-sidebar.html"
                              className="product-image"
                            >
                              <img
                                src={Product1}
                                className="img-fluid lazyload"
                                alt=""
                              />
                            </a>
                            <div className="product-detail">
                              <ul>
                                <li className="name">
                                  <a href="product-left.html">Bell pepper</a>
                                </li>

                                <li className="text-content">
                                  Sold By: Fresho
                                </li>

                                <li className="text-content">
                                  Quantity - 500 g
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>

                        <td className="price">
                          <h4 className="table-title text-content">Price</h4>
                          <h6 className="theme-color">$20.68</h6>
                        </td>

                        <td className="quantity">
                          <h4 className="table-title text-content">Qty</h4>
                          <h4 className="text-title">01</h4>
                        </td>

                        <td className="subtotal">
                          <h4 className="table-title text-content">Total</h4>
                          <h5>$35.10</h5>
                        </td>
                      </tr>

                      <tr>
                        <td className="product-detail">
                          <div className="product border-0">
                            <a
                              href="product.left-sidebar.html"
                              className="product-image"
                            >
                              <img
                                src={Product2}
                                className="img-fluid lazyload"
                                alt=""
                              />
                            </a>
                            <div className="product-detail">
                              <ul>
                                <li className="name">
                                  <a href="product-left.html">Eggplant</a>
                                </li>

                                <li className="text-content">Sold By: Nesto</li>

                                <li className="text-content">
                                  Quantity - 250 g
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>

                        <td className="price">
                          <h4 className="table-title text-content">Price</h4>
                          <h6 className="theme-color">$15.14</h6>
                        </td>

                        <td className="quantity">
                          <h4 className="table-title text-content">Qty</h4>
                          <h4 className="text-title">01</h4>
                        </td>

                        <td className="subtotal">
                          <h4 className="table-title text-content">Total</h4>
                          <h5>$52.95</h5>
                        </td>
                      </tr>

                      <tr>
                        <td className="product-detail">
                          <div className="product border-0">
                            <a
                              href="product.left-sidebar.html"
                              className="product-image"
                            >
                              <img
                                src={Product3}
                                className="img-fluid lazyload"
                                alt=""
                              />
                            </a>
                            <div className="product-detail">
                              <ul>
                                <li className="name">
                                  <a href="product-left.html">Onion</a>
                                </li>

                                <li className="text-content">
                                  Sold By: Basket
                                </li>

                                <li className="text-content">
                                  Quantity - 750 g
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>

                        <td className="price">
                          <h4 className="table-title text-content">Price</h4>
                          <h6 className="theme-color">$29.22</h6>
                        </td>

                        <td className="quantity">
                          <h4 className="table-title text-content">Qty</h4>
                          <h4 className="text-title">01</h4>
                        </td>

                        <td className="subtotal">
                          <h4 className="table-title text-content">Total</h4>
                          <h5>$67.36</h5>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-xxl-3 col-lg-4">
              <div className="row g-4">
                <div className="col-lg-12 col-sm-6">
                  <div className="summery-box">
                    <div className="summery-header">
                      <h3>Price Details</h3>
                      <h5 className="ms-auto theme-color">(3 Items)</h5>
                    </div>

                    <ul className="summery-contain">
                      <li>
                        <h4>Vegetables Total</h4>
                        <h4 className="price">$32.34</h4>
                      </li>

                      <li>
                        <h4>Vegetables Saving</h4>
                        <h4 className="price theme-color">$12.23</h4>
                      </li>

                      <li>
                        <h4>Coupon Discount</h4>
                        <h4 className="price text-danger">$6.27</h4>
                      </li>
                    </ul>

                    <ul className="summery-total">
                      <li className="list-total">
                        <h4>Total (USD)</h4>
                        <h4 className="price">$19.28</h4>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-12 col-sm-6">
                  <div className="summery-box">
                    <div className="summery-header d-block">
                      <h3>Shipping Address</h3>
                    </div>

                    <ul className="summery-contain pb-0 border-bottom-0">
                      <li className="d-block">
                        <h4>8424 James Lane South</h4>
                        <h4 className="mt-2">San Francisco, CA 94080</h4>
                      </li>

                      <li className="pb-0">
                        <h4>Expected Date Of Delivery:</h4>
                        <h4 className="price theme-color">
                          <a href="order-tracking.html" className="text-danger">
                            Track Order
                          </a>
                        </h4>
                      </li>
                    </ul>

                    <ul className="summery-total">
                      <li className="list-total border-top-0 pt-2">
                        <h4 className="fw-bold">Oct 21, 2021</h4>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-12">
                  <div className="summery-box">
                    <div className="summery-header d-block">
                      <h3>Payment Method</h3>
                    </div>

                    <ul className="summery-contain pb-0 border-bottom-0">
                      <li className="d-block pt-0">
                        <p className="text-content">
                          Pay on Delivery (Cash/Card). Cash on delivery (COD)
                          available. Card/Net banking acceptance subject to
                          device availability.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="order_detail_page container-fluid-lg">
          <div className="order_detail">
            <div className="row">
              <div className="col-lg-8">
                <div className="left_side">
                  <div className="top_bar d-flex justify-content-between text-center">
                    <div className="order_id d-flex flex-column">
                      <div className="order_info_heading">
                        <span>#</span>Order Id
                      </div>
                      <div>
                        <span>{order.id}</span>
                      </div>
                    </div>
                    <div className="d-flex flex-column text-center">
                      <div className="order_info_heading">Payment</div>
                      <div className="badge bg-success">
                        {order.payment_mode}
                      </div>
                    </div>
                    <div className="d-flex flex-column text-center">
                      <div className="order_info_heading">Order Status</div>
                      <div className="badge bg-success">{order.status}</div>
                    </div>
                    <div className="d-flex flex-column text-center">
                      <div className="order_info_heading">Order Date</div>
                      <div className="date_time">
                        {moment(order.order_date).format("YYYY-MM-DD")}
                      </div>
                    </div>
                    <div className="d-flex flex-column text-center">
                      <div className="order_info_heading">Delivery Date</div>
                      <div className="date_time">{order.delivery_date}</div>
                    </div>
                  </div>
                </div>
                <div className="product_img_price">
                  <div className="product_image_price"></div>

                  {(productorder || []).map((orderdata, i) => {

                    orderdata.gst === "null" ||
                      orderdata.gst === "undefined" ||
                      orderdata.gst === ""
                      ? (orderdata.gst = "0")
                      : Number(orderdata.gst);
                    orderdata.sgst === "null" ||
                      orderdata.sgst === "undefined" ||
                      orderdata.sgst === ""
                      ? (orderdata.sgst = "0")
                      : Number(orderdata.sgst);
                    orderdata.cgst === "null" ||
                      orderdata.cgst === "undefined" ||
                      orderdata.cgst === ""
                      ? (orderdata.cgst = "0")
                      : Number(orderdata.cgst);
                    orderdata.mrp === "undefined" ||
                      orderdata.mrp === "null" ||
                      orderdata.mrp === ""
                      ? (orderdata.mrp = "0")
                      : Number(orderdata.mrp);

                    let countAllText =
                      Number(orderdata.gst) +
                      Number(orderdata.wholesale_sales_tax) +
                      Number(orderdata.manufacturers_sales_tax) +
                      Number(orderdata.retails_sales_tax) +
                      Number(orderdata.value_added_tax);
                    let discont = (orderdata.mrp * orderdata.discount) / 100;
                    // let product_price= Number(orderdata.mrp)-discont;
                    let tax =
                      (Number(orderdata.sale_price) * countAllText) / 100;
                    //  let sale_price=(product_price+tax)
                    qty = orderdata.order_quantity;
                    let total_price = orderdata.sale_price * qty;

                    let Total_taxMultiply_qty = tax * qty;

                    total_tax_with_qty += Number(Total_taxMultiply_qty);

                    let price_without_tax =
                      Number(orderdata.product_price).toFixed(2) - tax;

                    let pricewithout_tax_with_qty = price_without_tax * qty;

                    total_priceWithout_tax += Number(pricewithout_tax_with_qty);

                    total +=
                      Number(total_price) +
                      Number(order.shipping_charges) +
                      Number(order.discount_coupon_value);
                    sub_total += Number(total_price);
                    total_tax += Number(tax);
                    return (
                      <div className="d-flex justify-content-between mb-3 align-items-center">
                        <div className="product_img d-flex"  >
                          <img
                            src={
                              orderdata.all_images
                                ? orderdata.all_images
                                : "https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
                            }
                            alt="apnaorganic"
                          />
                          <div className="product_name_detial ps-3">
                            <h6>{orderdata.product_title_name}</h6>
                            <p>color: {orderdata.colors}</p>
                            <p>size: {orderdata.size}</p>
                          </div>
                        </div>

                        <div className="product_price">
                          {" "}
                          MRP- ₹{orderdata.mrp} ({Number(orderdata.discount)}% )
                          <br /> Discount- ₹{Number(discont).toFixed(2)}
                          <br />
                          <b>
                            {" "}
                            Product Price- ₹
                            {Number(orderdata.product_price).toFixed(2)}
                          </b>
                        </div>

                        <div className="product_quantity">
                          Price without tax- <br />₹
                          {price_without_tax.toFixed(2)}
                          <br /> Tax- ₹{tax.toFixed(2)}
                        </div>

                        <div className="product_quantity">
                          Sale price <br />₹{" "}
                          {Number(orderdata.sale_price).toFixed(2)}
                        </div>

                        <div className="product_quantity">
                          QTY- {orderdata.order_quantity}
                        </div>
                        <div className="total_amount">
                          {" "}
                          Total Price- <br />₹
                          {(
                            Number(orderdata.sale_price) *
                            Number(orderdata.order_quantity)
                          ).toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="delivery_charges">
                  <h5 className="pb-3">Delivery</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="delivery_img d-flex ">
                      <img
                        src="https://media.istockphoto.com/vectors/express-delivery-symbol-vector-id1175078000?b=1&k=20&m=1175078000&s=612x612&w=0&h=2Y5FLXleVSLyaEfZztp2Mhf2pVV6BbqNYkXYs1KHpik="
                        alt="apnaorganic"
                      />
                      <div className="delivery_componay ps-3">
                        <h6>E-Kart</h6>
                        <p>Speed post package</p>
                      </div>
                    </div>
                    <div className="delivery_payment">00.00</div>
                  </div>
                </div>
                <div className="payment_summary">
                  <h5 className="pb-3">Payment Summary</h5>
                  <div className="payment_summary_total d-flex justify-content-between align-items-center">
                    <div className="Subtotal">
                      <p> Price(Excluding Tax)</p>
                    </div>
                    <div className="">₹{total_priceWithout_tax.toFixed(2)}</div>
                  </div>
                  <div className="payment_summary_total d-flex justify-content-between align-items-center">
                    <div className="Subtotal">
                      <p>Total Tax (Tax x Qty) </p>
                    </div>
                    <div className="">₹{total_tax_with_qty.toFixed(2)}</div>
                  </div>
                  <div className="payment_summary_total d-flex justify-content-between align-items-center">
                    <div className="Subtotal">
                      <p>
                        SubTotal({order.total_quantity} items)(Include all
                        Taxes)
                      </p>
                    </div>
                    <div className="">₹{sub_total.toFixed(2)}</div>
                  </div>
                  <div className="payment_summary_total d-flex justify-content-between align-items-center">
                    <div className="Subtotal">
                      <p>Delivery Charges</p>
                    </div>
                    <div className="">
                      ₹{Number(order.shipping_charges).toFixed(2)}
                    </div>
                  </div>

                  <div className="payment_summary_total d-flex justify-content-between align-items-center">
                    <div className="Subtotal">
                      <p> Discont Coupon Amount </p>
                    </div>
                    <div className="">
                      ₹ {Number(order.discount_coupon_value).toFixed(2)}
                    </div>
                  </div>

                  <div className="payment_summary_total d-flex justify-content-between align-items-center">
                    <div className="Subtotal">
                      <p>
                        <strong>
                          Total paid by customer ( SubTotal - Coupon Discount)
                        </strong>
                      </p>
                    </div>
                    <div className="">
                      <strong>₹{Number(order.total_amount).toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="right_side">
                  {(user || []).map((userdata, i) => {
                    return (
                      <div className="customer_name_address">
                        <div className="customer_info">
                          <div className="customer">Customer</div>

                          <div className="customer_name_img d-flex py-3">
                            <img key={i} src={Profile} alt={"apnaorganic"} />
                            <div className="customer_name ps-4 my-auto">
                              {userdata.first_name} {userdata.last_name}
                            </div>
                          </div>
                          {/* <div className="customer_orders d-flex py-3">
                            <AiOutlineFileText className="order_icon p-1" />

                            <div className="customer_orders_no ps-4 my-auto">
                              {order.total_quantity}
                            </div>
                          </div> */}
                        </div>
                        <div className="contact py-3">
                          <div className="contact_heading pb-3">
                            <h5>Contact Info</h5>
                          </div>
                          <div className="email py-2">
                            <BsFillEnvelopeFill />
                            <span>{userdata.email}</span>
                          </div>
                          <div className="number py-2">
                            <BsTelephoneFill />
                            <span>{userdata.phone_no}</span>
                          </div>
                        </div>
                        <div className="ship_Address py-3">
                          <h5>Ship Address</h5>
                          <div className="address">
                            <p>
                              {" "}
                              {userdata.first_name} {userdata.last_name}
                            </p>
                            <p>{userdata.gender}</p>
                            <p>
                              {moment(userdata.date_of_birth).format(
                                "YYYY-MM-DD"
                              )}
                            </p>
                            <p className="text-break">{userdata.address}</p>
                            <p className="text-break">{userdata.address2}</p>
                            <p>Indore Madhya Pradesh</p>
                            <p>Pin:452001</p>
                            <p>{userdata.phone_no}</p>
                          </div>
                        </div>
                        <div className="bill_Address py-3">
                          <h5>Bill Address</h5>
                          <div className="address">
                            <p>
                              {userdata.first_name} {userdata.last_name}
                            </p>
                            <p>{userdata.gender}</p>
                            <p>
                              {moment(userdata.date_of_birth).format(
                                "YYYY-MM-DD"
                              )}
                            </p>
                            <p className="text-break">{userdata.address}</p>
                            <p className="text-break">{userdata.address2}</p>
                            <p>Indore Madhya Pradesh</p>
                            <p>Pin:452001</p>
                            <p>{userdata.phone_no}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* <div className="customer_info">
                  <div className="customer">Customer</div>
                  
                  <div className="customer_name_img d-flex py-3">
                    <img src={Profile} alt={'apnaorganic'}/>
                    <div className="customer_name ps-4 my-auto">
                      Gourav Choudhary
                    </div>
                  </div>
                  <div className="customer_orders d-flex py-3">
                    <AiOutlineFileText className="order_icon p-1" />
                    <div className="customer_orders_no ps-4 my-auto">
                      2 Order
                    </div>
                  </div>
                </div>
                <div className="contact py-3">
                  <div className="contact_heading pb-3">
                    <h5>Contact Info</h5>
                  </div>
                  <div className="email py-2">
                    <BsFillEnvelopeFill />
                    <span>text159@gamil.com</span>
                  </div>
                  <div className="number py-2">
                    <BsTelephoneFill />
                    <span> +91 987654321</span>
                  </div>
                </div>
                <div className="ship_Address py-3">
                  <h5>Ship Address</h5>
                  <div className="address">
                    <p>Gourav Choudhary</p>
                    <p>45 Universal Tower</p>
                    <p>2nd Floor Scheme 54 PU4</p>
                    <p>Indore Madhya Pradesh</p>
                    <p>Pin:452001</p>
                    <p>+91 9876543210</p>
                  </div>
                </div>
                <div className="bill_Address py-3">
                  <h5>Bill Address</h5>
                  <div className="address">
                    <p>Gourav Choudhary</p>
                    <p>45 Universal Tower</p>
                    <p>2nd Floor Scheme 54 PU4</p>
                    <p>Indore Madhya Pradesh</p>
                    <p>Pin:452001</p>
                    <p>+91 9876543210</p>
                  </div>
                </div> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </React.Fragment>
  );
}

export default Orders;
