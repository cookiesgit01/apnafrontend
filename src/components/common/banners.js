import React, { Fragment, useState } from "react";
import ProductBox from "./product-box";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/style.css";
import axios from "axios";
import Header from "./header";
import { Link } from "react-router-dom";
const Benners = (props) => {
  /* <!--Start all state section--> */
  const [productData, setProductData] = useState([]);
  const [productType, setProductType] = useState([]);
  // const [catArray, setcatArray] = useState([]);
  const [unCatArr, setunCatArr] = useState([]);
  // console.log(productData);
  let token = localStorage.getItem("token");
  let userID = localStorage.getItem("userid");
  const [apicall, setapicall] = useState(false);
  const [wlistData, setWlistData] = useState("add");
  const [data, setData] = useState([]);
  const [showbanner, setShowBanner] = useState([]);
  let [count, setCount] = useState(1);
  const navigate = useNavigate();
  /* <!--End all state section--> */

  /* <!--Get product data with api--> */

  // useEffect(() => {
  //   function getproductType() {
  //     try {
  //       axios
  //         .post(
  //           `${process.env.REACT_APP_BASEURL}/home?page=0&per_page=400`,
  //           {
  //             product_search: {
  //               search: `${productType}`,
  //               price_from: "",
  //               price_to: "",
  //               id: "",
  //               product_title_name_asc_desc: "asc",
  //               sale_price: "",
  //               short_by_updated_on: "",
  //               is_delete: ["1"],
  //               product_status: ["approved"],
  //             },
  //           },
  //           {
  //             headers: {
  //               user_token: token,
  //             },
  //           }
  //         )
  //         .then((response) => {
  //           setapicall(false);
  //           // let data = response.data;

  //           setProductData(response.data.results);
  //           // localStorage.setItem("reviewid", response.data.results.id);

  //           // const result = data.results.filter(
  //           //   (thing, index, self) =>
  //           //     index ===
  //           //     self.findIndex((t) => t.product_type === thing.product_type)
  //           // );
  //           // console.log("data  ", result);
  //           // const result = [];
  //           // setunCatArr(result);

  //           (response.data.results||[]).map((product) => {
  //             return setcatArray((catArray,i) => [
  //               ...catArray,
  //               product.product_type,i
  //             ]);
  //           });
  //           setapicall(false);
  //         });
  //     } catch (err) {}
  //   }
  //   getproductType();

  //   setapicall(false);

  //   const result = catArray.filter(
  //     (thing, index, self) => index === self.findIndex((t) => t === thing)
  //   );
  //   setunCatArr(result);
  // }, [productType, token,catArray]);
  /* <!--End this section--> */

  /* <!--Function for map category and same category not show again--> */
  // useEffect(() => {

  // }, [unCatArr, catArray]);
  /* <!--End this section--> */

  /* <!--Add to cart--API Call--> */

  const AddToCart = (id, saleprice, productMRF, wishlistid, count) => {
    if (
      token === "null" ||
      token === "" ||
      token === null ||
      token === undefined ||
      token === true
    ) {
      navigate("/login");
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/add_to_cart`,
          {
            user_id: "",
            product_view_id: `${id}`,
            price: `${saleprice}`,
            discount: `${productMRF}`,
            quantity: count,
            is_active: 1,
          },
          {
            headers: {
              user_token: token,
            },
          }
        )
        .then((response) => {
          let data = response.data;
          setCount(0);
          setData(data);
          setapicall(true);
        });
    }
  };
  /* <!--End this section--> */

  /* <!--Add to wishlist--API Call--> */

  const AddToWishList = (id, wishlistt) => {
    if (
      token === "null" ||
      token === "" ||
      token === null ||
      token === undefined ||
      token === true
    ) {
      navigate("/login");
    } else {
      if (wishlistt > 0) {
        axios
          .put(
            `${process.env.REACT_APP_BASEURL}/remove_product_from_wishlist`,
            {
              id: id,
            },
            {
              headers: {
                user_token: `${token}`,
              },
            }
          )
          .then((response) => {
            // let data = response.data[0];
            setData(response.data);
            setWlistData("add");

            setapicall(true);
          });
      } else {
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
            setData(response.data);
            setWlistData("remove");
            setapicall(true);
          });
      }
    }
  };

  /* <!--End this section--> */
  //   const ShowProduct= ()=>{
  // if(  token === "null" ||
  //      token === "" ||
  //      token === null ||
  //      token === undefined ||
  //     token === true ||
  //     token === "true")
  //     {
  //       function getPro(){
  //         try {
  //           axios .post(`${process.env.REACT_APP_BASEURL}/home?page=0&per_page=10`,{
  //             product_search: {
  //                              search: `${productType}`,
  //                              price_from: "",
  //                              price_to: "",
  //                              id: "",
  //                              is_delete: ["1"],
  //                              product_status: ["approved"],
  //                              product_title_name_asc_desc: "",
  //                              sale_price: "",
  //                              short_by_updated_on: "",
  //                            },
  //           })
  //           .then ((response)=>{
  //             let data = response.data;
  //                          setProductData(response.data.results);
  //                          setapicall(false);
  //           })
  //         } catch (err) {}
  //       }
  //       getPro();
  //     }
  //     else{
  //       if(token)
  //       {
  //         function getPro() {
  //           try{
  //             axios.post(`${process.env.REACT_APP_BASEURL}/home?page=0&per_page=400`, {
  //                                product_search: {
  //                                  search: `${productType}`,
  //                                  price_from: "",
  //                                  price_to: "",
  //                                  id: "",
  //                                  is_delete: ["1"],
  //                                  product_status: ["approved"],
  //                                  product_title_name_asc_desc: "",
  //                                  sale_price: "",
  //                                  short_by_updated_on: "",
  //                                },
  //                              }, {
  //                                    headers: {
  //                                                  user_token: token,
  //                                                },
  //                })
  //                .then((response)=>{
  //                 let data = response.data;
  //                  setProductData(response.data.results);
  //                  setapicall(false);
  //                })
  //           }catch (err) {}
  //         }
  //         getPro();
  //       }
  //       else{
  //         alert("No token saved");
  //       }
  //     }
  //   }

  /* <!--Show product data--API Call--> */
  useEffect(() => {
    if (
      token === "null" ||
      token === "" ||
      token === null ||
      token === undefined ||
      token === true ||
      token === "true"
    ) {
      function getProductData() {
        try {
          axios
            .post(`${process.env.REACT_APP_BASEURL}/home?page=0&per_page=10`, {
              product_search: {
                search: `${productType}`,
                price_from: "",
                price_to: "",
                id: "",
                is_delete: ["1"],
                product_status: ["approved"],
                product_title_name_asc_desc: "",
                sale_price: "",
                short_by_updated_on: "",
              },
            })
            .then((response) => {
              // let data = response.data;
              setProductData(response.data.results);
              setapicall(false);
            });
        } catch (err) { }
      }
      getProductData();
    } else {
      if (token) {
        function getProductData() {
          try {
            axios
              .post(
                `${process.env.REACT_APP_BASEURL}/home?page=0&per_page=400`,
                {
                  product_search: {
                    search: `${productType}`,
                    price_from: "",
                    price_to: "",
                    id: "",
                    is_delete: ["1"],
                    product_status: ["approved"],
                    product_title_name_asc_desc: "",
                    sale_price: "",
                    short_by_updated_on: "",
                  },
                },

                {
                  headers: {
                    user_token: token,
                  },
                }
              )
              .then((response) => {
                // let data = response.data;
                setProductData(response.data.results);
                setapicall(false);
              });
          } catch (err) { }
        }
        getProductData();
      } else {
        alert("No token saved");
      }
    }
  }, [apicall, productType, token]);
  /* <!--End this section--> */

  useEffect(() => {
    setapicall(true);
  }, [props.deleteCart]);

  /* <!--Function for set token and navigate from product details page--> */

  const clickProduct = (productid, id) => {
    setunCatArr("")
    localStorage.setItem("proid", productid);
    localStorage.setItem("variantid", id);
    navigate("/product-detail");
  };
  /* <!--End this section--> */

  /* <!--Show banner--Api Call--> */
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/banner_list`, {
        banner_id: "",
        title: "",
        banner_location: "",
      })
      .then((response) => {
        // let data = response.data;
        setShowBanner(response.data);
      });
  }, [apicall, userID]);
  /* <!--End this section--> */

  /* <!--Start body of banner page--> */

  return (
    <Fragment>
      <div style={{ display: "none" }}>{(data, count, wlistData)}</div>
      <Header addcart={AddToCart} />

      {/*<!--Start banner section-->*/}

      <section className="home-section-2 section-b-space">
        <div className="container-fluid-lg">
          <div className="row g-4">
            <div className="col-xxl-6 col-xl-8 col-md-6">
              {(showbanner || []).map((img, i) => {
                // console.log("mapid--" + JSON.stringify(mapid));
                return (
                  <>
                    <div className="home-contain " key={i} >
                      {img.banner_location === "home_page_left_side" ? (
                        <>
                          <img
                            src={img.image}
                            className="img-fluid bg-img lazyload "
                            alt="newimage"
                            name="image"
                          />
                          <div
                            className="home-detail w-50 p-center-left"
                          >
                            <div >

                              <h3 className="ls-expanded theme-color">
                                ORGANIC
                              </h3>
                              <h1 className="fw-bold w-100 text-white">
                                {img.title}
                              </h1>
                              <h3 className="text-content fw-light text-white">
                                Fruit & Vegetables
                              </h3>
                              <p className="d-sm-block d-none text-white">
                                {img.description}
                              </p>
                              <Link to={img.banner_url}>
                                <button
                                  className="btn mt-sm-4 btn-2 theme-bg-color text-white mend-auto btn-2-animation"
                                >
                                  Shop Now
                                </button>
                              </Link>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </>
                );
              })}
            </div>

            <div className="col-xxl-3 col-xl-4 col-md-6 ratio_medium">
              {(showbanner || []).map((img, i) => {
                return (
                  <>
                    <div className="home-contain" key={i} >
                      {img.banner_location === "home_page_left_side(1)" ? (
                        <>
                          <img
                            src={img.image}
                            className="img-fluid bg-img lazyload"
                            alt="newimage"
                            name="image"
                            style={{ height: "695px" }}
                          />

                          <div
                            className="home-detail text-center p-top-center w-100 "
                          >
                            <div >
                              <h2 className="fw-bold text-white">
                                {img.title}
                              </h2>
                              <h3 className="text-white">{img.description}</h3>
                              <Link to={img.banner_url}>
                                <button
                                  className="btn bg-white theme-color mt-3 home-button mx-auto btn-2"
                                >
                                  Shop Now
                                </button>
                              </Link>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </>
                );
              })}
            </div>

            <div className="col-xxl-3 ratio_65">
              <div className="row g-4">
                <div className="col-xxl-12 col-sm-6">
                  {(showbanner || []).map((img, i) => {
                    return (
                      <>
                        <div className="home-contain" key={i} >
                          {img.banner_location === "home_page_right_side(1)" ? (
                            <>
                              <a href="shop-left-sidebar.html">
                                <img
                                  src={img.image}
                                  className="img-fluid bg-img lazyload"
                                  alt="newimage"
                                  name="image"
                                />
                              </a>

                              <div
                                className="home-detail  p-center text-center"
                              >
                                <div >
                                  <h3 className="text-center text-white">
                                    {img.title}
                                  </h3>
                                  <h4 className="text-center text-white">
                                    {img.description}
                                  </h4>
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </>
                    );
                  })}
                </div>

                <div className="col-xxl-12 col-sm-6">
                  {(showbanner || []).map((img, i) => {
                    return (
                      <>
                        <div className="home-contain" key={i} >
                          {img.banner_location === "home_page_right_side(2)" ? (
                            <>
                              <a href="shop-left-sidebar.html">
                                <img
                                  src={img.image}
                                  className="img-fluid bg-img lazyload "
                                  alt="newimage"
                                  name="image"
                                />
                              </a>
                              <div
                                className="home-detail  w-50 p-center-left home-p-sm"

                              >
                                <div >
                                  <h3 className="fw-bold text-white">
                                    {img.title}
                                  </h3>
                                  <h5 className=" text-white">
                                    {img.description}
                                  </h5>
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*<!--End banner section-->*/}

      {/*<!--Show product section-->*/}
      <div className="all_catagrey_tabs">
        <section className="product-section">
          <div className="container-fluid-lg">
            <div className="title title">
              <h2 className="mb-lg-0 mb-2">{productType}</h2>
              <div className="cat_div">
                <button
                  className="btn theme-bg-color btn-md ms-1 mx-auto text-white"
                  onClick={() => setProductType("")}
                >
                  All
                </button>
                {(unCatArr || []).map((catArr, i) => {
                  return (
                    <button
                      className="btn theme-bg-color btn-md ms-1 mx-auto text-white"
                      onClick={() => setProductType(catArr)}
                    >
                      {catArr}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="all"
                role="tabpanel"
                aria-labelledby="all-tab"
              >
                <div className="row w-100 ms-0">
                  {(productData || []).map((product, i) => {
                    return product.product_status === "approved" ? (
                      <div key={i}
                        className="col-xxl-2 col-lg-3 col-md-4 col-6 wow fadeInUp"
                      >
                        <ProductBox

                          id={product.id}
                          image={product.image}
                          name={product.product_title_name}
                          quantity={product.quantity}
                          productPrice={product.product_price}
                          productMRF={product.mrp}
                          productid={product.product_id}
                          discount={product.discount}
                          special_offer={product.special_offer}
                          // rating={product.rating}
                          producttype={product.product_type}
                          saleprice={product.sale_price}
                          wishlistt={product.wishlist}
                          clickProduct={clickProduct}
                          AddToWishList={AddToWishList}
                          AddToCart={AddToCart}
                          allimages={product.all_images}
                          cart={product.cart}
                          is_featured={product.is_featured}
                          is_special_offer={product.is_special_offer}
                          avgRatings={product.avgRatings}
                        />
                      </div>
                    ) : (
                      ""
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/*<!--End show product section-->*/}

      {/* <!--Show top product--> */}
      <section className="product-section">
        <div className="container-fluid-lg">
          <div className="title title-flex">
            <h2 className="mb-lg-0 mb-2">Top Products</h2>
          </div>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="all"
              role="tabpanel"
              aria-labelledby="all-tab"
            >
              <div className="row w-100 ms-0">
                {(productData || []).map((product, i) => {

                  return (product.product_status === "approved") && (product.is_featured === 1 || product.is_special_offer === 1) ? (
                    <div key={i}
                      className="col-xxl-2 col-lg-3 col-md-4 col-6 wow fadeInUp"
                    >
                      <ProductBox

                        id={product.id}
                        image={product.image}
                        name={product.product_title_name}
                        quantity={product.quantity}
                        productPrice={product.product_price}
                        productMRF={product.mrp}
                        productid={product.product_id}
                        discount={product.discount}
                        special_offer={product.special_offer}
                        // rating={product.rating}
                        producttype={product.product_type}
                        saleprice={product.sale_price}
                        wishlistt={product.wishlist}
                        clickProduct={clickProduct}
                        AddToWishList={AddToWishList}
                        AddToCart={AddToCart}
                        allimages={product.all_images}
                        cart={product.cart}
                        is_featured={product.is_featured}
                        is_special_offer={product.is_special_offer}
                        avgRatings={product.avgRatings}
                      />
                    </div>
                  ) : (
                    ""
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Product Sction End --> */}
      {/* <!-- Banner Section Start --> */}

      {/*<!--Start top product banner-->*/}

      <section className="banner-section">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="banner-contain-3 section-b-space section-t-space hover-effect w-100 ">
                {(showbanner || []).map((img, i) => {
                  return (
                    <>

                      {img.banner_location === "top_product_banner" ? (
                        <>
                          <img
                            src={img.image}
                            className="img-fluid bg-img w-100 h-50"
                            alt="newimage"
                            name="image"
                          />
                          <div className="banner-detail p-center text-dark text-center p-0">
                            <div>
                              <h4 className="ls-expanded text-uppercase theme-color">
                                {/* Try Our New */}
                                {img.title}
                              </h4>
                              {/* <h2 className="my-3">
                      100% Organic Best Quality Best Price
                    </h2> */}
                              <h4 className="text-content fw-300">
                                {/* Best Apna Organic Food Quality */}
                                {img.description}
                              </h4>
                              <Link to={img.banner_url}>
                                <button className="btn theme-bg-color mt-sm-4 btn-md mx-auto text-white fw-bold">
                                  Shop Now
                                </button>
                              </Link>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*<!--End top product banner-->*/}
    </Fragment>
  );
};

/*<!--End bannner page section-->*/

export default Benners;
