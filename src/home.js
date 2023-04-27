import React, { Fragment } from 'react';
import HomePage from './components/common/banners'
// import Header from './components/common/header'
import Footer from './components/common/footer';


function Home() {
  return (
    <Fragment>
    {/* <Header/> */}
    <HomePage/>
    <Footer/>
    </Fragment>
  );
}

export default Home;