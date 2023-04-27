import React, { Fragment } from "react";
import Banner from "../../Photos/login.png";
import Footer from "../common/footer";
import Header from "../common/header";
// import Breadcumb from "../common/beadcumb";
import "../../CSS/style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import axios from "axios";

const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState([]);
  const [otp, setotp] = useState(0);
  // const [otperror, setOtperror] = useState(false);
  const [emailerror, setemailerror] = useState(false);
  const [passval, setpassval] = useState("");
  // countdown
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setemailerror("resend");
      // Render a complete state
      // return <Completionist />;
    } else {
      // Render a countdown
      return (
        <h4 className="mt-2 ms-2 text-danger mx-3">
          {hours}:{minutes}:{seconds}
        </h4>
      );
    }
  };
  // end countdown
  const handleFormChange = (e) => {
    setEmail(e.target.value);
    setemailerror("");
    // setForgotInfo({...forgotInfo,[e.target.name]: e.target.value})
  };
  const onPasswordChange = (e) => {
    setpassval(e.target.value);
    setemailerror("");
  };
  const OnOtpChange = (e) => {
    setotp(e.target.value);
    setemailerror("");
  };
  const forgotPassword = () => {
    if (email === "") {
      setemailerror("invalid address");
    } else {
      setemailerror("timer");
      axios
        .post(`http://192.168.29.108:5000/user_forgot_password`, {
          email: `${email}`,
        })
        .then((response) => {
          if (response.data.message === "User Not Found") {
            setemailerror("email not found");
          } else if (
            response.data.message === "Send otp in Gmail Succesfully"
          ) {
            setemailerror("");
          }
          // navigate("/forgot");
          // localStorage.setItem("useridd" , response.data.user_id)
          // navigate('/login')
          // return response;
        })
        .catch((error) => {
          console.log(error);
          if (error.message === "Request failed with status code 513") {
            setemailerror("email not found");
          }
        });
    }
  };
  const VerifyOTP = (e) => {
    if (email === "") {
      setemailerror("invalid address");
    } else if (otp === "") {
      setemailerror("blank otp");
    } else if (passval === "") {
      setemailerror("blank pass");
    } else {
      e.preventDefault();
      axios
        .post(`${process.env.REACT_APP_BASEURL}/otp_verification`, {
          email: email,
          otp: Number(otp),
          password: passval,
        })
        .then((response) => {
          if (response.data.response === "please fill all input fields") {
            setemailerror("all blank");
          } else if (response.data.message === "otp not matched") {
            setemailerror("otp not matched");
          } else if (response.data.message === "email address not matched") {
            setemailerror("email not found");
          } else {
            localStorage.setItem("userid", response.data.insertId);
            localStorage.setItem("upassword", passval);
            navigate("/login");
            // return response;
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.message === "Request failed with status code 513") {
            setemailerror("email not found");
          }
        });
    }
  };
  return (
    <Fragment>
      <Header />
      {/* <Breadcumb pageName={"Forgot Passwrod"} pageTitle={"Forgot Passwrod"} /> */}
      {/* <!-- log in section start --> */}
      <section className="log-in-section section-b-space forgot-section">
        <div className="container-fluid-lg w-100">
          <div className="row">
            <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
              <div className="image-contain">
                <img src={Banner} className="img-fluid" alt="" />
              </div>
            </div>
            <div className="col-xxl-4 col-xl-5 col-lg-6 me-auto">
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="log-in-box">
                  <div className="log-in-title">
                    <h3>Welcome To Apna Organic</h3>
                    <h4>Forgot your password</h4>
                  </div>

                  <div className="input-box">
                    <form
                      className="row g-4"
                      onSubmit={otp === 0 ? forgotPassword : VerifyOTP}
                    >
                      <div className="col-12">
                        <div className="form-floating theme-form-floating log-in-form">
                          <input
                            disabled={emailerror === "timer" ? true : false}
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email Address"
                            onChange={(e) => handleFormChange(e)}
                            value={email}
                            name={"email"}
                          />
                          <label htmlFor="email">Email Address</label>
                        </div>
                        {emailerror === "email not found" ? (
                          <p className="mt-1 ms-2 text-danger" type="invalid">
                            Please Fill the valid Email !!!!
                          </p>
                        ) : emailerror === "invalid address" ? (
                          <p className="mt-1 ms-2 text-danger" type="invalid">
                            Please Fill the Email First!!!!
                          </p>
                        ) : null}
                        {emailerror === "timer" ? (
                          <Countdown
                            date={Date.now() + 30000}
                            renderer={renderer}
                          />
                        ) : null}
                        <div className="col-12 mt-3">
                          <button
                            disabled={emailerror === "timer" ? true : false}
                            className="btn btn-animation w-100"
                            type="button"
                            onClick={forgotPassword}
                          >
                            {emailerror === "resend"
                              ? "Resend"
                              : "Forgot Password"}
                          </button>
                        </div>
                      </div>
                      <div className="log-in-title">
                        <h4>Enter one time otp</h4>
                        <h5 className="text-content">
                          A code has been sent to your email
                        </h5>
                      </div>
                      <div
                        id="otp"
                        className="inputs d-flex flex-row justify-content-center"
                      >
                        <input
                          className={"form-control"}
                          type="text"
                          id="first"
                          placeholder="Enter Otp"
                          onChange={(e) => OnOtpChange(e)}
                        />
                      </div>
                      {/* {emailerror === "blank otp" ? (
                        <p className="mt-1 ms-2 text-danger" type="invalid">
                          Please enter your otp !
                        </p>
                      ) : emailerror === "otp not matched" ? (
                        <p className="mt-1 ms-2 text-danger" type="invalid">
                          Please Fill Correct Otp !
                        </p>
                      ) : null} */}
                      {/* <div className="col-12 mt-3">
                        <button
                          className="btn btn-animation w-100"
                          type="button" onClick={VerifyOTP}
                        >
                          VerifyOTP
                        </button>
                      </div> */}
                      {/* {otp === 0 ? ( */}
                      <div className="col-12">
                        <div className="form-floating theme-form-floating">
                          <div className="log-in-title">
                            <h4>Enter New Password</h4>
                          </div>
                          <input
                            type="password"
                            name="password"
                            className={"form-control"}
                            id="password"
                            placeholder="New Password"
                            onChange={(e) => onPasswordChange(e)}
                            disabled={emailerror === "timer" ? true : false}
                          />
                        </div>
                        {emailerror === "blank pass" ? (
                          <p className="mt-1 ms-2 text-danger" type="invalid">
                            Please enter your password !
                          </p>
                        ) : emailerror === "all blank" ? (
                          <p className="mt-1 ms-2 text-danger" type="invalid">
                            please fill all input fields !
                          </p>
                        ) : null}
                      </div>
                      {/* ) : null} */}
                      <div className="col-12 mt-3">
                        <button
                          disabled={emailerror === "timer" ? true : false}
                          className="btn btn-animation w-100"
                          type="button"
                          onClick={VerifyOTP}
                        >
                          Change Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- log in section end --> */}
      <Footer />
    </Fragment>
  );
};
export default Forgot;
