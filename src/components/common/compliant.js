import React, { useState } from "react";
import axios from "axios";

function Compliant() {
  const token = localStorage.getItem("token");
  const [Complainent, setComplainent] = useState(false);
  const [Enquire, setEnquire] = useState(false);
  const [orderId, setorderId] = useState([]);
  const [OrderData, setOrderData] = useState(false);
  const [input, setInput] = useState(false);
  const [id, setid] = useState();
  const [ContactData, setContactData] = useState({
    first_name: "",
    last_name: "",
    contect_no: "",
    email: "",
    subject: "",
    description: "",
    other: "",
  });
  const [error, setError] = useState("");

  //   Function od on change of contact type :-
  const onContactTypeChange = (e) => {
    if (e.target.value === "Complainent") {
      setEnquire(false);
      setComplainent(true);
      setError("");
    } else if (e.target.value === "Enquire") {
      setComplainent(false);
      setEnquire(true);
      setError("");
    } else if (e.target.value === "select") {
      setComplainent(false);
      setEnquire(false);
      setOrderData(false);
    }
  };

  //   Function od on change of Complainent type :-
  const onComplainentTypeChange = (e) => {
    if (e.target.value === "payment") {
      setOrderData(true);
      OnOrderclick();
    } else if (e.target.value === "order") {
      setOrderData(true);
      OnOrderclick();
    } else if (e.target.value === "other") {
      setOrderData(false);
      setInput(true);
    } else if (e.target.value === "select") {
      setOrderData(false);
    }
  };

  //   Function od on change of Enquire type :-
  const onEnquireTypeChange = (e) => {
    if (e.target.value === "payment") {
      setOrderData(true);
      OnOrderclick();
    } else if (e.target.value === "order") {
      setOrderData(true);
      OnOrderclick();
    } else if (e.target.value === "other") {
      setOrderData(false);
      setInput(true);
    } else if (e.target.value === "select") {
      setOrderData(false);
    }
  };

  // Onchange function :-
  const change = (e) => {
    setContactData({ ...ContactData, [e.target.name]: e.target.value });
  };
  // Api to get the order list
  const OnOrderclick = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/user_orders`, {
        headers: {
          user_token: token,
        },
      })
      .then((response) => {
        setorderId(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   Api integration :-
  let Submit = (e) => {
    e.preventDefault();
    if (id === null || id === "" || id === undefined) {
      setError("Please select the contact type");
    } else {
      let data = {
        order_id: input === true ? ContactData.other : id,
        subject: ContactData.subject,
        description: ContactData.description,
      };
      axios
        .post(`${process.env.REACT_APP_BASEURL}/add_complaint`, data, {
          headers: {
            user_token: token,
          },
        })
        .then((response) => {
          setContactData({
            ...ContactData,
            subject: "",
            description: "",
            other: "",
          });
          setid();
          setEnquire(false);
          setComplainent(false);
          setorderId(false);
          setInput(false);
          setOrderData(false);
          alert("Message sent Succesfully");
        })
        .catch((err) => {
          console.log(err);
        });
      return false;
    }
  };
  return (
    <form onSubmit={Submit} className="col-xxl-6">
      <div>
        <div className="right-sidebar-box">
          <div className="title">
            <h2>Contact Us</h2>
          </div>
          <div className="row">
            {/* Select box to select the contact type :-  */}
            <div className="col-xxl-12 col-md-6">
              <div className="mb-md-4 mb-3 custom-form">
                <label
                  htmlFor="exampleFormControlInput3"
                  className="form-label"
                >
                  Contact Type
                </label>
                <div className="custom-input">
                  <select
                    required
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput3"
                    placeholder="Enter Your Phone Number"
                    maxLength="10"
                    onChange={onContactTypeChange}
                  >
                    <option
                      value={"select"}
                      onChange={(e) => onContactTypeChange(e)}
                    >
                      select the option{" "}
                    </option>
                    <option
                      value={"Complainent"}
                      onChange={(e) => onContactTypeChange(e)}
                    >
                      Complaint
                    </option>
                    <option
                      value={"Enquire"}
                      onChange={(e) => onContactTypeChange(e)}
                    >
                      Enquire
                    </option>
                  </select>
                  <i className="fa fa-address-card"></i>
                </div>
              </div>
              {Complainent === false || Enquire === false ? (
                <small className="text-danger">{error}</small>
              ) : null}
            </div>
            {/* Hide or show the sub-select box of "Contact type" of complainent :- */}
            {Complainent === true ? (
              <div className="col-xxl-12 col-md-6">
                <div className="mb-md-4 mb-3 custom-form">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    Complaint Type
                  </label>
                  <div className="custom-input">
                    <select
                      required
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput3"
                      placeholder="Enter Your Phone Number"
                      maxLength="10"
                      onChange={onComplainentTypeChange}
                    >
                      <option
                        value={"select"}
                        onChange={(e) => onEnquireTypeChange(e)}
                      >
                        select the option{" "}
                      </option>
                      <option
                        value={"payment"}
                        onChange={(e) => onComplainentTypeChange(e)}
                      >
                        Payment
                      </option>
                      <option
                        value={"order"}
                        onChange={(e) => onComplainentTypeChange(e)}
                      >
                        Order
                      </option>
                      <option
                        value={"other"}
                        onChange={(e) => onComplainentTypeChange(e)}
                      >
                        Other
                      </option>
                    </select>
                    <i className="fa fa-comments"></i>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Hide or show the sub-select box of "Contact type" of Enqurie :- */}
            {Enquire === true ? (
              <div className="col-xxl-12 col-md-6">
                <div className="mb-md-4 mb-3 custom-form">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    Enquire Type
                  </label>
                  <div className="custom-input">
                    <select
                      type="text"
                      required
                      className="form-control"
                      id="exampleFormControlInput3"
                      placeholder="Enter Your Phone Number"
                      maxLength="10"
                      onChange={onEnquireTypeChange}
                    >
                      <option
                        value={"select"}
                        onChange={(e) => onEnquireTypeChange(e)}
                      >
                        select the option{" "}
                      </option>
                      <option
                        value={"payment"}
                        onChange={(e) => onEnquireTypeChange(e)}
                      >
                        Payment
                      </option>
                      <option
                        value={"order"}
                        onChange={(e) => onEnquireTypeChange(e)}
                      >
                        Order
                      </option>
                      <option
                        value={"other"}
                        onChange={(e) => onEnquireTypeChange(e)}
                      >
                        Other
                      </option>
                    </select>
                    <i className="fa fa-question-circle"></i>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Order list :- */}
            {OrderData === true ? (
              <div className="col-xxl-12 col-md-6">
                <div className="mb-md-4 mb-3 custom-form">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    Order list{" "}
                  </label>
                  <div className="custom-input">
                    <select
                      type="text"
                      required
                      className="form-control"
                      id="exampleFormControlInput3"
                      placeholder="Enter Your Phone Number"
                      maxLength="10"
                      onChange={(e) => {
                        setid(e.target.value);
                      }}
                    //   onChange={onContactTypeChange}
                    >
                      <option
                        value={"select"}
                      // onChange={(e) => onContactTypeChange(e)}
                      >
                        select the option{" "}
                      </option>
                      {(orderId || []).map((item, i) => {
                        return (
                          <>
                            <option key={i} value={item.order_id}>
                              {item.order_id}
                            </option>
                          </>
                        );
                      })}
                    </select>
                    <i className="fab fa-first-order"></i>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Other when the user did not select other option:- */}
            {input === true ? (
              <div className="col-md-6">
                <div className="mb-md-4 mb-3 custom-form">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Other
                  </label>
                  <div className="custom-input">
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="other"
                      placeholder={
                        Complainent === true
                          ? "Other Complaint"
                          : "Other Enquire"
                      }
                      value={ContactData.other}
                      onChange={change}
                      name="other"
                    />

                    <i className="fa-solid fa-user"></i>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="col-md-6">
              <div className="mb-md-4 mb-3 custom-form">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Subject
                </label>
                <div className="custom-input">
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="subject"
                    placeholder={"Subject"}
                    value={ContactData.subject}
                    onChange={change}
                    name="subject"
                  />

                  <i className="fa-solid fa-user"></i>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="mb-md-4 mb-3 custom-form">
                <label
                  htmlFor="exampleFormControlTextarea"
                  className="form-label"
                >
                  Message
                </label>
                <div className="custom-textarea">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea"
                    placeholder="Enter Your Message"
                    rows="6"
                    value={ContactData.description}
                    onChange={change}
                    required
                    name="description"
                  ></textarea>
                  <i className="fa-solid fa-message"></i>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-animation btn-md fw-bold ms-auto"
          >
            Send Message
          </button>
        </div>
      </div>
    </form>
  );
}

export default Compliant;
