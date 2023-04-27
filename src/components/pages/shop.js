import React, { Fragment, useState } from "react";
import ProductBox from "../common/product-box";
import Footer from "../common/footer";
import Header from "../common/header";
import Breadcumb from "../common/beadcumb";
import { FaStar, FaRegStar } from "react-icons/fa";
import Accordion from "react-bootstrap/Accordion";
import Dropdown from "react-bootstrap/Dropdown";
import "../../CSS/style.css";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import Pagination from "./Pagination"

/*<-------Global varialable------->*/
let showcategorydata = [];

const Shop = (props) => {
  /*<-----State Declaration----> */
  const [prodData, setProdData] = useState([]);
  const [totaldata, settotaldata] = useState("");
  const [click, setclick] = useState(false);
  const [noData, setNoData] = useState(false);
  const [searchText, setsearchText] = useState("");
  const [searchCat, setsearchCat] = useState([]);
  const [branchArr, setbranchArr] = useState([]);
  // const useridd = localStorage.getItem("userid");
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage, setrecordsPerPage] = useState(12);
  const navigate = useNavigate();
  const sidebar = () => {
    setclick(true);
  };
  // const useridd = localStorage.getItem("userid");
  const [searchparams] = useSearchParams();
  const [categorydata, setCategoryData] = useState([]);
  // const [categorynameChange, setCategoryNameChange] = useState(false);
  const [categoryfilterdata, setCategoryfilterData] = useState([]);
  // console.log(categoryfilterdata)
  const [apicall, setapicall] = useState(false);
  const [categoryNamedata, setCategoryNameData] = useState([]);
  const [pricefilter, setpricefilter] = useState({
    to_product_price: "",
    from_product_price: "",
  });
  const [discountfilter, setdiscountfilter] = useState([]);
  const [brandfilter, setbrandfilter] = useState([]);
  const [ratingfilter, setratingfilter] = useState([]);
  // const [data, setData] = useState([]);
  const [wlistData, setWlistData] = useState("add");
  const [isActive, setIsActive] = useState(false);
  // const [subcategory, setsubcategory] = useState(false);
  // console.log(data)

  const [checkboxfilter, setcheckboxfilter] = useState(false);
  const [sortingfilter, setsortingfilter] = useState({
    latest: "",
    aproduct: "",
    hprice: "",
  });
  let [page, setPage] = useState([]);
  // console.log(page)
  /*<-----Token Declaration----> */
  const token = localStorage.getItem("token");

  /*<-----Pagination Calculator----> */
  // const indexOfLastRecord = currentPage * recordsPerPage;
  // console.log(indexOfLastRecord);
  // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // console.log(indexOfFirstRecord);
  // const currentRecords = prodData.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(totaldata / recordsPerPage);

  /*<-----Adding to cart functionality----> */
  const AddToCart = (id, saleprice, productMRF, wishlistid, count) => {
    if (
      token === undefined ||
      token === "null" ||
      token === "" ||
      token === null ||
      token === true
    ) {
      navigate("/login");
    } else {
      let cnt = 1;
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/add_to_cart`,
          {
            user_id: "",
            product_view_id: `${id}`,
            price: `${saleprice}`,
            discount: `${productMRF}`,
            quantity: count === 0 ? cnt : count,
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
          // setData(data);
          setapicall(true);
          localStorage.setItem("cartupdate", true);
          // console.log("ADDCART" + true);
        });
    }
  };

  /*<-----Functionality of adding and deleting products from Wishlist----> */
  const AddToWishList = (id, wishlistt) => {
    if (
      token === undefined ||
      token === "null" ||
      token === "" ||
      token === null ||
      token === true
    ) {
      navigate("/login");
    } else {
      if (wishlistt > 0) {
        axios
          .put(
            `${process.env.REACT_APP_BASEURL}/remove_product_from_wishlist`,
            {
              id: `${id}`,
              user_id: "",
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
            setWlistData(wlistData);
            setapicall(true);
            setIsActive(isActive);
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
                user_token: token,
              },
            }
          )
          .then((response) => {
            // let data = response.data;
            // setData(response.data);
            setWlistData("remove");
            setapicall(true);
            setIsActive(true);
          });
      }
    }
  };

  /*<-----Functionality to go to poduct details page----> */
  const clickProduct = (productid) => {
    localStorage.setItem("proid", productid);
    navigate("/product-detail");
  };

  /*<-----Functionality to search products----> */
  useEffect(() => {
    if (
      searchparams.get("search") === null ||
      searchparams.get("search") === "" ||
      searchparams.get("search") === undefined
    ) {
      setsearchText("");
    } else {
      setsearchText(searchparams.get("search"));
    }
  }, [searchText, searchparams]);

  /*<-----Functionality to filter products by category----> */
  useEffect(() => {
    if (
      searchparams.get("category") === null ||
      searchparams.get("category") === "" ||
      searchparams.get("category") === undefined
    ) {
      setsearchCat("");
    } else {
      setsearchCat(searchparams.get("category"));
      setCategoryNameData((categoryNamedata) => [
        ...categoryNamedata,
        searchparams.get("category"),
      ]);
      setcheckboxfilter(false);
      setbrandfilter([]);
      setratingfilter([]);
      setdiscountfilter([]);
      setpricefilter({
        ...pricefilter,
        to_product_price: "",
        from_product_price: "",
      });
    }
  }, [searchCat, searchparams, pricefilter]);
  // var product = data.product;
  //   product list

  /*<-----Short functionality ----> */
  const onSortingChange = (e) => {
    if (e.target.value === "latest") {
      setsortingfilter({
        ...sortingfilter,
        latest: "desc",
        aproduct: "",
        hprice: "",
      });
    } else if (e.target.value === "aproduct") {
      setsortingfilter({
        ...sortingfilter,
        aproduct: "asc",
        hprice: "",
        latest: "",
      });
    } else if (e.target.value === "zproduct") {
      setsortingfilter({
        ...sortingfilter,
        hprice: "",
        latest: "",
        aproduct: "desc",
      });
    } else if (e.target.value === "hprice") {
      setsortingfilter({
        ...sortingfilter,
        hprice: "desc",
        latest: "",
        aproduct: "",
      });
    } else if (e.target.value === "lprice") {
      setsortingfilter({
        ...sortingfilter,
        hprice: "asc",
        latest: "",
        aproduct: "",
      });
    }
  };

  /*<-----Set the pagination number functionality ----> */
  useEffect(() => {
    let pages = [];
    for (let i = 0; i < nPages; i++) {
      pages.push(i);
    }
    setPage(pages);
  }, [apicall, nPages]);
  // console.log("PAGESS--"+page)
  // console.log("prodData--"+JSON.stringify(prodData))
  // console.log("nPages--"+nPages)


  /*<--------functionality to get the data and filter by parameters----------> */
  useEffect(() => {
    // console.log(showcategorydata);
    // let homeurl;
    if (
      token === "null" ||
      token === "" ||
      token === null ||
      token === undefined ||
      token === true
    ) {
      function getProductData() {
        try {
          axios
            .post(
              `${process.env.REACT_APP_BASEURL}/home?page=${currentPage}&per_page=${recordsPerPage}`,
              // `${process.env.REACT_APP_BASEURL}/home?page=0&per_page=400`,
              {
                product_search: {
                  search: `${searchText}`,
                  price_from: `${pricefilter.from_product_price}`,
                  price_to: `${pricefilter.to_product_price}`,
                  id: `${sortingfilter.latest}`,
                  product_title_name_asc_desc: `${sortingfilter.aproduct}`,
                  sale_price: `${sortingfilter.hprice}`,
                  short_by_updated_on: "",
                  colors: [],
                  size: [],
                  category: [searchCat],
                  brand: brandfilter,
                  discount: discountfilter,
                  avgRatings: ratingfilter,
                  is_delete: ["1"],
                  product_status: ["approved"],
                },
              }
            )
            .then((response) => {
              let data = response.data;
              // console.log(response.data.results, "100001");
              setProdData(data.results);
              settotaldata(data.pagination.totaldata);

              if (
                searchCat.length === 0 &&
                ratingfilter.length === 0 &&
                brandfilter.length === 0 &&
                discountfilter.length === 0 &&
                pricefilter.from_product_price === "" &&
                pricefilter.to_product_price === ""
              ) {
                setCategoryfilterData(data.results);
              }
              setapicall(false);
            });
        } catch (err) { }
      }
      getProductData();
      // homeurl = ;
    } else {
      function getProductData() {
        try {
          axios
            .post(
              `${process.env.REACT_APP_BASEURL}/home?page=${currentPage}&per_page=${recordsPerPage}`,
              // `${process.env.REACT_APP_BASEURL}/home?page=0&per_page=400`,
              {
                product_search: {
                  search: `${searchText}`,
                  price_from: `${pricefilter.from_product_price}`,
                  price_to: `${pricefilter.to_product_price}`,
                  id: `${sortingfilter.latest}`,
                  product_title_name_asc_desc: `${sortingfilter.aproduct}`,
                  sale_price: `${sortingfilter.hprice}`,
                  short_by_updated_on: "",
                  product_type: [],
                  colors: [],
                  size: [],
                  product_status: ["approved"],
                  is_delete: ["1"],
                  brand: brandfilter,
                  discount: discountfilter,
                  avgRatings: ratingfilter,
                  category: [searchCat],
                },
              },
              {
                headers: {
                  user_token: token,
                },
              }
            )
            .then((response) => {
              let data = response.data;
              // console.log(data.results, "20002");
              setProdData(data.results);
              settotaldata(data.pagination.totaldata);
              if (data.results.length === 0) {
                setNoData(true);
              } else {
                setNoData(false);
              }
              if (
                searchCat.length === 0 &&
                ratingfilter.length === 0 &&
                brandfilter.length === 0 &&
                discountfilter.length === 0 &&
                pricefilter.from_product_price === "" &&
                pricefilter.to_product_price === ""
              ) {
                setCategoryfilterData(data.results);
              }
              setapicall(false);
            });
        } catch (err) { }
      }
      getProductData();
    }
  }, [
    apicall,
    categoryNamedata,
    ratingfilter,
    brandfilter,
    discountfilter,
    pricefilter,
    apicall,
    searchText,
    searchCat,
    sortingfilter,
    recordsPerPage,
    currentPage,
    token
  ]);
  /*<--------functionality to get the data of category----------> */
  useEffect(() => {
    function getCategoryData() {
      try {
        axios
          .get(`${process.env.REACT_APP_BASEURL}/get_all_category`)
          .then((response) => {
            let data = response.data;
            // if(response.data==undefined||response.data==""||response.data==null)
            // {
            setCategoryData(data);

            // }
            // console.log(data, "30003");
            setapicall(false);
          });
      } catch (err) { }
    }
    getCategoryData();
  }, [apicall]);
  /*<----Functionality to filter category data and get the data in an array---->*/
  const result = categorydata.filter(
    (thing, index, self) =>
      index ===
      self.findIndex((t, x) => t.root_category_name === thing.root_category_name)
  );

  /*<----Functionality to sub-filter 01 category data and get the data in an array---->*/
  const level1category = categorydata.filter(
    (thing, index, self) =>
      index ===
      self.findIndex(
        (t, x) => t.down1_category_name === thing.down1_category_name
      )
  );

  /*<----Functionality to sub-filter 02 category data and get the data in an array---->*/
  const level2category = categorydata.filter(
    (thing, index, self) =>
      index ===
      self.findIndex(
        (t, x) => t.down2_category_name === thing.down2_category_name
      )
  );
  // const OnCategoryAdd = () => {
  //   setsubcategory(true);
  // };
  //  SEARCH AND SHOW CATEGORY
  // const onCategorySearch = (e) => {
  //   let catname = e.target.value;
  //   if (catname !== "") {
  //     try {
  //       axios
  //         .post(`${process.env.REACT_APP_BASEURL}/search_category`, {
  //           category_name: `${catname}`,
  //         })
  //         .then((response) => {
  //           let data = response.data;
  //           setCategoryData(response.data);
  //           setCategoryNameChange(true);
  //         });
  //     } catch (err) {}
  //   }
  // };
  // const onCategoryNameAdd = (e, id, name) => {
  //   const value = e.target.type === "checkbox" ? e.target.checked : id;
  //   if (e.target.checked === true) {
  //     setCategoryNameData((categoryNamedata) => [...categoryNamedata, id]);
  //     showcategorydata.push(name);
  //   } else {
  //     setCategoryNameData(categoryNamedata.filter((item) => item !== id));
  //     const index = showcategorydata.indexOf(name);
  //     if (index > -1) {
  //       // only splice array when item is found
  //       showcategorydata.splice(index, 1); // 2nd parameter means remove one item only
  //     }
  //   }
  // };

  /*<----Functionality to get data filtered by price---->*/
  const onPriceFilterAdd = (e) => {
    setpricefilter({ ...pricefilter, [e.target.name]: e.target.value });
  };

  /*<----Functionality to get data filtered by discount---->*/
  const onDiscountFilterAdd = (e) => {
    // const value =
    //   e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (e.target.checked === true) {
      setdiscountfilter((discountfilter, index) => [
        setcheckboxfilter(index, true),
        ...discountfilter,
        e.target.value,
      ]);
      showcategorydata.push(e.target.value);
    } else {
      setdiscountfilter(
        discountfilter.filter((item) => item !== e.target.value)
      );
      setcheckboxfilter(false);
      const index = showcategorydata.indexOf(e.target.value);
      if (index > -1) {
        // only splice array when item is found
        showcategorydata.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  };

  /*<----Functionality to get data filtered by brand---->*/
  const onBrandFilterAdd = (e) => {
    // const value =
    //   e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (e.target.checked === true) {
      setbrandfilter((brandfilter) => [...brandfilter, e.target.value]);
      showcategorydata.push(e.target.value);
    } else {
      setbrandfilter(brandfilter.filter((item) => item !== e.target.value));
      const index = showcategorydata.indexOf(e.target.value);
      if (index > -1) {
        // only splice array when item is found
        showcategorydata.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  };
  /*<----Functionality to get data filtered by rating---->*/
  const onRatingFilterAdd = (e) => {
    // const value =
    //   e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (e.target.checked === true) {
      setratingfilter((ratingfilter, index) => [
        setcheckboxfilter(index, true),
        ...ratingfilter,
        e.target.value,
      ]);
      showcategorydata.push(e.target.value);
    } else {
      setratingfilter(ratingfilter.filter((item) => item !== e.target.value));
      setcheckboxfilter(false);
      const index = showcategorydata.indexOf(e.target.value);
      if (index > -1) {
        // only splice array when item is found
        showcategorydata.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  };

  /*<----Functionality to clear all the filters---->*/
  const OnClearAllClick = (e) => {
    setCurrentPage("")
    setrecordsPerPage("")
    showcategorydata = [];
    setcheckboxfilter(false);
    setCategoryNameData("");
    setpricefilter({
      ...pricefilter,
      to_product_price: "",
      from_product_price: "",
    });
    setdiscountfilter("");
    setbrandfilter([]);
    setratingfilter("");
    setapicall(true);
  };
  //   END SEARCH AND SHOW CATEGORY
  // end category

  //   BRAND

  /*<----Called api to get the brand list---->*/
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/brand_list`)
      .then((res) => {
        // console.log(res.data);
        setbranchArr(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [apicall]);

  /*<----Functionality to get data filtered by rating---->*/
  const filtercategorydata = branchArr.filter(
    (thing, index, self) =>
      index === self.findIndex((t, x) => t.brand === thing.brand)
  );
  // const result = categorydata.filter(
  //   (thing, index, self) =>
  //     index ===
  //     self.findIndex((t, x) => t.root_category_name == thing.root_category_name)
  // );

  // END BRANDz


  useEffect(() => {
    setapicall(true);
  }, [apicall, props.getCartData, props.deleteCart])
  return (
    <Fragment>
      <Header />
      <Breadcumb pageName={"Shop"} pageTitle={"Shop"} pageHref={"/"} />
      {/* <!-- Shop Section Start --> */}
      <section className="section-b-space shop-section">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-xxl-3 col-lg-4 wow fadeInUp">
              <div className={click === true ? "left-box show" : "left-box"}>
                <div className="shop-left-sidebar">
                  <div className="back-button" onClick={() => setclick(false)}>
                    <h3>
                      <i className="fa-solid fa-arrow-left"></i> Back
                    </h3>
                  </div>
                  <div className="filter-category">
                    <div className="filter-title">
                      <h2>Filters</h2>
                      <Link to="" onClick={() => OnClearAllClick()}>
                        Clear All
                      </Link>
                    </div>
                    <ul className="tagfilter_box">
                      {showcategorydata[0] !== "" ||
                        showcategorydata[0] !== null ||
                        showcategorydata[0] !== undefined
                        ? (showcategorydata || []).map((show, i) => {
                          return (
                            <Badge
                              key={i}
                              bg="light"
                              text="dark"
                              className="d-flex align-items-center"
                            >
                              {show}
                              {/* <p className="mb-0 mx-2 tagcancel_btn" onClick={OnTagCancelClick}>x</p> */}
                            </Badge>
                          );
                        })
                        : null}
                    </ul>
                  </div>
                  <Accordion>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Categories</Accordion.Header>
                      <Accordion.Body>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="panelsStayOpen-headingOne"
                        >
                          <div className="accordion-body">
                            {/* <div className="form-floating theme-form-floating-2 search-box">
                              <input
                                type="search"
                                className="form-control"
                                id="search"
                                placeholder="Search .."
                                onChange={(e) => onCategorySearch(e)}
                              />
                              <label htmlFor="search">Search</label>
                          
                            </div> */}

                            <Accordion>
                              {(result || []).map((catdata, i) => {
                                return (
                                  <>
                                    <Accordion.Item Key={i}>
                                      <Dropdown
                                        as={ButtonGroup}
                                        className={"category_dropdown_box"}
                                      >
                                        <Button
                                          key={i}
                                          variant="light"
                                          className={"category_dropdown_name"}
                                          onClick={() => {
                                            navigate(
                                              `/shop?category=` +
                                              catdata.root_id
                                            );
                                          }}
                                          value={catdata.root_id}
                                        >
                                          {catdata.root_category_name}
                                        </Button>

                                        <Dropdown.Toggle
                                          split
                                          variant="light"
                                          id="dropdown-split-basic"
                                          drop={"end"}
                                          title={`Drop end`}
                                          className={"category_dropdown_btn"}
                                        />

                                        <Dropdown.Menu>
                                          <div className="onhover-category-box">
                                            {(level1category || []).map(
                                              (data, i) => {
                                                return catdata.root_category_name ===
                                                  data.root_category_name &&
                                                  data.down1_category_name !==
                                                  null ? (
                                                  <div
                                                    className="list-1"
                                                  >
                                                    <div className="category-title-box">
                                                      <div
                                                        value={data.down1_id}
                                                      >
                                                        <h5
                                                          key={i}

                                                          onClick={() => {
                                                            navigate(
                                                              `/shop?category=` +
                                                              catdata.down1_id
                                                            );
                                                          }}
                                                          value={data.down1_id}
                                                          className={
                                                            "searchsub_category px-2"
                                                          }
                                                        >
                                                          {i + 1}
                                                          {")"}{" "}
                                                          {
                                                            data.down1_category_name
                                                          }
                                                        </h5>
                                                      </div>
                                                    </div>
                                                    <ul className="p-0">
                                                      {(
                                                        level2category || []
                                                      ).map((data1, i) => {
                                                        return data.down1_category_name ===
                                                          data1.down1_category_name &&
                                                          data.down2_category_name !==
                                                          null ? (
                                                          <li
                                                            key={i}
                                                            onClick={() => {
                                                              navigate(
                                                                `/shop?category=` +
                                                                catdata.down2_id
                                                              );
                                                            }}
                                                            value={
                                                              data1.down2_id
                                                            }
                                                            className={
                                                              "searchsub_category w-100 py-2 px-4"
                                                            }
                                                          >
                                                            {i + 1}
                                                            {")"}{" "}
                                                            {
                                                              data1.down2_category_name
                                                            }
                                                            <ul>
                                                              {(
                                                                categorydata ||
                                                                []
                                                              ).map((data2, i) => {
                                                                return data1.down2_category_name ===
                                                                  data2.down2_category_name &&
                                                                  data.down3_category_name !==
                                                                  null ? (
                                                                  <li
                                                                    key={i}
                                                                    onClick={() => {
                                                                      navigate(
                                                                        `/shop?category=` +
                                                                        catdata.down3_id
                                                                      );
                                                                    }}
                                                                    value={
                                                                      data2.down3_id
                                                                    }
                                                                    className={
                                                                      "w-100  searchsub_category px-3 py-1"
                                                                    }
                                                                  >
                                                                    {"*)"}{" "}
                                                                    {
                                                                      data2.down3_category_name
                                                                    }
                                                                  </li>
                                                                ) : null;
                                                              })}
                                                            </ul>
                                                          </li>
                                                        ) : null;
                                                      })}
                                                    </ul>
                                                  </div>
                                                ) : null;
                                              }
                                            )}
                                          </div>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                      <Accordion.Body>
                                        <div className="onhover-category-box">
                                          {(level1category || []).map(
                                            (data, i) => {
                                              return catdata.root_category_name ===
                                                data.root_category_name &&
                                                data.down1_category_name !==
                                                null ? (
                                                <div
                                                  className="list-1"
                                                >
                                                  <div className="category-title-box">
                                                    <div>
                                                      <h5 key={i}>
                                                        {
                                                          data.down1_category_name
                                                        }
                                                      </h5>
                                                    </div>
                                                  </div>
                                                  <ul className="p-0">
                                                    {(level2category || []).map(
                                                      (data1, i) => {
                                                        return data.down1_category_name ===
                                                          data1.down1_category_name &&
                                                          data.down2_category_name !==
                                                          null ? (
                                                          <li
                                                            className="w-100"
                                                            key={i}
                                                          >
                                                            {
                                                              data1.down2_category_name
                                                            }
                                                            <ul>
                                                              {(
                                                                categorydata ||
                                                                []
                                                              ).map((data2, i) => {
                                                                return data1.down2_category_name ===
                                                                  data2.down2_category_name &&
                                                                  data.down3_category_name !==
                                                                  null ? (
                                                                  <li
                                                                    className="w-100"
                                                                    key={i}
                                                                  >
                                                                    {
                                                                      data2.down3_category_name
                                                                    }
                                                                  </li>
                                                                ) : null;
                                                              })}
                                                            </ul>
                                                          </li>
                                                        ) : null;
                                                      }
                                                    )}
                                                  </ul>
                                                </div>
                                              ) : null;
                                            }
                                          )}
                                        </div>
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  </>
                                );
                              })}
                            </Accordion>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <br />
                  <Accordion>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Brand</Accordion.Header>
                      <Accordion.Body>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse show"
                          aria-labelledby="panelsStayOpen-headingTwo"
                        >
                          <div className="accordion-body">
                            <ul className="category-list custom-padding">
                              {(filtercategorydata || []).map((data, i) => {
                                return (
                                  <li key={i}>
                                    <div className="form-check ps-0 m-0 category-list-box">
                                      {brandfilter.includes(data.brand) ? (
                                        <input
                                          className="checkbox_animated"
                                          type={"checkbox"}
                                          id="veget"
                                          name={"brand"}
                                          checked
                                          value={data.brand}
                                          onChange={(e) => onBrandFilterAdd(e)}
                                        />
                                      ) : (
                                        <input
                                          className="checkbox_animated"
                                          type={"checkbox"}
                                          id="veget"
                                          name={"brand"}
                                          value={data.brand}
                                          onChange={(e) => onBrandFilterAdd(e)}
                                        />
                                      )}

                                      <label
                                        className="form-check-label"
                                        htmlFor="veget"
                                      >
                                        <span className="name">
                                          {data.brand}
                                        </span>
                                      </label>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <br />
                  <Accordion>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Price</Accordion.Header>
                      <Accordion.Body>
                        <div className="row">
                          <input
                            type="text"
                            className="js-range-slider"
                            placeholder="from"
                            name={"from_product_price"}
                            value={pricefilter.from_product_price}
                            onChange={(e) => onPriceFilterAdd(e)}
                          />
                          &nbsp;
                          <input
                            type="text"
                            className="js-range-slider"
                            placeholder="to"
                            name={"to_product_price"}
                            value={pricefilter.to_product_price}
                            onChange={(e) => onPriceFilterAdd(e)}
                          />
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <br />
                  <Accordion>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Rating</Accordion.Header>
                      <Accordion.Body>
                        <div
                          id="collapseSix"
                          className="accordion-collapse collapse show"
                          aria-labelledby="panelsStayOpen-headingSix"
                        >
                          <div className="accordion-body">
                            <ul className="category-list custom-padding">
                              <li>
                                <div className="form-check ps-0 m-0 category-list-box">
                                  <input
                                    className="checkbox_animated"
                                    type="checkbox"
                                    name={"avgRatings"}
                                    value={"5"}
                                    checked={checkboxfilter}
                                    onChange={(e) => onRatingFilterAdd(e)}
                                  />
                                  <div className="form-check-label">
                                    <ul className="rating p-0">
                                      <li color="#ffb321">
                                        <FaStar
                                          className="feather fill"
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaStar
                                          className="feather fill"
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaStar
                                          className="feather fill"
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaStar
                                          className="feather fill"
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li>
                                        <FaStar
                                          className="feather fill"
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                    </ul>
                                    <span className="text-content">
                                      (5 Star)
                                    </span>
                                  </div>
                                </div>
                              </li>

                              <li>
                                <div className="form-check ps-0 m-0 category-list-box">
                                  <input
                                    className="checkbox_animated"
                                    type="checkbox"
                                    name={"avgRatings"}
                                    value={"4"}
                                    checked={checkboxfilter}
                                    onChange={(e) => onRatingFilterAdd(e)}
                                  />
                                  <div className="form-check-label">
                                    <ul className="rating p-0">
                                      <li color="#ffb321">
                                        <FaStar
                                          className="feather fill"
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaStar
                                          className="feather fill"
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaStar
                                          className="feather fill"
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaStar
                                          className="feather fill"
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li>
                                        <FaRegStar
                                          className="feather "
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                    </ul>
                                    <span className="text-content">
                                      (4 Star)
                                    </span>
                                  </div>
                                </div>
                              </li>

                              <li>
                                <div className="form-check ps-0 m-0 category-list-box">
                                  <input
                                    className="checkbox_animated"
                                    type="checkbox"
                                    name={"avgRatings"}
                                    value={"3"}
                                    checked={checkboxfilter}
                                    onChange={(e) => onRatingFilterAdd(e)}
                                  />
                                  <div className="form-check-label">
                                    <ul className="rating p-0">
                                      <li color="#ffb321">
                                        <FaStar
                                          className="feather fill"
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaStar
                                          className="feather fill"
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaStar
                                          className="feather fill"
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaRegStar
                                          className="feather "
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li>
                                        <FaRegStar
                                          className="feather "
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                    </ul>
                                    <span className="text-content">
                                      (3 Star)
                                    </span>
                                  </div>
                                </div>
                              </li>

                              <li>
                                <div className="form-check ps-0 m-0 category-list-box">
                                  <input
                                    className="checkbox_animated"
                                    type="checkbox"
                                    name={"avgRatings"}
                                    value={"2"}
                                    checked={checkboxfilter}
                                    onChange={(e) => onRatingFilterAdd(e)}
                                  />
                                  <div className="form-check-label">
                                    <ul className="rating p-0">
                                      <li color="#ffb321">
                                        <FaStar
                                          className="feather fill"
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaStar
                                          className="feather fill"
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaRegStar
                                          className="feather "
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaRegStar
                                          className="feather "
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li>
                                        <FaRegStar
                                          className="feather "
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                    </ul>
                                    <span className="text-content">
                                      (2 Star)
                                    </span>
                                  </div>
                                </div>
                              </li>

                              <li>
                                <div className="form-check ps-0 m-0 category-list-box">
                                  <input
                                    className="checkbox_animated"
                                    type="checkbox"
                                    name={"avgRatings"}
                                    value={"1"}
                                    checked={checkboxfilter}
                                    onChange={(e) => onRatingFilterAdd(e)}
                                  />
                                  <div className="form-check-label">
                                    <ul className="rating p-0">
                                      <li color="#ffb321">
                                        <FaStar
                                          className="feather fill"
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaRegStar
                                          className="feather "
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaRegStar
                                          className="feather "
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaRegStar
                                          className="feather "
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li>
                                        <FaRegStar
                                          className="feather "
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                    </ul>
                                    <span className="text-content">
                                      (1 Star)
                                    </span>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="form-check ps-0 m-0 category-list-box">
                                  <input
                                    className="checkbox_animated"
                                    type="checkbox"
                                    name={"avgRatings"}
                                    value={"0"}
                                    checked={checkboxfilter}
                                    onChange={(e) => onRatingFilterAdd(e)}
                                  />
                                  <div className="form-check-label">
                                    <ul className="rating p-0">
                                      <li color="#ffb321">
                                        <FaRegStar
                                          className="feather "
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaRegStar
                                          className="feather "
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaRegStar
                                          className="feather "
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li color="#ffb321">
                                        <FaRegStar
                                          className="feather "
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                      <li>
                                        <FaRegStar
                                          className="feather "
                                          fill={"#ffb321"}
                                        />
                                      </li>
                                    </ul>
                                    <span className="text-content">
                                      (1 Star)
                                    </span>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <br />
                  <Accordion>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Discount</Accordion.Header>
                      <Accordion.Body>
                        <div
                          id="collapseFour"
                          className="accordion-collapse collapse show"
                          aria-labelledby="panelsStayOpen-headingFour"
                        >
                          <div className="accordion-body">
                            <ul className="category-list custom-padding">
                              <li>
                                <div className="form-check ps-0 m-0 category-list-box">
                                  <input
                                    className="checkbox_animated"
                                    type="checkbox"
                                    id="flexCheckDefault"
                                    checked={checkboxfilter}
                                    name={"discount"}
                                    value={"5"}
                                    onChange={(e) => onDiscountFilterAdd(e)}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault"
                                  >
                                    <span className="name"> 5%</span>
                                  </label>
                                </div>
                              </li>

                              <li>
                                <div className="form-check ps-0 m-0 category-list-box">
                                  <input
                                    className="checkbox_animated"
                                    type="checkbox"
                                    id="flexCheckDefault1"
                                    name={"discount"}
                                    checked={checkboxfilter}
                                    value={"10"}
                                    onChange={(e) => onDiscountFilterAdd(e)}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault1"
                                  >
                                    <span className="name">10%</span>
                                  </label>
                                </div>
                              </li>

                              <li>
                                <div className="form-check ps-0 m-0 category-list-box">
                                  <input
                                    className="checkbox_animated"
                                    type="checkbox"
                                    id="flexCheckDefault2"
                                    name={"discount"}
                                    checked={checkboxfilter}
                                    value={"15"}
                                    onChange={(e) => onDiscountFilterAdd(e)}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault2"
                                  >
                                    <span className="name">15%</span>
                                  </label>
                                </div>
                              </li>

                              <li>
                                <div className="form-check ps-0 m-0 category-list-box">
                                  <input
                                    className="checkbox_animated"
                                    type="checkbox"
                                    id="flexCheckDefault3"
                                    name={"discount"}
                                    checked={checkboxfilter}
                                    value={"20"}
                                    onChange={(e) => onDiscountFilterAdd(e)}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault3"
                                  >
                                    <span className="name">20%</span>
                                  </label>
                                </div>
                              </li>

                              <li>
                                <div className="form-check ps-0 m-0 category-list-box">
                                  <input
                                    className="checkbox_animated"
                                    type="checkbox"
                                    id="flexCheckDefault4"
                                    name={"discount"}
                                    checked={checkboxfilter}
                                    value={"30"}
                                    onChange={(e) => onDiscountFilterAdd(e)}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault4"
                                  >
                                    <span className="name">30%</span>
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <br />
                  {/* <Accordion>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Pack Size</Accordion.Header>
                      <Accordion.Body>
                        <div
                          id="collapseFive"
                          className="accordion-collapse collapse show"
                          aria-labelledby="panelsStayOpen-headingFive"
                        >
                          <div className="accordion-body">
                            <ul className="category-list custom-padding custom-height">
                              <li>
                                <div className="form-check ps-0 m-0 category-list-box">
                                  <input
                                    className="checkbox_animated"
                                    type="checkbox"
                                    id="flexCheckDefault5"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault5"
                                  >
                                    <span className="name">400 to 500 g</span>
                                    <span className="number">(05)</span>
                                  </label>
                                </div>
                              </li>

                              <li>
                                <div className="form-check ps-0 m-0 category-list-box">
                                  <input
                                    className="checkbox_animated"
                                    type="checkbox"
                                    id="flexCheckDefault6"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault6"
                                  >
                                    <span className="name">500 to 700 g</span>
                                    <span className="number">(02)</span>
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion> */}
                  <div
                    className="accordion custome-accordion"
                    id="accordionExample"
                  >
                    <div className="accordion-item"></div>
                    <div className="accordion-item"></div>

                    <div className="accordion-item"></div>

                    <div className="accordion-item"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-9 col-lg-8 wow fadeInUp">
              <div className="show-button">
                <div className="filter-button-group mt-0">
                  <div
                    className="filter-button d-inline-block d-lg-none"
                    onClick={sidebar}
                  >
                    <Link to="">
                      <i className="fa-solid fa-filter"></i> Filter Menu
                    </Link>
                  </div>
                </div>
                <div className="top-filter-menu">
                  <div className="category-dropdown">
                    <h4 className="text-content">Sort By :</h4>
                    <Form.Select
                      aria-label="Search by category"
                      className="adminselectbox"
                      placeholder="Search by category"
                      onChange={(e) => onSortingChange(e)}
                      name={"latest"}
                    >
                      <option value={""}>
                        {/* <input type="checkbox" /> */}
                        Select{" "}
                      </option>
                      <option
                        name={"latest"}
                        onChange={(e) => onSortingChange(e)}
                        value={"latest"}
                      >
                        {/* <input type="checkbox" /> */}
                        Latest
                      </option>
                      <option
                        name={"price"}
                        onChange={(e) => onSortingChange(e)}
                        value={"hprice"}
                      >
                        High Price
                      </option>
                      <option
                        name={"price"}
                        onChange={(e) => onSortingChange(e)}
                        value={"lprice"}
                      >
                        Low Price
                      </option>
                      <option
                        name={"aproduct"}
                        onChange={(e) => onSortingChange(e)}
                        value={"aproduct"}
                      >
                        A - Z Product
                      </option>
                      <option
                        name={"aproduct"}
                        onChange={(e) => onSortingChange(e)}
                        value={"zproduct"}
                      >
                        Z - A Product
                      </option>
                    </Form.Select>
                  </div>
                </div>
              </div>
              {noData === true ? (
                <div className="d-flex justify-content-center mt-5 pt-5">
                  <p className="d-flex justify-content-center mt-5 pt-5">
                    <b className="d-flex justify-content-center mt-5 pt-5 display-4">
                      No Data Found
                    </b>
                  </p>
                </div>
              ) : (
                <div className="row g-sm-4 g-3 row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2 product-list-section">
                  {(prodData || []).map((product, i) => {
                    return (
                      <div >
                        <ProductBox
                          key={i}
                          // image={product.image}
                          id={product.id}
                          name={product.product_title_name}
                          productMRF={product.sale_price}
                          productPrice={product.product_price}
                          quantity={product.quantity}
                          productid={product.product_id}
                          // avgRatings={product.avgRatings}
                          discount={product.discount}
                          brand={product.brand}
                          category={product.category}
                          producttype={product.product_type}
                          saleprice={product.sale_price}
                          clickProduct={clickProduct}
                          AddToCart={AddToCart}
                          AddToWishList={AddToWishList}
                          wishlistt={product.wishlist}
                          allimages={product.all_images}
                          cart={product.cart}
                          avgRatings={product.avgRatings}
                          is_featured={product.is_featured}
                          is_special_offer={product.is_special_offer}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* <div className="d-flex justify-content-center">
                <Pagination
                  className="d-flex justify-content-center"
                  nPages={page}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  recordsPerPage={recordsPerPage}
                />
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Shop Section End --> */}
      <Footer />
    </Fragment>
  );
};
// export {Ab};
export default Shop;
