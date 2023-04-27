import React from "react";
import Footer from "../common/footer";
import Header from "../common/header";
import Banner from '../../Photos/login.png'
import { Link } from "react-router-dom";

function otp_verification() {
  return (
    <React.Fragment>
      <Header />
      {" "}
      <section className="log-in-section otp-section section-b-space">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
              <div className="image-contain">
                <img
                  src={Banner}
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>

            <div className="col-xxl-4 col-xl-5 col-lg-6 me-auto">
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="log-in-box">
                  <div className="log-in-title">
                    <h3 className="text-title">
                      Please enter the one time password to verify your account
                    </h3>
                    <h5 className="text-content">
                      A code has been sent to <span>*******9897</span>
                    </h5>
                  </div>

                  <div
                    id="otp"
                    className="inputs d-flex flex-row justify-content-center"
                  >
                    <input
                      className="text-center form-control rounded"
                      type="text"
                      id="first"
                      maxlength="1"
                      placeholder="0"
                    />
                    <input
                      className="text-center form-control rounded"
                      type="text"
                      id="second"
                      maxlength="1"
                      placeholder="0"
                    />
                    <input
                      className="text-center form-control rounded"
                      type="text"
                      id="third"
                      maxlength="1"
                      placeholder="0"
                    />
                    <input
                      className="text-center form-control rounded"
                      type="text"
                      id="fourth"
                      maxlength="1"
                      placeholder="0"
                    />
                    <input
                      className="text-center form-control rounded"
                      type="text"
                      id="fifth"
                      maxlength="1"
                      placeholder="0"
                    />
                    <input
                      className="text-center form-control rounded"
                      type="text"
                      id="sixth"
                      maxlength="1"
                      placeholder="0"
                    />
                  </div>

                  <div className="send-box pt-4">
                    <h5>
                      Didn't get the code?{" "}
                      <Link to="/"
                        className="theme-color fw-bold"
                      >
                        Resend It
                      </Link>
                    </h5>
                  </div>

                  <button
                    onclick="location.href = 'index.html';"
                    className="btn btn-animation w-100 mt-3"
                    type="submit"
                  >
                    Validate
                  </button>
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

export default otp_verification;
