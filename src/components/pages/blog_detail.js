import React, { Fragment, useState } from "react";
import Footer from "../common/footer";
import Header from "../common/header";
import { NavLink } from "react-router-dom";
// import blog1 from "../../Photos/blog/1.jpg";
// import blog2 from "../../Photos/blog/2.jpg";
// import blog3 from "../../Photos/blog/3.jpg";
// import blog4 from "../../Photos/blog/4.jpg";
// import veg23 from "../../Photos/vegetable/product/23.png";
// import veg24 from "../../Photos/vegetable/product/24.png";
// import veg26 from "../../Photos/vegetable/product/26.png";
// import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { useEffect } from "react";
const BlogDetail = () => {
  const [apicall, setapicall] = useState([]);
  const [productTag, setProductTag] = useState("");

  const blogid = localStorage.getItem("blogid");

  const [blogdata, setBlogData] = useState([]);
  /* <!--Get blog deatils--Api call--> */
  let categoryArray = [];

  useEffect(() => {
    function getBlogDetails() {
      try {
        axios
          .post(`${process.env.REACT_APP_BASEURL}/blogs`, {
            id: blogid,
            for_: "user",
            recent: "",
            category: categoryArray,
            product_tag: productTag,
          })
          .then((response) => {
            let data = response.data[0];
            setBlogData(data);
            setapicall(false)
          });
      } catch (err) { }

    }

    getBlogDetails();
  }, [apicall]);
  // console.log("BHLOGG-----"+JSON.stringify(blogdata))

  /* <!--End this section--> */

  return (
    <Fragment>
      <Header />
      {/* <!-- Breadcrumb Section Start --> */}
      <section className="breadscrumb-section pt-0">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="breadscrumb-contain">
                <h2>{blogdata.title}</h2>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <NavLink to="/blog_list">
                        <i className="fa-solid fa-house"></i>
                      </NavLink>
                    </li>

                    <li className="breadcrumb-item active">
                      {blogdata.title}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Breadcrumb Section End --> */}
      {/* ---Blog Detail Page Start-- */}
      <section className="blog-section section-b-space">
        <div className="container-fluid-lg">
          <div className="row g-sm-4 g-3">
            <div className="col-xxl-3 col-xl-4 col-lg-5">
              <div className="left-sidebar-box">
                <div className="left-search-box">
                  {/* <div className="search-box">
                    <input
                      type="search"
                      className="form-control"
                      id="exampleFormControlInput4"
                      placeholder="Search...."
                    />
                  </div> */}
                </div>
                {/* --Sidebar */}
                {/* <div
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
                            <div className="recent-post-box">
                              <div className="recent-box">
                                <Link to="/" className="recent-image">
                                  <img
                                    src={blog1}
                                    className="img-fluid  lazyload"
                                    alt=""
                                  />
                                </Link>

                                <div className="recent-detail">
                                  <Link to="/">
                                    <h5 className="recent-name">
                                      Green onion knife and salad placed
                                    </h5>
                                  </Link>
                                  <h6>
                                    25 Jan, 2022{" "}
                                    <i data-feather="thumbs-up"></i>
                                  </h6>
                                </div>
                              </div>

                              <div className="recent-box">
                                <Link to="/" className="recent-image">
                                  <img
                                    src={blog2}
                                    className="img-fluid  lazyload"
                                    alt=""
                                  />
                                </Link>

                                <div className="recent-detail">
                                  <Link to="/">
                                    <h5 className="recent-name">
                                      Health and skin for your organic
                                    </h5>
                                  </Link>
                                  <h6>
                                    25 Jan, 2022{" "}
                                    <i data-feather="thumbs-up"></i>
                                  </h6>
                                </div>
                              </div>

                              <div className="recent-box">
                                <Link to="/" className="recent-image">
                                  <img
                                    src={blog3}
                                    className="img-fluid  lazyload"
                                    alt=""
                                  />
                                </Link>

                                <div className="recent-detail">
                                  <Link to="/">
                                    <h5 className="recent-name">
                                      Organics mix masala fresh & soft
                                    </h5>
                                  </Link>
                                  <h6>
                                    25 Jan, 2022{" "}
                                    <i data-feather="thumbs-up"></i>
                                  </h6>
                                </div>
                              </div>

                              <div className="recent-box">
                                <Link to="/" className="recent-image">
                                  <img
                                    src={blog4}
                                    className="img-fluid  lazyload"
                                    alt=""
                                  />
                                </Link>

                                <div className="recent-detail">
                                  <Link to="/">
                                    <h5 className="recent-name">
                                      Fresh organics brand and picnic
                                    </h5>
                                  </Link>
                                  <h6>
                                    25 Jan, 2022{" "}
                                    <i data-feather="thumbs-up"></i>
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Category</Accordion.Header>
                      <Accordion.Body>
                        <div
                          id="panelsStayOpen-collapseTwo"
                          className="accordion-collapse collapse collapse show"
                          aria-labelledby="panelsStayOpen-headingTwo"
                        >
                          <div className="accordion-body p-0">
                            <div className="category-list-box">
                              <ul>
                                <li>
                                  <Link to="/">
                                    <div className="category-name">
                                      <h5>Latest Recipes</h5>
                                      <span>10</span>
                                    </div>
                                  </Link>
                                </li>

                                <li>
                                  <Link to="/">
                                    <div className="category-name">
                                      <h5>Diet Food</h5>
                                      <span>6</span>
                                    </div>
                                  </Link>
                                </li>

                                <li>
                                  <Link to="/">
                                    <div className="category-name">
                                      <h5>Low calorie Items</h5>
                                      <span>8</span>
                                    </div>
                                  </Link>
                                </li>

                                <li>
                                  <Link to="/">
                                    <div className="category-name">
                                      <h5>Cooking Method</h5>
                                      <span>9</span>
                                    </div>
                                  </Link>
                                </li>

                                <li>
                                  <Link to="/">
                                    <div className="category-name">
                                      <h5>Dairy Free</h5>
                                      <span>12</span>
                                    </div>
                                  </Link>
                                </li>

                                <li>
                                  <Link to="/">
                                    <div className="category-name">
                                      <h5>Vegetarian Food</h5>
                                      <span>10</span>
                                    </div>
                                  </Link>
                                </li>
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
                                <li>
                                  <Link to="/">Fruit Cutting</Link>
                                </li>

                                <li>
                                  <Link to="/">Meat</Link>
                                </li>

                                <li>
                                  <Link to="/">organic</Link>
                                </li>

                                <li>
                                  <Link to="/">cake</Link>
                                </li>

                                <li>
                                  <Link to="/">pick fruit</Link>
                                </li>

                                <li>
                                  <Link to="/">backery</Link>
                                </li>

                                <li>
                                  <Link to="/">organix food</Link>
                                </li>

                                <li>
                                  <Link to="/">Most Expensive Fruit</Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Trending Products</Accordion.Header>
                      <Accordion.Body>
                        <div
                          id="panelsStayOpen-collapseFour"
                          className="accordion-collapse collapse collapse show"
                          aria-labelledby="panelsStayOpen-headingFour"
                        >
                          <div className="accordion-body">
                            <ul className="product-list product-list-2 border-0 p-0">
                              <li>
                                <div className="offer-product">
                                  <Link to="/" className="offer-image">
                                    <img
                                      src={veg23}
                                      className=" lazyload"
                                      alt=""
                                    />
                                  </Link>

                                  <div className="offer-detail">
                                    <div>
                                      <Link to="/">
                                        <h6 className="name">
                                          Meatigo Premium Goat Curry
                                        </h6>
                                      </Link>
                                      <span>450 G</span>
                                      <h6 className="price theme-color">
                                        $ 70.00
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </li>

                              <li>
                                <div className="offer-product">
                                  <Link to="/" className="offer-image">
                                    <img
                                      src={veg24}
                                      className=" lazyload"
                                      alt=""
                                    />
                                  </Link>

                                  <div className="offer-detail">
                                    <div>
                                      <Link to="/">
                                        <h6 className="name">
                                          Dates Medjoul Premium Imported
                                        </h6>
                                      </Link>
                                      <span>450 G</span>
                                      <h6 className="price theme-color">
                                        $ 40.00
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </li>

                              <li className="mb-0">
                                <div className="offer-product">
                                  <Link to="/" className="offer-image">
                                    <img
                                      src={veg26}
                                      className=" lazyload"
                                      alt=""
                                    />
                                  </Link>

                                  <div className="offer-detail">
                                    <div>
                                      <Link to="/">
                                        <h6 className="name">
                                          Apple Red Premium Imported
                                        </h6>
                                      </Link>
                                      <span>1 KG</span>
                                      <h6 className="price theme-color">
                                        $ 80.00
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div> */}
                {/* Sidebar end--- */}
              </div>
            </div>

            <div className="col-xxl-9 col-xl-8 col-lg-7 ratio_50">
              <div className="blog-detail-image rounded-3  mb-4">
                <img
                  src={blogdata.image}
                  className="bg-img w-100 lazyload"
                  alt=""
                />
                <div className="blog-image-contain">
                  {/* <ul className="contain-list">
                                <li>backpack</li>
                                <li>life style</li>
                                <li>organic</li>
                            </ul> */}
                  <h2>{blogdata.title}</h2>
                  <ul className="contain-comment-list">
                    <li>
                      {/* <div className="user-list">
                                        <i data-feather="user"></i>
                                        <span>Caroline</span>
                                    </div> */}
                    </li>

                    <li>
                      <div className="user-list">
                        <i data-feather="calendar"></i>
                        <span>{blogdata.publish_date}</span>
                      </div>
                    </li>

                    <li>
                      {/* <div className="user-list">
                                        <i data-feather="message-square"></i>
                                        <span>82 Comment</span>
                                    </div> */}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="blog-detail-contain">
                <p>
                  <span className="first">E</span> {blogdata.description}
                </p>

                {/* <p>Let's unpack that later everyone thinks the soup tastes better after theyâ€™ve pissed in it
                            pivot, re-inventing the wheel, and it's not hard guys. Market-facing pushback back of the
                            net, for pro-sumer software let's see if we can dovetail these two projects but turn the
                            crank for they have downloaded gmail and seems to be working for now. This is not the hill i
                            want to die on you better eat a reality sandwich before you walk back in that boardroom land
                            the plane yet exposing new ways to evolve our design language design thinking nor poop, so
                            can you put it into a banner that is not alarming, but eye catching and not too giant. That
                            is a good problem to have dog and pony show we're ahead of the curve on that one.</p> */}

                {/* <p> Waste of
                            resources can you run this by clearance? hot johnny coming through driving the
                            initiative
                            forward our competitors are jumping the shark. Unlock meaningful moments of relaxation.
                            Copy
                            and paste from stack overflow a tentative event rundown is attached for your reference,
                            including other happenings on the day you are most welcome to join us beforehand for a
                            light
                            lunch we would also like to invite you to other activities on the day, including the
                            interim
                            and closing panel discussions on the intersection of businesses and social innovation,
                            and
                            on building a stronger social innovation eco-system respectively what are the
                            expectations,
                            on-brand but completeley fresh we can't hear you.</p> */}

                <div className="blog-details-quote">
                  <h3>{blogdata.title}</h3>
                  <h5>- Denny Dose</h5>
                </div>

                {/* <p>Agile currying favour pulling teeth collaboration through advanced technlogy. Everyone thinks
                            the soup tastes better after theyâ€™ve pissed in it can you put it on my calendar?.
                            Low-hanging fruit. Data-point blue sky yet first-order optimal strategies shotgun approach.
                            Land it in region. Idea shower prairie dogging a set of certitudes based on deductions
                            founded on false premise nor three-martini lunch. Baseline. Run it up the flag pole big boy
                            pants so game-plan, and it just needs more cowbell pixel pushing, but we need to make the
                            new version clean and sexy. Back of the net we need a recap by eod, cob or whatever comes
                            first for we need evergreen content.</p> */}

                {/* <p className="mb-0">We need to harvest synergy effects land it in region nor time to open the
                            kimono, but we need to touch base off-line before we fire the new ux experience. Moving the
                            goalposts. Lean into that problem we need to get all stakeholders up to speed and in the
                            right place. Get all your ducks in a row this proposal is a win-win situation which will
                            cause a stellar paradigm shift, and produce a multi-fold increase in deliverables or dunder
                            mifflin for high-level nor gain alignment into the weeds. Open door policy. Goalposts
                            player-coach but quick win, so effort made was a lot for game-plan in an ideal world
                            commitment to the cause . Service as core &innovations as power makes our brand meeting
                            assassin core competencies run it up the flagpole, ping the boss and circle back but zoom
                            meeting at 2:30 today.</p> */}
              </div>

              {/* <div className="comment-box overflow-hidden">
                        <div className="leave-title">
                            <h3>Comments</h3>
                        </div>

                        <div className="user-comment-box">
                            <ul>
                                <li>
                                    <div className="user-box border-color">
                                        <div className="reply-button">
                                            <i className="fa-solid fa-reply"></i>
                                            <span className="theme-color">Reply</span>
                                        </div>
                                        <div className="user-iamge">
                                            <img src={user1}
                                                className="img-fluid  lazyload" alt=""/>
                                            <div className="user-name">
                                                <h6>30 Jan, 2022</h6>
                                                <h5 className="text-content">Glenn Greer</h5>
                                            </div>
                                        </div>

                                        <div className="user-contain">
                                            <p>"This proposal is a win-win situation which will cause a stellar paradigm
                                                shift, and produce a multi-fold increase in deliverables a better
                                                understanding"</p>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className="user-box border-color">
                                        <div className="reply-button">
                                            <i className="fa-solid fa-reply"></i>
                                            <span className="theme-color">Reply</span>
                                        </div>
                                        <div className="user-iamge">
                                            <img src={user2}
                                                className="img-fluid  lazyload" alt=""/>
                                            <div className="user-name">
                                                <h6>30 Jan, 2022</h6>
                                                <h5 className="text-content">Glenn Greer</h5>
                                            </div>
                                        </div>

                                        <div className="user-contain">
                                            <p>"Yeah, I think maybe you do. Right, gimme a Pepsi free. Of course, the
                                                Enchantment Under The Sea Dance they're supposed to go to this, that's
                                                where they kiss for the first time. You'll find out. Are you sure about
                                                this storm?"</p>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className="user-box">
                                        <div className="reply-button">
                                            <i className="fa-solid fa-reply"></i>
                                            <span className="theme-color">Reply</span>
                                        </div>
                                        <div className="user-iamge">
                                            <img src={user3}
                                                className="img-fluid  lazyload" alt=""/>
                                            <div className="user-name">
                                                <h6>30 Jan, 2022</h6>
                                                <h5 className="text-content">Glenn Greer</h5>
                                            </div>
                                        </div>

                                        <div className="user-contain">
                                            <p>"Cheese slices goat cottage cheese roquefort cream cheese pecorino cheesy
                                                feet when the cheese comes out everybody's happy"</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div> */}

              {/* <div className="leave-box">
                        <div className="leave-title mt-0">
                            <h3>Leave Comment</h3>
                        </div>

                        <div className="leave-comment">
                            <div className="comment-notes">
                                <p className="text-content mb-4">Your email address will not be published. Required fields
                                    are marked</p>
                            </div>
                            <div className="row g-3">
                                <div className="col-xxl-4 col-lg-12 col-sm-6">
                                    <div className="blog-input">
                                        <input type="text" className="form-control" id="exampleFormControlInput1"
                                            placeholder="Full Name"/>
                                    </div>
                                </div>

                                <div className="col-xxl-4 col-lg-12 col-sm-6">
                                    <div className="blog-input">
                                        <input type="email" className="form-control" id="exampleFormControlInput2"
                                            placeholder="Enter Email Address"/>
                                    </div>
                                </div>

                                <div className="col-xxl-4 col-lg-12 col-sm-6">
                                    <div className="blog-input">
                                        <input type="url" className="form-control" id="exampleFormControlInput3"
                                            placeholder="Enter URL"/>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="blog-input">
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"
                                            placeholder="Comments"></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="form-check d-flex mt-4 p-0">
                                <input className="checkbox_animated" type="checkbox" value="" id="flexCheckDefault"/>
                                <label className="form-check-label text-content" htmlFor="flexCheckDefault">
                                    <span className="color color-1"> Save my name, email, and website in this
                                        browser for the next time I comment.</span>
                                </label>
                            </div>

                            <button className="btn btn-animation ms-xxl-auto mt-xxl-0 mt-3 btn-md fw-bold">Post
                                Comment</button>
                        </div>
                    </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* blog detail page end */}
      <Footer />
    </Fragment>
  );
};

export default BlogDetail;
