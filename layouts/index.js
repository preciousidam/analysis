import React, {useState, useEffect} from 'react';
import Head from "next/head";
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';

import '../styles/layout.scss';
import Sidebar, {MinSideBar} from '../components/sidebar';
import Header from '../components/header';
import { Breadcrumb } from '../components/breadcrumb';
import CustomScroll from 'react-custom-scroll';
import { Footer } from '../components/footer';


export const MainLayout = ({children, title="", BreadIcon, links=[], right}) => {
    
    const className = 'col-sm-10';
    
    return (
        <div className="main">
            <Head>
                <title>NAPIMS | {title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main id="mainContainer" className="container-fluid">
                
                <div className="row" id="mainContent">
                    <Sidebar />
                    <div className={`${className} content-area`}>
                        <Header />
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