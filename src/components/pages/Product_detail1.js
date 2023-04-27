import React, { Fragment, useState } from "react";
import Footer from "../common/footer";
import Header from "../common/header";
import banner1 from "../../Photos/banner/14.jpg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FaStar } from "react-icons/fa";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import Carousel from "react-bootstrap/Carousel";
import "../../CSS/style.css";
import {
  json,
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import moment from "moment";

const ProductDetail = ({ logIn, id, wishlistt, wishlistid }) => {
  var result6;

  const useridd = localStorage.getItem("userid");
  const fname = localStorage.getItem("first_name");
  const [avgRating, setAvgRating] = useState([]);
  const token = localStorage.getItem("token");
  const [ReviewAlert, setReviewAlert] = useState(false);
  const [sizeOn, setSizeOn] = useState(false);
  const [colorValue, setColorValue] = useState("");
  const [getSizOnclor, setGetSizeOnColor] = useState([]);
  const [mycolor, setMycolor] = useState();
  const [apicall, setapicall] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [productprice, setProductprice] = useState();
  const [saleprice, setsaleprice] = useState(0);
  const [mrp, setMrp] = useState();
  const [size, setSize] = useState();
  const [unitQwanity, setUnitQwanity] = useState();
  const [colors, setColors] = useState("");
  const [mfd, setMfd] = useState("");
  const [exp, setExp] = useState("");
  const [qut, setQut] = useState("");
  const [Id, setId] = useState("");
  const [image, setImage] = useState([]);
  // const[image,setImage]=useState('');
  // const[review,setReview]=useState([]);
  const [discount, setDiscount] = useState();
  const [addreviewdata, setaddreviewdata] = useState({
    comment: "",
  });
  const [showImage, setShowImages] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  // const [showbanner, setShowBanner] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [Rrating, setRrating] = useState("");
  // const [mainRrating, setmainRrating] = useState("");

  const [Searchreview, setSearchReview] = useState({
    product_name: "",
    category_type: "",
    status: "",
  });
  let [reviewerror, setReviewError] = useState("");
  // const [rating, setRating] = useState([]);
  let mainRrating;
  let key;
  if (avgRating[1] !== "" || avgRating[1] !== null) {
    {
      (avgRating[1] || []).map((avg, i) => {
        key = i
        return (mainRrating = avg.avgRating);
      });
    }
  }
  let ratingbox = [1, 2, 3, 4, 5];
  let ratingg = mainRrating;
  const currentdate = moment().format("YYYY-MM-DD");

  // var product_details = data3.product_details;
  // var tranding_product = data4.tranding_product;
  let [count, setCount] = useState(1);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [total, settotal] = useState(false);
  /*<-----Increment Functionality----> */
  function incrementCount() {
    if (qut <= count) {
      settotal(true);
    } else {
      count = count + 1;
      setCount(count);
      settotal(false);
    }
  }
  /*<-----Decrement Functionality----> */
  const decrementCount = () => {
    if (count > 1) {
      setCount((count) => count - 1);
    }
    settotal(false);

  };
  re
  // const func = () => {};

  var proid = localStorage.getItem("proid");
  const [varientId, setVeriantId] = useState(localStorage.getItem("variantid"));

  useEffect(() => {
    function getProductDetails() {
      try {
        axios
          .get(`${process.env.REACT_APP_BASEURL}/product_details?id=${proid}`)
          .then((response) => {
            let data = response.data;

            result6 = data.product_verient.filter(
              (thing, index, self) =>
                index === self.findIndex((t) => t.colors == thing.colors)
            );
            setMycolor(result6);

            setProductDetails(data);
            setId(data.product_verient.id);

            setapicall(false);
            OnProductColor(
              data.product_verient[0].colors,
              data.product_verient[0].product_price,
              data.product_verient[0].mrp,
              data.product_verient[0].manufacturing_date,
              data.product_verient[0].expire_date,
              data.product_verient[0].quantity,
              proid,
              varientId
            );
            // console.log(
            //   data.product_verient[0].colors,
            //   data.product_verient[0].product_price,
            //   data.product_verient[0].mrp,
            //   data.product_verient[0].manufacturing_date,
            //   data.product_verient[0].expire_date,
            //   data.product_verient[0].quantity,
            //   proid,
            //   varientId
            // );
          });
      } catch (err) { }
    }

    getProductDetails();
    getVeriantDetails(varientId, proid);
    SelectProduct(colorValue);
  }, [apicall, varientId]);

  /*<-----Functionality for veriant Data of product----> */
  const getVeriantDetails = (varientId, proid) => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_BASEURL}/products_pricing?id=${varientId}&product_id=${proid}&user_id=${useridd}`
        )
        .then((response) => {
          let data = response.data[0];
          console.log("product veriant----" + JSON.stringify(data));
          setProductprice(Number(data.product_price.toFixed(2)));
          setsaleprice(data.sale_price);
          // console.log(Number(data.sale_price.toFixed(2)));
          setMrp(Number(data.mrp).toFixed(2));
          setColors(data.colors);
          setDiscount(data.discount);
          setUnitQwanity(data.unit_quantity);
          setSize(data.size);
          setMfd(data.manufacturing_date);
          setExp(data.expire_date);
          setQut(data.quantity);
          setId(data.id);
          setWishlist(data.wishlist);
          setCart(data.cart_);
        });
    } catch (err) { }
  };

  /*<-----Data retrieval functionality for product details by size----> */
  function SelectProduct(colorValue) {
    try {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/product_details?id=${proid}`)
        .then((response) => {
          let data = response.data;
          // console.log(
          //   "select product Funtion data----" +
          //     JSON.stringify(data.product_verient)
          // );
          let result8 = data.product_verient.filter(
            (item) => item.colors === colorValue
          );
          setGetSizeOnColor(result8);

          // setProductprice(getSizOnclor.product_price);
          // setsaleprice(getSizOnclor.sale_price)
          // setMrp( getSizOnclor.mrp);
          // setColors(getSizOnclor.colors);
          // setDiscount(getSizOnclor.discount);
          // setUnitQwanity(getSizOnclor.unit_quantity)
          // setSize(getSizOnclor.size);
          // setMfd(getSizOnclor.manufacturing_date);
          // setExp(getSizOnclor.expire_date);
          //  setQut(getSizOnclor.quantity)
        });
    } catch (err) { }
  }

  /*<-----Functionality to filter products data by image----> */
  const result = showImage.filter(
    (thing, index, self) =>
      index ==
      self.findIndex((t) => t.product_image_path == thing.product_image_path)
  );

  /*<-----Functionality to Add to cart----> */
  const AddToCart = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/add_to_cart`,
        {
          user_id: "",
          product_view_id: `${Id}`,
          price: `${productDetails.product_verient[0].product_price}`,
          discount: `${productDetails.product_verient[0].discount}`,
          quantity: `${count}`,
          is_active: 1,
        },
        {
          headers: {
            user_token: `${token}`,
          },
        }
      )
      .then((response) => {
        let data = response.data;
        // navigate("/cart")
        setapicall(true);
      });
  };
  /*<-----Functionality to Add to Wishlist----> */
  const AddToWishList = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/add_product_wishlist`,
        {
          user_id: "",
          product_view_id: `${Id}`,
          price: `${productDetails.product_verient[0].product_price}`,
          discount: `${productDetails.product_verient[0].discount}`,
        },
        {
          headers: {
            user_token: `${token}`,
          },
        }
      )
      .then((response) => {
        let data = response.data;
        setProductDetails(data.results);
        setapicall(true);
      })
      .catch(function (error) { });
  };

  /*<-----Functionality to Remove from Wishlist----> */
  const RemoveToWishList = (id, wishlistt, wishlistid) => {
    axios
      .put(
        `${process.env.REACT_APP_BASEURL}/remove_product_from_wishlist`,
        {
          id: Id,
        },
        {
          headers: {
            user_token: `${token}`,
          },
        }
      )
      .then((response) => {
        let data = response.data;

        setapicall(true);
      });
  };

  const OnProductprice = (
    SalePrice,
    product_price,
    mrpp,
    sizee,
    mfdd,
    expp,
    quantityy,
    id,
    productid
  ) => {
    setProductprice(product_price);
    setsaleprice(SalePrice);
    // console.log(Number(SalePrice).toFixed(2));
    setMrp(mrpp);

    setSize(sizee);
    setMfd(mfdd);
    setExp(expp);
    setQut(quantityy);
    setId(id);

    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/product_images_get_singal_veriant?product_id=${productid}&product_verient_id=${id}`
      )
      .then((response) => {
        let data = response.data;
        // console.log("product veriant image--" + JSON.stringify(data));
        setapicall(false);
        setShowImages(data);

        axios
          .get(
            `${process.env.REACT_APP_BASEURL}/product_images_get_singal_veriant?product_id=${productid}&product_verient_id=${id}`
          )
          .then((response) => {
            let data = response.data;
            setapicall(false);
            setShowImages(data);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
  };

  /*<----Functionality to set price as per the quntity---->*/
  const OnUnitQwantiity = (
    unitQwanityy,
    SalePrice,
    product_price,
    mrpp,
    sizee,
    mfdd,
    expp,
    quantityy,
    id,
    productid
  ) => {
    setProductprice(product_price);
    setsaleprice(SalePrice);
    // console.log(Number(SalePrice).toFixed(2));
    setMrp(mrpp);
    setUnitQwanity(unitQwanityy);
    setSize(sizee);
    setMfd(mfdd);
    setExp(expp);
    setQut(quantityy);
    setId(id);

    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/product_images_get_singal_veriant?product_id=${productid}&product_verient_id=${id}`
      )
      .then((response) => {
        let data = response.data;
        // console.log("product veriant image--" + JSON.stringify(data));
        setapicall(false);
        setShowImages(data);

        // axios
        //   .get(
        //     `${process.env.REACT_APP_BASEURL}/product_images_get_singal_veriant?product_id=${productid}&product_verient_id=${id}`
        //   )
        //   .then((response) => {
        //     let data = response.data;
        //     // console.log("product veriant image--" + JSON.stringify(data));
        //     setapicall(false);
        //     setShowImages(data);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
      });
  };

  /*<----Functionality to set price as per the color---->*/
  const OnProductColor = (
    Salepricee,
    color,
    product_price,
    mrpp,
    mfdd,
    expp,
    quantityy,
    veriantid,
    productid
  ) => {
    setsaleprice(Salepricee);
    // console.log(Salepricee);
    setColors(color);
    setProductprice(product_price);
    setMrp(mrpp);
    setMfd(mfdd);
    setExp(expp);
    setQut(quantityy);
    setId(veriantid);
    try {
      axios
        .get(
          `${process.env.REACT_APP_BASEURL}/product_images_get_singal_veriant?product_id=${proid}&product_verient_id=${veriantid}`
        )
        .then((response) => {
          let data = response.data;
          // console.log("veriantDataImage----"+ JSON.stringify (data))
          setapicall(false);
          setShowImages(data);
        });
    } catch (err) { }
    // setImage(product_image_namee);
  };

  /*<----Functionality to get the data of reviews---->*/

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/review_list`, {
        product_name: "",
        status: "",
      })
      .then((response) => {
        let data = response.data;
        // console.log("review data--" + JSON.stringify(data));
        setReviewData(response.data);
        setRrating(data);

        // setSearchReview(response.data)
        setapicall(false);
      });
  }, [apicall, token]);

  // console.log("CONSOLEE"+JSON.stringify(Rrating))

  /*<----Onchange function of send review---->*/
  const handleFormChange = (e) => {
    setaddreviewdata({ ...addreviewdata, [e.target.name]: e.target.value });
  };

  /*<----Onchange function of Rate---->*/
  const onRatingChange = (e) => {
    setRrating(e.target.value);
  };

  /*<----Function to add the review---->*/
  const AddReview = (e) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/review_rating`, {
        user_id: `${useridd}`,
        user_name: fname,
        product_id: `${proid}`,
        product_name: `${productDetails.product_title_name}`,
        review_date: `${currentdate}`,
        review_rating: `${Rrating}`,
        comment: `${addreviewdata.comment}`,
      })

      .then((response) => {
        let data = response.data;
        if (data.message === "User already Reviewed") {
          setReviewError("You alredy Reviewd the product");
          setReviewAlert(false);
        } else {
          setReviewAlert(true);
          setProductDetails(data);
          setaddreviewdata({ ...addreviewdata, comment: "" });
          setRrating(""); // console.log("oooooo-----"+data)
          setapicall(true);
        }
      });
  };

  /*<-----Functionality to close the sweetalert of the successfully added review----> */
  const closeReviewAlert = (e) => {
    setReviewAlert(false);
  };

  /*<-----Functionality to filter products data by rate----> */
  const result1 = ratingbox.filter(
    (thing, index, self) =>
      index === self.findIndex((t, x) => t.review_rating == thing.review_rating)
  );

  /*<-----Functionality to show average rating----> */
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/ratings_review_get`, {
        product_id: `${proid}`,
      })
      .then((response) => {
        let data = response.data;
        setAvgRating(data);
      });
  }, [apicall]);

  /*<-----End secation----> */

  // const avg = avgRating.avgRating.filter((thing, index, self) =>
  // index == self.findIndex((t) => (
  //   t.avgRating == thing.avgRating
  // )))

  // console.log("result3-----"+result3)

  // const result6 = productDetails.product_verient.filter((thing, index, self) =>
  // index === self.findIndex((t) => (
  //   t.size == thing.size
  // )))

  // {productDetails.product_verient.map((details) => {
  //   return (

  //         console.log(details.color)

  //   );
  // })}
  // console.log("hhhhhhh--------"+JSON.stringify(productDetails.product_verient))
  // const arr = productDetails.product_verient.map(object => object.colors)

  // const ids = productDetails.product_verient.map(obj => {
  //   return obj.id;
  // });
  // console.log(ids);

  return (
    <Fragment>
      <Header />

      {/* <!-- Breadcrumb Section Start --> */}
      <section className="breadscrumb-section pt-0">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="breadscrumb-contain">
                <h2>{productDetails.product_title_name}</h2>

                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <NavLink to="/">
                        <i className="fa-solid fa-house"></i>
                      </NavLink>
                    </li>

                    <li className="breadcrumb-item active">
                      {productDetails.product_title_name}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="product-section">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-xl-8 col-lg-7 wow fadeInUp"></div>
            <div className="row g-6">
              <div className="col-xl-6 sm-2 col-lg-7">
                <Carousel variant="dark">
                  {(showImage || []).map((images, i) => {
                    return (
                      <Carousel.Item>
                        {images.product_verient_id == varientId ||
                          images.productid == proid ? (
                          <img
                            key={i}
                            className="d-block"
                            onerror={
                              "this.onerror=null;this.src='https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg'"
                            }
                            src={
                              images.product_image_path
                                ? images.product_image_path
                                : "https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
                            }
                            alt="First slide"
                            name={images.product_image_name}
                            style={{ height: "750px", width: "750px" }}
                          />
                        ) : null}
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>

              <div
                className="col-12 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="right-box-contain">
                  {discount == 0 ||
                    discount == undefined ||
                    discount == "null" ||
                    discount == null ||
                    discount == "" ? (
                    ""
                  ) : (
                    <h6 className="offer-top">{discount}%</h6>
                  )}

                  <h2 className="name">{productDetails.product_title_name}</h2>
                  {/* <h3 className="name">Brand:{productDetails.brand}</h3> */}
                  <div className="price-rating">
                    <h3 className="theme-color price">
                      {saleprice}
                      <del className="text-content">
                        {mrp}
                        {/* {console.log("MRP---" + mrp)} */}
                      </del>
                      {discount == 0 ||
                        discount == null ||
                        discount == "null" ||
                        discount == undefined ||
                        discount == "" ? (
                        ""
                      ) : (
                        <span className="offer theme-color">
                          {Number(discount)} %off
                        </span>
                      )}

                      {/* <h3 className="text-dark">Taxs</h3>
                            <h5>Gst:{productDetails.gst}</h5>
                            <h5>Cgst:{productDetails.cgst}</h5>
                            <h5>Sgst:{productDetails.sgst}</h5> */}
                    </h3>
                    <div className="product-rating custom-rate">
                      <ul className="rating p-0 m-0 mb-2">
                        {
                          // !ratingg? null :
                          (ratingbox || []).map((rat, i) => {
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
                          })
                        }
                      </ul>
                    </div>
                  </div>
                  <button className="btn" style={{ backgroundColor: colors }}>
                    {colors}
                  </button>
                  <div className="procuct-contain">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: productDetails.product_description,
                      }}
                    />
                  </div>

                  {productDetails.product_verient ? (
                    <div className="product-packege">
                      <div className="product-title">
                        <h4>
                          {productDetails.product_verient[0].unit === "gms"
                            ? "Weight"
                            : productDetails.product_verient[0].unit === "piece"
                              ? "Piece"
                              : productDetails.product_verient[0].unit === "pcs"
                                ? "Piece"
                                : productDetails.product_verient[0].unit === "ml"
                                  ? "Volume "
                                  : result
                                    ? ""
                                    : null ||
                                      productDetails.product_verient[0].colors === "red"
                                      ? "Colors"
                                      : productDetails.product_verient[0].colors ===
                                        "black"
                                        ? ""
                                        : productDetails.product_verient[0].colors ===
                                          "yellow"
                                          ? ""
                                          : productDetails.product_verient[0].colors ===
                                            "green"
                                            ? ""
                                            : productDetails.product_verient[0].colors ===
                                              "blue"
                                              ? "Colors"
                                              : null}{" "}
                        </h4>
                      </div>

                      {productDetails.product_verient[0].unit === "pcs" ? (
                        <ul className="select-packege">
                          {productDetails.product_verient[0].size ? (
                            <p className="mb-0 mt-2"> {"Size:"}</p>
                          ) : null}
                          {/* {console.log(
                            "product Data----------" +
                              JSON.stringify(getSizOnclor)
                          )} */}
                          {(getSizOnclor || []).map((details, i) => {
                            return (
                              // getSizOnclor.size==null||getSizOnclor.size==""||getSizOnclor.undefined?"":
                              <li key={i}>
                                <Link
                                  to=""
                                  onClick={() => {
                                    setVeriantId(details.id);
                                  }}
                                  className={
                                    size == details.size &&
                                      varientId == details.id
                                      ? "active"
                                      : null
                                  }
                                >
                                  {details.size}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}

                      {productDetails.product_verient[0].unit === "ml" ? (
                        <ul className="select-packege">
                          {productDetails.product_verient[0].unit ? (
                            <p className="mb-0 mt-2"> {"Volume :"}</p>
                          ) : null}

                          {(productDetails.product_verient || []).map((details, i) => {
                            return (
                              <li key={i}>
                                <Link
                                  to=""
                                  onClick={() => {
                                    OnUnitQwantiity(
                                      details.unit,
                                      details.unit_quantity,
                                      details.sale_price,
                                      details.product_price,
                                      details.mrp,
                                      details.size,
                                      details.manufacturing_date,
                                      details.expire_date,
                                      details.quantity,
                                      details.id,
                                      details.product_id
                                    );
                                  }}
                                  className={
                                    unitQwanity == details.unit_quantity &&
                                      varientId == details.id
                                      ? "active"
                                      : null
                                  }
                                >
                                  {details.unit_quantity}{" "}
                                  {details.unit === "ml"
                                    ? "ML"
                                    : details.unit === "grm"
                                      ? "GRAM"
                                      : null}
                                  {/* {console.log(" size ---"+size+"      varientId"+ varientId + " veriant id from ApI" +details.id)} {console.log(" size from API  ---"+details.size ) } */}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}

                      <ul className="select-packege">
                        {productDetails.product_verient[0].colors ? (
                          <p className="mb-0 mt-2">{"Color:"}</p>
                        ) : null}
                        {(mycolor || []).map((details, i) => {
                          return (
                            <li key={i}>
                              <Link
                                to=""
                                onClick={() => {
                                  setVeriantId(details.id);

                                  setSizeOn(true);
                                  setColorValue(details.colors);
                                }}
                                className={
                                  colors == details.colors &&
                                    varientId == details.id
                                    ? "active"
                                    : null
                                }
                              >
                                {details.colors}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : null}
                  <h6>
                    {qut < 0 ? (
                      <h5 className="text-danger">Out of stock !</h5>
                    ) : (
                      ""
                    )}
                  </h6>

                  {/* <div className="time deal-timer product-deal-timer mx-md-0 mx-auto">
                    <div className="product-title">
                      <h4>Hurry up! Sales Ends In</h4>
                    </div>
                    <ul>
                      <li>
                        <div className="counter">
                          <div>

                            <h6>Days</h6>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="counter">
                          <div>

                            <h6>Hours</h6>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="counter">
                          <div>

                            <h6>Min</h6>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="counter">
                          <div>

                            <h6>Sec</h6>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div> */}
                  {qut < 0 ? (
                    ""
                  ) : (
                    <div className="note-box product-packege">
                      <div className="cart_qty qty-box product-qty">
                        <div className="input-group">
                          <button
                            type="button"
                            className="qty-left-minus"
                            data-type="minus"
                            data-field=""
                            onClick={decrementCount}
                          >
                            <i className="fa fa-minus" aria-hidden="true"></i>
                          </button>
                          <input
                            className="form-control input-number qty-input"
                            type="text"
                            name="quantity"
                            value={count}
                          // onChange={func}
                          />

                          <button
                            type="button"
                            className="qty-right-plus"
                            data-type="plus"
                            data-field=""
                            onClick={() => incrementCount()}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {total === true ? (
                    <p className="mt-1 ms-2 text-danger" type="invalid">
                      Cannot add more then total qty
                    </p>
                  ) : null}
                  <div className="row mt-4">
                    {qut < 0 ? (
                      ""
                    ) : (
                      <div className="col-6 col-xl-3">
                        <button className="btn btn-dark">
                          <Link to="">
                            <i data-feather="heart"></i>

                            {window.location.pathname === "/wishlist" ||
                              window.location.pathname === "/shop" ||
                              wishlist === undefined ||
                              wishlist === "" ||
                              wishlist === null ||
                              wishlist === "null" ? (
                              <span
                                className="text-white"
                                onClick={() => AddToWishList()}
                              >
                                Add To Wishlist
                              </span>
                            ) : (
                              <span
                                className="text-white"
                                onClick={() =>
                                  RemoveToWishList(id, wishlistt, wishlistid)
                                }
                              >
                                Remove
                              </span>
                            )}
                          </Link>
                        </button>
                      </div>
                    )}

                    <div className="col-6 col-xl-3 ">
                      {qut < 0 ? (
                        ""
                      ) : (
                        <button className="btn btn-dark">
                          <div>
                            {cart === undefined ||
                              cart === "" ||
                              cart === null ||
                              cart === "null" ? (
                              <span
                                className="text-white"
                                onClick={() => AddToCart()}
                              >
                                Add To Cart
                              </span>
                            ) : (
                              <span
                                className="text-white"
                                onClick={() => navigate("/cart")}
                              >
                                Buy
                              </span>
                            )}
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                  {/* {result.map((d)=>{
                          return(
                            <> */}
                  <div className="pickup-box">
                    <div className="product-title">
                      <h4>Other Information</h4>
                    </div>
                    <div className="pickup-detail">
                      <h4 className="text-content">
                        {/* {storeInfo.shop_name} */}
                      </h4>
                    </div>

                    <div className="product-info">
                      <ul className="product-info-list product-info-list-2 ">
                        <li>
                          Type :{" "}
                          <span className="text-dark px-2">
                            {productDetails.product_type}
                          </span>
                        </li>
                        <li>
                          Taxs :{" "}
                          <span className="text-dark px-2">
                            Gst:{productDetails.gst} , Sgst:
                            {productDetails.sgst},Cgst:{productDetails.cgst}
                          </span>
                        </li>
                        <li>
                          Veriant ID :{" "}
                          <span className="text-dark px-2">{Id}</span>
                        </li>
                        <li>
                          MFG : <span className="text-dark px-2">{mfd}</span>
                        </li>
                        <li>
                          EXP : <span className="text-dark px-2">{exp}</span>
                        </li>
                        <li>
                          Stock : <span className="text-dark px-2">{qut}</span>
                        </li>
                        <li>
                          Tags : <span className="text-dark px-2">Cake,</span>{" "}
                          <span className="text-dark px-2">Backery</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* );
                  })} */}
              </div>

              <div className="col-12">
                <div className="product-section-box">
                  <Tabs
                    className="nav nav-tabs custom-nav mb-3"
                    id="fill-tab-example"
                    role="tablist"
                    defaultActiveKey="Description"
                  >
                    <Tab
                      className="nav-item"
                      role="presentation"
                      eventKey="Description"
                      title="Description"
                    >
                      {" "}
                      <div
                        className="tab-pane fade show active"
                        id="description"
                        role="tabpanel"
                        aria-labelledby="description-tab"
                      >
                        <div className="product-description">
                          {/* <div className="nav-desh">
                            <div className="desh-title"></div>
                            <p dangerouslySetInnerHTML={{ __html: productDetails.product_description }} />
                          </div> */}

                          <div className="nav-desh">
                            <div className="desh-title">
                              <h5>Organic:</h5>
                            </div>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: productDetails.product_description,
                              }}
                            />
                          </div>

                          {/* <div className="nav-desh">
                            <div className="desh-title mt-3">
                              <h5>From The Manufacturer:</h5>
                            </div>
                            <p dangerouslySetInnerHTML={{ __html: productDetails.product_description }} />
                            <p dangerouslySetInnerHTML={{ __html: productDetails.product_description }} />
                          </div> */}
                        </div>
                      </div>
                    </Tab>

                    <Tab
                      className="nav-item"
                      role="presentation"
                      eventKey="Additional info"
                      title="Additional info"
                    >
                      {
                        <p
                          dangerouslySetInnerHTML={{
                            __html: productDetails.other_introduction,
                          }}
                        />
                      }
                    </Tab>

                    <Tab
                      className="nav-item"
                      role="presentation"
                      eventKey="Care Instuctions"
                      title="Care Instuctions"
                    >
                      <div className="information-box">
                        <ul>
                          <li>
                            Store cream cakes in a refrigerator. Fondant cakes
                            should be stored in an air conditioned environment.
                          </li>

                          <li>
                            Slice and serve the cake at room temperature and
                            make sure it is not exposed to heat.
                          </li>

                          <li>Use a serrated knife to cut a fondant cake.</li>

                          <li>
                            Sculptural elements and figurines may contain wire
                            supports or toothpicks or wooden skewers for
                            support.
                          </li>

                          <li>
                            Please check the placement of these items before
                            serving to small children.
                          </li>

                          <li>The cake should be consumed within 24 hours.</li>

                          <li>Enjoy your cake!</li>
                        </ul>
                      </div>
                      {/* </div> */}
                    </Tab>

                    <Tab
                      className="nav-item"
                      role="presentation"
                      eventKey="Review"
                      title="Review"
                    >
                      <div className="review-box">
                        <div className="row g-4">
                          <div className="col-xl-6">
                            <div className="review-title">
                              <h4 className="fw-500">Customer reviews</h4>
                            </div>
                            {(avgRating[0] || []).map((rating, i) => {
                              let ratingg = Number(rating.review_rating);
                              return (
                                <>
                                  <div key={i} className="d-flex">
                                    <div className="product-rating">
                                      <ul className="rating ">
                                        {
                                          // !ratingg? null :
                                          (ratingbox || [0]).map((rat, i) => {
                                            return ratingg - rat >= 0 ? (
                                              <li color="#ffb321" key={i}>
                                                <FaStar
                                                  icon="star"
                                                  className="feather fill"
                                                  fill={"#ffb321"}
                                                />
                                              </li>
                                            ) : ratingg - rat < 0 &&
                                              ratingg - rat > -1 ? (
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
                                                  className="feather"
                                                  fill={"#ffb321"}
                                                />
                                              </li>
                                            ) : null;
                                          })
                                        }
                                      </ul>
                                    </div>
                                    {(avgRating[1] || []).map((avg, i) => {
                                      return (
                                        <h6 key={i} className="ms-3">
                                          {avg.avgRating} Out Of 5
                                        </h6>
                                      );
                                    })}
                                  </div>
                                </>
                              );
                            })}

                            <div className="accordion-body">
                              <ul className="category-list custom-padding">
                                {(avgRating[0] || []).map((count, i) => {
                                  return (
                                    <>
                                      <li key={i}>
                                        <div className="form-check ps-0 m-0 category-list-box">
                                          <h5>5 Star</h5>
                                          <div className="form-check-label">
                                            <ul className="rating p-0 w-100">
                                              <li>
                                                <div className="rating-list ">
                                                  <div className="progress ">
                                                    <div
                                                      className="progress-bar "
                                                      role="progressbar"
                                                      style={{ width: "50%" }}
                                                      aria-valuenow="100"
                                                      aria-valuemin="0"
                                                      aria-valuemax="100"
                                                    >
                                                      {count.user_count}%
                                                    </div>
                                                  </div>
                                                </div>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </li>

                                      <li>
                                        <div className="form-check ps-0 m-0 category-list-box">
                                          <h5>4 Star</h5>
                                          <div className="form-check-label">
                                            <ul className="rating p-0 w-100">
                                              <li>
                                                <div className="rating-list">
                                                  <div className="progress">
                                                    <div
                                                      className="progress-bar"
                                                      role="progressbar"
                                                      style={{ width: "40%" }}
                                                      aria-valuenow="100"
                                                      aria-valuemin="0"
                                                      aria-valuemax="100"
                                                    >
                                                      {count.user_count}%
                                                    </div>
                                                  </div>
                                                </div>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </li>

                                      <li>
                                        <div className="form-check ps-0 m-0 category-list-box">
                                          <h5>3 Star</h5>
                                          <div className="form-check-label">
                                            <ul className="rating p-0 w-100">
                                              <li>
                                                <div className="rating-list">
                                                  <div className="progress">
                                                    <div
                                                      className="progress-bar"
                                                      role="progressbar"
                                                      style={{ width: "30%" }}
                                                      aria-valuenow="100"
                                                      aria-valuemin="0"
                                                      aria-valuemax="100"
                                                    >
                                                      {count.user_count}%
                                                    </div>
                                                  </div>
                                                </div>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </li>

                                      <li>
                                        <div className="form-check ps-0 m-0 category-list-box">
                                          <h5>2 Star</h5>
                                          <div className="form-check-label">
                                            <ul className="rating p-0 w-100">
                                              <li>
                                                <div className="rating-list">
                                                  <div className="progress">
                                                    <div
                                                      className="progress-bar"
                                                      role="progressbar"
                                                      style={{ width: "20%" }}
                                                      aria-valuenow="100"
                                                      aria-valuemin="0"
                                                      aria-valuemax="100"
                                                    >
                                                      {count.user_count}%
                                                    </div>
                                                  </div>
                                                </div>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </li>

                                      <li>
                                        <div className="form-check ps-0 m-0 category-list-box">
                                          <h5>1 Star</h5>
                                          <div className="form-check-label">
                                            <ul className="rating p-0 w-100">
                                              <li>
                                                <div className="rating-list">
                                                  <div className="progress">
                                                    <div
                                                      className="progress-bar"
                                                      role="progressbar"
                                                      style={{ width: "10%" }}
                                                      aria-valuenow="100"
                                                      aria-valuemin="0"
                                                      aria-valuemax="100"
                                                    >
                                                      {count.user_count}%
                                                    </div>
                                                  </div>
                                                </div>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </li>
                                    </>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>

                          <div className="col-xl-6">
                            <div className="review-title">
                              <h4 className="fw-500">Add a review</h4>
                            </div>
                            <div className="d-flex">
                              <div className="product-rating">
                                <div className="col-md-12">
                                  <Form.Select
                                    aria-label="Search by category"
                                    className="adminselectbox"
                                    placeholder="Search by category"
                                    onChange={(e) => onRatingChange(e)}
                                    name={"review_rating"}
                                    value={addreviewdata.review_rating}
                                  >
                                    <option value={""}>Select Star</option>
                                    {(result1 || []).map((rdata, i) => {
                                      return (
                                        <>
                                          <option key={i} value="1">1 Star</option>
                                          <option value="2">2 Star</option>
                                          <option value="3">3 Star</option>
                                          <option value="4">4 Star</option>
                                          <option value="5">5 Star</option>
                                        </>
                                      );
                                    })}
                                  </Form.Select>
                                  {/* <div className="form-floating theme-form-floating"> */}
                                </div>
                              </div>
                              {/* <div className="product-rating">


                                <ul className="rating">
                                  {ratingbox.map((rdata, i) => {
                                    return (
                                      <li color="#ffb321">
                                        <Form.Check aria-label="option 1"
                                          onChange={(e) => onRatingChange(e)}
                                          name={`review_rating`}
                                          value={rdata}
                                        />
                                        {Rrating === rdata ?
                                          <FaStar
                                            icon="star"
                                            className="feather fill"
                                            fill={"#ffb321"}
                                          />
                                          :

                                          <FaRegStar
                                            icon="star"
                                            className="feather "
                                            fill={"#ffb321"}
                                          />}
                                      </li>
                                    )
                                  })}
                                </ul>

                              </div>  */}
                            </div>
                            <div className="row g-4">
                              <div className="col-md-6">
                                {/* <div className="form-floating theme-form-floating">
                                  <input
                                    type="text"
                                    className="form-control mt-3"
                                    id="name"
                                    name={"user_name"}
                                    onChange={(e) => handleFormChange(e)}
                                    value={addreviewdata.user_name}
                                    placeholder="Name"
                                  />
                                  <label htmlFor="name">Your Name</label>
                                </div> */}
                              </div>

                              <div className="col-md-6">
                                {/* <div className="form-floating theme-form-floating">
                                  <input
                                    type="text"
                                    className="form-control mt-3"
                                    name={"product_name"}
                                    id="product name"
                                    placeholder="Product Name"
                                    onChange={(e) => handleFormChange(e)}
                                    value={addreviewdata.product_name}
                                  />
                                  <label htmlFor="name">Product Name</label>
                                </div> */}
                              </div>

                              {/* <div className="col-md-6">
                                <Form.Select
                                  aria-label="Search by category"
                                  className="adminselectbox"
                                  placeholder="Search by category"
                                  onChange={(e) => handleFormChange(e)}
                                  name={"category_type"}
                                  value={addreviewdata.category_type}
                                >
                                  <option value={""}>Select Categories</option>

                                  <option value="cloth">cloth</option>
                                  <option value="food">Fish & Meat</option>
                                  <option value="baby care">Baby Care</option>
                                </Form.Select>
                                {/* <div className="form-floating theme-form-floating"> 
                              </div> */}

                              {/* <div className="col-md-6">
                                {/* <div className="form-floating theme-form-floating"> 
                                <Form.Select
                                  aria-label="Search by Status"
                                  className="adminselectbox"
                                  name="status"
                                  onChange={(e) => handleFormChange(e)}
                                  value={addreviewdata.status}
                                >
                                  <option>-Status-</option>
                                  <option value="pending"> Pending</option>
                                  <option value="approved">Approved</option>
                                  <option value="blocked">Blocked</option>
                                </Form.Select>*/}
                              {/* <input
                                      type="url"
                                      className="form-control"
                                      id="review1"
                                      placeholder="Give your review a title"
                                    />
                                    <label htmlFor="review1">Review Title</label> */}
                              {/* </div> 
                              </div> */}
                              {/* <div className="col-md-6">
                                <div className="form-floating theme-form-floating">
                                  <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    // placeholder="Select Date"
                                    name={"review_date"}
                                    onChange={(e) => handleFormChange(e)}
                                    value={addreviewdata.review_date}
                                  />
                                  <label htmlFor="date">Date</label>
                                </div>
                              </div> */}
                              <div className="col-12">
                                <div className="form-floating theme-form-floating your_comment">
                                  <textarea
                                    onChange={(e) => handleFormChange(e)}
                                    value={addreviewdata.comment}
                                    name={"comment"}
                                    className="form-control"
                                    placeholder="Leave a comment here"
                                    id="floatingTextarea2"
                                  ></textarea>
                                  <label htmlFor="floatingTextarea2">
                                    Write Your Comment
                                  </label>
                                </div>
                                <div className="mt-2">
                                  {" "}
                                  <small className="text-danger">
                                    {reviewerror}
                                  </small>
                                </div>
                                <NavLink
                                  to=""
                                  onClick={AddReview}
                                  className="btn btn-sm cart-button theme-bg-color text-white mt-3"
                                >
                                  Add Review
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="review-title">
                          <h4 className="fw-500">
                            Customer questions & answers
                          </h4>
                        </div>

                        {reviewData.map((rdataa, i) => {
                          let ratingg = Number(rdataa.review_rating);
                          return (
                            <>
                              {rdataa.status == "approve" ? (
                                <div key={i} className="review-people">
                                  <ul className="review-list">
                                    <li>
                                      <div className="people-box">
                                        <div>
                                          <div className="people-image">
                                            <img
                                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT21WWCZUVMlL375-2A1X0UKkzPtCU3nC9eWK97EHa698V2Rx6YZ1TdiGo1bpBAR6mWh4g&usqp=CAU"
                                              className="img-fluid lazyload"
                                              alt=""
                                            />
                                          </div>
                                        </div>

                                        <div className="people-comment">
                                          <Link to="/">{fname}</Link>
                                          <div className="date-time d-flex d-flex justify-content-between">
                                            <h6 className="text-content">
                                              {moment(currentdate).format(
                                                "YYYY-MM-DD"
                                              )}
                                            </h6>

                                            <div className="product-rating">
                                              <ul className="rating ">
                                                {
                                                  // !ratingg? null :
                                                  (ratingbox || []).map(
                                                    (rat, i) => {
                                                      return ratingg - rat >=
                                                        0 ? (
                                                        <li
                                                          color="#ffb321"
                                                          key={i}
                                                        >
                                                          <FaStar
                                                            icon="star"
                                                            className="feather fill"
                                                            fill={"#ffb321"}
                                                          />
                                                        </li>
                                                      ) : ratingg - rat < 0 &&
                                                        ratingg - rat > -1 ? (
                                                        <li color="#ffb321">
                                                          <FaStarHalfAlt
                                                            icon="star"
                                                            className="feather"
                                                            fill={"#ffb321"}
                                                          />
                                                        </li>
                                                      ) : ratingg - rat <=
                                                        -1 ? (
                                                        <li color="#ffb321">
                                                          <FaRegStar
                                                            icon="star"
                                                            className="feather"
                                                            fill={"#ffb321"}
                                                          />
                                                        </li>
                                                      ) : null;
                                                    }
                                                  )
                                                }
                                              </ul>
                                            </div>
                                          </div>
                                          {rdataa.comment == undefined ||
                                            rdataa.comment == null ||
                                            rdataa.comment == "" ? (
                                            ""
                                          ) : (
                                            <div className="reply">
                                              <p className="w-100">
                                                {rdataa.comment}
                                                {/* <Link to="/">Reply</Link> */}
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              ) : null}
                            </>
                          );
                        })}
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SweetAlert
          show={ReviewAlert}
          title={"Send Review Successfully"}
          onConfirm={() => closeReviewAlert()}
        />
      </section>
      {/* <!-- Product Left Sidebar End --> */}

      <Footer />
    </Fragment>
  );
};
// export {Validation};
export default ProductDetail;
