import React from 'react'
import Breadcumb from '../common/beadcumb'
import Footer from '../common/footer'
import Header from '../common/header'
import Tracking_img from "../../Photos/vegetable/product/6.png"
import { BsBoxSeam, BsTruck, BsCalendar4 } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { MdLocationSearching } from 'react-icons/md';
import { GoLocation } from 'react-icons/go';
// import {BsCalendar} from 'react-icons/bs';

function Tracking() {
    return (
        <React.Fragment>
            <Header />
            <Breadcumb pageName={'Order Tracking'} pageTitle={'Order Tracking'} pageHref={"/"} />

            <section className="order-detail">
                <div className="container-fluid-lg">
                    <div className="row g-sm-4 g-3">
                        <div className="col-xxl-3 col-xl-4 col-lg-6">
                            <div className="order-image">
                                <img src={Tracking_img} className="img-fluid  lazyload" alt="" />
                            </div>
                        </div>

                        <div className="col-xxl-9 col-xl-8 col-lg-6">
                            <div className="row g-sm-4 g-3">
                                <div className="col-xl-4 col-sm-6">
                                    <div className="order-details-contain">
                                        <div className="order-tracking-icon">
                                            <BsBoxSeam className='fs-4' />

                                        </div>

                                        <div className="order-details-name">
                                            <h5 className="text-content">Tracking Code</h5>
                                            <h2 className="theme-color">MH4285UY</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-sm-6">
                                    <div className="order-details-contain">
                                        <div className="order-tracking-icon">
                                            <BsTruck className='fs-4' />
                                        </div>

                                        <div className="order-details-name">
                                            <h5 className="text-content">Service</h5>
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/brand-name.svg"
                                                className="img-fluid lazyload" alt="" />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-sm-6">
                                    <div className="order-details-contain">
                                        <div className="order-tracking-icon">
                                            <AiOutlineInfoCircle className='fs-4' />
                                        </div>

                                        <div className="order-details-name">
                                            <h5 className="text-content">Package Info</h5>
                                            <h4>Letter</h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-sm-6">
                                    <div className="order-details-contain">
                                        <div className="order-tracking-icon">
                                            <MdLocationSearching className='fs-4' />
                                        </div>

                                        <div className="order-details-name">
                                            <h5 className="text-content">From</h5>
                                            <h4>STR. Smardan 9, Bucuresti, romania.</h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-sm-6">
                                    <div className="order-details-contain">
                                        <div className="order-tracking-icon">
                                            <GoLocation className='fs-4' />
                                        </div>

                                        <div className="order-details-name">
                                            <h5 className="text-content">Destination</h5>
                                            <h4>Flokagata 24, 105 Reykjavik, Iceland</h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-sm-6">
                                    <div className="order-details-contain">
                                        <div className="order-tracking-icon">
                                            <BsCalendar4 className='fs-4' />
                                        </div>

                                        <div className="order-details-name">
                                            <h5 className="text-content">Estimated Time</h5>
                                            <h4>7 Frb, 05:05pm</h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 overflow-hidden">
                                    <ol className="progtrckr">
                                        <li className="progtrckr-done">
                                            <h5>Order Processing</h5>
                                            <h6>05:43 AM</h6>
                                        </li>
                                        <li className="progtrckr-done">
                                            <h5>Pre-Production</h5>
                                            <h6>01:21 PM</h6>
                                        </li>
                                        <li className="progtrckr-done">
                                            <h5>In Production</h5>
                                            <h6>Processing</h6>
                                        </li>
                                        <li className="progtrckr-todo">
                                            <h5>Shipped</h5>
                                            <h6>Pending</h6>
                                        </li>
                                        <li className="progtrckr-todo">
                                            <h5>Delivered</h5>
                                            <h6>Pending</h6>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="order-table-section section-b-space">
                <div className="container-fluid-lg">
                    <div className="row">
                        <div className="col-12">
                            <div className="table-responsive">
                                <table className="table order-tab-table">
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Location</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Order Placed</td>
                                            <td>26 Sep 2021</td>
                                            <td>12:00 AM</td>
                                            <td>California</td>
                                        </tr>

                                        <tr>
                                            <td>Preparing to Ship</td>
                                            <td>03 Oct 2021</td>
                                            <td>12:00 AM</td>
                                            <td>Canada</td>
                                        </tr>

                                        <tr>
                                            <td>Shipped</td>
                                            <td>04 Oct 2021</td>
                                            <td>12:00 AM</td>
                                            <td>America</td>
                                        </tr>

                                        <tr>
                                            <td>Delivered</td>
                                            <td>10 Nav 2021</td>
                                            <td>12:00 AM</td>
                                            <td>Germany</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </React.Fragment>
    )
}

export default Tracking