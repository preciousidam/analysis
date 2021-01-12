import React, {useState, useEffect} from 'react';
import Head from "next/head";
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import { isBrowser, isMobile } from "react-device-detect";


import '../styles/layout.scss';
import {BrowserSidebar, MobileSideBar} from '../components/sidebar';
import {Header, MobileHeader} from '../components/header';
import { Breadcrumb } from '../components/breadcrumb';
import CustomScroll from 'react-custom-scroll';
import { Footer } from '../components/footer';


export const MainLayout = ({children, title="", BreadIcon, links=[], right}) => {
    
    const className = 'col-md-10';
    const [showMobile, setShowMobile] = useState(false)
    
    return (
        <div className="main">
            <Head>
                <title>NAPIMS | {title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main id="mainContainer" className="container-fluid">
                
                <div className="row" id="mainContent">
                    {isMobile ? <MobileSideBar visible={showMobile} /> : <BrowserSidebar />}
                    <div className={`${className} content-area`}>
                        {isMobile ? <MobileHeader onClick={e => setShowMobile(prev => !prev)} />: <Header />}
                        <CustomScroll heightRelativeToParent="calc(100% - 60px)">
                            {children}
                            <Footer />
                        </CustomScroll>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MainLayout;

MainLayout.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string,
    right: PropTypes.element,
    links: PropTypes.arrayOf(PropTypes.string),
}