import React, { Fragment } from "react";
import Footer from "../common/footer";
import Header from "../common/header";
// import Breadcumb from "../common/beadcumb";
import { useNavigate } from "react-router-dom";

import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

let categoryArray = [];

const BlogList = () => {
  const navigate = useNavigate();

  const [apicall, setapicall] = useState([]);
  const [blogData, setBlogData] = useState([]);
  console.log(blogData)
  const [catData, setcatData] = useState([]);
  const [Bdata, setBdata] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [recent, setRecent] = useState("");
  const [productTag, setProductTag] = useState("");
  const [id, setId] = useState("");
  const onCategoryClick = (e) => {
    setSearchCategory({ ...searchCategory, [e.target.name]: e.target.value });
  };
  // const onRecentClick = (e) => {
  //   setRecent(e.target.value);
  // };

  const onProductTagClick = (e) => {
    setProductTag(e.target.value);
  };

  useEffect(() => {
    onCategorySearch();
  }, [searchCategory, recent]);
  const onCategorySearch = () => {

    if (searchCategory.category ? categoryArray : "")
      categoryArray.push(searchCategory.category);
    if (categoryArray !== "") {
      try {
        axios
          .post(`${process.env.REACT_APP_BASEURL}/blogs`, {
            id: "",
            for_: "admin",
            recent: "",
            category: [],
            product_tag: "",
          })
          .then((response) => {
            let data = response.data;
            if (data.message !== "No blogs Data") {
              setBlogData(data);
              setapicall(false);
            }
            setRecent("")
            setBlogData(response.data);
            setcatData(response.data);
            setBdata(response.data)

            setId(data.id);
            // console.log("blog"+JSON.stringify(blogData));

            setapicall(false);
          });
      } catch (err) { }

    }

  };
  useEffect(() => {

    try {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/blogs`, {
          id: "",
          for_: "user",
          recent: "",
          category: categoryArray,
          product_tag: productTag,
        })
        .then((response) => {
          let data = response.data;
          setBlogData(data);
          setBdata(response.data)

        });
    } catch (err) { }
  }, [apicall, searchCategory, productTag, recent]);




  const clickBlog = (id) => {
    localStorage.setItem("blogid", id);
    navigate('/blog_detail');

  };
  // console.log("----------------********"+JSON.stringify(blogData.title))
  return (
    <Fragment>
      <Header />
      {/* <Breadcumb pageName={"Blog List"} pageTitle={"Page Title"} /> */}
      {/* <!-- Blog Section Start --> */}
      <section className="blog-section section-b-space">
        <div className="container-fluid-lg">
          <div className="row g-4">
            <div className="col-xxl-9 col-xl-8 col-lg-7 order-lg-2">
              <div className="row g-4">
                {(Bdata || []).map((showData, i) => {
                  return (<>
                    <div className="col-12">
                      <div className="blog-box blog-list wow fadeInUp">
                        <div className="blog-image">
                          <img key={i} src={showData.image} className="w-100" alt="" name="image" />
                        </div>

                        <div className="blog-contain blog-contain-2">
                          <div className="blog-label">
                            <span className="time">
                              <i data-feather="clock"></i>
                              <span>{showData.publish_date}</span>
                            </span>
                            <span className="super">
                              <i data-feather="user"></i>
                              {/* <span>Mark J. Speight</span> */}
                            </span>
                          </div>
                          {/* <Link to=""> */}
                          <h3 onClick={() => clickBlog(showData.id)}>
                            {showData.title}
                          </h3>
                          {/* </Link> */}
                          <p>{showData.description}</p>
                          <Link to="/blog_detail">
                            <button
                              onclick="location"
                              className="blog-button"
                            >
                              Read More{" "}
                              <i className="fa-solid fa-right-long"></i>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                  );
                })}

                {/* <div className="col-12">
                  <div
                    className="blog-box blog-list wow fadeInUp"
                    data-wow-delay="0.05s"
                  >
                    <div className="blog-image">
                      <img src={blog2} className="lazyload" alt="" />
                    </div>

                    <div className="blog-contain blog-contain-2">
                      <div className="blog-label">
                        <span className="time">
                          <i data-feather="clock"></i>
                          <span>25 Feg, 2022</span>
                        </span>
                        <span className="super">
                          <i data-feather="user"></i>
                          <span>rebeus hagrid</span>
                        </span>
                      </div>
                      <Link to="blog-detail.html">
                        <h3>Crispy Frozen Vegetable is the on the Tempura.</h3>
                      </Link>
                      <p>
                        Manchego cauliflower cheese st. agur blue cheese red
                        leicester monterey jack cheesecake the big cheese edam.
                        Gouda monterey jack roquefort hard cheese feta croque
                        monsieur cheeseburger manchego.
                      </p>
                      <button onclick="location" className="blog-button">
                        Read More <i className="fa-solid fa-right-long"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div
                    className="blog-box blog-list wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    <div className="blog-image">
                      <Link to="blog-detail.html">
                        <img src={blog3} className="lazyload" alt="" />
                      </Link>
                      <label>
                        <i className="fa-solid fa-bolt-lightning"></i> popular
                      </label>
                    </div> */}

                {/* <div className="blog-contain blog-contain-2">
                      <div className="blog-label">
                        <span className="time">
                          <i data-feather="clock"></i>
                          <span>25 Feg, 2022</span>
                        </span>
                        <span className="super">
                          <i data-feather="user"></i>
                          <span>Chris C. Hall</span>
                        </span>
                      </div>
                      <Link to="blog-detail.html">
                        <h3>
                          How to start regrowing green onions and other
                          vegetables.
                        </h3>
                      </Link>
                      <p>
                        Cheese triangles say cheese cheese and biscuits
                        dolcelatte jarlsberg cream cheese taleggio fromage
                        frais. Who moved my cheese cottage cheese cheese on
                        toast rubber cheese melted cheese ricotta.
                      </p>
                      <button onclick="location" className="blog-button">
                        Read More <i className="fa-solid fa-right-long"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div
                    className="blog-box blog-list wow fadeInUp"
                    data-wow-delay="0.15s"
                  >
                    <Link to="blog-detail.html" className="blog-image">
                      <img src={blog4} className="lazyload" alt="" />
                    </Link>

                    <div className="blog-contain blog-contain-2">
                      <div className="blog-label">
                        <span className="time">
                          <i data-feather="clock"></i>
                          <span>25 Feg, 2022</span>
                        </span>
                        <span className="super">
                          <i data-feather="user"></i>
                          <span>James M. Martin</span>
                        </span>
                      </div>
                      <Link to="blog-detail.html">
                        <h3>Starting a vegetable garden: the basics.</h3>
                      </Link>
                      <p>
                        Jarlsberg swiss edam. Goat everyone loves cheese strings
                        ricotta cheese and wine pepper jack dolcelatte halloumi.
                        Cream cheese queso croque monsieur camembert de
                        normandie cheddar cheesecake cheese slices croque
                        monsieur.
                      </p>
                      <button onclick="location" className="blog-button">
                        Read More <i className="fa-solid fa-right-long"></i>
                      </button>
                    </div>
                  </div>
                </div> */}

                {/* <div className="col-12">
                  <div
                    className="blog-box blog-list wow fadeInUp"
                    data-wow-delay="0.2s"
                  >
                    <Link to="blog-detail.html" className="blog-image">
                      <img src={blog5} className="lazyload" alt="" />
                    </Link>

                    <div className="blog-contain blog-contain-2">
                      <div className="blog-label">
                        <span className="time">
                          <i data-feather="clock"></i>
                          <span>25 Feg, 2022</span>
                        </span>
                        <span className="super">
                          <i data-feather="user"></i>
                          <span>Cecil M. Levis</span>
                        </span>
                      </div>
                      <Link to="blog-detail.html">
                        <h3>
                          Adapt this simple pasta salad to whatever vegetable.
                        </h3>
                      </Link>
                      <p>
                        Cream cheese cheese slices chalk and cheese cottage
                        cheese cheddar port-salut everyone loves dolcelatte.
                        Cream cheese camembert de normandie cow chalk and cheese
                        brie gouda cottage cheese cheesy grin.
                      </p>
                      <button onclick="location" className="blog-button">
                        Read More <i className="fa-solid fa-right-long"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div
                    className="blog-box blog-list wow fadeInUp"
                    data-wow-delay="0.25s"
                  >
                    <Link to="blog-detail.html" className="blog-image">
                      <img src={blog1} className="lazyload" alt="" />
                    </Link>

                    <div className="blog-contain blog-contain-2">
                      <div className="blog-label">
                        <span className="time">
                          <i data-feather="clock"></i>
                          <span>25 Feg, 2022</span>
                        </span>
                        <span className="super">
                          <i data-feather="user"></i>
                          <span>Mary R. Hernandez</span>
                        </span>
                      </div>
                      <Link to="blog-detail.html">
                        <h3>
                          With chefs idle and vegetables rotting, China's
                          virus-hit.
                        </h3>
                      </Link>
                      <p>
                        Monterey jack chalk and cheese cheese and biscuits cream
                        cheese fondue say cheese stilton halloumi. Gouda
                        everyone loves chalk and cheese everyone loves stinking
                        bishop manchego stilton.
                      </p>
                      <button onclick="location" className="blog-button">
                        Read More <i className="fa-solid fa-right-long"></i>
                      </button>
                    </div>
                  </div>
                </div> */}

                {/* <div className="col-12">
                  <div
                    className="blog-box blog-list wow fadeInUp"
                    data-wow-delay="0.3s"
                  >
                    <Link to="blog-detail.html" className="blog-image">
                      <img src={blog2} className="lazyload" alt="" />
                    </Link>

                    <div className="blog-contain blog-contain-2">
                      <div className="blog-label">
                        <span className="time">
                          <i data-feather="clock"></i>
                          <span>25 Feg, 2022</span>
                        </span>
                        <span className="super">
                          <i data-feather="user"></i>
                          <span>Cheryl D. Moser</span>
                        </span>
                      </div>
                      <Link to="blog-detail.html">
                        <h3>
                          Turn that bowl of pasta into a supercharged veggie
                          vehicle.
                        </h3>
                      </Link>
                      <p>
                        The big cheese fondue st. agur blue cheese. Cheese on
                        toast paneer lancashire cheese and biscuits rubber
                        cheese macaroni cheese queso feta. Stinking bishop
                        fromage brie edam cheesy feet smelly cheese fromage
                        frais paneer.
                      </p>
                      <button onclick="location" className="blog-button">
                        Read More <i className="fa-solid fa-right-long"></i>
                      </button>
                    </div>
                  </div>
                </div> */}

                {/* <div className="col-12">
                  <div
                    className="blog-box blog-list wow fadeInUp"
                    data-wow-delay="0.35s"
                  >
                    <Link to="blog-detail.html" className="blog-image">
                      <img src={blog3} alt="" className="lazyload" />
                    </Link>

                    <div className="blog-contain blog-contain-2">
                      <div className="blog-label">
                        <span className="time">
                          <i data-feather="clock"></i>
                          <span>25 Feg, 2022</span>
                        </span>
                        <span className="super">
                          <i data-feather="user"></i>
                          <span>Mina M. Short</span>
                        </span>
                      </div>
                      <Link to="blog-detail.html">
                        <h3>Health, care and skin on the for your organic.</h3>
                      </Link>
                      <p>
                        Cheesy grin brie croque monsieur cheesy grin cottage
                        cheese cheese strings dolcelatte cheeseburger. Cheesy
                        feet queso red leicester fromage frais hard cheese
                        cheeseburger fromage when the cheese comes out
                        everybody's happy.
                      </p>
                      <button onclick="location" className="blog-button">
                        Read More <i className="fa-solid fa-right-long"></i>
                      </button>
                    </div>
                  </div>
                </div> */}

                {/* <div className="col-12">
                  <div
                    className="blog-box blog-list wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <Link to="blog-detail.html" className="blog-image">
                      <img src={blog4} alt="" className="lazyload" />
                    </Link>

                    <div className="blog-contain blog-contain-2">
                      <div className="blog-label">
                        <span className="time">
                          <i data-feather="clock"></i>
                          <span>25 Feg, 2022</span>
                        </span>
                        <span className="super">
                          <i data-feather="user"></i>
                          <span>Marie S. Santiago</span>
                        </span>
                      </div>
                      <Link to="blog-detail.html">
                        <h3>
                          Fresh organicsm, brand, fresh and picnic place
                          awesome.
                        </h3>
                      </Link>
                      <p>
                        Macaroni cheese camembert de normandie airedale. Cheese
                        triangles babybel cow blue castello cheddar cheese and
                        biscuits jarlsberg melted cheese. Caerphilly fromage
                        frais ricotta manchego edam boursin edam swiss.
                      </p>
                      <button onclick="location" className="blog-button">
                        Read More <i className="fa-solid fa-right-long"></i>
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>

              <nav className="custome-pagination">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <Link className="page-link" to="" tabindex="-1">
                      <i className="fa-solid fa-angles-left"></i>
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" to="">
                      1
                    </Link>
                  </li>
                  <li className="page-item" aria-current="page">
                    <Link className="page-link" to="">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="">
                      <i className="fa-solid fa-angles-right"></i>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="col-xxl-3 col-xl-4 col-lg-5 order-lg-1">
              <div className="left-sidebar-box wow fadeInUp">
                {/* <div className="left-search-box">
                  <div className="search-box">
                    <input
                      type="search"
                      // onChange={(e) =>SearchBlogCategory(e)}
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Search...."
                    />
                  </div>
                </div> */}
                <div
                  className="accordion left-accordion-box"
                  id="accordionPanelsStayOpenExample"
                >
                  <Accordion>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Recent Post</Accordion.Header>
                      <Accordion.Body>
                        <div
                          id="panelsStayOpen-collapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="panelsStayOpen-headingOne"
                        >
                          <div className="accordion-body pt-0">
                            {(catData || []).map((blog, i) => {
                              return (
                                <>
                                  <div className="recent-post-box">
                                    <div className="recent-box">
                                      <Link to="/blog_detail" className="recent-image">
                                        <img
                                          key={i}
                                          src={blog.image}
                                          className="img-fluid  lazyload"
                                          alt=""
                                        />
                                      </Link>
                                      <div className="recent-detail">
                                        <Link to="/blog_detail">
                                          {" "}
                                          <h5
                                            className="recent-name"
                                            name="title"
                                          //value={blog.title}
                                          >
                                            {blog.title}
                                          </h5>
                                        </Link>

                                        <h6>
                                          {blog.publish_date}
                                          <i data-feather="thumbs-up"></i>
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
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
                            <div className="form-floating theme-form-floating-2 search-box">
                              <ul className="category-list custom-padding custom-height">
                                {(catData || []).map((blog, i) => {
                                  return (
                                    <>
                                      <li key={i}>
                                        <div className="form-check ps-0 m-0 category-list-box">

                                          <input
                                            className="checkbox_animated"
                                            type="checkbox"
                                            id="category"
                                            name={"category"}
                                            value={blog.category}
                                            onChange={(e) => onCategoryClick(e)}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="fruit"
                                          >
                                            {blog.category}
                                          </label>
                                        </div>
                                      </li>
                                    </>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <Accordion>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Product Tags</Accordion.Header>
                      <Accordion.Body>
                        <div
                          id="panelsStayOpen-collapseThree"
                          className="accordion-collapse collapse collapse show"
                          aria-labelledby="panelsStayOpen-headingThree"
                        >
                          <div className="accordion-body pt-0">
                            <div className="product-tags-box">
                              <ul>
                                {(catData || []).map((blog, i) => {
                                  return (
                                    <>
                                      <li key={i}>
                                        <div className="form-check ps-0 m-0 category-list-box">
                                          <input
                                            className="checkbox_animated"
                                            type="checkbox"
                                            id="product_tag"
                                            name={"product_tag"}
                                            value={blog.product_tag}
                                            onChange={(e) =>
                                              onProductTagClick(e)
                                            }
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="fruit"
                                          >
                                            {blog.product_tag}
                                          </label>
                                        </div>
                                        {/* <div className="category-name">
                                                            <h5
                                                            // onClick={onBlogSearch}
                                                            >{blog.product_tag}</h5>
                                                           </div> */}
                                      </li>

                                      {/* <li>
                                                   <Link to="/" >Meat</Link>
                                                </li>

                                                <li>
                                                   <Link to="/" >organic</Link>
                                                </li>

                                                <li>
                                                   <Link to="/" >cake</Link>
                                                </li>

                                                <li>
                                                   <Link to="/" >pick fruit</Link>
                                                </li>

                                                <li>
                                                   <Link to="/" >backery</Link>
                                                </li>

                                                <li>
                                                   <Link to="/" >organix food</Link>
                                                </li>

                                                <li>
                                                   <Link to="/" >Most Expensive Fruit</Link>
                                                </li> */}
                                    </>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  {/* <Accordion>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>
                                Trending Products
                                </Accordion.Header>
                                <Accordion.Body>
                                <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse collapse show"
                                    aria-labelledby="panelsStayOpen-headingFour">
                                    <div className="accordion-body">
                                        <ul className="product-list product-list-2 border-0 p-0">
                                            <li>
                                                <div className="offer-product">
                                                <Link to="/"  className="offer-image">
                                                        <img src={veg23}
                                                          className=" lazyload" alt=""/>
                                                    </Link>

                                                    <div className="offer-detail">
                                                        <div>
                                                        <Link to="/" >
                                                                <h6 className="name">Meatigo Premium Goat Curry</h6>
                                                            </Link>
                                                            <span>450 G</span>
                                                            <h6 className="price theme-color">$ 70.00</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="offer-product">
                                                    <Link to="/"  className="offer-image">
                                                        <img src={veg24}
                                                           className=" lazyload" alt=""/>
                                                    </Link>

                                                    <div className="offer-detail">
                                                        <div>
                                                            <Link to="/" >
                                                                <h6 className="name">Dates Medjoul Premium Imported</h6>
                                                            </Link>
                                                            <span>450 G</span>
                                                            <h6 className="price theme-color">$ 40.00</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li className="mb-0">
                                                <div className="offer-product">
                                                    <Link to="/"  className="offer-image">
                                                        <img src={veg26}
                                                            className=" lazyload" alt=""/>
                                                    </Link>

                                                    <div className="offer-detail">
                                                        <div>
                                                            <Link to="/" >
                                                                <h6 className="name">Apple Red Premium Imported</h6>
                                                            </Link>
                                                            <span>1 KG</span>
                                                            <h6 className="price theme-color">$ 80.00</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Blog Section End --> */}
      <Footer />
    </Fragment>
  );
};
export default BlogList;
