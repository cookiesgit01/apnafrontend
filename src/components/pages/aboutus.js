import React, { Fragment } from "react";
import Footer from "../common/footer";
import Header from '../common/header'
import Breadcumb from '../common/beadcumb';
import 'react-multi-carousel/lib/styles.css';
import { FaStar } from 'react-icons/fa';
const Aboutus = () => {
    return (
        <Fragment>
            <Header />
            <Breadcumb pageName={'About us'} pageTitle={'About us'} pageHref="/" />
            {/* <!-- Breadcrumb Section Start --> */}
            {/* <!-- Fresh Vegetable Section Start --> */}
            <section className="fresh-vegetable-section section-lg-space">
                <div className="container-fluid-lg">
                    <div className="row gx-xl-5 gy-xl-0 g-3 ratio_148">
                        <div className="col-xl-6 col-12">
                            <div className="row">
                                <div className="col-6">
                                    <div className="fresh-image-2">
                                        <div>
                                            <img src="https://i.pinimg.com/originals/45/36/21/453621b62a17ff28a75a92e70db2e15a.jpg"
                                                className="bg-img w-100 h-100 lazyload" alt="" />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="fresh-image">
                                        <div>
                                            <img src="https://media.baamboozle.com/uploads/images/52175/1602530014_406326"
                                                className="bg-img w-100 h-100  lazyload" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-12">
                            <div className="fresh-contain p-center-left">
                                <div>
                                    <div className="review-title">
                                        <h4>About Us</h4>
                                        <h2>We make Organic Food In Market</h2>
                                    </div>

                                    <div className="delivery-list">
                                        <p className="text-content">Just a few seconds to measure your body temperature. Up to 5
                                            users! The battery lasts up to 2 years. There are many variations of passages of
                                            Lorem Ipsum available.We started in 2019 and haven't stopped smashing it since. A
                                            global brand that doesn't sleep, we are 24/7 and always bringing something new with
                                            over 100 new products dropping on the monhtly, bringing you the latest looks for
                                            less.</p>

                                        <ul className="delivery-box p-0">
                                            <li>
                                                <div className="delivery-box">
                                                    <div className="delivery-icon">
                                                        <img src="https://themes.pixelstrap.com/fastkart/assets/svg/3/delivery.svg" className=" lazyload" alt="" />
                                                    </div>

                                                    <div className="delivery-detail">
                                                        <h5 className="text">Free delivery for all orders</h5>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="delivery-box">
                                                    <div className="delivery-icon">
                                                        <img src="https://themes.pixelstrap.com/fastkart/assets/svg/3/leaf.svg" className=" lazyload" alt="" />
                                                    </div>

                                                    <div className="delivery-detail">
                                                        <h5 className="text">Only fresh foods</h5>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="delivery-box">
                                                    <div className="delivery-icon">
                                                        <img src="https://themes.pixelstrap.com/fastkart/assets/svg/3/delivery.svg" className=" lazyload" alt="" />
                                                    </div>

                                                    <div className="delivery-detail">
                                                        <h5 className="text">Free delivery for all orders</h5>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="delivery-box">
                                                    <div className="delivery-icon">
                                                        <img src="https://themes.pixelstrap.com/fastkart/assets/svg/3/leaf.svg" className=" lazyload" alt="" />
                                                    </div>

                                                    <div className="delivery-detail">
                                                        <h5 className="text">Only fresh foods</h5>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Fresh Vegetable Section End --> */}
            {/* <!-- Client Section Start --> */}
            <section className="client-section section-lg-space">
                <div className="container-fluid-lg">
                    <div className="row">
                        <div className="col-12">
                            <div className="about-us-title text-center">
                                <h4>What We Do</h4>
                                <h2 className="center">We are Trusted by Clients</h2>
                            </div>

                            <div className="slider-3_1 product-wrapper row">
                                <div className="col-12 col-md-4">
                                    <div className="clint-contain ">
                                        <div className="client-icon">
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/svg/3/work.svg" className=" lazyload" alt="" />
                                        </div>
                                        <h2>10</h2>
                                        <h4>Business Years</h4>
                                        <p>A coffee shop is a small business that sells coffee, pastries, and other morning
                                            goods. There are many different types of coffee shops around the world.</p>
                                    </div>
                                </div>

                                <div className="col-12 col-md-4">
                                    <div className="clint-contain">
                                        <div className="client-icon">
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/svg/3/buy.svg" className=" lazyload" alt="" />
                                        </div>
                                        <h2>80 K+</h2>
                                        <h4>Products Sales</h4>
                                        <p>Some coffee shops have a seating area, while some just have a spot to order and then
                                            go somewhere else to sit down. The coffee shop that I am going to.</p>
                                    </div>
                                </div>

                                <div className="col-12 col-md-4">
                                    <div className="clint-contain">
                                        <div className="client-icon">
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/svg/3/user.svg" className=" lazyload" alt="" />
                                        </div>
                                        <h2>90%</h2>
                                        <h4>Happy Customers</h4>
                                        <p>My goal for this coffee shop is to be able to get a coffee and get on with my day.
                                            It's a Thursday morning and I am rushing between meetings.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Client Section End --> */}
            {/* <!-- Team Section Start --> 
    <section className="team-section section-lg-space">
        <div className="container-fluid-lg">
            <div className="about-us-title text-center">
                <h4 className="text-content">Our Creative Team</h4>
                <h2 className="center">fastkart team member</h2>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="slider-user product-wrapper row">
                        <div className="col-2">
                            <div className="team-box">
                                <div className="team-iamge">
                                    <img src="https://www.technewsworld.com/wp-content/uploads/sites/3/2022/02/office-worker.jpg" className="img-fluid blur-up lazyload"
                                        alt=""/>
                                </div>

                                <div className="team-name">
                                    <h3>Anna Baranov</h3>
                                    <h5>Marketing</h5>
                                    <p>cheeseburger airedale mozzarella the big cheese fondue.</p>
                                    <ul className="team-media">
                                        <li>
                                            <a href="https://www.facebook.com/" className="fb-bg">
                                                <i className="fa-brands fa-facebook-f"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://in.pinterest.com/" className="pint-bg">
                                                <i className="fa-brands fa-pinterest-p"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://twitter.com/" className="twitter-bg">
                                                <i className="fa-brands fa-twitter"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://www.instagram.com/" className="insta-bg">
                                                <i className="fa-brands fa-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="team-box">
                                <div className="team-iamge">
                                    <img src="https://www.technewsworld.com/wp-content/uploads/sites/3/2022/02/office-worker.jpg" className="img-fluid blur-up lazyload"
                                        alt=""/>
                                </div>

                                <div className="team-name">
                                    <h3>Anna Baranov</h3>
                                    <h5>Marketing</h5>
                                    <p>cheese on toast mozzarella bavarian bergkase smelly cheese cheesy feet.</p>
                                    <ul className="team-media">
                                        <li>
                                            <a href="https://www.facebook.com/" className="fb-bg">
                                                <i className="fa-brands fa-facebook-f"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://in.pinterest.com/" className="pint-bg">
                                                <i className="fa-brands fa-pinterest-p"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://twitter.com/" className="twitter-bg">
                                                <i className="fa-brands fa-twitter"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://www.instagram.com/" className="insta-bg">
                                                <i className="fa-brands fa-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="team-box">
                                <div className="team-iamge">
                                    <img src="https://www.technewsworld.com/wp-content/uploads/sites/3/2022/02/office-worker.jpg" className="img-fluid blur-up lazyload"
                                        alt=""/>
                                </div>

                                <div className="team-name">
                                    <h3>Anna Baranov</h3>
                                    <h5>Marketing</h5>
                                    <p>camembert de normandie. Bocconcini rubber cheese fromage frais port-salut.</p>
                                    <ul className="team-media">
                                        <li>
                                            <a href="https://www.facebook.com/" className="fb-bg">
                                                <i className="fa-brands fa-facebook-f"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://in.pinterest.com/" className="pint-bg">
                                                <i className="fa-brands fa-pinterest-p"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://twitter.com/" className="twitter-bg">
                                                <i className="fa-brands fa-twitter"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://www.instagram.com/" className="insta-bg">
                                                <i className="fa-brands fa-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="team-box">
                                <div className="team-iamge">
                                    <img src="https://www.technewsworld.com/wp-content/uploads/sites/3/2022/02/office-worker.jpg" className="img-fluid blur-up lazyload"
                                        alt=""/>
                                </div>

                                <div className="team-name">
                                    <h3>Anna Baranov</h3>
                                    <h5>Marketing</h5>
                                    <p>cheeseburger airedale mozzarella the big cheese fondue.</p>
                                    <ul className="team-media">
                                        <li>
                                            <a href="https://www.facebook.com/" className="fb-bg">
                                                <i className="fa-brands fa-facebook-f"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://in.pinterest.com/" className="pint-bg">
                                                <i className="fa-brands fa-pinterest-p"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://twitter.com/" className="twitter-bg">
                                                <i className="fa-brands fa-twitter"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://www.instagram.com/" className="insta-bg">
                                                <i className="fa-brands fa-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="team-box">
                                <div className="team-iamge">
                                    <img src="https://www.technewsworld.com/wp-content/uploads/sites/3/2022/02/office-worker.jpg" className="img-fluid blur-up lazyload"
                                        alt=""/>
                                </div>

                                <div className="team-name">
                                    <h3>Anna Baranov</h3>
                                    <h5>Marketing</h5>
                                    <p>squirty cheese cheddar macaroni cheese airedale cheese triangles.</p>
                                    <ul className="team-media">
                                        <li>
                                            <a href="https://www.facebook.com/" className="fb-bg">
                                                <i className="fa-brands fa-facebook-f"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://in.pinterest.com/" className="pint-bg">
                                                <i className="fa-brands fa-pinterest-p"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://twitter.com/"className="twitter-bg">
                                                <i className="fa-brands fa-twitter"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://www.instagram.com/" className="insta-bg">
                                                <i className="fa-brands fa-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="team-box">
                                <div className="team-iamge">
                                    <img src="https://www.technewsworld.com/wp-content/uploads/sites/3/2022/02/office-worker.jpg" className="img-fluid blur-up lazyload"
                                        alt=""/>
                                </div>

                                <div className="team-name">
                                    <h3>Anna Baranov</h3>
                                    <h5>Marketing</h5>
                                    <p>camembert de normandie. Bocconcini rubber cheese fromage frais port-salut.</p>
                                    <ul className="team-media">
                                        <li>
                                            <a href="https://www.facebook.com/" className="fb-bg">
                                                <i className="fa-brands fa-facebook-f"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://in.pinterest.com/" className="pint-bg">
                                                <i className="fa-brands fa-pinterest-p"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://twitter.com/" className="twitter-bg">
                                                <i className="fa-brands fa-twitter"></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://www.instagram.com/" className="insta-bg">
                                                <i className="fa-brands fa-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    */}
            {/* <!-- Team Section End --> */}
            {/* <!-- Review Section Start --> */}
            <section className="review-section section-lg-space">
                <div className="container-fluid">
                    <div className="about-us-title text-center">
                        <h4 className="text-content">Latest Testimonals</h4>
                        <h2 className="center">What people say</h2>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="slider-4-half product-wrapper row">
                                <div className="col-12 col-md-4">
                                    <div className="reviewer-box">
                                        <i className="fa-solid fa-quote-right"></i>
                                        <div className="product-rating">
                                            <ul className="rating">
                                                <li color='#ffb321'>
                                                    <FaStar className="feather fill" fill={'#ffb321'} />
                                                </li>
                                                <li color='#ffb321'>
                                                    <FaStar className="feather fill" fill={'#ffb321'} />
                                                </li>
                                                <li color='#ffb321'>
                                                    <FaStar className="feather fill" fill={'#ffb321'} />
                                                </li>
                                                <li color='#ffb321'>
                                                    <FaStar className="feather fill" fill={'#ffb321'} />
                                                </li>
                                                <li color='#'>
                                                    <FaStar className="#" />
                                                </li>
                                            </ul>
                                        </div>

                                        <h3>Top Quality, Beautiful Location</h3>

                                        <p>"I usually try to keep my sadness pent up inside where it can fester quietly as a
                                            mental illness. There, now he's trapped in a book I wrote: a crummy world of plot
                                            holes and spelling errors! As an interesting side note."</p>

                                        <div className="reviewer-profile ">
                                            <div className="reviewer-image">
                                                <img src="https://www.technewsworld.com/wp-content/uploads/sites/3/2022/02/office-worker.jpg " className="lazyload"
                                                    alt="" />
                                            </div>

                                            <div className="reviewer-name">
                                                <h4>Betty J. Turner</h4>
                                                <h6>CTO, Company</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-4">
                                    <div className="reviewer-box">
                                        <i className="fa-solid fa-quote-right"></i>
                                        <div className="product-rating">
                                            <ul className="rating">
                                                <li color='#ffb321'>
                                                    <FaStar className="feather fill" fill={'#ffb321'} />
                                                </li>
                                                <li color='#ffb321'>
                                                    <FaStar className="feather fill" fill={'#ffb321'} />
                                                </li>
                                                <li color='#ffb321'>
                                                    <FaStar className="feather fill" fill={'#ffb321'} />
                                                </li>
                                                <li color='#ffb321'>
                                                    <FaStar className="feather fill" fill={'#ffb321'} />
                                                </li>
                                                <li color='#'>
                                                    <FaStar className="#" />
                                                </li>
                                            </ul>
                                        </div>

                                        <h3>Top Quality, Beautiful Location</h3>

                                        <p>"My busy schedule leaves little, if any, time for blogging and social media. The
                                            Lorem Ipsum Company has been a huge part of helping me grow my business through
                                            organic search and content marketing."</p>
                                        <div className="reviewer-profile">
                                            <div className="reviewer-image">
                                                <img src="https://www.ccl.org/wp-content/uploads/2020/04/employee-engagement-and-motivation-center-for-creative-leadership.jpg" className=" lazyload"
                                                    alt="" />
                                            </div>

                                            <div className="reviewer-name">
                                                <h4>Alfredo S. Rocha</h4>
                                                <h6>Project Manager</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-4">
                                    <div className="reviewer-box ">
                                        <i className="fa-solid fa-quote-right"></i>
                                        <div className="product-rating">
                                            <ul className="rating">
                                                <li color='#ffb321'>
                                                    <FaStar className="feather fill" fill={'#ffb321'} />
                                                </li>
                                                <li color='#ffb321'>
                                                    <FaStar className="feather fill" fill={'#ffb321'} />
                                                </li>
                                                <li color='#ffb321'>
                                                    <FaStar className="feather fill" fill={'#ffb321'} />
                                                </li>
                                                <li color='#ffb321'>
                                                    <FaStar className="feather fill" fill={'#ffb321'} />
                                                </li>
                                                <li color='#'>
                                                    <FaStar className="#" />
                                                </li>
                                            </ul>
                                        </div>

                                        <h3>Top Quality, Beautiful Location</h3>

                                        <p>"Professional, responsive, and able to keep up with ever-changing demand and tight
                                            deadlines: That's how I would describe Jeramy and his team at The Lorem Ipsum
                                            Company. When it comes to content marketing."</p>
                                        <div className="reviewer-profile">
                                            <div className="reviewer-image">
                                                <img src="https://www.camc.org/sites/default/files/styles/800x600/public/2020-09/employee%20wellness%20center_hero.jpg?itok=9qCcPtUE" className=" lazyload"
                                                    alt="" />
                                            </div>

                                            <div className="reviewer-name">
                                                <h4>Donald C. Spurr</h4>
                                                <h6>Sale Agents</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="col-3">
                            <div className="reviewer-box col-4">
                                <i className="fa-solid fa-quote-right"></i>
                                <div className="product-rating">
                                    <ul className="rating">
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star"></i>
                                        </li>
                                    </ul>
                                </div>

                                <h3>Top Quality, Beautiful Location</h3>

                                <p>"After being forced to move twice within five years, our customers had a hard time
                                    finding us and our sales plummeted. The Lorem Ipsum Co. not only revitalized our
                                    brand."</p>
                                <div className="reviewer-profile">
                                    <div className="reviewer-image">
                                        <img src="https://www.bizlibrary.com/wp-content/uploads/2020/08/04140722/guide-to-improving-employee-engagement.jpg" className="lazyload"
                                            alt=""/>
                                    </div>

                                    <div className="reviewer-name">
                                        <h4>Terry G. Fain</h4>
                                        <h6>Photographer</h6>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                                {/* <div>
                            <div className="reviewer-box col-4">
                                <i className="fa-solid fa-quote-right"></i>
                                <div className="product-rating">
                                    <ul className="rating">
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star"></i>
                                        </li>
                                    </ul>
                                </div>

                                <h3>Top Quality, Beautiful Location</h3>

                                <p>"I was skeptical of SEO and content marketing at first, but the Lorem Ipsum Company
                                    not only proved itself financially speaking, but the response I have received from
                                    customers is incredible."</p>
                                <div className="reviewer-profile">
                                    <div className="reviewer-image">
                                        <img src="../assets/images/inner-page/user/1.jpg" className="blur-up lazyload"
                                            alt=""/>
                                    </div>

                                    <div className="reviewer-name">
                                        <h4>Gwen J. Geiger</h4>
                                        <h6>Designer</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="reviewer-box col-4">
                                <i className="fa-solid fa-quote-right"></i>
                                <div className="product-rating">
                                    <ul className="rating">
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star"></i>
                                        </li>
                                    </ul>
                                </div>

                                <h3>Top Quality, Beautiful Location</h3>

                                <p>"Jeramy and his team at the Lorem Ipsum Company whipped my website into shape just in
                                    time for tax season. I was excited by the results and am proud to direct clients to
                                    my website once again."</p>

                                <div className="reviewer-profile">
                                    <div className="reviewer-image">
                                        <img src="https://www.glassdoor.com/employers/app/uploads/sites/2/2018/09/resources-benefits-employees-want-most-min-768x483-1-e1540508225245.jpg" className=" lazyload"
                                            alt=""/>
                                    </div>

                                    <div className="reviewer-name">
                                        <h4>Constance K. Whang</h4>
                                        <h6>CEO, Company</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="reviewer-box col-4">
                                <i className="fa-solid fa-quote-right"></i>
                                <div className="product-rating">
                                    <ul className="rating">
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star"></i>
                                        </li>
                                    </ul>
                                </div>

                                <h3>Top Quality, Beautiful Location</h3>

                                <p>"Yeah, and if you were the pope they'd be all, "Straighten your pope hat." And "Put
                                    on your good vestments." What are their names? Yep, I remember. They came in last at
                                    the Olympics!"</p>
                                <div className="reviewer-profile">
                                    <div className="reviewer-image">
                                        <img src="../assets/images/inner-page/user/3.jpg" className="blur-up lazyload"
                                            alt=""/>
                                    </div>

                                    <div className="reviewer-name">
                                        <h4>Christopher R. Lee</h4>
                                        <h6>Managing Director</h6>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                                {/* <div>
                            <div className="reviewer-box col-4">
                                <i className="fa-solid fa-quote-right"></i>
                                <div className="product-rating">
                                    <ul className="rating">
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star" className="fill"></i>
                                        </li>
                                        <li>
                                            <i data-feather="star"></i>
                                        </li>
                                    </ul>
                                </div>

                                <h3>Top Quality, Beautiful Location</h3>

                                <p>"Good man. Nixon's pro-war and pro-family. Hey, tell me something. You've got all
                                    this money. How come you always dress like you're doing your laundry? So, how 'bout
                                    them Knicks? What kind of a father would I be if I said no?."</p>
                                <div className="reviewer-profile">
                                    <div className="reviewer-image">
                                        <img src="https://nexttechnology.io/app/uploads/2022/04/EVP-Employee-Value-Proposition-czym-jest-i-jakie-daje-korzys%CC%81ci.png" className=" lazyload"
                                            alt=""/>
                                    </div>

                                    <div className="reviewer-name">
                                        <h4>Eileen R. Chu</h4>
                                        <h6>Marketing Director</h6>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Review Section End --> */}
            {/* <!-- Blog Section Start --> */}
            <section className="section-lg-space">
                <div className="container-fluid-lg">
                    <div className="about-us-title text-center">
                        <h4 className="text-content">Our Blog</h4>
                        <h2 className="center">Our Latest Blog</h2>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="slider-5 ratio_87 row">
                                <div className="col-4">
                                    <div className="blog-box">
                                        <div className="blog-box-image">
                                            <div className="blog-image">
                                                <a href="blog-detail.html" className="rounded-3">
                                                    <img src="../assets/images/veg-2/blog/1.jpg"
                                                        alt="" />
                                                </a>
                                            </div>
                                        </div>

                                        <a href="blog-detail.html" className="blog-detail d-block">
                                            <h6>Farmart</h6>
                                            <h5>Fresh Meat Saugage</h5>
                                        </a>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className="blog-box">
                                        <div className="blog-box-image">
                                            <div className="blog-image">
                                                <a href="blog-detail.html" className="rounded-3">
                                                    <img src="../assets/images/veg-2/blog/2.jpg" className="bg-img blur-up lazyload"
                                                        alt="" />
                                                </a>
                                            </div>
                                        </div>

                                        <a href="blog-detail.html" className="blog-detail d-block">
                                            <h6>Soda Brand</h6>
                                            <h5>Soda 500ml - 20% OFF</h5>
                                        </a>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className="blog-box">
                                        <div className="blog-box-image">
                                            <div className="blog-image">
                                                <a href="blog-detail.html" className="rounded-3">
                                                    <img src="../assets/images/veg-2/blog/3.jpg" className="bg-img blur-up lazyload"
                                                        alt="" />
                                                </a>
                                            </div>
                                        </div>

                                        <a href="blog-detail.html" className="blog-detail d-block">
                                            <h6>Beer Brand</h6>
                                            <h5>Soda 500ml - 20% OFF</h5>
                                        </a>
                                    </div>
                                </div>

                                {/* <div className="col-4">
                            <div className="blog-box">
                                <div className="blog-box-image">
                                    <div className="blog-image">
                                        <a href="blog-detail.html" className="rounded-3">
                                            <img src="../assets/images/veg-2/blog/4.jpg" className="bg-img blur-up lazyload"
                                                alt=""/>
                                        </a>
                                    </div>
                                </div>

                                <a href="blog-detail.html" className="blog-detail d-block">
                                    <h6>Beer Brand</h6>
                                    <h5>Fresh Beer -30% OFF</h5>
                                </a>
                            </div>
                        </div> */}

                                {/* <div className="col-3">
                            <div className="blog-box">
                                <div className="blog-image">
                                    <a href="blog-detail.html" className="rounded-3">
                                        <img src="https://www.foodsafetynews.com/files/2021/07/dreamstime_dairy-products-milk-cheese-yogurt.jpg" className="bg-img blur-up lazyload"
                                            alt=""/>
                                    </a>
                                </div>

                                <a href="blog-detail.html" className="blog-detail d-block">
                                    <h6>Milk Brand</h6>
                                    <h5>Fresh Milk</h5>
                                </a>
                            </div>
                        </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Blog Section End --> */}

            <Footer />

        </Fragment>
    )
}
export default Aboutus;