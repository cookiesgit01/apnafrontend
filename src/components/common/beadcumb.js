import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const Breadcumb = ({ pageName, pageTitle, pageHref }) => {

    return (
        <Fragment >
            {/* <!-- Breadcrumb Section Start --> */}
            <section className="breadscrumb-section pt-0">
                <div className="container-fluid-lg">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadscrumb-contain">
                                <h2>{pageName}</h2>
                                <nav>
                                    <ol className="breadcrumb mb-0">
                                        <li className="breadcrumb-item">
                                            <NavLink to={pageHref}>
                                                <i className="fa-solid fa-house"></i>
                                            </NavLink>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">{pageTitle}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Breadcrumb Section End --> */}
        </Fragment>
    )
}
export default Breadcumb;