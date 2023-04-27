import React, { Fragment } from "react";
import Footer from "../common/footer";
import Header from '../common/header'
import Breadcumb from '../common/beadcumb';
import Accordion from 'react-bootstrap/Accordion';
import Dropdown from 'react-bootstrap/Dropdown';
const Faq = () => {
    return (
        <Fragment>
            <Header />
            <Breadcumb pageTitle={'Contact us'} pageHref="/" />
            <section className="faq-breadscrumb pt-0">
                <div className="container-fluid-lg">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadscrumb-contain ">
                                <h2>Help Center</h2>
                                <p>We are glad having you here looking for the answer. As our team hardly working on the
                                    product, feel free to ask any questions. We Believe only your feedback might move us
                                    forward.</p>
                                <div className="faq-form-tag">
                                    <div className="input-group">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                        <input type="search" className="form-control" id="exampleFormControlInput1"
                                            placeholder="name@example.com" />
                                        <Dropdown>
                                            <Dropdown.Toggle className="d">
                                                All Product
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">Action</Dropdown.Item>
                                                <Dropdown.Item href="#">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Faq Question section Start --> */}
            <section className="faq-contain">
                <div className="container">
                    <div className="row" >
                        <div className="col-12">
                            <div className="slider-4-2 product-wrapper row ">
                                <div className="col md-3">
                                    <div className="faq-top-box">
                                        <div className="faq-box-icon">
                                            <img src="../assets/images/inner-page/faq/start.png" className="blur-up lazyload"
                                                alt="" />
                                        </div>

                                        <div className="faq-box-contain">
                                            <h3>Getting Started</h3>
                                            <p>Bring to the table win-win survival strategies to ensure proactive domination.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col md-3">
                                    <div className="faq-top-box">
                                        <div className="faq-box-icon">
                                            <img src="../assets/images/inner-page/faq/help.png" className="blur-up lazyload" alt="" />
                                        </div>

                                        <div className="faq-box-contain">
                                            <h3>Sales Question</h3>
                                            <p>Lorizzle ipsizzle boom shackalack sit get down get down.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col md-3">
                                    <div className="faq-top-box">
                                        <div className="faq-box-icon">
                                            <img src="../assets/images/inner-page/faq/price.png" className="blur-up lazyload"
                                                alt="" />
                                        </div>

                                        <div className="faq-box-contain">
                                            <h3>Pricing & Plans</h3>
                                            <p>Curabitizzle fizzle break yo neck, yall quis fo shizzle mah nizzle fo rizzle.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col md-3">
                                    <div className="faq-top-box">
                                        <div className="faq-box-icon">
                                            <img src="../assets/images/inner-page/faq/contact.png" className="blur-up lazyload"
                                                alt="" />
                                        </div>

                                        <div className="faq-box-contain">
                                            <h3>Support Contact</h3>
                                            <p>Gizzle fo shizzle bow wow wow bizzle leo bibendizzle check out this.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Faq Question section End --> */}
            {/* <!-- Faq Section Start --> */}
            <section className="faq-box-contain section-b-space">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-4">
                            <div className="faq-contain p-sticky">
                                <h2>Frequently Asked Questions</h2>
                                <p>We are answering most frequent questions. No worries if you not find exact one. You can find
                                    out more by searching or continuing clicking button below or directly <a
                                        href="contact-us.html" className="theme-color text-decoration-underline">contact our
                                        support.</a></p>
                            </div>
                        </div>

                        <div className="col-xxl-7 ms-auto">
                            <div className="faq-accordion">
                                <div className="accordion" id="accordionExample">
                                    <Accordion className="w-100">
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>
                                                What is Fastkart and why was the name changed?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className="accordion-body">
                                                    <p>Fastkart is leading the charge in transforming India’s vast, unorganised
                                                        grocery landscape through cutting-edge technology and innovation. Blinkit is
                                                        India’s largest and most convenient hyper-local delivery company, which
                                                        enables you to order grocery, fruits & vegetables, and other daily essential
                                                        products, directly via your mobile or web browser.</p>

                                                    <p>To know the reason why we changed our brand name from Grofers to Fastkart,
                                                        read this <span className="fw-bold">blog post.</span></p>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <Accordion className="w-100">
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>
                                                How to remove the impurities of Graphene oxide?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className="accordion-body">
                                                    <p>Discover, Explore & Understanding The Product Description Maecenas
                                                        ullamcorper eros libero, facilisis tempor mi dapibus vel. Sed ut felis
                                                        ligula. Pellentesque vestibulum, tellus id euismod aliquet, justo velit
                                                        tincidunt justo, nec pulvinar tortor elit vitae urna.</p>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <Accordion className="w-100">
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>
                                                How long will delivery take?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className="accordion-body">
                                                    <p>Discover, Explore & Understanding The Product Description Maecenas
                                                        ullamcorper eros libero, facilisis tempor mi dapibus vel. Sed ut felis
                                                        ligula. Pellentesque vestibulum, tellus id euismod aliquet, justo velit
                                                        tincidunt justo, nec pulvinar tortor elit vitae urna.</p>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <Accordion className="w-100">
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>
                                                How do I find my Windows Product key?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className="accordion-body">
                                                    <p>The product key is located inside the product packaging, on the
                                                        receipt or confirmation page for a digital purchase or in a
                                                        confirmation e-mail that shows you purchased Windows. If you
                                                        purchased a digital copy from Microsoft Store, you can locate your
                                                        product key in your Account under Digital Content.</p>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <Accordion className="w-100">
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>
                                                I've downloaded an ISO file, now what?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className="accordion-body">
                                                    <p>You can use the ISO file to create bootable media for installation
                                                        or recovery. You can also install Windows on your current device
                                                        by opening the ISO file, selecting the Setup and following the
                                                        instructions.</p>

                                                    <p>To create bootable media such as a bootable USB drive or DVD, you
                                                        will need an ISO burning or mounting software. We recommend always
                                                        using a blank USB or blank DVD because contents may be deleted
                                                        when creating a bootable image.</p>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <Accordion className="w-100">
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>
                                                What's the difference between 32-bit and 64-bit versions of Windows?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className="accordion-body">
                                                    <p>The terms 32-bit and 64-bit refer to the way a computer's
                                                        processor (also called a CPU) handles information. The 64-bit
                                                        version of Windows handles large amounts of random access memory
                                                        (RAM) more effectively than a 32-bit system. Not all devices can
                                                        run the 64-bit versions of Windows.</p>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <Accordion className="w-100">
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>
                                                Questionnaire on online shopping behavior during COVID-19.
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className="accordion-body">
                                                    <p>Fastkart is leading the charge in transforming India’s vast, unorganised
                                                        grocery landscape through cutting-edge technology and innovation. Blinkit is
                                                        India’s largest and most convenient hyper-local delivery company, which
                                                        enables you to order grocery, fruits & vegetables, and other daily essential
                                                        products, directly via your mobile or web browser.</p>

                                                    <p>To know the reason why we changed our brand name from Grofers to Fastkart,
                                                        read this <span className="fw-bold">blog post.</span></p>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <Accordion className="w-100">
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>
                                                How Can I Get More Attention From Customers?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className="accordion-body">
                                                    <p>There are many variations of passages of Lorem Ipsum available, but the
                                                        majority have suffered alteration in some form, by injected humour, or
                                                        randomised words which don't look even slightly believable. If you are going
                                                        to use a passage of Lorem Ipsum, you need to be sure there isn't anything
                                                        embarrassing hidden in the middle of text. </p>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <Accordion className="w-100">
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>
                                                What is payment method?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className="accordion-body">
                                                    <p>simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                                        been the industry's standard dummy text ever since the 1500s, when an
                                                        unknown printer took a galley of type and scrambled it to make a type
                                                        specimen book. It has survived not only five centuries, but also the leap
                                                        into electronic typesetting, remaining essentially unchanged. It was
                                                        popularised in the 1960s with the release of Letraset sheets containing
                                                        Lorem Ipsum passages, and more recently with desktop publishing software
                                                        like Aldus PageMaker including versions of Lorem Ipsum</p>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Faq Section End --> */}
            <Footer />
        </Fragment>
    )
}
export default Faq;