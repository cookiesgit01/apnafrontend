import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Header from "../common/header";
import Breadcumb from "../common/beadcumb";
import Footer from "../common/footer";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { MdOutlineDashboard } from "react-icons/md";
import { BsHandbag } from "react-icons/bs";
// import { AiOutlineHeart, AiOutlineCreditCard } from "react-icons/ai";
import { GoLocation, GoMail } from "react-icons/go";
import { RiAccountCircleLine } from "react-icons/ri";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Compliant from "../common/compliant";

function Account() {
  // const useridd = localStorage.getItem("userid");
  localStorage.getItem("token");

  const [apicall, setapicall] = useState(false);
  // const [msg, setMsg] = useState(true);
  const currentdate = moment().format("YYYY-MM-DD");
  // const userpass = localStorage.getItem("upassword");
  const navigate = useNavigate();
  const func = () => { };
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setapicall(true);
  };

  const handleShow = () => {
    setValidated(false);
    setShow(true);
  };
  const [Password, setPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [txt, setTxt] = useState('')
  console.log(txt)
  // const [addAdderss, setaddAdderss] = useState(false);
  // const addAdderssClose = () => setaddAdderss(false);
  // const addAdderssShow = () => setaddAdderss(true);
  const [wishlistdata, setwishlistdata] = useState([]);
  const [orderhistory, setorderhistory] = useState([]);
  const [totalorder, settotalorder] = useState("");
  const [cartupdateid, setcartupdateid] = useState("");
  console.log(cartupdateid)
  const [udata, setUdata] = useState([]);
  const [userdata, setuserdata] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    gender: "",
    date_of_birth: "",
    address: "",
    address2: "",
  });

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/user_details`,
        { user_id: "" },
        {
          headers: {
            user_token: token,
          },
        }
      )
      .then((response) => {
        let data = response.data[0];
        setuserdata(data);
        // console.log("dayta----" + JSON.stringify(data.first_name));
        // console.log("usernamef---" + data.first_name);
        localStorage.setItem("first_name", data.first_name);
        setUdata(data);
        setapicall(false);
      })
      .catch((error) => { });
    // Onwishlistclick();
    // OnOrderclick();
  }, [apicall, Password, token]);

  // wishlist
  // const Onwishlistclick = () => {
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_BASEURL}/wishlist`,
  //       {
  //         user_id: "",
  //       },
  //       {
  //         headers: {
  //           user_token: token,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       if (response.data[0].message !== "header error") {
  //         setwishlistdata(response.data);
  //       }
  //       // navigate('/your_account')
  //       // return response;
  //     })
  //     .catch((error) => {});
  //   setclick(false);
  // };

  // order history
  const OnOrderclick = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/user_orders`, {
        headers: {
          user_token: token,
        },
      })
      .then((response) => {
        // let data = response.data[0];
        setorderhistory(response.data);
        var result = response.data.filter(
          (thing, index, self) =>
            index === self.findIndex((t) => t.order_id === thing.order_id)
        );
        settotalorder(result.length);

        // navigate('/your_account')
        // return response;
      })
      .catch((error) => { });
    setclick(false);
  };
  // end order history

  // edit Profile
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
          }
        })
        .catch((error) => { });
    }
  };
  const onNameChange = e => {
    const { value } = e.target;
    const spcl = /^[A-Za-z]+$/;
    if (value === "" || spcl.test(value)) {
      setTxt(value);
      setUdata({
        ...udata,
        [e.target.name]: e.target.value,
      });
    }
  }
  const onPhoneNumberChange = e => {
    const { value } = e.target;
    const spcl = /^[0-9]+$/;
    if (value === "" || spcl.test(value)) {
      setTxt(value);
      setUdata({
        ...udata,
        [e.target.name]: e.target.value,
      });
    }
  }
  const onInputChange = (e, first_name) => {
    setUdata({
      ...udata,
      [e.target.name]: e.target.value,
    });
  };

  // change Password:

  //States to use in change password :-
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Onchange function of new password :-
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
    setOldPasswordError("");
  };

  // Onchange function of new password :-
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setNewPasswordError("");
  };

  // Onchange function of confirm new password :-
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
  };

  // Function to change the password with the validation and api part :-
  const handlePassSubmit = (e) => {
    // console.log("Passwordddd----------" + newPassword);
    // console.log("Passwordddd-----LEnghthhhhhhhh-----" + newPassword.length);

    e.preventDefault();
    if (!oldPassword) {
      setOldPasswordError("Old password is required");
    } else {
      setOldPasswordError("");
    }
    if (!newPassword) {
      setNewPasswordError("New password is required");
    } else if (
      newPassword.length < 8 ||
      !/\d/.test(newPassword) ||
      !/[a-z]/.test(newPassword) ||
      !/[A-Z]/.test(newPassword)
    ) {
      setNewPasswordError(
        "New password must be at least 8 characters, 1 lowercase letter, 1 uppercase letter and 1 digit"
      );
    } else {
      setNewPasswordError("");
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordError("Confirm password must match with new password");
    } else {
      setConfirmPasswordError("");
    }
    if (
      oldPassword &&
      newPassword &&
      newPassword.length >= 8 &&
      confirmPassword &&
      confirmPassword === newPassword
    ) {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/change_user_password`, {
          email: email,
          password: oldPassword,
          new_password: newPassword,
        })
        .then((response) => {
          // console.log(response.data);
          if (response.data === false) {
            setOldPasswordError("Old password is incorrect");
          } else if (response.data === true) {
            localStorage.setItem("upassword", response.data.new_password);
            setPassword(false);
            setOldPasswordError("");
            setNewPasswordError("");
            setConfirmPasswordError("");
            ChangepassClose();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // To show the update password popup modal :-
  const ChangepassShow = () => {
    setEmail(userdata.email);
    setPassword(true);
  };

  // To close the update password popup modal :-
  const ChangepassClose = () => {
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    setPassword(false);
    setapicall(true);
  };

  // end change paassword
  const [click, setclick] = useState(false);
  const side_bar = () => {
    setclick(true);
  };
  //add address
  // const [addAdderssvalidated, setaddAdderssValidated] = useState(false);
  // const addAdderssSubmit = (event) => {
  //   event.preventDefault();

  //   let form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //   setaddAdderssValidated(true);
  // };

  // const OnaddAdderss = (e) => {
  //   let name = e.target.value;
  //   setEmail(name);
  // };

  //  const alphanumeric=(inputtxt)=>
  //   {
  //    var letterNumber = /^[a-zA-Z]+$/;
  //    if((inputtxt.value.match(letterNumber)))
  //     {
  //      return true;
  //     }
  //   else
  //     { 
  //      alert("message"); 
  //      return false; 
  //     }
  //     }
  // add to cart
  const AddToCart = (id, discount, product_price, quantity, product_id) => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/add_to_cart`,
        {
          user_id: "",
          product_view_id: id,
          price: product_price,
          discount: discount,
          quantity: 1,
          is_active: 1,
        },
        {
          headers: {
            user_token: token,
          },
        }
      )
      .then((response) => {
        let cartup = localStorage.setItem("cartupdate", true);
        setcartupdateid(cartup);
        setwishlistdata("")
      })
      .catch((error) => { });
  };

  // end add to cart

  // const onProductClick = (id) => {
  //   localStorage.setItem("proid", id);
  //   navigate("/product-detail");
  // };

  const OnImageClick = (id) => {
    localStorage.setItem("orderid", id);
    navigate("/your_orders");
  };

  return (
    <React.Fragment>
      <Header addcart={AddToCart} />
      <Breadcumb
        pageName={"Your Account"}
        pageTitle={"Your Account"}
        pageHref={"/"}
      />

      <section className="user-dashboard-section section-b-space">
        <div className="container-fluid-lg">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <div className="row">
              <div className="col-xxl-3 col-lg-4">
                <div
                  className={
                    click === true
                      ? "dashboard-left-sidebar show"
                      : "dashboard-left-sidebar"
                  }
                >
                  <div className="close-button d-flex d-lg-none">
                    <button className="close-sidebar">
                      <span onClick={() => setclick(false)}>&times;</span>
                    </button>
                  </div>
                  <div className="profile-box">
                    {/* <div className="cover-image">
                      <img
                        src={profile_cover}
                        className="img-fluid  lazyload"
                        alt=""
                      />
                    </div> */}

                    <div className="profile-contain">
                      <div className="profile-name">
                        <h3>
                          {userdata.first_name} {userdata.last_name}
                        </h3>
                        <h6 className="text-content">{userdata.email}</h6>
                      </div>
                    </div>
                  </div>

                  <Row>
                    <Nav className="nav nav-pills user-nav-pills">
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link p-0"
                              // aria-selected="false"
                              onClick={() => setclick(false)}
                            >
                              <MdOutlineDashboard className="mx-2" />
                              DashBoard
                            </button>
                          </li>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          {" "}
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link p-0"
                              // aria-selected="false"
                              onClick={() => OnOrderclick()}
                            >
                              <BsHandbag className="mx-2" />
                              Order
                            </button>
                          </li>
                        </Nav.Link>
                      </Nav.Item>
                      {/* <Nav.Item>
                        <Nav.Link eventKey="wishlist">
                          {" "}
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link p-0"
                              onClick={() => Onwishlistclick()}
                            >
                              <AiOutlineHeart className="mx-2" />
                              Wishlist
                            </button>
                          </li>
                        </Nav.Link>
                      </Nav.Item> */}
                      {/* <Nav.Item>
                        <Nav.Link eventKey="card">
                          {" "}
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link p-0"
                              id="pills-card-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-card"
                              type="button"
                              role="tab"
                              aria-controls="pills-card"
                              aria-selected="false"
                              onClick={() => setclick(false)}
                            >
                              <AiOutlineCreditCard className="mx-2" /> Saved
                              Card
                            </button>
                          </li>
                        </Nav.Link>
                      </Nav.Item> */}
                      <Nav.Item>
                        <Nav.Link eventKey="address">
                          {" "}
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link p-0"
                              // aria-selected="false"
                              onClick={() => setclick(false)}
                            >
                              <GoLocation className="mx-2" />
                              Address
                            </button>
                          </li>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="profile">
                          {" "}
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link p-0"
                              // aria-selected="false"
                              onClick={() => setclick(false)}
                            >
                              <RiAccountCircleLine className="mx-2" />
                              Profile
                            </button>
                          </li>
                        </Nav.Link>
                      </Nav.Item>
                      {/* <Nav.Item>
                        <Nav.Link eventKey="privacy">
                          {" "}
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link p-0"
                              id="pills-security-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-security"
                              type="button"
                              role="tab"
                              aria-controls="pills-security"
                              aria-selected="false"
                              onClick={() => setclick(false)}
                            >
                              <MdOutlinePrivacyTip className="mx-2" />
                              Privacy
                            </button>
                          </li>
                        </Nav.Link>
                      </Nav.Item> */}
                    </Nav>
                  </Row>
                </div>
              </div>

              <div className="col-xxl-9 col-lg-8">
                <button
                  className="btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none"
                  onClick={side_bar}
                >
                  Show Menu
                </button>
                <div className="dashboard-right-sidebar">
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="pills-dashboard"
                          role="tabpanel"
                          aria-labelledby="pills-dashboard-tab"
                        >
                          <div className="dashboard-home">
                            <div className="title">
                              <h2>My Dashboard</h2>
                              <button
                                className="btn btn-success"
                                onClick={handleShow}
                              >
                                Edit
                              </button>
                            </div>

                            <div className="dashboard-user-name">
                              <h6 className="text-content">
                                Hello,{" "}
                                <b className="text-title">
                                  {userdata.first_name} {userdata.last_name}
                                </b>
                              </h6>
                              <p className="text-content">
                                From your My Account Dashboard you have the
                                ability to view a snapshot of your recent
                                account activity and update your account
                                information. Select a link below to view or edit
                                information.
                              </p>
                            </div>

                            <div className="total-box">
                              <div className="row g-sm-4 g-3">
                                <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                  <div className="totle-contain">
                                    <img
                                      src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg"
                                      className="img-1  lazyload"
                                      alt=""
                                    />
                                    <img
                                      src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg"
                                      className=" lazyload"
                                      alt=""
                                    />
                                    <div className="totle-detail">
                                      <h5>Total Order</h5>
                                      <h3>{totalorder}</h3>
                                    </div>
                                  </div>
                                </div>

                                {/* <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                  <div className="totle-contain">
                                    <img
                                      src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg"
                                      className="img-1  lazyload"
                                      alt=""
                                    />
                                    <img
                                      src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg"
                                      className=" lazyload"
                                      alt=""
                                    />
                                    <div className="totle-detail">
                                      <h5>Total Pending Order</h5>
                                      <h3>254</h3>
                                    </div>
                                  </div>
                                </div> */}

                                <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                  <div className="totle-contain">
                                    <img
                                      src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg"
                                      className="img-1  lazyload"
                                      alt=""
                                    />
                                    <img
                                      src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg"
                                      className=" lazyload"
                                      alt=""
                                    />
                                    <div className="totle-detail">
                                      <h5>Total Wishlist</h5>
                                      <h3>{wishlistdata.length}</h3>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="dashboard-title">
                              <h3>Account Information</h3>
                            </div>

                            <div className="row g-4">
                              <div className="col-xxl-6">
                                <div className="dashboard-contant-title">
                                  <h4>
                                    Contact Information{" "}
                                    {/* <Link
                                      to="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#editProfile"
                                      onClick={handleShow}
                                    >
                                      Edit
                                    </Link> */}
                                  </h4>
                                </div>
                                <div className="dashboard-detail">
                                  <h6 className="text-content">
                                    {userdata.first_name} {userdata.last_name}
                                  </h6>
                                  <h6 className="text-content">
                                    {userdata.email}
                                  </h6>
                                  <Link to="#" onClick={ChangepassShow}>
                                    Change Password
                                  </Link>
                                </div>
                              </div>

                              <div className="col-xxl-6">
                                {/* <div className="dashboard-contant-title">
                                  <h4>
                                    Newsletters{" "}
                                    <Link
                                      to="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#editProfile"
                                    >
                                      Edit
                                    </Link>
                                  </h4>
                                </div>
                                <div className="dashboard-detail">
                                  <h6 className="text-content">
                                    You are currently not subscribed to any
                                    newsletter
                                  </h6>
                                </div> */}
                              </div>

                              <div className="col-12">
                                <div className="dashboard-contant-title">
                                  <h4>
                                    Address Book{" "}
                                    {/* <Link
                                      to="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#editProfile"
                                    >
                                      Edit
                                    </Link> */}
                                  </h4>
                                </div>

                                <div className="row g-4">
                                  <div className="col-xxl-6">
                                    <div className="dashboard-detail">
                                      <h6 className="text-content">
                                        Default Billing Address
                                      </h6>
                                      <h6 className="text-content text-break">
                                        {userdata.address}
                                      </h6>
                                      {/* <Link
                                        to="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editProfile"
                                        onClick={handleShow}
                                      >
                                        Edit Address
                                      </Link> */}
                                    </div>
                                  </div>

                                  <div className="col-xxl-6 ">
                                    <div className="dashboard-detail">
                                      <h6 className="text-content">
                                        Default Shipping Address
                                      </h6>
                                      <h6 className="text-content text-break">
                                        {userdata.address2}
                                      </h6>
                                      {/* <Link
                                        to="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editProfile"
                                        onClick={handleShow}
                                      >
                                        Edit Address
                                      </Link> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    {/* order history */}
                    <Tab.Pane eventKey="second">
                      <div
                        className="tab-pane fade show"
                        id="pills-order"
                        role="tabpanel"
                        aria-labelledby="pills-order-tab"
                      >
                        <div className="dashboard-order">
                          <div className="title">
                            <h2>My Orders History</h2>
                            <span className="title-leaf title-leaf-gray">
                              <svg className="icon-width bg-gray"></svg>
                            </span>
                          </div>
                          {(orderhistory || []).map((data, i) => {
                            return (
                              <div className="order-contain">
                                <div className="order-box dashboard-bg-box">
                                  <div className="order-container">
                                    <div className="order-detail">
                                      <h4 key={i} >
                                        Status <span>{data.status}</span>
                                      </h4>
                                    </div>
                                  </div>

                                  <div className="product-order-detail">
                                    <div
                                      onClick={() =>
                                        OnImageClick(data.order_id)
                                      }
                                      className="order-image"
                                    >
                                      <img
                                        src={
                                          data.all_images === "" ||
                                            data.all_images === "null" ||
                                            data.all_images === null
                                            ? "https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
                                            : data.all_images
                                        }
                                        className="lazyload"
                                        alt=""
                                        width={250}
                                      // onClick={OnImageClick(data.order_id)}
                                      />
                                    </div>

                                    <div className="order-wrap">
                                      <p>
                                        <h3>{data.product_title_name}</h3>
                                      </p>
                                      <p className="text-content">
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: data.product_description,
                                          }}
                                          className="editor"
                                        ></div>
                                      </p>
                                      <ul className="product-size p-0">
                                        <li>
                                          <div className="size-box">
                                            <h6 className="text-content">
                                              Price :{" "}
                                            </h6>
                                            <h5>{data.mrp}</h5>
                                          </div>
                                        </li>

                                        <li>
                                          <div className="size-box">
                                            <h6 className="text-content">
                                              Sold By :{" "}
                                            </h6>
                                            <h5>{data.store_name}</h5>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="size-box">
                                            <h6 className="text-content">
                                              Order Date :{" "}
                                            </h6>
                                            <h5>
                                              {moment(data.order_date).format(
                                                "YYYY-MM-DD"
                                              )}
                                            </h5>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="size-box">
                                            <h6 className="text-content">
                                              Delivery Date :{" "}
                                            </h6>
                                            <h5>{data.delivery_date}</h5>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="size-box">
                                            <h6 className="text-content">
                                              {data.unit === "gms" ||
                                                data.unit === "ml" ||
                                                data.unit === "piece"
                                                ? "Quantity"
                                                : "Size"}
                                            </h6>
                                            {data.unit === "gms" ||
                                              data.unit === "ml" ||
                                              data.unit === "piece" ? (
                                              <h5>
                                                {data.unit_quantity} {data.unit}
                                              </h5>
                                            ) : (
                                              <h5>{data.size}</h5>
                                            )}
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="contact-box-section mt-5 d-flex justify-content-center">
                          <Compliant />
                        </div>
                      </div>
                    </Tab.Pane>
                    {/* end order history */}
                    {/* wishlist history */}

                    {/* <Tab.Pane eventKey="wishlist">
                      <div
                        className="tab-pane fade show"
                        id="pills-wishlist"
                        role="tabpanel"
                        aria-labelledby="pills-wishlist-tab"
                      >
                        <div className="dashboard-wishlist">
                          <div className="title">
                            <h2>My Wishlist History</h2>
                            <span className="title-leaf title-leaf-gray">
                              <svg className="icon-width bg-gray"></svg>
                            </span>
                          </div>
                          <div className="row g-sm-4 g-3">
                            {wishlistdata === "true" ? (
                              <h2 className="text-dark text-center">
                                Add Product In wishlist{" "}
                              </h2>
                            ) : (
                              (wishlistdata || []).map((wdata) => {
                                return (
                                  <div
                                    key={wdata.id}
                                    className="col-xxl-3 col-lg-6 col-md-4 col-sm-6"
                                  >
                                    <div className="product-box-3 theme-bg-white h-100">
                                      <div className="product-header">
                                        <div className="product-image">
                                          <div
                                            onClick={() =>
                                              onProductClick(wdata.product_id)
                                            }
                                          >
                                            <img
                                              src={
                                                wdata.all_images === "" ||
                                                wdata.all_images === "null" ||
                                                wdata.all_images === null
                                                  ? "https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
                                                  : wdata.all_images
                                              }
                                              className="img-fluid  lazyload"
                                              alt=""
                                            />
                                          </div>

                                          <div className="product-header-top">
                                            <button className="btn wishlist-button close_button">
                                              <i data-feather="x"></i>
                                            </button>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="product-footer">
                                        <div className="product-detail">
                                          <span className="span-name">
                                            {wdata.product_title_name}
                                          </span>
                                          <Link to="/order_detail">
                                            <h5
                                              className="name mb-0"
                                              dangerouslySetInnerHTML={{
                                                __html:
                                                  wdata.product_description,
                                              }}
                                            />
                                          </Link>
                                          <p
                                            className="text-content  mb-2"
                                            dangerouslySetInnerHTML={{
                                              __html: wdata.other_introduction,
                                            }}
                                          />

                                          <h6 className="unit mt-1">250 ml</h6>
                                          <h5 className="price">
                                            <span className="theme-color">
                                              {wdata.product_price}₹
                                            </span>
                                            <del>{wdata.mrp}₹</del>
                                          </h5>
                                          {/* <div className="add-to-cart-box mt-2">
                                          <button
                                            className="btn btn-add-cart addcart-button"
                                            onClick={(e) =>
                                              AddToCart(
                                                wdata.id,
                                                wdata.discount,
                                                wdata.product_price,
                                                wdata.quantity,
                                                wdata.is_active,
                                                wdata.product_id
                                              )
                                            }
                                          >
                                            Add
                                            <i className="fa-solid fa-plus"></i>
                                          </button>
                                          <div className="cart_qty qty-box">
                                            <div className="input-group">
                                              <button
                                                type="button"
                                                className="qty-left-minus"
                                                data-type="minus"
                                                data-field=""
                                              >
                                                <i
                                                  className="fa fa-minus"
                                                  aria-hidden="true"
                                                ></i>
                                              </button>
                                              <input
                                                className="form-control input-number qty-input"
                                                type="text"
                                                name="quantity"
                                                value="0"
                                                onChange={func}
                                              />
                                              <button
                                                type="button"
                                                className="qty-right-plus"
                                                data-type="plus"
                                                data-field=""
                                              >
                                                <i
                                                  className="fa fa-plus"
                                                  aria-hidden="true"
                                                ></i>
                                              </button>
                                            </div>
                                          </div>
                                        </div> 
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      </div>
                    </Tab.Pane> */}
                    {/* end history */}
                    {/* card history */}

                    <Tab.Pane eventKey="card">
                      <div
                        className="tab-pane fade show"
                        id="pills-card"
                        role="tabpanel"
                        aria-labelledby="pills-card-tab"
                      >
                        <div className="dashboard-card">
                          <div className="title title-flex">
                            <div>
                              <h2>My Card Details</h2>
                              <span className="title-leaf">
                                <svg className="icon-width bg-gray"></svg>
                              </span>
                            </div>

                            <button
                              className="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3"
                              data-bs-toggle="modal"
                              data-bs-target="#editCard"
                            >
                              <i data-feather="plus" className="me-2"></i> Add
                              New Card
                            </button>
                          </div>

                          <div className="row g-4">
                            <div className="col-xxl-4 col-xl-6 col-lg-12 col-sm-6">
                              <div className="payment-card-detail">
                                <div className="card-details">
                                  <div className="card-number">
                                    <h4>XXXX - XXXX - XXXX - 2548</h4>
                                  </div>

                                  <div className="valid-detail">
                                    <div className="title">
                                      <span>valid</span>
                                      <span>thru</span>
                                    </div>
                                    <div className="date">
                                      <h3>08/05</h3>
                                    </div>
                                    <div className="primary">
                                      <span className="badge bg-pill badge-light">
                                        primary
                                      </span>
                                    </div>
                                  </div>

                                  <div className="name-detail">
                                    <div className="name">
                                      <h5>Audrey Carol</h5>
                                    </div>
                                    <div className="card-img">
                                      <img
                                        src="../assets/images/payment-icon/1.jpg"
                                        className="img-fluid  lazyloaded"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="edit-card">
                                  <Link
                                    data-bs-toggle="modal"
                                    data-bs-target="#editCard"
                                    to="#"
                                    onClick={handleShow}
                                  >
                                    <i className="far fa-edit"></i> edit
                                  </Link>
                                  <Link
                                    to="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#removeProfile"
                                  >
                                    <i className="far fa-minus-square"></i>{" "}
                                    delete
                                  </Link>
                                </div>
                              </div>

                              <div className="edit-card-mobile">
                                <Link
                                  data-bs-toggle="modal"
                                  data-bs-target="#editCard"
                                  to="#"
                                  onClick={handleShow}
                                >
                                  <i className="far fa-edit"></i> edit
                                </Link>
                                <Link to="#">
                                  <i className="far fa-minus-square"></i>
                                  delete
                                </Link>
                              </div>
                            </div>

                            <div className="col-xxl-4 col-xl-6 col-lg-12 col-sm-6">
                              <div className="payment-card-detail">
                                <div className="card-details card-visa">
                                  <div className="card-number">
                                    <h4>XXXX - XXXX - XXXX - 1536</h4>
                                  </div>

                                  <div className="valid-detail">
                                    <div className="title">
                                      <span>valid</span>
                                      <span>thru</span>
                                    </div>
                                    <div className="date">
                                      <h3>12/23</h3>
                                    </div>
                                    <div className="primary">
                                      <span className="badge bg-pill badge-light">
                                        primary
                                      </span>
                                    </div>
                                  </div>

                                  <div className="name-detail">
                                    <div className="name">
                                      <h5>Leah Heather</h5>
                                    </div>
                                    <div className="card-img">
                                      <img
                                        src="../assets/images/payment-icon/2.jpg"
                                        className="img-fluid  lazyloaded"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="edit-card">
                                  <Link
                                    data-bs-toggle="modal"
                                    data-bs-target="#editCard"
                                    to="#"
                                    onClick={handleShow}
                                  >
                                    <i className="far fa-edit"></i> edit
                                  </Link>
                                  <Link
                                    to="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#removeProfile"
                                  >
                                    <i className="far fa-minus-square"></i>{" "}
                                    delete
                                  </Link>
                                </div>
                              </div>

                              <div className="edit-card-mobile">
                                <Link
                                  data-bs-toggle="modal"
                                  data-bs-target="#editCard"
                                  to="#"
                                  onClick={handleShow}
                                >
                                  <i className="far fa-edit"></i> edit
                                </Link>
                                <Link to="#">
                                  <i className="far fa-minus-square"></i>
                                  delete
                                </Link>
                              </div>
                            </div>

                            <div className="col-xxl-4 col-xl-6 col-lg-12 col-sm-6">
                              <div className="payment-card-detail">
                                <div className="card-details dabit-card">
                                  <div className="card-number">
                                    <h4>XXXX - XXXX - XXXX - 1366</h4>
                                  </div>

                                  <div className="valid-detail">
                                    <div className="title">
                                      <span>valid</span>
                                      <span>thru</span>
                                    </div>
                                    <div className="date">
                                      <h3>05/21</h3>
                                    </div>
                                    <div className="primary">
                                      <span className="badge bg-pill badge-light">
                                        primary
                                      </span>
                                    </div>
                                  </div>

                                  <div className="name-detail">
                                    <div className="name">
                                      <h5>mark jecno</h5>
                                    </div>
                                    <div className="card-img">
                                      <img
                                        src="../assets/images/payment-icon/3.jpg"
                                        className="img-fluid  lazyloaded"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="edit-card">
                                  <Link
                                    data-bs-toggle="modal"
                                    data-bs-target="#editCard"
                                    to="#"
                                    onClick={handleShow}
                                  >
                                    <i className="far fa-edit"></i> edit
                                  </Link>
                                  <Link
                                    to="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#removeProfile"
                                  >
                                    <i className="far fa-minus-square"></i>{" "}
                                    delete
                                  </Link>
                                </div>
                              </div>

                              <div className="edit-card-mobile">
                                <Link
                                  data-bs-toggle="modal"
                                  data-bs-target="#editCard"
                                  to="#"
                                  onClick={handleShow}
                                >
                                  <i className="far fa-edit"></i> edit
                                </Link>
                                <Link to="#">
                                  <i className="far fa-minus-square"></i>
                                  delete
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    {/* end card history */}
                    {/* address history */}

                    <Tab.Pane eventKey="address">
                      <div
                        className="tab-pane fade show"
                        id="pills-address"
                        role="tabpanel"
                        aria-labelledby="pills-address-tab"
                      >
                        <div className="dashboard-address">
                          <div className="title title-flex">
                            <div>
                              <h2>My Address Book</h2>
                              <span className="title-leaf">
                                <svg className="icon-width bg-gray"></svg>
                              </span>
                            </div>

                            {/* <button
                              className="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3"
                              data-bs-toggle="modal"
                              data-bs-target="#add-address"
                              onClick={addAdderssShow}
                            >
                              <i data-feather="plus" className="me-2"></i> Add
                              New Address
                            </button> */}
                          </div>

                          <div className="row g-sm-4 g-3">
                            <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6">
                              <div className="address-box">
                                <div>
                                  {/* <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="jack"
                                      id="flexRadioDefault2"
                                      checked
                                      onChange={func}
                                    />
                                  </div> */}

                                  <div className="label">
                                    <label>Home</label>
                                  </div>

                                  <div className="table-responsive address-table">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td colSpan="2">
                                            {userdata.first_name}{" "}
                                            {userdata.last_name}
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>Address :</td>
                                          <td>
                                            <p>{userdata.address}</p>
                                          </td>
                                        </tr>

                                        {/* <tr>
                                          <td>Pin Code :</td>
                                          <td>+380</td>
                                        </tr> */}

                                        <tr>
                                          <td>Phone :</td>
                                          <td>+ {userdata.phone_no}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                                <div className="button-group">
                                  <button
                                    className="btn btn-sm add-button w-100"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editProfile"
                                    onClick={handleShow}
                                  >
                                    <i data-feather="edit"></i>
                                    Edit
                                  </button>
                                  {/* <button
                                    className="btn btn-sm add-button w-100"
                                    data-bs-toggle="modal"
                                    data-bs-target="#removeProfile"
                                  >
                                    <i data-feather="trash-2"></i>
                                    Remove
                                  </button> */}
                                </div>
                              </div>
                            </div>

                            <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6">
                              <div className="address-box">
                                <div>
                                  {/* <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="jack"
                                      id="flexRadioDefault3"
                                    />
                                  </div> */}

                                  <div className="label">
                                    <label>Office</label>
                                  </div>

                                  <div className="table-responsive address-table">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td colSpan="2">
                                            {userdata.first_name}{" "}
                                            {userdata.last_name}
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>Address :</td>
                                          <td>
                                            <p>{userdata.address2}</p>
                                          </td>
                                        </tr>

                                        {/* <tr>
                                          <td>Pin Code :</td>
                                          <td>+25</td>
                                        </tr> */}

                                        <tr>
                                          <td>Phone :</td>
                                          <td>+{userdata.phone_no}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                                <div className="button-group">
                                  <button
                                    className="btn btn-sm add-button w-100"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editProfile"
                                    onClick={handleShow}
                                  >
                                    <i data-feather="edit"></i>
                                    Edit
                                  </button>
                                  {/* <button
                                    className="btn btn-sm add-button w-100"
                                    data-bs-toggle="modal"
                                    data-bs-target="#removeProfile"
                                  >
                                    <i data-feather="trash-2"></i>
                                    Remove
                                  </button> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    {/* end address history */}
                    {/* profile history */}

                    <Tab.Pane eventKey="profile">
                      <div
                        className="tab-pane fade show"
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-profile-tab"
                      >
                        <div className="dashboard-profile">
                          <div className="title">
                            <h2>My Profile</h2>
                            <span className="title-leaf">
                              <svg className="icon-width bg-gray"></svg>
                            </span>
                          </div>

                          <div className="profile-detail dashboard-bg-box">
                            <div className="dashboard-title">
                              <h3>Profile Name</h3>
                            </div>
                            <div className="profile-name-detail">
                              <div className="d-sm-flex align-items-center d-block">
                                <h3>
                                  {userdata.first_name} {userdata.last_name}
                                </h3>
                                <div className="product-rating profile-rating">
                                  <ul className="rating">
                                    <li>
                                      <i
                                        data-feather="star"
                                        className="fill"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        data-feather="star"
                                        className="fill"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        data-feather="star"
                                        className="fill"
                                      ></i>
                                    </li>
                                    <li>
                                      <i data-feather="star"></i>
                                    </li>
                                    <li>
                                      <i data-feather="star"></i>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <Link
                                to="#"
                                data-bs-toggle="modal"
                                data-bs-target="#editProfile"
                                onClick={handleShow}
                              >
                                Edit
                              </Link>
                            </div>

                            <div className="location-profile">
                              <ul>
                                <li>
                                  <div className="location-box text-break">
                                    <GoLocation />
                                    <h6>{userdata.address}</h6>
                                  </div>
                                </li>

                                <li>
                                  <div className="location-box">
                                    <GoMail />
                                    <h6>{userdata.email}</h6>
                                  </div>
                                </li>
                              </ul>
                            </div>

                            <div className="profile-description">
                              <p>
                                Residences can be classNameified by and how they
                                are connected to neighbouring residences and
                                land. Different types of housing tenure can be
                                used for the same physical type.
                              </p>
                            </div>
                          </div>

                          <div className="profile-about dashboard-bg-box">
                            <div className="row">
                              <div className="col-xxl-7">
                                <div className="dashboard-title mb-3">
                                  <h3>Profile About</h3>
                                </div>

                                <div className="table-responsive">
                                  <table className="table">
                                    <tbody>
                                      <tr>
                                        <td>Gender :</td>
                                        <td>{userdata.gender}</td>
                                      </tr>
                                      <tr>
                                        <td>Birthday :</td>
                                        <td>
                                          {moment(
                                            userdata.date_of_birth
                                          ).format("YYYY-MM-DD")}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Phone Number :</td>
                                        <td>
                                          <Link to="#">
                                            {" "}
                                            +{userdata.phone_no}
                                          </Link>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Address :</td>
                                        <td>{userdata.address}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>

                                <div className="dashboard-title mb-3">
                                  <h3>Login Details</h3>
                                </div>

                                <div className="table-responsive">
                                  <table className="table">
                                    <tbody>
                                      <tr>
                                        <td>Email :</td>
                                        <td>{userdata.email}</td>
                                      </tr>
                                      <tr>
                                        <td>Password :</td>
                                        <td>
                                          <Link to="#">
                                            <span className="text-dark">
                                              ********
                                            </span>
                                            <span
                                              data-bs-toggle="modal"
                                              data-bs-target="#editProfile"
                                              onClick={ChangepassShow}
                                            >
                                              Change Password
                                            </span>
                                          </Link>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                              <div className="col-xxl-5">
                                <div className="profile-image">
                                  <img
                                    src="../assets/images/inner-page/dashboard-profile.png"
                                    className="img-fluid  lazyload"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    {/* end profile history */}
                    {/* privacy history */}

                    <Tab.Pane eventKey="privacy">
                      <div
                        className="tab-pane fade show"
                        id="pills-security"
                        role="tabpanel"
                        aria-labelledby="pills-security-tab"
                      >
                        <div className="dashboard-privacy">
                          <div className="dashboard-bg-box">
                            <div className="dashboard-title mb-4">
                              <h3>Privacy</h3>
                            </div>

                            <div className="privacy-box">
                              <div className="d-flex align-items-start">
                                <h6>Allows others to see my profile</h6>
                                <div className="form-check form-switch switch-radio ms-auto">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="redio1"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="redio1"
                                  ></label>
                                </div>
                              </div>

                              <p className="text-content">
                                all peoples will be able to see my profile
                              </p>
                            </div>

                            <div className="privacy-box">
                              <div className="d-flex align-items-start">
                                <h6>
                                  who has save this profile only that people see
                                  my profile
                                </h6>
                                <div className="form-check form-switch switch-radio ms-auto">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    // role="switch"
                                    id="redio2"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="redio2"
                                  ></label>
                                </div>
                              </div>

                              <p className="text-content">
                                all peoples will not be able to see my profile
                              </p>
                            </div>

                            <button className="btn theme-bg-color btn-md fw-bold mt-4 text-white">
                              Update
                            </button>
                          </div>

                          <div className="dashboard-bg-box mt-4">
                            <div className="dashboard-title mb-4">
                              <h3>Account settings</h3>
                            </div>

                            <div className="privacy-box">
                              <div className="d-flex align-items-start">
                                <h6>Deleting Your Account Will Permanently</h6>
                                <div className="form-check form-switch switch-radio ms-auto">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    // role="switch"
                                    id="redio3"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="redio3"
                                  ></label>
                                </div>
                              </div>
                              <p className="text-content">
                                Once your account is deleted, you will be logged
                                out and will be unable to log in back.
                              </p>
                            </div>

                            <div className="privacy-box">
                              <div className="d-flex align-items-start">
                                <h6>Deleting Your Account Will Temporary</h6>
                                <div className="form-check form-switch switch-radio ms-auto">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    // role="switch"
                                    id="redio4"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="redio4"
                                  ></label>
                                </div>
                              </div>

                              <p className="text-content">
                                Once your account is deleted, you will be logged
                                out and you will be create new account
                              </p>
                            </div>

                            <button className="btn theme-bg-color btn-md fw-bold mt-4 text-white">
                              Delete My Account
                            </button>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    {/* end privacy history */}
                  </Tab.Content>
                </div>
              </div>
            </div>
          </Tab.Container>
        </div>
      </section>

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

                    onChange={onNameChange}
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
                    onChange={onNameChange}
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
              {/* <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={userdata.password}
                    name={"password"}
                    onChange={OnchangeFistname}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter valid Password
                  </Form.Control.Feedback>
                </Form.Group>
              </div> */}
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
                    onChange={onPhoneNumberChange}
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
                    onChange={onInputChange}
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
                    onChange={onInputChange}
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
                  onChange={onInputChange}
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
                      onChange={onInputChange}
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

      <Modal
        size="md"
        show={Password}
        onHide={ChangepassClose}
        className="changePass_modal"
      >
        <Form noValidate onSubmit={handlePassSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row p-md-3 m-0">
              <div className="col-12">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom01"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    name={"email"}
                    disabled
                  />
                </Form.Group>
              </div>
              <div className="col-12">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom01"
                >
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Current password"
                    value={oldPassword}
                    name={"password"}
                    onChange={handleOldPasswordChange}
                  />
                  {oldPasswordError && (
                    <p className="error-message">{oldPasswordError}</p>
                  )}
                </Form.Group>
              </div>
              <div className="col-12">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="formBasicEmail"
                >
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    name={"new_password"}
                    onChange={handleNewPasswordChange}
                  />
                  {newPasswordError && (
                    <p className="error-message">{newPasswordError}</p>
                  )}
                </Form.Group>
              </div>
              <div className="col-12">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    name={"confirmpassword"}
                    onChange={handleConfirmPasswordChange}
                  />
                </Form.Group>
                {confirmPasswordError && (
                  <p className="error-message">{confirmPasswordError}</p>
                )}
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button
              className="button main_outline_button btn btn-animation "
              onClick={ChangepassClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="button main_button btn theme-bg-color ms-3 fire-button"
              type="submit"
            // onClick={ChangepassClose}
            // type="submit"
            >
              Save Change
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* <Modal size="md" show={addAdderss} onHide={addAdderssClose}>
        <Form
          noValidate
          validated={addAdderssvalidated}
          onSubmit={addAdderssSubmit}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row p-md-3 m-0">
              <div className="col-12">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom01"
                >
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    value={addNewAdderss.addAdderss_name}
                    name={"addAdderss_name"}
                    onChange={OnchangePass}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Please Enter Name
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
                    type="text"
                    placeholder="Add Address"
                    required
                    value={addNewAdderss.new_password}
                    name={"addAdderss_first"}
                    onChange={OnaddAdderss}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Address
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-3 aos_input"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Add Address2</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Add Address2"
                    required
                    value={addNewAdderss.new_password}
                    name={"addAdderss_second"}
                    onChange={OnaddAdderss}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Address2
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="col-12">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Phone Number"
                      required
                      value={addNewAdderss.confirsdm_password}
                      name={"addAdderss_phone"}
                      onChange={OnaddAdderss}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter valid Phone Number
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Pin Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Pin code"
                      required
                      value={addNewAdderss.new_password}
                      name={"addAdderss_pin"}
                      onChange={OnaddAdderss}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Pin Code
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="button main_outline_button btn btn-animation "
              onClick={addAdderssClose}
            >
              Cancel
            </button>
            <button
              className="button main_button btn theme-bg-color ms-3 fire-button"
              // onClick={ChangepassClose}
              type="submit"
            >
              Add Address
            </button>
          </Modal.Footer>
        </Form>
      </Modal> */}
      <Footer />
    </React.Fragment>
  );
}

export default Account;
